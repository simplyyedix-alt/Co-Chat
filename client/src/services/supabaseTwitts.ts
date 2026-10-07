import { invokeSocialApi, supabase } from '../supabase'
import { auth } from '../firebase'
import type { TwittAttachment, TwittCommunity, TwittComment, TwittRecord } from './twitts'

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
  liked?: boolean
  attachment?: TwittAttachment | null
}

function fromRow(row: SupabaseRow): TwittRecord {
  return { id: row.id, uid: row.author_id, community: row.community, body: row.body, likes: row.likes_count, comments: row.comments_count, views: row.views_count, liked: Boolean(row.liked), attachment: row.attachment || null, createdAt: { toMillis: () => new Date(row.created_at).getTime() } }
}

export async function loadSupabaseTwittPage(community: TwittCommunity | 'all', cursor?: string | null): Promise<{ items: TwittRecord[]; cursor: string | null; hasMore: boolean }> {
  if (!supabase) return { items: [], cursor: null, hasMore: false }
  const rows = (await invokeSocialApi(await firebaseToken(), { action: 'feed', community, cursor })).items as SupabaseRow[]
  return { items: rows.map(fromRow), cursor: rows.length ? rows[rows.length - 1].created_at : null, hasMore: rows.length === PAGE_SIZE }
}

export async function createSupabaseTwitt(uid: string, body: string, community: TwittCommunity, attachment?: TwittAttachment | null) {
  if (!supabase) throw new Error('Supabase is not configured.')
  const text = body.trim()
  if (!text || text.length > 280) throw new Error('Twitt must be between 1 and 280 characters.')
  void uid
  const result = await invokeSocialApi(await firebaseToken(), { action: 'create', text, community, attachment: attachment || undefined })
  return String(result.id || '')
}

export async function toggleSupabaseTwittLike(twittId: string, uid: string, liked: boolean) {
  if (!supabase) throw new Error('Supabase is not configured.')
  void uid
  const result = await invokeSocialApi(await firebaseToken(), { action: 'like', twittId, liked })
  return Boolean(result.liked)
}

export async function recordSupabaseTwittView(twittId: string, uid: string) {
  if (!supabase) return false
  void uid
  const result = await invokeSocialApi(await firebaseToken(), { action: 'view', twittId })
  return Boolean(result.recorded)
}

export async function createSupabaseTwittComment(twittId: string, uid: string, body: string, attachment?: TwittAttachment | null) {
  if (!supabase) throw new Error('Supabase is not configured.')
  void uid
  const result = await invokeSocialApi(await firebaseToken(), { action: 'comment', twittId, text: body, attachment: attachment || undefined })
  return String(result.id || '')
}

export async function attachSupabaseTwittMedia(twittId: string, uid: string, attachment: TwittAttachment) {
  if (!supabase) throw new Error('Supabase is not configured.')
  void uid
  await invokeSocialApi(await firebaseToken(), { action: 'attach', twittId, attachment })
}

export async function attachSupabaseTwittCommentMedia(twittId: string, commentId: string, uid: string, attachment: TwittAttachment) {
  if (!supabase) throw new Error('Supabase is not configured.')
  void uid
  await invokeSocialApi(await firebaseToken(), { action: 'attach-comment', twittId, commentId, attachment })
}

export async function deleteSupabaseTwitt(twittId: string, uid: string) {
  if (!supabase) throw new Error('Supabase is not configured.')
  void uid
  await invokeSocialApi(await firebaseToken(), { action: 'delete-twitt', twittId })
  return true
}

export async function hideSupabaseTwitt(twittId: string, uid: string) {
  if (!supabase) throw new Error('Supabase is not configured.')
  void uid
  await invokeSocialApi(await firebaseToken(), { action: 'hide', twittId })
  return true
}

export async function toggleSupabaseTwittCommentLike(twittId: string, commentId: string, uid: string, liked: boolean) {
  if (!supabase) throw new Error('Supabase is not configured.')
  void uid
  const result = await invokeSocialApi(await firebaseToken(), { action: 'comment-like', twittId, commentId, liked })
  return Boolean(result.liked)
}

export async function deleteSupabaseTwittComment(twittId: string, commentId: string, uid: string) {
  if (!supabase) throw new Error('Supabase is not configured.')
  void uid
  await invokeSocialApi(await firebaseToken(), { action: 'delete-comment', twittId, commentId })
  return true
}

export async function loadSupabaseTwittComments(twittId: string, cursor?: string | null): Promise<{ items: TwittComment[]; cursor: string | null; hasMore: boolean }> {
  if (!supabase) return { items: [], cursor: null, hasMore: false }
  const rows = (await invokeSocialApi(await firebaseToken(), { action: 'comments', twittId, cursor })).items as Array<{ id: string; author_id: string; body: string; likes_count: number; liked?: boolean; attachment?: TwittAttachment | null; created_at: string }>
  return { items: rows.map((row) => ({ id: row.id, uid: row.author_id, body: row.body, likes: row.likes_count, liked: row.liked, attachment: row.attachment || null, createdAt: { toMillis: () => new Date(row.created_at).getTime() } })), cursor: rows.length ? rows[rows.length - 1].created_at : null, hasMore: rows.length === PAGE_SIZE }
}
