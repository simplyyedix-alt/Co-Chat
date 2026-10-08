const internalSecret = Deno.env.get('INTERNAL_NOTIFICATIONS_SECRET') || ''
const projectId = Deno.env.get('FIREBASE_PROJECT_ID') || ''
const clientEmail = Deno.env.get('FIREBASE_CLIENT_EMAIL') || ''
const privateKey = (Deno.env.get('FIREBASE_PRIVATE_KEY') || '').replace(/\\n/g, '\n')

type PushRequest = { targetUids?: unknown; title?: unknown; body?: unknown; data?: unknown }
type FirestoreToken = { token: string; documentName: string }
let accessTokenCache: { value: string; expiresAt: number } | null = null

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
}

function base64Url(value: Uint8Array | string) {
  const bytes = typeof value === 'string' ? new TextEncoder().encode(value) : value
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function pemToArrayBuffer(pem: string) {
  const body = pem.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g, '')
  const binary = atob(body)
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index)
  return bytes.buffer
}

async function googleAccessToken() {
  if (accessTokenCache && accessTokenCache.expiresAt > Date.now() + 60_000) return accessTokenCache.value
  if (!projectId || !clientEmail || !privateKey) throw new Error('Firebase service-account secrets are not configured')
  const now = Math.floor(Date.now() / 1000)
  const unsigned = `${base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${base64Url(JSON.stringify({ iss: clientEmail, scope: 'https://www.googleapis.com/auth/firebase.messaging https://www.googleapis.com/auth/datastore', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }))}`
  const key = await crypto.subtle.importKey('pkcs8', pemToArrayBuffer(privateKey), { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign'])
  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(unsigned))
  const response = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${base64Url(new Uint8Array(signature))}` }) })
  const payload = await response.json().catch(() => null) as { access_token?: string; expires_in?: number } | null
  if (!response.ok || !payload?.access_token) throw new Error('Firebase OAuth token request failed')
  accessTokenCache = { value: payload.access_token, expiresAt: Date.now() + Math.max(60, Number(payload.expires_in || 3600) - 60) * 1000 }
  return accessTokenCache.value
}

async function tokensForUser(uid: string, accessToken: string): Promise<FirestoreToken[]> {
  const encodedUid = encodeURIComponent(uid)
  const response = await fetch(`https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents/users/${encodedUid}/fcmTokens`, { headers: { Authorization: `Bearer ${accessToken}` } })
  const payload = await response.json().catch(() => null) as { documents?: Array<{ name?: string; fields?: { token?: { stringValue?: string } } }> } | null
  if (!response.ok || !payload?.documents) return []
  return payload.documents.flatMap((document) => {
    const token = document.fields?.token?.stringValue
    return token && document.name ? [{ token, documentName: document.name }] : []
  })
}

async function sendToToken(token: string, title: string, body: string, data: Record<string, string>, accessToken: string) {
  const response = await fetch(`https://fcm.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/messages:send`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: { token, notification: { title, body }, data, android: { priority: 'HIGH', notification: { channel_id: 'cochat-general', sound: 'default', notification_priority: 'PRIORITY_HIGH' } } } }),
  })
  return { ok: response.ok, status: response.status }
}

Deno.serve(async (request) => {
  if (request.method !== 'POST') return json({ error: 'POST required' }, 405)
  if (!internalSecret || request.headers.get('x-internal-notifications-secret') !== internalSecret) return json({ error: 'Unauthorized' }, 401)
  try {
    const input = await request.json().catch(() => null) as PushRequest | null
    const targetUids = [...new Set(Array.isArray(input?.targetUids) ? input.targetUids.map(String).filter(Boolean).slice(0, 100) : [])]
    const title = String(input?.title || 'Co-Chat').slice(0, 100)
    const body = String(input?.body || 'You have a new message.').slice(0, 2000)
    const rawData = input?.data && typeof input.data === 'object' ? input.data as Record<string, unknown> : {}
    const data = Object.fromEntries(Object.entries(rawData).slice(0, 20).map(([key, value]) => [key.slice(0, 64), String(value).slice(0, 1024)]))
    if (!targetUids.length) return json({ sent: 0 })
    const accessToken = await googleAccessToken()
    const recipientTokens = (await Promise.all(targetUids.map((uid) => tokensForUser(uid, accessToken)))).flat()
    const outcomes = await Promise.all(recipientTokens.map((item) => sendToToken(item.token, title, body, data, accessToken)))
    return json({ sent: outcomes.filter((result) => result.ok).length, attempted: outcomes.length })
  } catch (error) {
    console.error('FCM notification delivery failed', error instanceof Error ? error.message : 'unknown error')
    return json({ error: 'Notification delivery failed' }, 500)
  }
})
