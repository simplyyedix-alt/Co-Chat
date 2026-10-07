importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js')

const config = Object.fromEntries(new URL(self.location.href).searchParams.entries())
firebase.initializeApp(config)

firebase.messaging().onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'Co-Chat'
  self.registration.showNotification(title, { body: payload.notification?.body || 'You have a new update.', icon: '/icon-192.png' })
})
