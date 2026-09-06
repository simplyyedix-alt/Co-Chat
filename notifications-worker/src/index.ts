interface Env {
  FIREBASE_PROJECT_ID: string
  FIREBASE_WEB_API_KEY: string
  FIREBASE_CLIENT_EMAIL: string
  FIREBASE_PRIVATE_KEY: string
}

type Payload = { tokens?: string[]; title?: string; body?: string; data?: Record<string, string> }

const json = (value: unknown, status = 200) => new Response(JSON.stringify(value), { status, headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*', 'access-control-allow-headers': 'content-type, authorization', 'access-control-allow-methods': 'POST, OPTIONS' } })

function base64Url(bytes: ArrayBuffer | Uint8Array) { const value = typeof bytes === 'object' && 'byteLength' in bytes ? String.fromCharCode(...new Uint8Array(bytes as ArrayBuffer)) : ''; return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') }
function pemToBytes(pem: string) { const clean = pem.replace(/-----[^-]+-----/g, '').replace(/\s/g, ''); const binary = atob(clean); return Uint8Array.from(binary, char => char.charCodeAt(0)) }

async function accessToken(env: Env) {
  const now = Math.floor(Date.now() / 1000)
  const header = base64Url(new TextEncoder().encode(JSON.stringify({ alg: 'RS256', typ: 'JWT' })))
  const claim = base64Url(new TextEncoder().encode(JSON.stringify({ iss: env.FIREBASE_CLIENT_EMAIL, scope: 'https://www.googleapis.com/auth/firebase.messaging', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 })))
  const key = await crypto.subtle.importKey('pkcs8', pemToBytes(env.FIREBASE_PRIVATE_KEY), { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign'])
  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(`${header}.${claim}`))
  const response = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${header}.${claim}.${base64Url(signature)}` })
  if (!response.ok) throw new Error('Unable to authorize FCM')
  return String((await response.json() as { access_token?: string }).access_token || '')
}

export default { async fetch(request: Request, env: Env) {
  if (request.method === 'OPTIONS') return json({ ok: true })
  if (request.method !== 'POST') return json({ error: 'POST required' }, 405)
  const authorization = request.headers.get('authorization') || ''
  if (!authorization.startsWith('Bearer ')) return json({ error: 'Authentication required' }, 401)
  const authCheck = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_WEB_API_KEY}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ idToken: authorization.slice(7) }) })
  if (!authCheck.ok) return json({ error: 'Invalid authentication' }, 401)
  let payload: Payload
  try { payload = await request.json() as Payload } catch { return json({ error: 'Invalid JSON' }, 400) }
  const tokens = [...new Set((payload.tokens || []).filter(token => typeof token === 'string' && token.length > 20))].slice(0, 100)
  if (!tokens.length || !payload.title || !payload.body) return json({ error: 'tokens, title and body are required' }, 400)
  try {
    const token = await accessToken(env)
    const results = await Promise.all(tokens.map(async deviceToken => {
      const response = await fetch(`https://fcm.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/messages:send`, { method: 'POST', headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' }, body: JSON.stringify({ message: { token: deviceToken, notification: { title: payload.title, body: payload.body }, data: payload.data || {}, android: { priority: 'high', notification: { channel_id: 'cochat' } } } }) })
      return response.ok
    }))
    return json({ sent: results.filter(Boolean).length, total: tokens.length })
  } catch { return json({ error: 'Notification delivery failed' }, 502) }
} }
