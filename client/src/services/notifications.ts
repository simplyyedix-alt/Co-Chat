import { Capacitor } from '@capacitor/core'
import { LocalNotifications } from '@capacitor/local-notifications'
import { PushNotifications } from '@capacitor/push-notifications'
import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { app, auth, db } from '../firebase'

let notificationRegistration: ServiceWorkerRegistration | null = null
let nativeListenersReady = false
let nativeActionsReady = false
let webMessageListenerReady = false
let localNotificationId = 10_000
let nativeRegistrationPromise: Promise<boolean> | null = null
const recentNotificationKeys = new Map<string, number>()
type NotificationAction = { action: string; tag?: string; data?: Record<string, unknown> }
type ActionButton = { action: string; title: string }
type NativeNotificationData = Record<string, unknown>
const actionListeners = new Set<(event: NotificationAction) => void>()
const isNativeAndroid = () => Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android'
const emitAction = (event: NotificationAction) => actionListeners.forEach((listener) => listener(event))

function assetUrl(name: string) { return new URL(name, document.baseURI).toString() }
function messagingConfig() {
  return new URLSearchParams({ apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '', authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '', projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '', messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '', appId: import.meta.env.VITE_FIREBASE_APP_ID || '' })
}
async function getNotificationServiceWorker() {
  if (!('serviceWorker' in navigator)) return null
  if (notificationRegistration) return notificationRegistration
  const scriptUrl = new URL('firebase-messaging-sw.js', document.baseURI)
  try { scriptUrl.search = messagingConfig().toString(); notificationRegistration = await navigator.serviceWorker.register(scriptUrl.toString()); return notificationRegistration } catch { return null }
}
async function showWebNotification(title: string, options: NotificationOptions & { actions?: ActionButton[]; data?: Record<string, unknown> }) {
  if (typeof Notification === 'undefined') return false
  try {
    if (Notification.permission === 'default' && await Notification.requestPermission() !== 'granted') return false
    if (Notification.permission !== 'granted') return false
    const serviceWorker = await getNotificationServiceWorker()
    if (serviceWorker) { await serviceWorker.showNotification(title, options); return true }
    const fallback = new Notification(title, { body: options.body, icon: options.icon, tag: options.tag })
    window.setTimeout(() => fallback.close(), 8000)
    return true
  } catch { return false }
}
function asData(value: unknown): NativeNotificationData { return value && typeof value === 'object' ? value as NativeNotificationData : {} }
async function ensureNativeListeners() {
  if (!isNativeAndroid() || nativeListenersReady) return
  nativeListenersReady = true
  await PushNotifications.addListener('pushNotificationActionPerformed', ({ actionId, notification }) => {
    emitAction({ action: actionId === 'tap' ? 'open' : actionId, tag: notification.tag, data: asData(notification.data) })
  })
  await PushNotifications.addListener('pushNotificationReceived', (notification) => {
    // Capacitor does not display remote FCM notifications while the WebView
    // is in the foreground. Bridge that event to the same local notification
    // path used by messages and calls so foreground and background behavior
    // match.
    const data = asData(notification.data)
    const type = typeof data.type === 'string' ? data.type : ''
    const title = notification.title || (type === 'message' ? 'New Co-Chat message' : 'Co-Chat')
    const body = notification.body || ''
    if (!body) return
    if (type === 'message') {
      const key = typeof data.messageId === 'string' && data.messageId
        ? `${data.conversationId || title}:${data.messageAt || data.messageId}`
        : `${data.conversationId || title}:${body}`
      notifyIncomingMessage(title, body, key)
      return
    }
    const tag = typeof data.messageId === 'string'
      ? `cochat-message-${data.messageId}`
      : typeof data.callId === 'string'
        ? `cochat-call-${data.callId}`
        : `cochat-push-${Date.now()}`
    if (!displayOnce(`${type}:${tag}:${body}`)) return
    if (type === 'call') {
      void showNativeNotification(title, body, { tag, data, actionTypeId: 'cochat-call-actions', ongoing: true })
    } else {
      void showNativeNotification(title, body, { tag, data })
    }
  })
  await LocalNotifications.addListener('localNotificationActionPerformed', ({ actionId, notification }) => {
    const data = asData(notification.extra)
    emitAction({ action: actionId === 'tap' ? 'open' : actionId, tag: typeof data.tag === 'string' ? data.tag : undefined, data })
  })
}
async function ensureNativeNotifications() {
  if (!isNativeAndroid()) return false
  await ensureNativeListeners()
  const permission = await LocalNotifications.checkPermissions()
  const granted = permission.display === 'granted' ? permission : await LocalNotifications.requestPermissions()
  if (granted.display !== 'granted') return false
  await LocalNotifications.createChannel({ id: 'cochat-general', name: 'Co-Chat updates', description: 'Messages, calls, and focus timer updates', importance: 4, visibility: 1, vibration: true })
  if (!nativeActionsReady) {
    nativeActionsReady = true
    await LocalNotifications.registerActionTypes({ types: [
      { id: 'cochat-call-actions', actions: [{ id: 'answer-call', title: 'Answer' }, { id: 'decline-call', title: 'Decline' }] },
      { id: 'cochat-timer-running-actions', actions: [{ id: 'pause-timer', title: 'Pause' }, { id: 'finish-timer', title: 'Finish & save' }] },
      { id: 'cochat-timer-paused-actions', actions: [{ id: 'resume-timer', title: 'Resume' }, { id: 'finish-timer', title: 'Finish & save' }] },
    ] })
  }
  return true
}
async function showNativeNotification(title: string, body: string, options: { tag: string; data?: NativeNotificationData; actionTypeId?: string; ongoing?: boolean }) {
  if (!(await ensureNativeNotifications())) return false
  const id = options.tag === 'cochat-study-timer' ? 10_001 : localNotificationId++
  await LocalNotifications.schedule({ notifications: [{ id, title, body, largeBody: body, channelId: 'cochat-general', smallIcon: 'ic_stat_cochat', actionTypeId: options.actionTypeId, ongoing: options.ongoing, autoCancel: !options.ongoing, extra: { ...options.data, tag: options.tag } }] })
  return true
}
export function listenNotificationActions(listener: (event: NotificationAction) => void) {
  actionListeners.add(listener)
  const webHandler = (event: MessageEvent<NotificationAction | undefined>) => { if (event.data && typeof event.data === 'object') listener(event.data) }
  navigator.serviceWorker?.addEventListener('message', webHandler)
  void ensureNativeListeners()
  return () => { actionListeners.delete(listener); navigator.serviceWorker?.removeEventListener('message', webHandler) }
}
function displayOnce(key: string) {
  const now = Date.now()
  for (const [existing, at] of recentNotificationKeys) if (now - at > 45_000) recentNotificationKeys.delete(existing)
  if (recentNotificationKeys.has(key)) return false
  recentNotificationKeys.set(key, now)
  return true
}
export function notifyIncomingMessage(title: string, body: string, dedupeKey = `${title}:${body}`) {
  if (!displayOnce(dedupeKey)) return
  if (isNativeAndroid()) { void showNativeNotification(title, body, { tag: `cochat-message-${dedupeKey}`, data: { type: 'message' } }); return }
  // Each message gets its own tag. Reusing one tag makes browsers replace the
  // previous notification, which looked like missed messages to users.
  const tag = `cochat-message-${dedupeKey}`.slice(0, 180)
  void showWebNotification(title, { body, icon: assetUrl('icon-192.png'), tag })
}
export function notifyIncomingCall(name: string, callId: string, group = false) {
  const title = group ? 'Incoming group call' : 'Incoming call'; const body = `${name} is calling you`
  if (isNativeAndroid()) { void showNativeNotification(title, body, { tag: `cochat-call-${callId}`, data: { type: 'call', callId }, actionTypeId: 'cochat-call-actions', ongoing: true }); return }
  void showWebNotification(title, { body, icon: assetUrl('icon-192.png'), tag: `cochat-call-${callId}`, requireInteraction: true, data: { type: 'call', callId }, actions: [{ action: 'answer-call', title: 'Answer' }, { action: 'decline-call', title: 'Decline' }] })
}
export function notifyStudyTimer(remainingSeconds: number, running: boolean) {
  const mins = Math.max(0, Math.ceil(remainingSeconds / 60)); const title = running ? 'Focus timer running' : 'Focus timer paused'; const body = running ? `${mins} minute${mins === 1 ? '' : 's'} left` : 'Your session is paused'
  if (isNativeAndroid()) { void showNativeNotification(title, body, { tag: 'cochat-study-timer', data: { type: 'study-timer' }, actionTypeId: running ? 'cochat-timer-running-actions' : 'cochat-timer-paused-actions', ongoing: running }); return }
  void showWebNotification(title, { body, icon: assetUrl('icon-192.png'), tag: 'cochat-study-timer', requireInteraction: running, data: { type: 'study-timer' }, actions: running ? [{ action: 'pause-timer', title: 'Pause' }, { action: 'finish-timer', title: 'Finish & save' }] : [{ action: 'resume-timer', title: 'Resume' }, { action: 'finish-timer', title: 'Finish & save' }] })
}
export function clearStudyTimerNotification() {
  if (isNativeAndroid()) {
    void LocalNotifications.getDeliveredNotifications()
      .then(({ notifications }) => LocalNotifications.removeDeliveredNotifications({ notifications: notifications.filter((item) => item.id === 10_001) }))
      .catch(() => undefined)
    return
  }
  void navigator.serviceWorker?.ready.then((registration) => registration.getNotifications({ tag: 'cochat-study-timer' }).then((items) => items.forEach((item) => item.close()))).catch(() => undefined)
}
async function saveToken(token: string, platform: 'web' | 'android') {
  if (!auth?.currentUser || !db) return false
  await setDoc(doc(db, 'users', auth.currentUser.uid, 'fcmTokens', platform === 'android' ? encodeURIComponent(token) : token), { token, platform, updatedAt: serverTimestamp() }, { merge: true })
  return true
}
export async function registerFcmNotifications(enabled = true) {
  if (!enabled || !app || !auth?.currentUser || !db) return false
  if (isNativeAndroid()) {
    if (!(await ensureNativeNotifications())) return false
    const permission = await PushNotifications.checkPermissions(); const granted = permission.receive === 'granted' ? permission : await PushNotifications.requestPermissions()
    if (granted.receive !== 'granted') return false
    await ensureNativeListeners()
    if (nativeRegistrationPromise) return nativeRegistrationPromise
    nativeRegistrationPromise = new Promise<boolean>((resolve) => {
      let settled = false; const settle = (value: boolean) => { if (!settled) { settled = true; resolve(value) } }
      void PushNotifications.addListener('registration', ({ value }) => { void saveToken(value, 'android').then(settle).catch(() => settle(false)) })
      void PushNotifications.addListener('registrationError', () => settle(false))
      void PushNotifications.register().catch(() => settle(false))
      window.setTimeout(() => settle(false), 15_000)
    })
    const registration = nativeRegistrationPromise
    return registration.then((registered) => {
      // A transient WebView/plugin failure should be retryable when the user
      // toggles notifications back on or reopens the app.
      if (!registered) nativeRegistrationPromise = null
      return registered
    })
  }
  const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY || ''
  if (!vapidKey || typeof Notification === 'undefined' || !(await isSupported()) || Notification.permission === 'denied') return false
  const permission = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission()
  if (permission !== 'granted') return false
  const messaging = getMessaging(app); const registration = await getNotificationServiceWorker()
  if (!registration) return false
  const token = await getToken(messaging, { vapidKey, serviceWorkerRegistration: registration })
  if (!token || !(await saveToken(token, 'web'))) return false
  if (!webMessageListenerReady) {
    webMessageListenerReady = true
    onMessage(messaging, (payload) => {
      if (document.visibilityState !== 'visible' && payload.notification?.title) {
        const messageId = typeof payload.data?.messageId === 'string' ? payload.data.messageId : `${Date.now()}`
        void showWebNotification(payload.notification.title, { body: payload.notification.body || '', icon: assetUrl('icon-192.png'), tag: `cochat-message-${messageId}` })
      }
    })
  }
  return true
}
