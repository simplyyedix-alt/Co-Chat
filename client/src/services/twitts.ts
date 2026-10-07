import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  where,
  type DocumentData,
  type QueryConstraint,
  type QueryDocumentSnapshot,
} from 'firebase/firestore'
import { db } from '../firebase'

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
  cursor: QueryDocumentSnapshot<DocumentData> | null
  hasMore: boolean
}

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

export async function loadTwittPage(community: TwittCommunity | 'all', cursor?: QueryDocumentSnapshot<DocumentData> | null): Promise<TwittPage> {
  if (!db) return { items: [], cursor: null, hasMore: false }
  const constraints: QueryConstraint[] = community === 'all'
    ? [orderBy('createdAt', 'desc'), ...(cursor ? [startAfter(cursor)] : []), limit(PAGE_SIZE)]
    : [where('community', '==', community), orderBy('createdAt', 'desc'), ...(cursor ? [startAfter(cursor)] : []), limit(PAGE_SIZE)]
  const snapshot = await getDocs(query(collection(db, 'twitts'), ...constraints))
  return { items: snapshot.docs.map(fromDoc), cursor: snapshot.docs[snapshot.docs.length - 1] || null, hasMore: snapshot.size === PAGE_SIZE }
}

export async function createTwitt(uid: string, body: string, community: TwittCommunity) {
  if (!db) throw new Error('Firebase is not configured.')
  const text = body.trim()
  if (!text || text.length > 280) throw new Error('Twitt must be between 1 and 280 characters.')
  const ref = await addDoc(collection(db, 'twitts'), { uid, body: text, community, likes: 0, comments: 0, views: 0, createdAt: serverTimestamp() })
  return ref.id
}
