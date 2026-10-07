const configuredOrigin = Deno.env.get('APP_ORIGIN') || '*'
const allowedOrigin = configuredOrigin === '*' ? '*' : (() => {
  try { return new URL(configuredOrigin).origin } catch { return configuredOrigin.replace(/\/$/, '') }
})()
const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function response(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
}

async function verifyFirebaseToken(request: Request) {
  const header = request.headers.get('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : ''
  const apiKey = Deno.env.get('FIREBASE_WEB_API_KEY') || ''
  if (!token || !apiKey) return null
  const result = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken: token }),
  })
  if (!result.ok) return null
  const payload = await result.json() as { users?: Array<{ localId?: string; email?: string; displayName?: string; photoUrl?: string }> }
  const user = payload.users?.[0]
  return user?.localId ? { uid: user.localId, email: user.email || '', displayName: user.displayName || '', photoURL: user.photoUrl || '' } : null
}

async function rest(path: string, init: RequestInit = {}) {
  const base = Deno.env.get('SUPABASE_URL') || ''
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
  if (!base || !key) throw new Error('Missing Supabase server configuration')
  const result = await fetch(`${base}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...(init.headers || {}) },
  })
  const body = await result.json().catch(() => null)
  if (!result.ok) throw new Error(typeof body?.message === 'string' ? body.message : `Database request failed (${result.status})`)
  return body
}

async function member(conversationId: string, uid: string) {
  const rows = await rest(`conversation_members?conversation_id=eq.${encodeURIComponent(conversationId)}&uid=eq.${encodeURIComponent(uid)}&select=conversation_id,uid,hidden_at,unread_count,read_at`)
  return Array.isArray(rows) && rows.length > 0
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (request.method !== 'POST') return response({ error: 'POST required' }, 405)
  const user = await verifyFirebaseToken(request)
  if (!user) return response({ error: 'Invalid Firebase identity token' }, 401)

  try {
    const body = await request.json().catch(() => null) as Record<string, unknown> | null
    const action = String(body?.action || '')
    if (action === 'profile-upsert') {
      await rest('profiles', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify({ uid: user.uid, display_name: String(body?.displayName || user.displayName || 'Co-Chat member').slice(0, 100), email: user.email, photo_url: user.photoURL, username: String(body?.username || user.email.split('@')[0] || user.uid.slice(0, 8)).toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 24) || `user_${user.uid.slice(0, 8)}`, bio: String(body?.bio || '').slice(0, 280), updated_at: new Date().toISOString() }) })
      return response({ ok: true })
    }
    if (action === 'profile') {
      const rows = await rest(`profiles?uid=eq.${encodeURIComponent(String(body?.uid || user.uid))}&limit=1`)
      return response({ profile: rows?.[0] || null })
    }
    if (action === 'conversations') {
      const rows = await rest(`conversation_members?uid=eq.${encodeURIComponent(user.uid)}&select=conversation_id,hidden_at,unread_count,read_at,conversations(id,type,name,admin_id,created_by,last_message,last_sender_id,last_message_at,created_at)&order=joined_at.desc`)
      return response({ items: rows || [] })
    }
    if (action === 'messages') {
      const conversationId = String(body?.conversationId || '')
      if (!conversationId || !(await member(conversationId, user.uid))) return response({ error: 'Conversation access denied' }, 403)
      const rows = await rest(`messages?conversation_id=eq.${encodeURIComponent(conversationId)}&select=id,conversation_id,sender_id,text,attachment,reply_to,seen_by,hidden_for,created_at&order=created_at.desc&limit=50`)
      return response({ items: (rows || []).reverse() })
    }
    if (action === 'send-message') {
      const conversationId = String(body?.conversationId || '')
      const text = String(body?.text || '').trim()
      if (!conversationId || !(await member(conversationId, user.uid))) return response({ error: 'Conversation access denied' }, 403)
      if (!text && !body?.attachment) return response({ error: 'Message cannot be empty' }, 400)
      if (text.length > 2000) return response({ error: 'Messages must be 2,000 characters or fewer' }, 400)
      const rows = await rest('messages', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ conversation_id: conversationId, sender_id: user.uid, text, attachment: body?.attachment || null, reply_to: body?.replyTo || null, seen_by: [user.uid] }) })
      const members = await rest(`conversation_members?conversation_id=eq.${encodeURIComponent(conversationId)}&select=uid,unread_count`)
      for (const item of members || []) if (item.uid !== user.uid) await rest(`conversation_members?conversation_id=eq.${encodeURIComponent(conversationId)}&uid=eq.${encodeURIComponent(item.uid)}`, { method: 'PATCH', body: JSON.stringify({ unread_count: Number(item.unread_count || 0) + 1 }) })
      await rest(`conversations?id=eq.${encodeURIComponent(conversationId)}`, { method: 'PATCH', body: JSON.stringify({ last_message: text || '📎 Attachment', last_sender_id: user.uid, last_message_at: new Date().toISOString() }) })
      return response({ message: rows?.[0] || null })
    }
    return response({ error: 'Unsupported action' }, 400)
  } catch (error) {
    console.error(error)
    return response({ error: error instanceof Error ? error.message : 'Chat operation failed' }, 400)
  }
})
