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

async function notifyMessageRecipients(targetUids: string[], senderName: string, message: string, conversationId: string) {
  const base = Deno.env.get('SUPABASE_URL') || ''
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
  const secret = Deno.env.get('INTERNAL_NOTIFICATIONS_SECRET') || ''
  if (!base || !serviceKey || !secret || !targetUids.length) return
  await fetch(`${base}/functions/v1/fcm-notifications`, {
    method: 'POST',
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, 'Content-Type': 'application/json', 'x-internal-notifications-secret': secret },
    body: JSON.stringify({ targetUids, title: senderName || 'New Co-Chat message', body: message || '📎 Attachment', data: { type: 'message', conversationId } }),
  })
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
      await rest('profiles', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify({ uid: user.uid, display_name: String(body?.displayName || user.displayName || 'Co-Chat member').slice(0, 100), email: String(body?.email || user.email || ''), photo_url: String(body?.photoURL || user.photoURL || ''), username: String(body?.username || '').toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 24) || `user_${user.uid.slice(0, 8)}`, bio: String(body?.bio || '').slice(0, 280), notifications_enabled: body?.notificationsEnabled !== false, discoverable: body?.discoverable !== false, active_status: body?.activeStatus !== false, last_seen: new Date().toISOString(), updated_at: new Date().toISOString() }) })
      return response({ ok: true })
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
      const rows = await rest(`profiles?select=uid,display_name,username,photo_url,weekly_study_seconds,total_study_seconds,study_week_key,study_active_until,study_label${filter}&order=weekly_study_seconds.desc,total_study_seconds.desc&limit=50`)
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
      const rows = await rest(`conversation_members?uid=eq.${encodeURIComponent(user.uid)}&select=conversation_id,hidden_at,unread_count,read_at,conversations(id,type,name,photo_url,admin_id,created_by,last_message,last_sender_id,last_message_at,created_at)&order=joined_at.desc`)
      const conversationIds = (rows || []).map((item: Record<string, unknown>) => String(item.conversation_id || '')).filter(Boolean)
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
        return { ...item, member_ids: memberIds, other_profile: otherUid ? profileByUid.get(otherUid) || null : null }
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
        if ((members || []).some((member: Record<string, unknown>) => String(member.uid || '') === otherUid)) return response({ id: conversationId })
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
      const rows = await rest(`messages?conversation_id=eq.${encodeURIComponent(conversationId)}&created_at=gte.${encodeURIComponent(cutoff)}&select=id,conversation_id,sender_id,text,attachment,reply_to,seen_by,hidden_for,created_at&order=created_at.desc&limit=50`)
      return response({ items: (rows || []).reverse() })
    }
    if (action === 'send-message') {
      const conversationId = String(body?.conversationId || '')
      const text = String(body?.text || '').trim()
      if (!conversationId || !(await member(conversationId, user.uid))) return response({ error: 'Conversation access denied' }, 403)
      if (!text && !body?.attachment) return response({ error: 'Message cannot be empty' }, 400)
      if (text.length > 2000) return response({ error: 'Messages must be 2,000 characters or fewer' }, 400)
      const rows = await rest('messages', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ conversation_id: conversationId, sender_id: user.uid, text, attachment: body?.attachment || null, reply_to: body?.replyTo || null, seen_by: [user.uid] }) })
      const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      void rest(`messages?conversation_id=eq.${encodeURIComponent(conversationId)}&created_at=lt.${encodeURIComponent(cutoff)}&select=id`, { method: 'DELETE' }).catch(() => undefined)
      const members = await rest(`conversation_members?conversation_id=eq.${encodeURIComponent(conversationId)}&select=uid,unread_count`)
      for (const item of members || []) if (item.uid !== user.uid) await rest(`conversation_members?conversation_id=eq.${encodeURIComponent(conversationId)}&uid=eq.${encodeURIComponent(item.uid)}`, { method: 'PATCH', body: JSON.stringify({ unread_count: Number(item.unread_count || 0) + 1 }) })
      await rest(`conversations?id=eq.${encodeURIComponent(conversationId)}`, { method: 'PATCH', body: JSON.stringify({ last_message: text || '📎 Attachment', last_sender_id: user.uid, last_message_at: new Date().toISOString() }) })
      const targets = (members || []).map((item: Record<string, unknown>) => String(item.uid || '')).filter((uid: string) => uid && uid !== user.uid)
      void notifyMessageRecipients(targets, user.displayName, text || '📎 Attachment', conversationId).catch(() => undefined)
      return response({ message: rows?.[0] || null })
    }
    if (action === 'delete-conversation') {
      const conversationId = String(body?.conversationId || '')
      if (!conversationId || !(await member(conversationId, user.uid))) return response({ error: 'You cannot delete this conversation.' }, 403)
      await rest(`conversations?id=eq.${encodeURIComponent(conversationId)}`, { method: 'DELETE' })
      return response({ deleted: true })
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
})
