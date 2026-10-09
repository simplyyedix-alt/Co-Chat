const configuredOrigin = Deno.env.get('APP_ORIGIN') || '*'
const appOrigin = configuredOrigin === '*' ? '*' : (() => {
  try { return new URL(configuredOrigin).origin } catch { return configuredOrigin.replace(/\/$/, '') }
})()
const corsHeaders = {
  'Access-Control-Allow-Origin': appOrigin,
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function response(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function verifyFirebaseToken(token: string) {
  const apiKey = Deno.env.get('FIREBASE_WEB_API_KEY') || ''
  if (!apiKey) throw new Error('Missing Firebase verification configuration')
  const result = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken: token }),
  })
  if (!result.ok) return null
  const payload = await result.json() as { users?: Array<{ localId?: string }> }
  return payload.users?.[0]?.localId || null
}

async function callRpc(name: string, args: Record<string, unknown>) {
  const url = Deno.env.get('SUPABASE_URL') || ''
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
  if (!url || !serviceKey) throw new Error('Missing Supabase server configuration')
  const result = await fetch(`${url}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  })
  const payload = await result.json().catch(() => null)
  if (!result.ok) throw new Error(typeof payload?.message === 'string' ? payload.message : `RPC failed (${result.status})`)
  return payload
}

async function callRest(path: string, init: RequestInit = {}) {
  const url = Deno.env.get('SUPABASE_URL') || ''
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
  if (!url || !serviceKey) throw new Error('Missing Supabase server configuration')
  const result = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })
  const payload = await result.json().catch(() => null)
  if (!result.ok) throw new Error(typeof payload?.message === 'string' ? payload.message : `Database request failed (${result.status})`)
  return payload
}

const socialMediaTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'])
const socialMediaLimit = 5 * 1024 * 1024

type SocialRequest = {
  action?: string
  twittId?: string
  commentId?: string
  text?: string
  community?: string
  cursor?: string
  liked?: boolean
  attachment?: unknown
  mode?: 'study' | 'social'
  friendIds?: string[]
}

function validSocialAttachment(value: unknown) {
  if (!value || typeof value !== 'object') return false
  const attachment = value as Record<string, unknown>
  return typeof attachment.url === 'string' && attachment.url.length > 0 &&
    typeof attachment.name === 'string' && attachment.name.length > 0 &&
    socialMediaTypes.has(String(attachment.type || '')) &&
    Number.isFinite(Number(attachment.size)) && Number(attachment.size) > 0 && Number(attachment.size) <= socialMediaLimit
}

function containsRestrictedContent(value: string) {
  // Check explicit terms only. Do not scan signed storage URLs: their opaque
  // tokens can contain incidental words and wrongly reject normal photos.
  return /\b(?:porn|pornography|pornographic|xxx|nsfw|nude|nudity|naked|onlyfans|blowjob|handjob|deepfake|genitals|pussy|dickpic|cumshot)\b|\bsex\s*(?:tape|video)\b/i.test(value)
}

function attachmentNameIsRestricted(value: unknown) {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>
  return containsRestrictedContent(String(item.name || ''))
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (request.method !== 'POST') return response({ error: 'POST required' }, 405)

  const authorization = request.headers.get('authorization') || ''
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : ''
  if (!token) return response({ error: 'Authentication required' }, 401)
  const uid = await verifyFirebaseToken(token)
  if (!uid) return response({ error: 'Invalid Firebase identity token' }, 401)

  const body = await request.json().catch(() => null) as SocialRequest | null
  if (!body?.action) return response({ error: 'action is required' }, 400)

  const normalizedCommunity = body.community?.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
  if (body.community && (!normalizedCommunity || normalizedCommunity.length < 2 || normalizedCommunity.length > 32)) return response({ error: 'Choose a tag between 2 and 32 characters.' }, 400)
  if (body.cursor && Number.isNaN(Date.parse(body.cursor))) return response({ error: 'Invalid pagination cursor' }, 400)

  try {
    if (body.action === 'feed') {
      const mode = body.mode === 'social' ? 'social' : 'study'
      if (mode === 'social') await callRpc('purge_expired_social_twitts', {}).catch(() => undefined)
      const params = new URLSearchParams({ select: 'id,author_id,community,body,attachment,likes_count,comments_count,views_count,created_at,feed_type,expires_at', order: 'created_at.desc', limit: mode === 'social' ? '50' : '100' })
      params.set('feed_type', `eq.${mode}`)
      if (mode === 'social') params.set('expires_at', `gt.${new Date().toISOString()}`)
      if (body.community && body.community !== 'all') params.set('community', `eq.${body.community}`)
      if (body.cursor) params.set('created_at', `lt.${body.cursor}`)
      const hidden = await callRest(`twitt_hidden?select=twitt_id&user_id=eq.${encodeURIComponent(uid)}`) as Array<{ twitt_id: string }>
      if (hidden.length) params.set('id', `not.in.(${hidden.map((item) => item.twitt_id).join(',')})`)
      const rows = await callRest(`twitts?${params.toString()}`) as Array<{ id: string } & Record<string, unknown>>
      const ids = rows.map((item) => item.id)
      const likes = ids.length ? await callRest(`twitt_likes?select=twitt_id&user_id=eq.${encodeURIComponent(uid)}&twitt_id=in.(${ids.join(',')})`) as Array<{ twitt_id: string }> : []
      const seenRows = ids.length ? await callRest(`twitt_views?select=twitt_id&user_id=eq.${encodeURIComponent(uid)}&twitt_id=in.(${ids.join(',')})`) as Array<{ twitt_id: string }> : []
      const likedIds = new Set(likes.map((item) => item.twitt_id))
      const seenIds = new Set(seenRows.map((item) => item.twitt_id))
      const friendIds = new Set((body.friendIds || []).filter((id) => typeof id === 'string'))
      const items: Array<Record<string, unknown> & { id: string; seen: boolean; friend: boolean }> = rows.map((item) => ({ ...item, liked: likedIds.has(item.id), seen: seenIds.has(item.id), friend: friendIds.has(String(item.author_id || '')) }))
      if (mode === 'social') {
        items.sort((a, b) => {
          const seenOrder = Number(a.seen) - Number(b.seen)
          if (seenOrder) return seenOrder
          const friendOrder = Number(b.friend) - Number(a.friend)
          if (friendOrder) return friendOrder
          return String(b.created_at || '').localeCompare(String(a.created_at || ''))
        })
      }
      return response({ items })
    }
    if (body.action === 'comments') {
      if (!body.twittId) return response({ error: 'twittId is required' }, 400)
      const params = new URLSearchParams({ select: 'id,author_id,body,attachment,likes_count,created_at', twitt_id: `eq.${body.twittId}`, order: 'created_at.desc', limit: '20' })
      if (body.cursor) params.set('created_at', `lt.${body.cursor}`)
      const rows = await callRest(`twitt_comments?${params.toString()}`)
      const ids = (rows || []).map((item: { id: string }) => item.id)
      const likes = ids.length ? await callRest(`twitt_comment_likes?select=comment_id&user_id=eq.${encodeURIComponent(uid)}&comment_id=in.(${ids.join(',')})`) as Array<{ comment_id: string }> : []
      const likedIds = new Set(likes.map((item) => item.comment_id))
      return response({ items: (rows || []).map((item: { id: string }) => ({ ...item, liked: likedIds.has(item.id) })) })
    }
    if (body.action === 'create') {
      const text = body.text?.trim() || ''
      const mode = body.mode === 'social' ? 'social' : 'study'
      if (!text || text.length > 280 || !normalizedCommunity || (body.attachment !== undefined && !validSocialAttachment(body.attachment))) {
        return response({ error: 'Valid text and community are required' }, 400)
      }
      if (containsRestrictedContent(text) || attachmentNameIsRestricted(body.attachment)) return response({ error: 'Adult or explicit content is not allowed.' }, 400)
      if (mode === 'social') await callRpc('purge_expired_social_twitts', {}).catch(() => undefined)
      const rows = await callRest('twitts', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ author_id: uid, body: text, community: normalizedCommunity, feed_type: mode, expires_at: mode === 'social' ? new Date(Date.now() + 24 * 3_600_000).toISOString() : null, attachment: body.attachment || null }) })
      return response({ id: rows?.[0]?.id || null })
    }
    if (!body.twittId) return response({ error: 'twittId is required' }, 400)
    if (body.action === 'view') {
      return response({ recorded: Boolean(await callRpc('record_twitt_view', { p_twitt_id: body.twittId, p_user_id: uid })) })
    }
    if (body.action === 'like') {
      return response({ liked: Boolean(await callRpc('set_twitt_like', { p_twitt_id: body.twittId, p_user_id: uid, p_liked: body.liked === true })) })
    }
    if (body.action === 'comment') {
      const comment = body.text?.trim() || ''
      if (!comment || comment.length > 240 || (body.attachment !== undefined && !validSocialAttachment(body.attachment))) return response({ error: 'Comment must be 1–240 characters and the attachment must be a photo or PDF up to 5 MB' }, 400)
      if (containsRestrictedContent(comment) || attachmentNameIsRestricted(body.attachment)) return response({ error: 'Adult or explicit content is not allowed.' }, 400)
      const id = await callRpc('create_twitt_comment', { p_twitt_id: body.twittId, p_user_id: uid, p_body: comment })
      if (body.attachment) await callRest(`twitt_comments?id=eq.${encodeURIComponent(String(id))}&author_id=eq.${encodeURIComponent(uid)}`, { method: 'PATCH', body: JSON.stringify({ attachment: body.attachment }) })
      return response({ id })
    }
    if (body.action === 'attach') {
      if (!validSocialAttachment(body.attachment)) return response({ error: 'Attachment must be a photo or PDF up to 5 MB' }, 400)
      if (attachmentNameIsRestricted(body.attachment)) return response({ error: 'Adult or explicit content is not allowed.' }, 400)
      const rows = await callRest(`twitts?id=eq.${encodeURIComponent(body.twittId)}&author_id=eq.${encodeURIComponent(uid)}`, { method: 'PATCH', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ attachment: body.attachment }) })
      if (!Array.isArray(rows) || !rows.length) return response({ error: 'Only the author can attach media to this Twitt' }, 403)
      return response({ attached: true })
    }
    if (body.action === 'attach-comment') {
      if (!body.commentId || !validSocialAttachment(body.attachment)) return response({ error: 'Attachment must be a photo or PDF up to 5 MB' }, 400)
      if (attachmentNameIsRestricted(body.attachment)) return response({ error: 'Adult or explicit content is not allowed.' }, 400)
      const rows = await callRest(`twitt_comments?id=eq.${encodeURIComponent(body.commentId)}&author_id=eq.${encodeURIComponent(uid)}&twitt_id=eq.${encodeURIComponent(body.twittId)}`, { method: 'PATCH', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ attachment: body.attachment }) })
      if (!Array.isArray(rows) || !rows.length) return response({ error: 'Only the comment author can attach media' }, 403)
      return response({ attached: true })
    }
    if (body.action === 'delete-twitt') {
      return response({ deleted: Boolean(await callRpc('delete_twitt', { p_twitt_id: body.twittId, p_user_id: uid })) })
    }
    if (body.action === 'hide') {
      return response({ hidden: Boolean(await callRpc('hide_twitt', { p_twitt_id: body.twittId, p_user_id: uid })) })
    }
    if (body.action === 'comment-like') {
      if (!body.commentId) return response({ error: 'commentId is required' }, 400)
      return response({ liked: Boolean(await callRpc('set_twitt_comment_like', { p_comment_id: body.commentId, p_user_id: uid, p_liked: body.liked === true })) })
    }
    if (body.action === 'delete-comment') {
      if (!body.commentId) return response({ error: 'commentId is required' }, 400)
      return response({ deleted: Boolean(await callRpc('delete_twitt_comment', { p_comment_id: body.commentId, p_user_id: uid })) })
    }
    return response({ error: 'Unsupported action' }, 400)
  } catch (error) {
    return response({ error: error instanceof Error ? error.message : 'Social operation failed' }, 400)
  }
})
