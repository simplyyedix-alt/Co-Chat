import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { app, auth, db } from '../firebase'

export async function registerFcmNotifications(enabled = true) {
  const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY || ''
  if (!enabled || !app || !auth?.currentUser || !db || !vapidKey || typeof Notification === 'undefined') return false
  if (!(await isSupported()) || Notification.permission === 'denied') return false
  const permission = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission()
  if (permission !== 'granted') return false
  const messaging = getMessaging(app)
  const config = new URLSearchParams({ apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '', authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '', projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '', messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '', appId: import.meta.env.VITE_FIREBASE_APP_ID || '' })
  const registration = await navigator.serviceWorker.register(`/firebase-messaging-sw.js?${config.toString()}`)
  const token = await getToken(messaging, { vapidKey, serviceWorkerRegistration: registration })
  if (!token) return false
  await setDoc(doc(db, 'users', auth.currentUser.uid, 'fcmTokens', token), { token, platform: 'web', updatedAt: serverTimestamp() }, { merge: true })
  onMessage(messaging, (payload) => {
    if (document.visibilityState === 'visible' || !payload.notification?.title) return
    new Notification(payload.notification.title, { body: payload.notification.body || '', icon: '/icon-192.png' })
  })
  return true
}
