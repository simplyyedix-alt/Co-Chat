import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
  type DocumentData,
  type QueryConstraint,
  type QueryDocumentSnapshot,
} from 'firebase/firestore'
import { db } from '../firebase'
import { socialBackend, supabaseReady } from '../supabase'
import { attachSupabaseTwittCommentMedia, attachSupabaseTwittMedia, createSupabaseTwitt, createSupabaseTwittComment, deleteSupabaseTwitt, deleteSupabaseTwittComment, hideSupabaseTwitt, loadSupabaseTwittComments, loadSupabaseTwittPage, recordSupabaseTwittView, toggleSupabaseTwittCommentLike, toggleSupabaseTwittLike } from './supabaseTwitts'

export type TwittCommunity = string
export type TwittFeedType = 'study' | 'social'
export type TwittAttachment = { name: string; url: string; storageKey?: string; type: string; size: number }

export type TwittRecord = {
  id: string
  uid: string
  body: string
  community: TwittCommunity
  feedType: TwittFeedType
  expiresAt?: string | null
  seen?: boolean
  createdAt: DocumentData['createdAt'] | null
  likes: number
  comments: number
  views: number
  liked?: boolean
  attachment?: TwittAttachment | null
}

export type TwittPage = {
  items: TwittRecord[]
  cursor: string | null
  hasMore: boolean
}

export type TwittComment = { id: string; uid: string; body: string; createdAt: DocumentData['createdAt'] | null; likes?: number; liked?: boolean; attachment?: TwittAttachment | null }

const PAGE_SIZE = 20

function fromDoc(item: QueryDocumentSnapshot<DocumentData>): TwittRecord {
  const data = item.data()
  return {
    id: item.id,
    uid: String(data.uid || ''),
    body: String(data.body || ''),
    community: String(data.community || 'study').toLowerCase(),
    feedType: data.feedType === 'social' ? 'social' : 'study',
    expiresAt: data.expiresAt?.toDate?.()?.toISOString?.() || data.expiresAt || null,
    seen: Boolean(data.seen),
    createdAt: data.createdAt || null,
    likes: Number(data.likes || 0),
    comments: Number(data.comments || 0),
    views: Number(data.views || 0),
    attachment: attachmentFromUnknown(data.attachment),
  }
}

function attachmentFromUnknown(value: unknown): TwittAttachment | null {
  if (!value || typeof value !== 'object') return null
  const item = value as Record<string, unknown>
  const url = String(item.url || '')
  if (!url) return null
  return { name: String(item.name || 'attachment'), url, storageKey: item.storageKey ? String(item.storageKey) : undefined, type: String(item.type || 'application/octet-stream'), size: Number(item.size || 0) }
}

export async function loadTwittPage(community: TwittCommunity | 'all', cursor?: string | null, options: { feedType?: TwittFeedType; friendIds?: string[] } = {}): Promise<TwittPage> {
  if (socialBackend === 'supabase' && supabaseReady) return loadSupabaseTwittPage(community, cursor, options)
  if (!db) return { items: [], cursor: null, hasMore: false }
  const constraints: QueryConstraint[] = community === 'all'
    ? [orderBy('createdAt', 'desc'), ...(cursor ? [where('createdAt', '<', Timestamp.fromDate(new Date(cursor)))] : []), limit(PAGE_SIZE)]
    : [where('community', '==', community), orderBy('createdAt', 'desc'), ...(cursor ? [where('createdAt', '<', Timestamp.fromDate(new Date(cursor)))] : []), limit(PAGE_SIZE)]
  const snapshot = await getDocs(query(collection(db, 'twitts'), ...constraints))
  const lastCreatedAt = snapshot.docs[snapshot.docs.length - 1]?.data().createdAt
  return { items: snapshot.docs.map(fromDoc), cursor: lastCreatedAt?.toDate?.()?.toISOString?.() || null, hasMore: snapshot.size === PAGE_SIZE }
}

export async function createTwitt(uid: string, body: string, community: TwittCommunity, attachment?: TwittAttachment | null, feedType: TwittFeedType = 'study') {
  if (socialBackend === 'supabase' && supabaseReady) return createSupabaseTwitt(uid, body, community, attachment, feedType)
  if (!db) throw new Error('Firebase is not configured.')
  const text = body.trim()
  if (!text || text.length > 280) throw new Error('Twitt must be between 1 and 280 characters.')
  const ref = await addDoc(collection(db, 'twitts'), { uid, body: text, community, feedType, ...(feedType === 'social' ? { expiresAt: new Date(Date.now() + 24 * 3_600_000) } : {}), likes: 0, comments: 0, views: 0, ...(attachment ? { attachment } : {}), createdAt: serverTimestamp() })
  return ref.id
}

export async function toggleTwittLike(twittId: string, uid: string, liked: boolean) {
  if (socialBackend === 'supabase' && supabaseReady) return toggleSupabaseTwittLike(twittId, uid, liked)
  if (!db) throw new Error('Firebase is not configured.')
  const twittRef = doc(db, 'twitts', twittId)
  const likeRef = doc(twittRef, 'likes', uid)
  return runTransaction(db, async (transaction) => {
    const twitt = await transaction.get(twittRef)
    const like = await transaction.get(likeRef)
    if (!twitt.exists()) throw new Error('Twitt no longer exists.')
    const likes = Math.max(0, Number(twitt.data().likes || 0))
    if (like.exists()) {
      transaction.delete(likeRef)
      await transaction.update(twittRef, { likes: Math.max(0, likes - 1) })
      return false
    }
    transaction.set(likeRef, { uid, createdAt: serverTimestamp() })
    await transaction.update(twittRef, { likes: likes + 1 })
    return true
  })
}

export async function recordTwittView(twittId: string, uid: string) {
  if (socialBackend === 'supabase' && supabaseReady) return recordSupabaseTwittView(twittId, uid)
  if (!db) return false
  const twittRef = doc(db, 'twitts', twittId)
  const viewRef = doc(twittRef, 'views', uid)
  return runTransaction(db, async (transaction) => {
    const twitt = await transaction.get(twittRef)
    const view = await transaction.get(viewRef)
    if (!twitt.exists() || view.exists()) return false
    transaction.set(viewRef, { uid, createdAt: serverTimestamp() })
    await transaction.update(twittRef, { views: Math.max(0, Number(twitt.data().views || 0)) + 1 })
    return true
  })
}

export async function createTwittComment(twittId: string, uid: string, body: string, attachment?: TwittAttachment | null) {
  if (socialBackend === 'supabase' && supabaseReady) {
    const id = await createSupabaseTwittComment(twittId, uid, body, attachment)
    window.dispatchEvent(new CustomEvent('cochat-comment-created', { detail: { twittId, id, uid, body: body.trim() || '📎 Attachment', attachment: attachment || null } }))
    return id
  }
  if (!db) throw new Error('Firebase is not configured.')
  const text = body.trim()
  if (!text || text.length > 240) throw new Error('Comment must be between 1 and 240 characters.')
  const twittRef = doc(db, 'twitts', twittId)
  const commentRef = doc(collection(twittRef, 'comments'))
  await runTransaction(db, async (transaction) => {
    const twitt = await transaction.get(twittRef)
    if (!twitt.exists()) throw new Error('Twitt no longer exists.')
    transaction.set(commentRef, { uid, body: text, ...(attachment ? { attachment } : {}), createdAt: serverTimestamp() })
    transaction.update(twittRef, { comments: Math.max(0, Number(twitt.data().comments || 0)) + 1 })
  })
  window.dispatchEvent(new CustomEvent('cochat-comment-created', { detail: { twittId, id: commentRef.id, uid, body: text, attachment: attachment || null } }))
  return commentRef.id
}

export async function attachTwittMedia(twittId: string, uid: string, attachment: TwittAttachment) {
  if (socialBackend === 'supabase' && supabaseReady) return attachSupabaseTwittMedia(twittId, uid, attachment)
  if (!db) throw new Error('Firebase is not configured.')
  await updateDoc(doc(db, 'twitts', twittId), { attachment })
}

export async function attachTwittCommentMedia(twittId: string, commentId: string, uid: string, attachment: TwittAttachment) {
  if (socialBackend === 'supabase' && supabaseReady) return attachSupabaseTwittCommentMedia(twittId, commentId, uid, attachment)
  if (!db) throw new Error('Firebase is not configured.')
  await updateDoc(doc(db, 'twitts', twittId, 'comments', commentId), { attachment })
}

export async function deleteTwitt(twittId: string, uid: string) {
  if (socialBackend === 'supabase' && supabaseReady) return deleteSupabaseTwitt(twittId, uid)
  if (!db) throw new Error('Firebase is not configured.')
  const twittRef = doc(db, 'twitts', twittId)
  return runTransaction(db, async (transaction) => {
    const twitt = await transaction.get(twittRef)
    if (!twitt.exists() || String(twitt.data().uid || '') !== uid) throw new Error('Only the author can delete this Twitt.')
    transaction.delete(twittRef)
    return true
  })
}

export async function hideTwitt(twittId: string, uid: string) {
  if (socialBackend === 'supabase' && supabaseReady) return hideSupabaseTwitt(twittId, uid)
  void twittId; void uid
  return true
}

export async function toggleTwittCommentLike(twittId: string, commentId: string, uid: string, liked: boolean) {
  if (socialBackend === 'supabase' && supabaseReady) return toggleSupabaseTwittCommentLike(twittId, commentId, uid, liked)
  if (!db) throw new Error('Firebase is not configured.')
  const commentRef = doc(db, 'twitts', twittId, 'comments', commentId)
  const likeRef = doc(commentRef, 'likes', uid)
  return runTransaction(db, async (transaction) => {
    const comment = await transaction.get(commentRef)
    const like = await transaction.get(likeRef)
    if (!comment.exists()) throw new Error('Comment no longer exists.')
    const likes = Math.max(0, Number(comment.data().likes || 0))
    if (like.exists()) { transaction.delete(likeRef); transaction.update(commentRef, { likes: Math.max(0, likes - 1) }); return false }
    transaction.set(likeRef, { uid, createdAt: serverTimestamp() }); transaction.update(commentRef, { likes: likes + 1 }); return true
  })
}

export async function deleteTwittComment(twittId: string, commentId: string, uid: string) {
  if (socialBackend === 'supabase' && supabaseReady) return deleteSupabaseTwittComment(twittId, commentId, uid)
  if (!db) throw new Error('Firebase is not configured.')
  const twittRef = doc(db, 'twitts', twittId)
  const commentRef = doc(twittRef, 'comments', commentId)
  return runTransaction(db, async (transaction) => {
    const [twitt, comment] = await Promise.all([transaction.get(twittRef), transaction.get(commentRef)])
    if (!twitt.exists() || !comment.exists() || String(comment.data().uid || '') !== uid) throw new Error('Only the author can delete this comment.')
    transaction.delete(commentRef)
    transaction.update(twittRef, { comments: Math.max(0, Number(twitt.data().comments || 0) - 1) })
    return true
  })
}

export async function loadTwittComments(twittId: string, cursor?: string | null) {
  if (socialBackend === 'supabase' && supabaseReady) return loadSupabaseTwittComments(twittId, cursor)
  if (!db) return { items: [] as TwittComment[], cursor: null, hasMore: false }
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc'), ...(cursor ? [where('createdAt', '<', Timestamp.fromDate(new Date(cursor)))] : []), limit(PAGE_SIZE)]
  const snapshot = await getDocs(query(collection(db, 'twitts', twittId, 'comments'), ...constraints))
  return {
    items: snapshot.docs.map((item) => ({ id: item.id, uid: String(item.data().uid || ''), body: String(item.data().body || ''), likes: Number(item.data().likes || 0), liked: false, attachment: attachmentFromUnknown(item.data().attachment), createdAt: item.data().createdAt || null })),
    cursor: snapshot.docs[snapshot.docs.length - 1]?.data().createdAt?.toDate?.()?.toISOString?.() || null,
    hasMore: snapshot.size === PAGE_SIZE,
  }
}
