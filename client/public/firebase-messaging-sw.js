importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js')

const config = Object.fromEntries(new URL(self.location.href).searchParams.entries())
firebase.initializeApp(config)

firebase.messaging().onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'Co-Chat'
  const type = payload.data?.type
  const options = { body: payload.notification?.body || 'You have a new update.', icon: '/icon-192.png', data: payload.data || {} }
  if (type === 'call') options.actions = [{ action: 'answer-call', title: 'Answer' }, { action: 'decline-call', title: 'Decline' }]
  if (type === 'study-timer') options.actions = payload.data?.running === 'true'
    ? [{ action: 'pause-timer', title: 'Pause' }, { action: 'finish-timer', title: 'Finish & save' }]
    : [{ action: 'resume-timer', title: 'Resume' }, { action: 'finish-timer', title: 'Finish & save' }]
  self.registration.showNotification(title, options)
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const message = { type: 'notification-action', action: event.action || 'open', tag: event.notification.tag, data: event.notification.data || {} }
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
    if (clients.length) return clients[0].postMessage(message)
    return self.clients.openWindow('/')
  }))
})
