import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { app, auth, db } from '../firebase'

let notificationRegistration: ServiceWorkerRegistration | null = null

type NotificationAction = { action: string; tag?: string; data?: Record<string, unknown> }
type ActionButton = { action: string; title: string }

function assetUrl(name: string) {
  return new URL(name, document.baseURI).toString()
}

function messagingConfig() {
  return new URLSearchParams({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  })
}

async function getNotificationServiceWorker() {
  if (!('serviceWorker' in navigator)) return null
  if (notificationRegistration) return notificationRegistration
  const scriptUrl = new URL('firebase-messaging-sw.js', document.baseURI)
  try {
    scriptUrl.search = messagingConfig().toString()
    // Register on every fresh page load so an older worker created before the
    // app-base-path fix is updated instead of being reused forever.
    notificationRegistration = await navigator.serviceWorker.register(scriptUrl.toString())
    return notificationRegistration
  } catch {
    return null
  }
}

async function showActionNotification(title: string, options: NotificationOptions & { actions?: ActionButton[]; data?: Record<string, unknown> }) {
  if (typeof Notification === 'undefined') return false
  try {
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') return false
    }
    if (Notification.permission !== 'granted') return false
    const serviceWorker = await getNotificationServiceWorker()
    if (serviceWorker) {
      await serviceWorker.showNotification(title, options)
      return true
    }

    // Do not let a missing/uncontrolled service worker block the notification.
    // This matters on the first visit and after a fresh GitHub Pages deploy.
    const registration = await Promise.race<ServiceWorkerRegistration | null>([
      serviceWorker ? Promise.resolve(serviceWorker) : Promise.resolve(null),
      new Promise<null>((resolve) => window.setTimeout(() => resolve(null), 1500)),
    ])
    if (registration) {
      notificationRegistration = registration
      await registration.showNotification(title, options)
      return true
    }

    const fallback = new Notification(title, { body: options.body, icon: options.icon, tag: options.tag })
    window.setTimeout(() => fallback.close(), 8000)
    return true
  } catch {
    // Safari and some embedded browsers do not expose action notifications.
    const fallback = new Notification(title, { body: options.body, icon: options.icon, tag: options.tag })
    window.setTimeout(() => fallback.close(), 8000)
    return true
  }
}

export function listenNotificationActions(listener: (event: NotificationAction) => void) {
  const handler = (event: MessageEvent<NotificationAction | undefined>) => {
    if (!event.data || typeof event.data !== 'object') return
    listener(event.data)
  }
  navigator.serviceWorker?.addEventListener('message', handler)
  return () => navigator.serviceWorker?.removeEventListener('message', handler)
}

// Immediate browser fallback while a server-side FCM sender is unavailable.
// It uses the existing bounded conversation listener and never exposes keys.
export function notifyIncomingMessage(title: string, body: string) {
  void showActionNotification(title, { body, icon: assetUrl('icon-192.png'), tag: 'cochat-message' })
}

export function notifyIncomingCall(name: string, callId: string, group = false) {
  void showActionNotification(group ? 'Incoming group call' : 'Incoming call', {
    body: `${name} is calling you`, icon: assetUrl('icon-192.png'), tag: `cochat-call-${callId}`, requireInteraction: true,
    data: { type: 'call', callId }, actions: [{ action: 'answer-call', title: 'Answer' }, { action: 'decline-call', title: 'Decline' }],
  })
}

export function notifyStudyTimer(remainingSeconds: number, running: boolean) {
  const mins = Math.max(0, Math.ceil(remainingSeconds / 60))
  void showActionNotification(running ? 'Focus timer running' : 'Focus timer paused', {
    body: running ? `${mins} minute${mins === 1 ? '' : 's'} left` : 'Your session is paused', icon: assetUrl('icon-192.png'), tag: 'cochat-study-timer',
    requireInteraction: running, data: { type: 'study-timer' }, actions: running
      ? [{ action: 'pause-timer', title: 'Pause' }, { action: 'finish-timer', title: 'Finish & save' }]
      : [{ action: 'resume-timer', title: 'Resume' }, { action: 'finish-timer', title: 'Finish & save' }],
  })
}

export function clearStudyTimerNotification() {
  void navigator.serviceWorker?.ready.then((registration) => registration.getNotifications({ tag: 'cochat-study-timer' }).then((items) => items.forEach((item) => item.close()))).catch(() => undefined)
}

export async function registerFcmNotifications(enabled = true) {
  const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY || ''
  if (!enabled || !app || !auth?.currentUser || !db || !vapidKey || typeof Notification === 'undefined') return false
  if (!(await isSupported()) || Notification.permission === 'denied') return false
  const permission = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission()
  if (permission !== 'granted') return false
  const messaging = getMessaging(app)
  const registration = await getNotificationServiceWorker()
  if (!registration) return false
  const token = await getToken(messaging, { vapidKey, serviceWorkerRegistration: registration })
  if (!token) return false
  await setDoc(doc(db, 'users', auth.currentUser.uid, 'fcmTokens', token), { token, platform: 'web', updatedAt: serverTimestamp() }, { merge: true })
  onMessage(messaging, (payload) => {
    if (document.visibilityState === 'visible' || !payload.notification?.title) return
    new Notification(payload.notification.title, { body: payload.notification.body || '', icon: assetUrl('icon-192.png') })
  })
  return true
}
