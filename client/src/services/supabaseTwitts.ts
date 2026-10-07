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
  const rows = (await invokeSocialApi(await firebaseToken(), { action: 'feed', community, cursor })).items as SupabaseRow[]
  return { items: rows.map(fromRow), cursor: rows.length ? rows[rows.length - 1].created_at : null, hasMore: rows.length === PAGE_SIZE }
}

export async function createSupabaseTwitt(uid: string, body: string, community: TwittCommunity) {
  if (!supabase) throw new Error('Supabase is not configured.')
  const text = body.trim()
  if (!text || text.length > 280) throw new Error('Twitt must be between 1 and 280 characters.')
  void uid
  const result = await invokeSocialApi(await firebaseToken(), { action: 'create', text, community })
  return String(result.id || '')
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
  const rows = (await invokeSocialApi(await firebaseToken(), { action: 'comments', twittId, cursor })).items as Array<{ id: string; author_id: string; body: string; created_at: string }>
  return { items: rows.map((row) => ({ id: row.id, uid: row.author_id, body: row.body, createdAt: { toMillis: () => new Date(row.created_at).getTime() } })), cursor: rows.length ? rows[rows.length - 1].created_at : null, hasMore: rows.length === PAGE_SIZE }
}
