import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  type DocumentData,
  type Unsubscribe,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../firebase'

export type UserProfile = { uid: string; displayName: string; email: string; username: string; photoURL?: string }
export type Conversation = {
  id: string
  name: string
  memberIds: string[]
  lastMessage: string
  lastMessageAt?: Timestamp | null
  avatar: string
}
export type ChatAttachment = { name: string; url: string; type: string; size: number }
export type ChatMessage = { id: string; text: string; senderId: string; createdAt?: Timestamp | null; attachment?: ChatAttachment | null }
export type Story = { id: string; uid: string; displayName: string; text: string; createdAt?: Timestamp | null; expiresAt?: Timestamp | null }
export type CallRecord = { id: string; type: 'audio' | 'video'; status: string; memberIds: string[]; createdAt?: Timestamp | null }

const initials = (name: string) => name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase() || 'U'
const asTimestamp = (value: unknown) => value instanceof Timestamp ? value : null

export async function ensureUserProfile(uid: string, profile: Partial<UserProfile>) {
  if (!db) return
  const ref = doc(db, 'users', uid)
  const current = await getDoc(ref)
  const displayName = profile.displayName || profile.email?.split('@')[0] || 'Co-Chat member'
  if (!current.exists()) await setDoc(ref, { displayName, email: profile.email || '', username: displayName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 24), photoURL: profile.photoURL || '', createdAt: serverTimestamp() })
  else await updateDoc(ref, { displayName, email: profile.email || current.data().email || '', photoURL: profile.photoURL || current.data().photoURL || '' })
}

export function watchConversations(uid: string, callback: (items: Conversation[]) => void): Unsubscribe | undefined {
  if (!db) return undefined
  const q = query(collection(db, 'conversations'), where('memberIds', 'array-contains', uid))
  return onSnapshot(q, snapshot => callback(snapshot.docs.map(item => {
    const data = item.data()
    const name = String(data.name || 'Conversation')
    return { id: item.id, name, memberIds: Array.isArray(data.memberIds) ? data.memberIds : [], lastMessage: String(data.lastMessage || ''), lastMessageAt: asTimestamp(data.lastMessageAt), avatar: initials(name) }
  }).sort((a, b) => (b.lastMessageAt?.toMillis() || 0) - (a.lastMessageAt?.toMillis() || 0))))
}

export function watchMessages(conversationId: string, callback: (items: ChatMessage[]) => void): Unsubscribe | undefined {
  if (!db) return undefined
  const q = query(collection(db, 'conversations', conversationId, 'messages'), orderBy('createdAt', 'asc'))
  return onSnapshot(q, snapshot => callback(snapshot.docs.map(item => { const data = item.data(); return { id: item.id, text: String(data.text || ''), senderId: String(data.senderId || ''), createdAt: asTimestamp(data.createdAt), attachment: data.attachment ? { name: String(data.attachment.name || 'file'), url: String(data.attachment.url || ''), type: String(data.attachment.type || ''), size: Number(data.attachment.size || 0) } : null } })))
}

export async function sendMessage(conversationId: string, senderId: string, text: string, file?: File) {
  if (!db) return
  const conversationRef = doc(db, 'conversations', conversationId)
  let attachment: ChatAttachment | null = null
  if (file) {
    if (!storage) throw new Error('Storage is not configured')
    if (file.size > 10 * 1024 * 1024) throw new Error('Files must be smaller than 10 MB')
    const fileRef = ref(storage, `conversation-media/${conversationId}/${senderId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`)
    attachment = { name: file.name, url: await getDownloadURL(await uploadBytes(fileRef, file)), type: file.type, size: file.size }
  }
  const messageData: { text: string; senderId: string; createdAt: ReturnType<typeof serverTimestamp>; attachment?: ChatAttachment } = { text, senderId, createdAt: serverTimestamp() }
  if (attachment) messageData.attachment = attachment
  await addDoc(collection(conversationRef, 'messages'), messageData)
  await updateDoc(conversationRef, { lastMessage: attachment ? `📎 ${attachment.name}` : text, lastMessageAt: serverTimestamp() })
}

export async function findUsers(search: string, currentUid: string): Promise<UserProfile[]> {
  if (!db || !search.trim()) return []
  const term = search.trim().toLowerCase()
  const snapshot = await getDocs(query(collection(db, 'users'), where('username', '>=', term), where('username', '<=', `${term}\uf8ff`), limit(12)))
  return snapshot.docs.filter(item => item.id !== currentUid).map(item => profileFromDoc(item.id, item.data()))
}

function profileFromDoc(uid: string, data: DocumentData): UserProfile { return { uid, displayName: String(data.displayName || 'Co-Chat member'), email: String(data.email || ''), username: String(data.username || ''), photoURL: String(data.photoURL || '') } }

export async function createConversation(uid: string, other: UserProfile) {
  if (!db) return ''
  const id = [uid, other.uid].sort().join('_')
  const ref = doc(db, 'conversations', id)
  if (!(await getDoc(ref)).exists()) await setDoc(ref, { type: 'direct', name: other.displayName, memberIds: [uid, other.uid], createdBy: uid, lastMessage: '', lastMessageAt: serverTimestamp(), createdAt: serverTimestamp() })
  return id
}

export function watchStories(callback: (items: Story[]) => void): Unsubscribe | undefined {
  if (!db) return undefined
  const q = query(collection(db, 'stories'), where('expiresAt', '>', Timestamp.now()), limit(50))
  return onSnapshot(q, snapshot => callback(snapshot.docs.map(item => { const data = item.data(); return { id: item.id, uid: String(data.uid || ''), displayName: String(data.displayName || 'Co-Chat member'), text: String(data.text || ''), createdAt: asTimestamp(data.createdAt), expiresAt: asTimestamp(data.expiresAt) } }).sort((a, b) => (a.expiresAt?.toMillis() || 0) - (b.expiresAt?.toMillis() || 0))))
}

export async function createStory(uid: string, displayName: string, text: string) {
  if (!db) return
  const expires = Timestamp.fromMillis(Date.now() + 24 * 60 * 60 * 1000)
  await addDoc(collection(db, 'stories'), { uid, displayName, text, createdAt: serverTimestamp(), expiresAt: expires })
}

export async function saveProfile(uid: string, values: Pick<UserProfile, 'displayName' | 'username'>) {
  if (!db) return
  await updateDoc(doc(db, 'users', uid), { displayName: values.displayName.trim(), username: values.username.trim().toLowerCase(), updatedAt: serverTimestamp() })
}

export function watchCalls(uid: string, callback: (items: CallRecord[]) => void): Unsubscribe | undefined {
  if (!db) return undefined
  return onSnapshot(query(collection(db, 'calls'), where('memberIds', 'array-contains', uid), limit(50)), snapshot => callback(snapshot.docs.map(item => { const data = item.data(); return { id: item.id, type: data.type === 'video' ? 'video' : 'audio', status: String(data.status || 'completed'), memberIds: Array.isArray(data.memberIds) ? data.memberIds : [], createdAt: asTimestamp(data.createdAt) } }).sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0))))
}

export async function createCall(memberIds: string[], type: 'audio' | 'video') {
  if (!db) return
  await addDoc(collection(db, 'calls'), { memberIds, type, status: 'requested', createdAt: serverTimestamp() })
}
