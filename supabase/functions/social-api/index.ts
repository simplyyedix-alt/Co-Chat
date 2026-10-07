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

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (request.method !== 'POST') return response({ error: 'POST required' }, 405)

  const authorization = request.headers.get('authorization') || ''
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : ''
  if (!token) return response({ error: 'Authentication required' }, 401)
  const uid = await verifyFirebaseToken(token)
  if (!uid) return response({ error: 'Invalid Firebase identity token' }, 401)

  const body = await request.json().catch(() => null) as { action?: string; twittId?: string; commentId?: string; text?: string; community?: string; cursor?: string } | null
  if (!body?.action) return response({ error: 'action is required' }, 400)

  const communities = new Set(['all', 'jee', 'neet', 'study', 'public'])
  if (body.community && !communities.has(body.community)) return response({ error: 'Unsupported community' }, 400)
  if (body.cursor && Number.isNaN(Date.parse(body.cursor))) return response({ error: 'Invalid pagination cursor' }, 400)

  try {
    if (body.action === 'feed') {
      const params = new URLSearchParams({ select: 'id,author_id,community,body,likes_count,comments_count,views_count,created_at', order: 'created_at.desc', limit: '20' })
      if (body.community && body.community !== 'all') params.set('community', `eq.${body.community}`)
      if (body.cursor) params.set('created_at', `lt.${body.cursor}`)
      const hidden = await callRest(`twitt_hidden?select=twitt_id&user_id=eq.${encodeURIComponent(uid)}`) as Array<{ twitt_id: string }>
      if (hidden.length) params.set('id', `not.in.(${hidden.map((item) => item.twitt_id).join(',')})`)
      const rows = await callRest(`twitts?${params.toString()}`)
      return response({ items: rows || [] })
    }
    if (body.action === 'comments') {
      if (!body.twittId) return response({ error: 'twittId is required' }, 400)
      const params = new URLSearchParams({ select: 'id,author_id,body,likes_count,created_at', twitt_id: `eq.${body.twittId}`, order: 'created_at.desc', limit: '20' })
      if (body.cursor) params.set('created_at', `lt.${body.cursor}`)
      const rows = await callRest(`twitt_comments?${params.toString()}`)
      const ids = (rows || []).map((item: { id: string }) => item.id)
      const likes = ids.length ? await callRest(`twitt_comment_likes?select=comment_id&user_id=eq.${encodeURIComponent(uid)}&comment_id=in.(${ids.join(',')})`) as Array<{ comment_id: string }> : []
      const likedIds = new Set(likes.map((item) => item.comment_id))
      return response({ items: (rows || []).map((item: { id: string }) => ({ ...item, liked: likedIds.has(item.id) })) })
    }
    if (body.action === 'create') {
      const text = body.text?.trim() || ''
      if (!text || text.length > 280 || !['jee', 'neet', 'study', 'public'].includes(body.community || '')) {
        return response({ error: 'Valid text and community are required' }, 400)
      }
      const rows = await callRest('twitts', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ author_id: uid, body: text, community: body.community }) })
      return response({ id: rows?.[0]?.id || null })
    }
    if (!body.twittId) return response({ error: 'twittId is required' }, 400)
    if (body.action === 'view') {
      return response({ recorded: Boolean(await callRpc('record_twitt_view', { p_twitt_id: body.twittId, p_user_id: uid })) })
    }
    if (body.action === 'like') {
      return response({ liked: Boolean(await callRpc('toggle_twitt_like', { p_twitt_id: body.twittId, p_user_id: uid })) })
    }
    if (body.action === 'comment') {
      const comment = body.text?.trim() || ''
      if (!comment || comment.length > 240) return response({ error: 'Comment must be between 1 and 240 characters' }, 400)
      return response({ id: await callRpc('create_twitt_comment', { p_twitt_id: body.twittId, p_user_id: uid, p_body: comment }) })
    }
    if (body.action === 'delete-twitt') {
      return response({ deleted: Boolean(await callRpc('delete_twitt', { p_twitt_id: body.twittId, p_user_id: uid })) })
    }
    if (body.action === 'hide') {
      return response({ hidden: Boolean(await callRpc('hide_twitt', { p_twitt_id: body.twittId, p_user_id: uid })) })
    }
    if (body.action === 'comment-like') {
      if (!body.commentId) return response({ error: 'commentId is required' }, 400)
      return response({ liked: Boolean(await callRpc('toggle_twitt_comment_like', { p_comment_id: body.commentId, p_user_id: uid })) })
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
