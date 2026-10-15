// Combined Cloudflare Worker for Co-Chat chat-api and FCM notifications.
// Configure these Worker secrets: APP_ORIGIN, FIREBASE_WEB_API_KEY, SUPABASE_URL,
// SUPABASE_SERVICE_ROLE_KEY, INTERNAL_NOTIFICATIONS_SECRET, FIREBASE_PROJECT_ID,
// FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, and FCM_WORKER_URL (this Worker URL + /fcm).
type WorkerEnv = Record<string, string | undefined>
let workerEnv: WorkerEnv = {}
let workerContext: ExecutionContext | null = null
const Deno = { env: { get: (name: string) => workerEnv[name] || '' } }

const configuredOrigin = Deno.env.get('APP_ORIGIN') || '*'
const allowedOrigin = configuredOrigin === '*' ? '*' : (() => {
  try { return new URL(configuredOrigin).origin } catch { return configuredOrigin.replace(/\/$/, '') }
})()
const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// Supabase's new sb_secret_* keys are API keys, not JWT bearer tokens.
// Legacy service_role JWTs still need the Authorization header.
function serverKeyHeaders(key: string) {
  return { apikey: key, ...(key.startsWith('sb_') ? {} : { Authorization: `Bearer ${key}` }) }
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
    headers: { ...serverKeyHeaders(key), 'Content-Type': 'application/json', ...(init.headers || {}) },
  })
  const body = await result.json().catch(() => null)
  if (!result.ok) throw new Error(typeof body?.message === 'string' ? body.message : `Database request failed (${result.status})`)
  return body
}

async function broadcastChatMessage(conversationId: string, payload: Record<string, unknown>) {
  const base = Deno.env.get('SUPABASE_URL') || ''
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
  if (!base || !key) return
  const topic = encodeURIComponent(`chat-messages:${conversationId}`)
  await fetch(`${base}/realtime/v1/api/broadcast/${topic}/events/message`, {
    method: 'POST',
    headers: { ...serverKeyHeaders(key), 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

async function broadcastConversationChange(memberUids: string[], payload: Record<string, unknown>) {
  const base = Deno.env.get('SUPABASE_URL') || ''
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
  if (!base || !key) return
  await Promise.all(memberUids.filter(Boolean).flatMap((uid) => [`chat-conversation-list:${uid}`, `chat-conversations:${uid}`]).map((topic) => fetch(`${base}/realtime/v1/api/broadcast/${encodeURIComponent(topic)}/events/conversation`, {
    method: 'POST',
    headers: { ...serverKeyHeaders(key), 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })))
}

async function member(conversationId: string, uid: string) {
  const rows = await rest(`conversation_members?conversation_id=eq.${encodeURIComponent(conversationId)}&uid=eq.${encodeURIComponent(uid)}&select=conversation_id,uid,hidden_at,unread_count,read_at`)
  return Array.isArray(rows) && rows.length > 0
}

async function notifyMessageRecipients(targetUids: string[], senderName: string, message: string, conversationId: string, messageId: string, messageAt: string, extraData: Record<string, string> = {}) {
  const base = Deno.env.get('SUPABASE_URL') || ''
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
  const secret = Deno.env.get('INTERNAL_NOTIFICATIONS_SECRET') || ''
  if (!base || !serviceKey || !secret || !targetUids.length) return
  const configuredFcmUrl = Deno.env.get('FCM_WORKER_URL') || ''
  // Accept either the Worker root URL or its explicit /fcm endpoint. This
  // avoids silently POSTing notifications to the chat health endpoint when a
  // secret was entered without the suffix.
  const fcmUrl = configuredFcmUrl
    ? (configuredFcmUrl.includes('workers.dev') && !configuredFcmUrl.replace(/\/$/, '').endsWith('/fcm')
      ? `${configuredFcmUrl.replace(/\/$/, '')}/fcm`
      : configuredFcmUrl)
    : `${base}/functions/v1/fcm-notifications`
  const result = await fetch(fcmUrl, {
    method: 'POST',
    headers: { ...serverKeyHeaders(serviceKey), 'Content-Type': 'application/json', 'x-internal-notifications-secret': secret },
    body: JSON.stringify({ targetUids, title: senderName || 'New Co-Chat message', body: message || '📎 Attachment', data: { type: 'message', conversationId, messageId, messageAt, ...extraData } }),
  })
  if (!result.ok) console.error('FCM relay rejected notification', result.status, (await result.text().catch(() => '')).slice(0, 500))
}

// Supabase Edge Functions can keep non-critical work alive after the HTTP
// response is sent. This keeps message acknowledgement fast while still
// allowing FCM and conversation-summary updates to finish reliably.
function runInBackground(task: Promise<unknown>) {
  const safeTask = task.catch(() => undefined)
  if (workerContext) workerContext.waitUntil(safeTask)
  else void safeTask
}

async function handleChat(request: Request) {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (request.method === 'GET') return response({ ok: true, service: 'Co-Chat API', message: 'Worker is online', endpoints: ['POST /', 'POST /fcm'] })
  if (request.method !== 'POST') return response({ error: 'POST required' }, 405)
  const user = await verifyFirebaseToken(request)
  if (!user) return response({ error: 'Invalid Firebase identity token' }, 401)

  try {
    const body = await request.json().catch(() => null) as Record<string, unknown> | null
    const action = String(body?.action || '')
    if (action === 'profile-upsert') {
      await rest('profiles', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify({ uid: user.uid, display_name: String(body?.displayName || user.displayName || 'Co-Chat member').slice(0, 100), email: String(body?.email || user.email || ''), photo_url: String(body?.photoURL || user.photoURL || ''), username: String(body?.username || '').toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 24) || `user_${user.uid.slice(0, 8)}`, bio: String(body?.bio || '').slice(0, 280), notifications_enabled: body?.notificationsEnabled !== false, discoverable: body?.discoverable !== false, active_status: body?.activeStatus !== false, last_seen: new Date().toISOString(), updated_at: new Date().toISOString() }) })
      return response({ ok: true })
    }
    if (action === 'presence') {
      await rest(`profiles?uid=eq.${encodeURIComponent(user.uid)}`, { method: 'PATCH', body: JSON.stringify({ active_status: body?.activeStatus !== false, last_seen: new Date().toISOString(), updated_at: new Date().toISOString() }) })
      return response({ ok: true })
    }
    if (action === 'friends') {
      const friendships = await rest(`friendships?or=(member_a.eq.${encodeURIComponent(user.uid)},member_b.eq.${encodeURIComponent(user.uid)})&status=eq.accepted&select=member_a,member_b&limit=100`)
      const ids = [...new Set((friendships || []).flatMap((item: Record<string, unknown>) => [String(item.member_a || ''), String(item.member_b || '')].filter((id: string) => id && id !== user.uid)))]
      const profiles = ids.length ? await rest(`profiles?uid=in.(${ids.map((id: string) => encodeURIComponent(id)).join(',')})&select=uid,display_name,email,username,photo_url,bio,notifications_enabled,discoverable,active_status,last_seen`) : []
      return response({ profiles: profiles || [] })
    }
    if (action === 'study-save') {
      const seconds = Math.max(0, Math.min(86400, Math.floor(Number(body?.seconds || 0))))
      const weekKey = String(body?.weekKey || '')
      const studyDay = String(body?.studyDay || '').match(/^\d{4}-\d{2}-\d{2}$/) ? String(body?.studyDay) : new Date().toISOString().slice(0, 10)
      const rows = await rest(`profiles?uid=eq.${encodeURIComponent(user.uid)}&select=total_study_seconds,weekly_study_seconds,study_week_key,study_days&limit=1`)
      const current = rows?.[0] || {}
      const total = Number(current.total_study_seconds || 0) + seconds
      const weekly = String(current.study_week_key || '') === weekKey ? Number(current.weekly_study_seconds || 0) + seconds : seconds
      const existingDays = Array.isArray(current.study_days) ? current.study_days.map(String).filter((day: string) => /^\d{4}-\d{2}-\d{2}$/.test(day)) : []
      const studyDays = [...new Set([...existingDays, studyDay])].sort().slice(-730)
      await rest(`profiles?uid=eq.${encodeURIComponent(user.uid)}`, { method: 'PATCH', body: JSON.stringify({ total_study_seconds: total, weekly_study_seconds: weekly, study_week_key: weekKey, study_days: studyDays, updated_at: new Date().toISOString() }) })
      return response({ ok: true, totalSeconds: total, weeklySeconds: weekly, weekKey, studyDays })
    }
    if (action === 'study-stats') {
      const weekKey = String(body?.weekKey || '')
      const rows = await rest(`profiles?uid=eq.${encodeURIComponent(user.uid)}&select=total_study_seconds,weekly_study_seconds,study_week_key,study_days&limit=1`)
      const current = rows?.[0] || {}
      return response({ totalSeconds: Number(current.total_study_seconds || 0), weeklySeconds: String(current.study_week_key || '') === weekKey ? Number(current.weekly_study_seconds || 0) : 0, weekKey: String(current.study_week_key || weekKey), studyDays: Array.isArray(current.study_days) ? current.study_days.map(String).filter((day: string) => /^\d{4}-\d{2}-\d{2}$/.test(day)) : [] })
    }
    if (action === 'study-presence') {
      const active = body?.active === true
      const label = String(body?.label || '').slice(0, 120)
      await rest(`profiles?uid=eq.${encodeURIComponent(user.uid)}`, { method: 'PATCH', body: JSON.stringify({ study_active_until: active ? new Date(Date.now() + 90000).toISOString() : null, study_label: active ? label : '', last_seen: new Date().toISOString(), updated_at: new Date().toISOString() }) })
      return response({ ok: true })
    }
    if (action === 'study-leaderboard') {
      const mode = body?.mode === 'public' ? 'public' : 'friends'
      const requested = Array.isArray(body?.uids) ? body.uids.map(String).filter(Boolean).slice(0, 50) : []
      const uids = mode === 'friends' ? [...new Set([user.uid, ...requested])] : []
      const filter = uids.length ? `&uid=in.(${uids.map((uid) => encodeURIComponent(uid)).join(',')})` : ''
      const weekKey = String(body?.weekKey || '')
      // Apply the requested week before ranking. Fetch enough profiles first;
      // ordering by the stored weekly value would otherwise let last week's
      // leaders consume the limit and hide current-week participants.
      const rows = await rest(`profiles?select=uid,display_name,username,photo_url,weekly_study_seconds,total_study_seconds,study_week_key,study_active_until,study_label${filter}&limit=500`)
      const items = (rows || []).map((item: Record<string, unknown>) => ({
        uid: String(item.uid || ''), displayName: String(item.display_name || 'Co-Chat member'), username: String(item.username || ''), photoURL: String(item.photo_url || ''),
        weeklySeconds: String(item.study_week_key || '') === weekKey ? Number(item.weekly_study_seconds || 0) : 0,
        totalSeconds: Number(item.total_study_seconds || 0), active: Boolean(item.study_active_until && new Date(String(item.study_active_until)).getTime() > Date.now()), label: String(item.study_label || ''),
      })).sort((a, b) => b.weeklySeconds - a.weeklySeconds || b.totalSeconds - a.totalSeconds)
      return response({ items })
    }
    if (action === 'profile') {
      const rows = await rest(`profiles?uid=eq.${encodeURIComponent(String(body?.uid || user.uid))}&limit=1`)
      return response({ profile: rows?.[0] || null })
    }
    if (action === 'conversations') {
      // Do not rely on PostgREST's nested relationship metadata here. Older
      // migrated projects may have the FK but not the cached relationship,
      // which makes the nested select fail and leaves navigation empty.
      const rows = await rest(`conversation_members?uid=eq.${encodeURIComponent(user.uid)}&select=conversation_id,hidden_at,unread_count,read_at&order=joined_at.desc`)
      const conversationIds = (rows || []).map((item: Record<string, unknown>) => String(item.conversation_id || '')).filter(Boolean)
      const conversations = conversationIds.length
        ? await rest(`conversations?id=in.(${conversationIds.map((id: string) => encodeURIComponent(id)).join(',')})&select=id,type,name,photo_url,admin_id,created_by,last_message,last_sender_id,last_message_at,created_at`)
        : []
      const conversationById = new Map((conversations || []).map((item: Record<string, unknown>) => [String(item.id || ''), item]))
      const members = conversationIds.length
        ? await rest(`conversation_members?conversation_id=in.(${conversationIds.map((id: string) => encodeURIComponent(id)).join(',')})&select=conversation_id,uid`)
        : []
      const membersByConversation = new Map<string, Array<Record<string, unknown>>>()
      for (const member of members || []) {
        const conversationId = String(member.conversation_id || '')
        const list = membersByConversation.get(conversationId) || []
        list.push(member)
        membersByConversation.set(conversationId, list)
      }
      const otherUids = [...new Set((members || []).map((member: Record<string, unknown>) => String(member.uid || '')).filter((uid: string) => uid && uid !== user.uid))]
      const profiles = otherUids.length
        ? await rest(`profiles?uid=in.(${otherUids.map((uid: string) => encodeURIComponent(uid)).join(',')})&select=uid,display_name,email,username,photo_url,bio,notifications_enabled,discoverable,active_status,last_seen`)
        : []
      const profileByUid = new Map((profiles || []).map((profile: Record<string, unknown>) => [String(profile.uid || ''), profile]))
      const items = (rows || []).map((item: Record<string, unknown>) => {
        const conversationId = String(item.conversation_id || '')
        const memberIds = membersByConversation.get(conversationId) || []
        const otherUid = memberIds.map((member) => String(member.uid || '')).find((uid: string) => uid && uid !== user.uid)
        return { ...item, conversations: conversationById.get(conversationId) || null, member_ids: memberIds, other_profile: otherUid ? profileByUid.get(otherUid) || null : null }
      })
      return response({ items })
    }
    if (action === 'create-direct') {
      const otherUid = String(body?.otherUid || '')
      const name = String(body?.name || 'Conversation').slice(0, 100)
      if (!otherUid || otherUid === user.uid) return response({ error: 'A different user is required' }, 400)
      const memberships = await rest(`conversation_members?uid=eq.${encodeURIComponent(user.uid)}&select=conversation_id`)
      for (const membership of memberships || []) {
        const conversationId = String(membership.conversation_id || '')
        if (!conversationId) continue
        const conversation = await rest(`conversations?id=eq.${encodeURIComponent(conversationId)}&type=eq.direct&select=id&limit=1`)
        if (!conversation?.[0]) continue
        const members = await rest(`conversation_members?conversation_id=eq.${encodeURIComponent(conversationId)}&select=uid`)
        if ((members || []).some((member: Record<string, unknown>) => String(member.uid || '') === otherUid)) {
          await Promise.all([user.uid, otherUid].map((memberUid) => rest(`conversation_members?conversation_id=eq.${encodeURIComponent(conversationId)}&uid=eq.${encodeURIComponent(memberUid)}`, { method: 'PATCH', body: JSON.stringify({ hidden_at: null }) })))
          return response({ id: conversationId })
        }
      }
      const created = await rest('conversations', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ type: 'direct', name, created_by: user.uid }) })
      const conversationId = created?.[0]?.id
      if (!conversationId) throw new Error('Conversation could not be created')
      await rest('conversation_members', { method: 'POST', body: JSON.stringify([{ conversation_id: conversationId, uid: user.uid }, { conversation_id: conversationId, uid: otherUid }]) })
      return response({ id: conversationId })
    }
    if (action === 'create-group') {
      const name = String(body?.name || 'New group').trim().slice(0, 80) || 'New group'
      const requested = Array.isArray(body?.memberIds) ? body.memberIds.map(String).filter(Boolean) : []
      const memberIds = [...new Set([user.uid, ...requested])]
      if (memberIds.length < 3) return response({ error: 'Choose at least two friends for a group.' }, 400)
      const profiles = await rest(`profiles?uid=in.(${memberIds.map((uid: string) => encodeURIComponent(uid)).join(',')})&select=uid`)
      const knownIds = new Set((profiles || []).map((item: Record<string, unknown>) => String(item.uid || '')))
      if (memberIds.some((uid: string) => uid !== user.uid && !knownIds.has(uid))) return response({ error: 'One or more selected friends could not be found.' }, 400)
      const created = await rest('conversations', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ type: 'group', name, admin_id: user.uid, created_by: user.uid }) })
      const conversationId = String(created?.[0]?.id || '')
      if (!conversationId) throw new Error('Group could not be created')
      await rest('conversation_members', { method: 'POST', body: JSON.stringify(memberIds.map((uid: string) => ({ conversation_id: conversationId, uid }))) })
      return response({ id: conversationId })
    }
    if (action === 'update-group') {
      const conversationId = String(body?.conversationId || '')
      const name = String(body?.name || 'Group chat').trim().slice(0, 80) || 'Group chat'
      const photoURL = String(body?.photoURL || '').slice(0, 2000)
      const rows = await rest(`conversations?id=eq.${encodeURIComponent(conversationId)}&select=id,admin_id&limit=1`)
      if (!rows?.[0] || String(rows[0].admin_id || '') !== user.uid) return response({ error: 'Only the group admin can edit this group.' }, 403)
      await rest(`conversations?id=eq.${encodeURIComponent(conversationId)}`, { method: 'PATCH', body: JSON.stringify({ name, photo_url: photoURL }) })
      return response({ ok: true })
    }
    if (action === 'add-group-members') {
      const conversationId = String(body?.conversationId || '')
      if (!conversationId || !(await member(conversationId, user.uid))) return response({ error: 'Conversation access denied' }, 403)
      const requested = Array.isArray(body?.memberIds) ? [...new Set(body.memberIds.map(String).filter(Boolean))] : []
      if (!requested.length) return response({ ok: true })
      const existing = await rest(`conversation_members?conversation_id=eq.${encodeURIComponent(conversationId)}&select=uid`)
      const known = new Set((existing || []).map((item: Record<string, unknown>) => String(item.uid || '')))
      const additions = requested.filter((uid: string) => !known.has(uid))
      if (additions.length) await rest('conversation_members', { method: 'POST', headers: { Prefer: 'resolution=ignore-duplicates' }, body: JSON.stringify(additions.map((uid: string) => ({ conversation_id: conversationId, uid }))) })
      return response({ added: additions.length })
    }
    if (action === 'remove-group-member') {
      const conversationId = String(body?.conversationId || '')
      const memberUid = String(body?.memberUid || '')
      const groups = await rest(`conversations?id=eq.${encodeURIComponent(conversationId)}&select=id,admin_id,type&limit=1`)
      if (!groups?.[0] || groups[0].type !== 'group' || String(groups[0].admin_id || '') !== user.uid) return response({ error: 'Only the group admin can remove members.' }, 403)
      await rest(`conversation_members?conversation_id=eq.${encodeURIComponent(conversationId)}&uid=eq.${encodeURIComponent(memberUid)}`, { method: 'DELETE' })
      return response({ removed: true })
    }
    if (action === 'leave-group') {
      const conversationId = String(body?.conversationId || '')
      if (!conversationId || !(await member(conversationId, user.uid))) return response({ error: 'You are not a member of this group.' }, 403)
      const groups = await rest(`conversations?id=eq.${encodeURIComponent(conversationId)}&select=id,admin_id,type&limit=1`)
      if (!groups?.[0] || groups[0].type !== 'group') return response({ error: 'This is not a group conversation.' }, 400)
      const members = await rest(`conversation_members?conversation_id=eq.${encodeURIComponent(conversationId)}&select=uid`)
      if (String(groups[0].admin_id || '') === user.uid && (members || []).length > 1) return response({ error: 'The admin can leave only after all other members have left.' }, 400)
      if (String(groups[0].admin_id || '') === user.uid) await rest(`conversations?id=eq.${encodeURIComponent(conversationId)}`, { method: 'DELETE' })
      else await rest(`conversation_members?conversation_id=eq.${encodeURIComponent(conversationId)}&uid=eq.${encodeURIComponent(user.uid)}`, { method: 'DELETE' })
      return response({ left: true })
    }
    if (action === 'messages') {
      const conversationId = String(body?.conversationId || '')
      if (!conversationId || !(await member(conversationId, user.uid))) return response({ error: 'Conversation access denied' }, 403)
      const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      const requestedSince = typeof body?.since === 'string' ? new Date(body.since) : null
      const since = requestedSince && !Number.isNaN(requestedSince.getTime()) ? requestedSince.toISOString() : cutoff
      // Use an inclusive boundary because JavaScript timestamps are only
      // millisecond precise while Postgres timestamps can be finer-grained;
      // the client deduplicates the boundary row by message ID.
      const rows = await rest(`messages?conversation_id=eq.${encodeURIComponent(conversationId)}&created_at=gte.${encodeURIComponent(since)}&select=id,conversation_id,sender_id,text,attachment,sneak,reply_to,seen_by,hidden_for,created_at&order=created_at.asc&limit=100`)
      return response({ items: rows || [] })
    }
    if (action === 'send-sneak') {
      const conversationId = String(body?.conversationId || '')
      const recipientId = String(body?.recipientId || '')
      if (!conversationId || !recipientId || !(await member(conversationId, user.uid)) || !(await member(conversationId, recipientId))) return response({ error: 'Conversation access denied' }, 403)
      const conversations = await rest(`conversations?id=eq.${encodeURIComponent(conversationId)}&type=eq.direct&select=id&limit=1`)
      if (!conversations?.[0]) return response({ error: 'Sneaks require a direct conversation.' }, 400)
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      const sneak = { recipient_id: recipientId, state: 'unopened', expires_at: expiresAt, consumed_at: null }
      const rows = await rest('messages', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ conversation_id: conversationId, sender_id: user.uid, text: 'Serving pixels', attachment: body?.attachment || null, sneak, seen_by: [user.uid] }) })
      const messageAt = new Date().toISOString()
      const messageId = String(rows?.[0]?.id || '')
      await rest(`conversations?id=eq.${encodeURIComponent(conversationId)}`, { method: 'PATCH', body: JSON.stringify({ last_message: 'Sneak', last_sender_id: user.uid, last_message_at: messageAt }) })
      await Promise.all([user.uid, recipientId].map((memberUid) => rest(`conversation_members?conversation_id=eq.${encodeURIComponent(conversationId)}&uid=eq.${encodeURIComponent(memberUid)}`, { method: 'PATCH', body: JSON.stringify({ hidden_at: null }) })))
      runInBackground(Promise.all([
        notifyMessageRecipients([recipientId], user.displayName, 'Sent you a Sneak', conversationId, messageId, messageAt),
        broadcastChatMessage(conversationId, { messageId, messageAt }),
      ]))
      return response({ message: rows?.[0] || null })
    }
    if (action === 'consume-sneak') {
      const conversationId = String(body?.conversationId || '')
      const messageId = String(body?.messageId || '')
      if (!conversationId || !messageId || !(await member(conversationId, user.uid))) return response({ error: 'Conversation access denied' }, 403)
      const rows = await rest(`messages?id=eq.${encodeURIComponent(messageId)}&conversation_id=eq.${encodeURIComponent(conversationId)}&select=id,attachment,sneak&limit=1`)
      const item = rows?.[0]; const sneak = item?.sneak as Record<string, unknown> | undefined
      if (!item || !sneak || String(sneak.recipient_id || '') !== user.uid || String(sneak.state || '') !== 'unopened') return response({ error: 'This Sneak has already been opened or expired.' }, 400)
      if (new Date(String(sneak.expires_at || 0)).getTime() <= Date.now()) return response({ error: 'This Sneak has expired.' }, 400)
      const attachment = item.attachment as Record<string, unknown> | null
      await rest(`messages?id=eq.${encodeURIComponent(messageId)}&sneak->>state=eq.unopened`, { method: 'PATCH', body: JSON.stringify({ sneak: { ...sneak, state: 'consumed', consumed_at: new Date().toISOString() }, attachment: null }) })
      return response({ url: String(attachment?.url || ''), type: String(attachment?.type || 'image/jpeg') })
    }
    if (action === 'notify-event') {
      const kind = String(body?.kind || '')
      if (kind !== 'call' && kind !== 'friend-request') return response({ error: 'Unsupported notification event' }, 400)
      const targetUids = [...new Set(Array.isArray(body?.targetUids) ? body.targetUids.map(String).filter(Boolean).slice(0, 100) : [])]
      if (!targetUids.length) return response({ queued: true })
      const rawData = body?.data && typeof body.data === 'object' ? body.data as Record<string, unknown> : {}
      const data = Object.fromEntries(Object.entries(rawData).slice(0, 12).map(([key, value]) => [key.slice(0, 64), String(value).slice(0, 256)]))
      const message = kind === 'call'
        ? `${data.callType === 'video' ? 'Video' : 'Voice'} call from ${user.displayName || 'a Co-Chat member'}`
        : 'Sent you a friend request'
      const eventId = String(data.callId || data.requestId || crypto.randomUUID())
      const eventAt = new Date().toISOString()
      runInBackground(notifyMessageRecipients(targetUids, user.displayName, message, '', eventId, eventAt, { ...data, type: kind }))
      return response({ queued: true })
    }
    if (action === 'send-message') {
      const conversationId = String(body?.conversationId || '')
      const text = String(body?.text || '').trim()
      if (!conversationId || !(await member(conversationId, user.uid))) return response({ error: 'Conversation access denied' }, 403)
      if (!text && !body?.attachment) return response({ error: 'Message cannot be empty' }, 400)
      if (text.length > 2000) return response({ error: 'Messages must be 2,000 characters or fewer' }, 400)
      const rows = await rest('messages', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ conversation_id: conversationId, sender_id: user.uid, text, attachment: body?.attachment || null, reply_to: body?.replyTo || null, seen_by: [user.uid] }) })
      const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      const messageId = String(rows?.[0]?.id || '')
      const messageAt = String(rows?.[0]?.created_at || new Date().toISOString())
      const members = await rest(`conversation_members?conversation_id=eq.${encodeURIComponent(conversationId)}&select=uid,unread_count`)
      await rest(`conversations?id=eq.${encodeURIComponent(conversationId)}`, { method: 'PATCH', body: JSON.stringify({ last_message: text || '📎 Attachment', last_sender_id: user.uid, last_message_at: messageAt }) })
      await Promise.all((members || []).map((item: Record<string, unknown>) => {
        const memberUid = String(item.uid || '')
        if (!memberUid) return Promise.resolve()
        const unreadCount = memberUid === user.uid ? Number(item.unread_count || 0) : Number(item.unread_count || 0) + 1
        return rest(`conversation_members?conversation_id=eq.${encodeURIComponent(conversationId)}&uid=eq.${encodeURIComponent(memberUid)}`, { method: 'PATCH', body: JSON.stringify({ unread_count: unreadCount, hidden_at: null }) })
      }))
      // Complete the summary broadcast and FCM request before acknowledging the
      // send. This prevents the Worker from ending before push delivery.
      const memberUids = (members || []).map((item: Record<string, unknown>) => String(item.uid || '')).filter(Boolean)
      const targets = memberUids.filter((uid: string) => uid !== user.uid)
      await Promise.all([
        rest(`messages?conversation_id=eq.${encodeURIComponent(conversationId)}&created_at=lt.${encodeURIComponent(cutoff)}&select=id`, { method: 'DELETE' }),
        notifyMessageRecipients(targets, user.displayName, text || '📎 Attachment', conversationId, messageId, messageAt),
        broadcastChatMessage(conversationId, { messageId, messageAt }),
        broadcastConversationChange(memberUids, { conversationId, senderId: user.uid, message: text || '📎 Attachment', messageAt }),
      ])
      return response({ message: rows?.[0] || null })
    }
    if (action === 'delete-conversation') {
      const conversationId = String(body?.conversationId || '')
      if (!conversationId) return response({ error: 'Conversation is required.' }, 400)
      const memberships = await rest(`conversation_members?conversation_id=eq.${encodeURIComponent(conversationId)}&uid=eq.${encodeURIComponent(user.uid)}&select=uid`)
      if (memberships?.length) {
        await rest(`conversation_members?conversation_id=eq.${encodeURIComponent(conversationId)}&uid=eq.${encodeURIComponent(user.uid)}`, { method: 'PATCH', body: JSON.stringify({ hidden_at: new Date().toISOString(), unread_count: 0 }) })
        return response({ deleted: true, hidden: true })
      }
      const owned = await rest(`conversations?id=eq.${encodeURIComponent(conversationId)}&created_by=eq.${encodeURIComponent(user.uid)}&select=id&limit=1`)
      if (owned?.length) {
        await rest(`conversations?id=eq.${encodeURIComponent(conversationId)}`, { method: 'DELETE' })
        return response({ deleted: true })
      }
      return response({ error: 'You cannot delete this conversation.' }, 403)
    }
    if (action === 'mark-read') {
      const conversationId = String(body?.conversationId || '')
      if (!conversationId || !(await member(conversationId, user.uid))) return response({ error: 'Conversation access denied' }, 403)
      const rows = await rest(`messages?conversation_id=eq.${encodeURIComponent(conversationId)}&select=id,seen_by&order=created_at.desc&limit=50`)
      for (const item of rows || []) {
        const seenBy = Array.isArray(item.seen_by) ? item.seen_by.map(String) : []
        if (!seenBy.includes(user.uid)) await rest(`messages?id=eq.${encodeURIComponent(String(item.id))}`, { method: 'PATCH', body: JSON.stringify({ seen_by: [...seenBy, user.uid] }) })
      }
      await rest(`conversation_members?conversation_id=eq.${encodeURIComponent(conversationId)}&uid=eq.${encodeURIComponent(user.uid)}`, { method: 'PATCH', body: JSON.stringify({ unread_count: 0, read_at: new Date().toISOString() }) })
      return response({ ok: true })
    }
    if (action === 'unsend-message') {
      const conversationId = String(body?.conversationId || '')
      const messageId = String(body?.messageId || '')
      if (!conversationId || !messageId || !(await member(conversationId, user.uid))) return response({ error: 'Conversation access denied' }, 403)
      const rows = await rest(`messages?id=eq.${encodeURIComponent(messageId)}&conversation_id=eq.${encodeURIComponent(conversationId)}&select=id,sender_id`)
      if (!rows?.[0] || String(rows[0].sender_id) !== user.uid) return response({ error: 'You can only unsend your own messages.' }, 403)
      await rest(`messages?id=eq.${encodeURIComponent(messageId)}`, { method: 'DELETE' })
      const latest = await rest(`messages?conversation_id=eq.${encodeURIComponent(conversationId)}&select=text,attachment,sender_id,created_at&order=created_at.desc&limit=1`)
      const item = latest?.[0]
      await rest(`conversations?id=eq.${encodeURIComponent(conversationId)}`, { method: 'PATCH', body: JSON.stringify({ last_message: item ? (String(item.text || '') || (item.attachment ? '📎 Attachment' : '')) : '', last_sender_id: item?.sender_id || null, last_message_at: item?.created_at || null }) })
      return response({ deleted: true })
    }
    if (action === 'delete-message-for-me') {
      const conversationId = String(body?.conversationId || '')
      const messageId = String(body?.messageId || '')
      if (!conversationId || !messageId || !(await member(conversationId, user.uid))) return response({ error: 'Conversation access denied' }, 403)
      const rows = await rest(`messages?id=eq.${encodeURIComponent(messageId)}&conversation_id=eq.${encodeURIComponent(conversationId)}&select=id,hidden_for`)
      if (!rows?.[0]) return response({ error: 'Message not found' }, 404)
      const hiddenFor = Array.isArray(rows[0].hidden_for) ? rows[0].hidden_for.map(String) : []
      if (!hiddenFor.includes(user.uid)) await rest(`messages?id=eq.${encodeURIComponent(messageId)}`, { method: 'PATCH', body: JSON.stringify({ hidden_for: [...hiddenFor, user.uid] }) })
      return response({ hidden: true })
    }
    return response({ error: 'Unsupported action' }, 400)
  } catch (error) {
    console.error(error)
    return response({ error: error instanceof Error ? error.message : 'Chat operation failed' }, 400)
  }
}
let internalSecret = Deno.env.get('INTERNAL_NOTIFICATIONS_SECRET') || ''
let projectId = Deno.env.get('FIREBASE_PROJECT_ID') || ''
let clientEmail = Deno.env.get('FIREBASE_CLIENT_EMAIL') || ''
let privateKey = (Deno.env.get('FIREBASE_PRIVATE_KEY') || '').replace(/\\n/g, '\n')

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

async function registerToken(uid: string, token: string, platform: string, accessToken: string) {
  const response = await fetch(`https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents/users/${encodeURIComponent(uid)}/fcmTokens/${encodeURIComponent(token)}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: { token: { stringValue: token }, platform: { stringValue: platform }, updatedAt: { timestampValue: new Date().toISOString() } } }),
  })
  if (!response.ok) throw new Error(`FCM token registration failed (${response.status})`)
}

async function sendToToken(token: string, title: string, body: string, data: Record<string, string>, accessToken: string) {
  const response = await fetch(`https://fcm.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/messages:send`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    // Keep a notification payload (rather than data-only) so Android's FCM
    // receiver displays it while the WebView/app is backgrounded or closed.
    // `icon` must reference a drawable resource, not the full-colour launcher
    // icon; Android status bars require a monochrome notification glyph.
    body: JSON.stringify({ message: { token, notification: { title, body }, data, android: { priority: 'HIGH', restricted_package_name: 'com.cochat.app', notification: { channel_id: 'cochat-general', icon: 'ic_stat_cochat', sound: 'default', default_sound: true, visibility: 'PUBLIC', notification_priority: 'PRIORITY_HIGH' } } } }),
  })
  return { ok: response.ok, status: response.status }
}

async function handleFcm(request: Request) {
  if (request.method !== 'POST') return json({ error: 'POST required' }, 405)
  try {
    const input = await request.json().catch(() => null) as PushRequest | null
    if (input?.action === 'register-token') {
      const uid = await verifyFirebaseToken(request)
      const token = String(input.token || '').trim()
      const platform = String(input.platform || 'android').slice(0, 20)
      if (!uid) return json({ error: 'Invalid Firebase identity token' }, 401)
      if (!token) return json({ error: 'FCM token is required' }, 400)
      await registerToken(uid.uid, token, platform, await googleAccessToken())
      return json({ registered: true })
    }
    if (!internalSecret || request.headers.get('x-internal-notifications-secret') !== internalSecret) return json({ error: 'Unauthorized' }, 401)
    const targetUids = [...new Set(Array.isArray(input?.targetUids) ? input.targetUids.map(String).filter(Boolean).slice(0, 100) : [])]
    const title = String(input?.title || 'Co-Chat').slice(0, 100)
    const body = String(input?.body || 'You have a new message.').slice(0, 2000)
    const rawData = input?.data && typeof input.data === 'object' ? input.data as Record<string, unknown> : {}
    const data = Object.fromEntries(Object.entries(rawData).slice(0, 20).map(([key, value]) => [key.slice(0, 64), String(value).slice(0, 1024)]))
    if (!targetUids.length) return json({ sent: 0 })
    const accessToken = await googleAccessToken()
    const recipientTokens = (await Promise.all(targetUids.map((uid) => tokensForUser(uid, accessToken)))).flat()
    console.log('FCM notification fanout', { targets: targetUids.length, tokens: recipientTokens.length })
    const outcomes = await Promise.all(recipientTokens.map((item) => sendToToken(item.token, title, body, data, accessToken)))
    return json({ sent: outcomes.filter((result) => result.ok).length, attempted: outcomes.length })
  } catch (error) {
    console.error('FCM notification delivery failed', error instanceof Error ? error.message : 'unknown error')
    return json({ error: 'Notification delivery failed' }, 500)
  }
}
function refreshFcmConfig() {
  internalSecret = Deno.env.get('INTERNAL_NOTIFICATIONS_SECRET') || ''
  projectId = Deno.env.get('FIREBASE_PROJECT_ID') || ''
  clientEmail = Deno.env.get('FIREBASE_CLIENT_EMAIL') || ''
  privateKey = (Deno.env.get('FIREBASE_PRIVATE_KEY') || '').replace(/\\n/g, '\n')
}


export default {
  async fetch(request: Request, env: WorkerEnv, ctx: ExecutionContext) {
    workerEnv = env
    workerContext = ctx
    if (new URL(request.url).pathname.replace(/\/$/, '') === '/fcm') {
      refreshFcmConfig()
      return handleFcm(request)
    }
    return handleChat(request)
  },
}

