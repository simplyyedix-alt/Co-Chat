import { Capacitor, type PluginListenerHandle } from '@capacitor/core'
import { PushNotifications } from '@capacitor/push-notifications'
import { arrayUnion, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

let activeUid = ''
let listeners: PluginListenerHandle[] = []

/** Register this Android installation for background FCM notifications. */
export async function startPushNotifications(uid: string) {
  if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android' || !db || activeUid === uid) return
  activeUid = uid
  const firestore = db
  try {
    listeners.push(await PushNotifications.addListener('registration', async ({ value }) => {
      await setDoc(doc(firestore, 'users', uid), { pushTokens: arrayUnion(value) }, { merge: true })
    }))
    // Intentionally do nothing in the foreground; Android displays notification
    // payloads when the app is backgrounded or closed.
    listeners.push(await PushNotifications.addListener('pushNotificationReceived', () => undefined))
    listeners.push(await PushNotifications.addListener('registrationError', () => undefined))
    const permission = await PushNotifications.checkPermissions()
    if (permission.receive !== 'granted') {
      const requested = await PushNotifications.requestPermissions()
      if (requested.receive !== 'granted') return
    }
    await PushNotifications.register()
  } catch {
    // Push is optional until google-services.json is installed.
  }
}

export async function stopPushNotifications() {
  await Promise.all(listeners.map(listener => listener.remove()))
  listeners = []
  activeUid = ''
}
