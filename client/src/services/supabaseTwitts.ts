import { invokeSocialApi, supabase } from '../supabase'
import { auth } from '../firebase'
import type { TwittCommunity, TwittComment, TwittRecord } from './twitts'

const PAGE_SIZE = 20

async function firebaseToken() {
  const token = await auth?.currentUser?.getIdToken()
  if (!token) throw new Error('Sign in again to continue.')
  return token
}

type SupabaseRow = {
  id: string
  author_id: string
  community: TwittCommunity
  body: string
  likes_count: number
  comments_count: number
  views_count: number
  created_at: string
}

function fromRow(row: SupabaseRow): TwittRecord {
  return { id: row.id, uid: row.author_id, community: row.community, body: row.body, likes: row.likes_count, comments: row.comments_count, views: row.views_count, createdAt: { toMillis: () => new Date(row.created_at).getTime() } }
}

export async function loadSupabaseTwittPage(community: TwittCommunity | 'all', cursor?: string | null): Promise<{ items: TwittRecord[]; cursor: string | null; hasMore: boolean }> {
  if (!supabase) return { items: [], cursor: null, hasMore: false }
  let request = supabase.from('twitts').select('id,author_id,community,body,likes_count,comments_count,views_count,created_at').order('created_at', { ascending: false }).limit(PAGE_SIZE)
  if (community !== 'all') request = request.eq('community', community)
  if (cursor) request = request.lt('created_at', cursor)
  const { data, error } = await request
  if (error) throw error
  const rows = (data || []) as SupabaseRow[]
  return { items: rows.map(fromRow), cursor: rows.length ? rows[rows.length - 1].created_at : null, hasMore: rows.length === PAGE_SIZE }
}

export async function createSupabaseTwitt(uid: string, body: string, community: TwittCommunity) {
  if (!supabase) throw new Error('Supabase is not configured.')
  const text = body.trim()
  if (!text || text.length > 280) throw new Error('Twitt must be between 1 and 280 characters.')
  const { data, error } = await supabase.from('twitts').insert({ author_id: uid, body: text, community }).select('id').single()
  if (error) throw error
  return String(data.id)
}

export async function toggleSupabaseTwittLike(twittId: string, uid: string) {
  if (!supabase) throw new Error('Supabase is not configured.')
  void uid
  const result = await invokeSocialApi(await firebaseToken(), { action: 'like', twittId })
  return Boolean(result.liked)
}

export async function recordSupabaseTwittView(twittId: string, uid: string) {
  if (!supabase) return false
  void uid
  const result = await invokeSocialApi(await firebaseToken(), { action: 'view', twittId })
  return Boolean(result.recorded)
}

export async function createSupabaseTwittComment(twittId: string, uid: string, body: string) {
  if (!supabase) throw new Error('Supabase is not configured.')
  void uid
  const result = await invokeSocialApi(await firebaseToken(), { action: 'comment', twittId, text: body })
  return String(result.id || '')
}

export async function loadSupabaseTwittComments(twittId: string, cursor?: string | null): Promise<{ items: TwittComment[]; cursor: string | null; hasMore: boolean }> {
  if (!supabase) return { items: [], cursor: null, hasMore: false }
  let request = supabase.from('twitt_comments').select('id,author_id,body,created_at').eq('twitt_id', twittId).order('created_at', { ascending: false }).limit(PAGE_SIZE)
  if (cursor) request = request.lt('created_at', cursor)
  const { data, error } = await request
  if (error) throw error
  const rows = (data || []) as Array<{ id: string; author_id: string; body: string; created_at: string }>
  return { items: rows.map((row) => ({ id: row.id, uid: row.author_id, body: row.body, createdAt: { toMillis: () => new Date(row.created_at).getTime() } })), cursor: rows.length ? rows[rows.length - 1].created_at : null, hasMore: rows.length === PAGE_SIZE }
}
