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
import { createSupabaseTwitt, createSupabaseTwittComment, loadSupabaseTwittComments, loadSupabaseTwittPage, recordSupabaseTwittView, toggleSupabaseTwittLike } from './supabaseTwitts'

export type TwittCommunity = 'jee' | 'neet' | 'study' | 'public'

export type TwittRecord = {
  id: string
  uid: string
  body: string
  community: TwittCommunity
  createdAt: DocumentData['createdAt'] | null
  likes: number
  comments: number
  views: number
}

export type TwittPage = {
  items: TwittRecord[]
  cursor: string | null
  hasMore: boolean
}

export type TwittComment = { id: string; uid: string; body: string; createdAt: DocumentData['createdAt'] | null }

const PAGE_SIZE = 20

function fromDoc(item: QueryDocumentSnapshot<DocumentData>): TwittRecord {
  const data = item.data()
  return {
    id: item.id,
    uid: String(data.uid || ''),
    body: String(data.body || ''),
    community: data.community === 'neet' || data.community === 'study' || data.community === 'public' ? data.community : 'jee',
    createdAt: data.createdAt || null,
    likes: Number(data.likes || 0),
    comments: Number(data.comments || 0),
    views: Number(data.views || 0),
  }
}

export async function loadTwittPage(community: TwittCommunity | 'all', cursor?: string | null): Promise<TwittPage> {
  if (socialBackend === 'supabase' && supabaseReady) return loadSupabaseTwittPage(community, cursor)
  if (!db) return { items: [], cursor: null, hasMore: false }
  const constraints: QueryConstraint[] = community === 'all'
    ? [orderBy('createdAt', 'desc'), ...(cursor ? [where('createdAt', '<', Timestamp.fromDate(new Date(cursor)))] : []), limit(PAGE_SIZE)]
    : [where('community', '==', community), orderBy('createdAt', 'desc'), ...(cursor ? [where('createdAt', '<', Timestamp.fromDate(new Date(cursor)))] : []), limit(PAGE_SIZE)]
  const snapshot = await getDocs(query(collection(db, 'twitts'), ...constraints))
  const lastCreatedAt = snapshot.docs[snapshot.docs.length - 1]?.data().createdAt
  return { items: snapshot.docs.map(fromDoc), cursor: lastCreatedAt?.toDate?.()?.toISOString?.() || null, hasMore: snapshot.size === PAGE_SIZE }
}

export async function createTwitt(uid: string, body: string, community: TwittCommunity) {
  if (socialBackend === 'supabase' && supabaseReady) return createSupabaseTwitt(uid, body, community)
  if (!db) throw new Error('Firebase is not configured.')
  const text = body.trim()
  if (!text || text.length > 280) throw new Error('Twitt must be between 1 and 280 characters.')
  const ref = await addDoc(collection(db, 'twitts'), { uid, body: text, community, likes: 0, comments: 0, views: 0, createdAt: serverTimestamp() })
  return ref.id
}

export async function toggleTwittLike(twittId: string, uid: string) {
  if (socialBackend === 'supabase' && supabaseReady) return toggleSupabaseTwittLike(twittId, uid)
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

export async function createTwittComment(twittId: string, uid: string, body: string) {
  if (socialBackend === 'supabase' && supabaseReady) return createSupabaseTwittComment(twittId, uid, body)
  if (!db) throw new Error('Firebase is not configured.')
  const text = body.trim()
  if (!text || text.length > 240) throw new Error('Comment must be between 1 and 240 characters.')
  const twittRef = doc(db, 'twitts', twittId)
  const commentRef = doc(collection(twittRef, 'comments'))
  await runTransaction(db, async (transaction) => {
    const twitt = await transaction.get(twittRef)
    if (!twitt.exists()) throw new Error('Twitt no longer exists.')
    transaction.set(commentRef, { uid, body: text, createdAt: serverTimestamp() })
    transaction.update(twittRef, { comments: Math.max(0, Number(twitt.data().comments || 0)) + 1 })
  })
  return commentRef.id
}

export async function loadTwittComments(twittId: string, cursor?: string | null) {
  if (socialBackend === 'supabase' && supabaseReady) return loadSupabaseTwittComments(twittId, cursor)
  if (!db) return { items: [] as TwittComment[], cursor: null, hasMore: false }
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc'), ...(cursor ? [where('createdAt', '<', Timestamp.fromDate(new Date(cursor)))] : []), limit(PAGE_SIZE)]
  const snapshot = await getDocs(query(collection(db, 'twitts', twittId, 'comments'), ...constraints))
  return {
    items: snapshot.docs.map((item) => ({ id: item.id, uid: String(item.data().uid || ''), body: String(item.data().body || ''), createdAt: item.data().createdAt || null })),
    cursor: snapshot.docs[snapshot.docs.length - 1]?.data().createdAt?.toDate?.()?.toISOString?.() || null,
    hasMore: snapshot.size === PAGE_SIZE,
  }
}
