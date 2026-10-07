import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { app, auth, db } from '../firebase'

let notificationRegistration: ServiceWorkerRegistration | null = null

type NotificationAction = { action: string; tag?: string; data?: Record<string, unknown> }
type ActionButton = { action: string; title: string }

async function showActionNotification(title: string, options: NotificationOptions & { actions?: ActionButton[]; data?: Record<string, unknown> }) {
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return false
  try {
    notificationRegistration ||= await navigator.serviceWorker.ready
    await notificationRegistration.showNotification(title, options)
    return true
  } catch {
    // Safari and some embedded browsers do not expose action notifications.
    const fallback = new Notification(title, { body: options.body, icon: options.icon, tag: options.tag })
    window.setTimeout(() => fallback.close(), 8000)
    return true
  }
}

export function listenNotificationActions(listener: (event: NotificationAction) => void) {
  const handler = (event: MessageEvent<NotificationAction>) => listener(event.data)
  navigator.serviceWorker?.addEventListener('message', handler)
  return () => navigator.serviceWorker?.removeEventListener('message', handler)
}

// Immediate browser fallback while a server-side FCM sender is unavailable.
// It uses the existing bounded conversation listener and never exposes keys.
export function notifyIncomingMessage(title: string, body: string) {
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted' || !document.hidden) return
  void showActionNotification(title, { body, icon: '/icon-192.png', tag: 'cochat-message' })
}

export function notifyIncomingCall(name: string, callId: string, group = false) {
  if (!document.hidden) return
  void showActionNotification(group ? 'Incoming group call' : 'Incoming call', {
    body: `${name} is calling you`, icon: '/icon-192.png', tag: `cochat-call-${callId}`, requireInteraction: true,
    data: { type: 'call', callId }, actions: [{ action: 'answer-call', title: 'Answer' }, { action: 'decline-call', title: 'Decline' }],
  })
}

export function notifyStudyTimer(remainingSeconds: number, running: boolean) {
  const mins = Math.max(0, Math.ceil(remainingSeconds / 60))
  void showActionNotification(running ? 'Focus timer running' : 'Focus timer paused', {
    body: running ? `${mins} minute${mins === 1 ? '' : 's'} left` : 'Your session is paused', icon: '/icon-192.png', tag: 'cochat-study-timer',
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
  const config = new URLSearchParams({ apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '', authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '', projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '', messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '', appId: import.meta.env.VITE_FIREBASE_APP_ID || '' })
  const registration = await navigator.serviceWorker.register(`/firebase-messaging-sw.js?${config.toString()}`)
  notificationRegistration = registration
  const token = await getToken(messaging, { vapidKey, serviceWorkerRegistration: registration })
  if (!token) return false
  await setDoc(doc(db, 'users', auth.currentUser.uid, 'fcmTokens', token), { token, platform: 'web', updatedAt: serverTimestamp() }, { merge: true })
  onMessage(messaging, (payload) => {
    if (document.visibilityState === 'visible' || !payload.notification?.title) return
    new Notification(payload.notification.title, { body: payload.notification.body || '', icon: '/icon-192.png' })
  })
  return true
}
