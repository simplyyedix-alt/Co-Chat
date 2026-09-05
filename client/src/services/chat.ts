import {
  addDoc,
  arrayUnion,
  increment,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  writeBatch,
  Timestamp,
  updateDoc,
  where,
  type DocumentData,
  type Unsubscribe,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { auth, db, storage } from '../firebase'

export type UserProfile = { uid: string; displayName: string; email: string; username: string; photoURL?: string; bio?: string; notificationsEnabled?: boolean; discoverable?: boolean; activeStatus?: boolean; lastSeen?: Timestamp | null }
export type Conversation = {
  id: string
  name: string
  memberIds: string[]
  lastMessage: string
  lastMessageAt?: Timestamp | null
  avatar: string
  active?: boolean
  unreadCount?: number
  type?: 'direct' | 'group'
  adminId?: string
}
export type ChatAttachment = { name: string; url: string; type: string; size: number }
export type ChatMessage = { id: string; text: string; senderId: string; createdAt?: Timestamp | null; attachment?: ChatAttachment | null; replyTo?: { id: string; text: string; senderId: string } | null; seenBy?: string[] }
export type Story = { id: string; uid: string; displayName: string; text: string; createdAt?: Timestamp | null; expiresAt?: Timestamp | null }
export type CallRecord = { id: string; type: 'audio' | 'video'; status: string; memberIds: string[]; callerId?: string; calleeId?: string; createdAt?: Timestamp | null }
export type FriendRequest = { id: string; fromUid: string; toUid: string; status: 'pending' | 'accepted' | 'declined'; createdAt?: Timestamp | null }

export type BlockRecord = { id: string; blockerId: string; blockedId: string; createdAt?: Timestamp | null }

export async function blockUser(blockerId: string, blockedId: string) {
  if (!db || !blockerId || !blockedId || blockerId === blockedId) return
  const batch = writeBatch(db)
  batch.set(doc(db, 'blocks', `${blockerId}_${blockedId}`), { blockerId, blockedId, createdAt: serverTimestamp() })
  batch.delete(doc(db, 'friendships', [blockerId, blockedId].sort().join('_')))
  batch.delete(doc(db, 'friendRequests', `${blockerId}_${blockedId}`))
  batch.delete(doc(db, 'friendRequests', `${blockedId}_${blockerId}`))
  await batch.commit()
}

export async function unblockUser(blockerId: string, blockedId: string) {
  if (!db) return
  await deleteDoc(doc(db, 'blocks', `${blockerId}_${blockedId}`))
}

async function isBlockedBetween(uid: string, otherUid: string) {
  if (!db || !uid || !otherUid) return false
  const [outgoing, incoming] = await Promise.all([
    getDoc(doc(db, 'blocks', `${uid}_${otherUid}`)),
    getDoc(doc(db, 'blocks', `${otherUid}_${uid}`)),
  ])
  return outgoing.exists() || incoming.exists()
}

export async function removeFriend(uid: string, otherUid: string) {
  if (!db) return
  await deleteDoc(doc(db, 'friendships', [uid, otherUid].sort().join('_')))
}

export async function listBlockedUsers(blockerId: string): Promise<BlockRecord[]> {
  if (!db) return []
  const snapshot = await getDocs(query(collection(db, 'blocks'), where('blockerId', '==', blockerId)))
  return snapshot.docs.map(item => ({ id: item.id, blockerId, blockedId: String(item.data().blockedId || ''), createdAt: asTimestamp(item.data().createdAt) }))
}

const initials = (name: string) => name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase() || 'U'
const asTimestamp = (value: unknown) => value instanceof Timestamp ? value : null
const normalizeUsername = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 24)

async function reserveUsername(uid: string, requested: string, fallback: string) {
  if (!db) return normalizeUsername(requested || fallback)
  const base = normalizeUsername(requested) || normalizeUsername(fallback) || `user${uid.slice(0, 8).toLowerCase()}`
  const usernameRef = doc(db, 'usernames', base)
  await runTransaction(db, async transaction => {
    const existing = await transaction.get(usernameRef)
    if (existing.exists() && existing.data().uid !== uid) throw new Error('That username is already taken.')
    transaction.set(usernameRef, { uid, createdAt: existing.exists() ? existing.data().createdAt : serverTimestamp() }, { merge: true })
  })
  return base
}

export async function ensureUserProfile(uid: string, profile: Partial<UserProfile>) {
  if (!db) return false
  const ref = doc(db, 'users', uid)
  const current = await getDoc(ref)
  const displayName = profile.displayName || profile.email?.split('@')[0] || 'Co-Chat member'
  if (!current.exists()) {
    let username = normalizeUsername(displayName) || `user${uid.slice(0, 8).toLowerCase()}`
    try { username = await reserveUsername(uid, username, `user${uid.slice(0, 8).toLowerCase()}`) } catch { username = await reserveUsername(uid, `user${uid.slice(0, 8).toLowerCase()}`, `user${uid.slice(0, 8).toLowerCase()}`) }
    await setDoc(ref, { displayName, email: profile.email || '', username, photoURL: profile.photoURL || '', bio: '', notificationsEnabled: true, discoverable: true, createdAt: serverTimestamp() })
    return true
  }
  else await updateDoc(ref, { displayName, email: profile.email || current.data().email || '', photoURL: profile.photoURL || current.data().photoURL || '' })
  return !normalizeUsername(String(current.data().username || ''))
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!db) return null
  const viewerUid = auth?.currentUser?.uid
  if (viewerUid && viewerUid !== uid && await isBlockedBetween(viewerUid, uid)) return null
  const snapshot = await getDoc(doc(db, 'users', uid))
  return snapshot.exists() ? profileFromDoc(uid, snapshot.data()) : null
}

export function watchConversations(uid: string, callback: (items: Conversation[]) => void): Unsubscribe | undefined {
  if (!db) return undefined
  const q = query(collection(db, 'conversations'), where('memberIds', 'array-contains', uid))
  return onSnapshot(q, snapshot => {
    Promise.all(snapshot.docs.map(async item => {
      const data = item.data()
      const memberIds = Array.isArray(data.memberIds) ? data.memberIds.map(String) : []
      const otherId = memberIds.find(memberId => memberId !== uid)
      const other = otherId ? await getUserProfile(otherId) : null
      const name = String(data.type || '') === 'group' ? String(data.name || 'Group chat') : (other?.displayName || String(data.name || 'Conversation'))
      const lastSeen = other?.lastSeen?.toMillis() || 0
      return { id: item.id, name, memberIds, type: data.type === 'group' ? ('group' as const) : ('direct' as const), adminId: data.adminId ? String(data.adminId) : undefined, lastMessage: String(data.lastMessage || ''), lastMessageAt: asTimestamp(data.lastMessageAt), avatar: initials(name), active: other?.activeStatus !== false && Date.now() - lastSeen < 90000, unreadCount: Number(data.unreadCounts?.[uid] || 0) }
    })).then(items => callback(items.sort((a, b) => (b.lastMessageAt?.toMillis() || 0) - (a.lastMessageAt?.toMillis() || 0))))
  })
}

export function watchMessages(conversationId: string, callback: (items: ChatMessage[]) => void): Unsubscribe | undefined {
  if (!db) return undefined
  const q = query(collection(db, 'conversations', conversationId, 'messages'))
  return onSnapshot(q, snapshot => callback(snapshot.docs.map(item => { const data = item.data(); return { id: item.id, text: String(data.text || ''), senderId: String(data.senderId || ''), createdAt: asTimestamp(data.createdAt), attachment: data.attachment ? { name: String(data.attachment.name || 'file'), url: String(data.attachment.url || ''), type: String(data.attachment.type || ''), size: Number(data.attachment.size || 0) } : null, replyTo: data.replyTo ? { id: String(data.replyTo.id || ''), text: String(data.replyTo.text || ''), senderId: String(data.replyTo.senderId || '') } : null, seenBy: Array.isArray(data.seenBy) ? data.seenBy.map(String) : [] } }).sort((a, b) => (a.createdAt?.toMillis() || 0) - (b.createdAt?.toMillis() || 0))))
}

export async function sendMessage(conversationId: string, senderId: string, text: string, file?: File, replyTo?: ChatMessage | null) {
  if (!db) return
  const conversationRef = doc(db, 'conversations', conversationId)
  const conversationSnapshot = await getDoc(conversationRef)
  if (!conversationSnapshot.exists()) throw new Error('This conversation no longer exists.')
  const conversationData = conversationSnapshot.data()
  if (!(conversationData.memberIds || []).includes(senderId)) throw new Error('You are not a member of this conversation.')
  if (conversationData.type === 'direct') {
    const otherUid = (conversationData.memberIds || []).find((id: string) => id !== senderId)
    if (otherUid && await isBlockedBetween(senderId, otherUid)) throw new Error('You cannot message this user.')
  }
  let attachment: ChatAttachment | null = null
  if (file) {
    if (!storage) throw new Error('Storage is not configured')
    if (file.size > 10 * 1024 * 1024) throw new Error('Files must be smaller than 10 MB')
    const fileRef = ref(storage, `conversation-media/${conversationId}/${senderId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`)
    await uploadBytes(fileRef, file)
    attachment = { name: file.name, url: await getDownloadURL(fileRef), type: file.type, size: file.size }
  }
  const messageData: { text: string; senderId: string; createdAt: ReturnType<typeof serverTimestamp>; attachment?: ChatAttachment; replyTo?: { id: string; text: string; senderId: string } } = { text, senderId, createdAt: serverTimestamp() }
  if (attachment) messageData.attachment = attachment
  if (replyTo) messageData.replyTo = { id: replyTo.id, text: replyTo.text, senderId: replyTo.senderId }
  await addDoc(collection(conversationRef, 'messages'), { ...messageData, seenBy: [senderId] })
  const recipients = (conversationData.memberIds || []).filter((id: string) => id !== senderId)
  const unreadUpdates = Object.fromEntries(recipients.map((id: string) => [`unreadCounts.${id}`, increment(1)]))
  await updateDoc(conversationRef, { lastMessage: attachment ? `📎 ${attachment.name}` : text, lastMessageAt: serverTimestamp(), ...unreadUpdates })
}

export async function unsendMessage(conversationId: string, messageId: string) {
  if (!db) return
  await deleteDoc(doc(db, 'conversations', conversationId, 'messages', messageId))
  const remaining = await getDocs(query(collection(db, 'conversations', conversationId, 'messages'), orderBy('createdAt', 'desc'), limit(1)))
  const conversationRef = doc(db, 'conversations', conversationId)
  if (remaining.empty) await updateDoc(conversationRef, { lastMessage: '', lastMessageAt: null })
  else {
    const latest = remaining.docs[0].data()
    await updateDoc(conversationRef, { lastMessage: String(latest.text || (latest.attachment ? `📎 ${latest.attachment.name || 'Attachment'}` : '')), lastMessageAt: latest.createdAt || null })
  }
}

export async function deleteConversation(conversationId: string, uid: string) {
  if (!db) return
  const ref = doc(db, 'conversations', conversationId); const snapshot = await getDoc(ref)
  if (!snapshot.exists() || !(snapshot.data().memberIds || []).includes(uid)) throw new Error('You cannot delete this conversation.')
  const messages = await getDocs(collection(ref, 'messages'))
  for (let start = 0; start < messages.docs.length; start += 450) {
    const batch = writeBatch(db)
    messages.docs.slice(start, start + 450).forEach(message => batch.delete(message.ref))
    await batch.commit()
  }
  await deleteDoc(ref)
}

export async function markConversationRead(conversationId: string, uid: string) {
  if (!db) return
  const conversationRef = doc(db, 'conversations', conversationId)
  const snapshot = await getDocs(collection(conversationRef, 'messages'))
  const unread = snapshot.docs.filter(item => !(item.data().seenBy || []).includes(uid))
  for (let start = 0; start < unread.length; start += 450) {
    const batch = writeBatch(db)
    unread.slice(start, start + 450).forEach(item => batch.update(item.ref, { seenBy: arrayUnion(uid) }))
    await batch.commit()
  }
  await updateDoc(conversationRef, { [`unreadCounts.${uid}`]: 0 })
}

export async function touchPresence(uid: string, activeStatus: boolean) {
  if (!db) return
  await updateDoc(doc(db, 'users', uid), { activeStatus, lastSeen: serverTimestamp() })
}

export async function findUsers(search: string, currentUid: string): Promise<UserProfile[]> {
  if (!db || !search.trim()) return []
  const term = search.trim().toLowerCase()
  const snapshot = await getDocs(query(collection(db, 'users'), where('username', '>=', term), where('username', '<=', `${term}\uf8ff`), limit(12)))
  const blocked = await listBlockedUsers(currentUid)
  const blockedIds = new Set(blocked.map(item => item.blockedId))
  return snapshot.docs.filter(item => item.id !== currentUid && !blockedIds.has(item.id) && item.data().discoverable !== false).map(item => profileFromDoc(item.id, item.data()))
}

export async function getFriendship(uid: string, otherUid: string): Promise<'friends' | 'requested' | 'incoming' | 'none'> {
  if (!db || !uid || !otherUid) return 'none'
  const friendship = await getDoc(doc(db, 'friendships', [uid, otherUid].sort().join('_')))
  if (friendship.exists() && friendship.data().status === 'accepted') return 'friends'
  const outgoing = await getDoc(doc(db, 'friendRequests', `${uid}_${otherUid}`))
  if (outgoing.exists() && outgoing.data().status === 'pending') return 'requested'
  const incoming = await getDoc(doc(db, 'friendRequests', `${otherUid}_${uid}`))
  if (incoming.exists() && incoming.data().status === 'pending') return 'incoming'
  return 'none'
}

export async function listFriends(uid: string): Promise<UserProfile[]> {
  if (!db) return []
  const snapshot = await getDocs(query(collection(db, 'friendships'), where('memberIds', 'array-contains', uid)))
  const ids = snapshot.docs.filter(item => item.data().status === 'accepted').flatMap(item => (item.data().memberIds || []).map(String)).filter(id => id !== uid)
  const profiles = await Promise.all([...new Set(ids)].map(id => getUserProfile(id)))
  return profiles.filter((profile): profile is UserProfile => Boolean(profile))
}

export async function sendFriendRequest(fromUid: string, toUid: string) {
  if (!db || fromUid === toUid) return
  if (await isBlockedBetween(fromUid, toUid)) throw new Error('You cannot send a request to this user.')
  const relationship = await getFriendship(fromUid, toUid)
  if (relationship === 'friends') throw new Error('You are already friends.')
  if (relationship === 'requested') throw new Error('Friend request already sent.')
  if (relationship === 'incoming') throw new Error('This user already sent you a request. Open your requests to accept it.')
  await setDoc(doc(db, 'friendRequests', `${fromUid}_${toUid}`), { fromUid, toUid, status: 'pending', createdAt: serverTimestamp() })
}

export async function respondToFriendRequest(fromUid: string, toUid: string, accept: boolean) {
  if (!db) return
  if (await isBlockedBetween(fromUid, toUid)) throw new Error('This request is no longer available.')
  const requestRef = doc(db, 'friendRequests', `${fromUid}_${toUid}`)
  if (accept) {
    const batch = writeBatch(db)
    batch.update(requestRef, { status: 'accepted', respondedAt: serverTimestamp() })
    batch.set(doc(db, 'friendships', [fromUid, toUid].sort().join('_')), { memberIds: [fromUid, toUid], status: 'accepted', createdAt: serverTimestamp() })
    batch.set(doc(db, 'conversations', [fromUid, toUid].sort().join('_')), { type: 'direct', memberIds: [fromUid, toUid], createdBy: toUid, lastMessage: '', lastMessageAt: null, createdAt: serverTimestamp() }, { merge: true })
    await batch.commit()
  } else await updateDoc(requestRef, { status: 'declined', respondedAt: serverTimestamp() })
}

export function watchFriendRequests(uid: string, callback: (items: FriendRequest[]) => void): Unsubscribe | undefined {
  if (!db) return undefined
  let incoming: FriendRequest[] = []; let outgoing: FriendRequest[] = []
  const emit = () => callback([...incoming, ...outgoing])
  const incomingUnsub = onSnapshot(query(collection(db, 'friendRequests'), where('toUid', '==', uid)), snapshot => { incoming = snapshot.docs.filter(item => item.data().status === 'pending').map(item => ({ id: item.id, fromUid: String(item.data().fromUid), toUid: String(item.data().toUid), status: 'pending', createdAt: asTimestamp(item.data().createdAt) })); emit() })
  const outgoingUnsub = onSnapshot(query(collection(db, 'friendRequests'), where('fromUid', '==', uid)), snapshot => { outgoing = snapshot.docs.filter(item => item.data().status === 'pending').map(item => ({ id: item.id, fromUid: String(item.data().fromUid), toUid: String(item.data().toUid), status: 'pending', createdAt: asTimestamp(item.data().createdAt) })); emit() })
  return () => { incomingUnsub(); outgoingUnsub() }
}

function profileFromDoc(uid: string, data: DocumentData): UserProfile { return { uid, displayName: String(data.displayName || 'Co-Chat member'), email: String(data.email || ''), username: String(data.username || ''), photoURL: String(data.photoURL || ''), bio: String(data.bio || ''), notificationsEnabled: data.notificationsEnabled !== false, discoverable: data.discoverable !== false, activeStatus: data.activeStatus !== false, lastSeen: asTimestamp(data.lastSeen) } }

export async function createConversation(uid: string, other: UserProfile) {
  if (!db) return ''
  if (!uid || !other.uid || uid === other.uid) throw new Error('Choose another user to start a conversation.')
  if (await isBlockedBetween(uid, other.uid)) throw new Error('You cannot message this user.')
  const relationship = await getFriendship(uid, other.uid)
  if (relationship !== 'friends') throw new Error('You can message this person after they accept your friend request.')
  const id = [uid, other.uid].sort().join('_')
  const ref = doc(db, 'conversations', id)
  const existing = await getDoc(ref)
  if (!existing.exists()) await setDoc(ref, { type: 'direct', name: other.displayName || other.username, memberIds: [uid, other.uid], createdBy: uid, lastMessage: '', lastMessageAt: serverTimestamp(), createdAt: serverTimestamp() })
  return id
}

export async function createGroup(uid: string, name: string, members: UserProfile[]) {
  if (!db) return ''
  const memberIds = [...new Set([uid, ...members.map(member => member.uid)])]
  if (memberIds.length < 3) throw new Error('Choose at least two friends for a group.')
  for (const member of members) if (await getFriendship(uid, member.uid) !== 'friends') throw new Error('Groups can only include your accepted friends.')
  const ref = doc(collection(db, 'conversations'))
  await setDoc(ref, { type: 'group', name: name.trim() || 'New group', memberIds, adminId: uid, lastMessage: '', lastMessageAt: serverTimestamp(), createdBy: uid, createdAt: serverTimestamp() })
  return ref.id
}

export async function updateGroup(conversationId: string, uid: string, name: string) {
  if (!db) return
  const ref = doc(db, 'conversations', conversationId); const snapshot = await getDoc(ref)
  if (!snapshot.exists() || snapshot.data().adminId !== uid) throw new Error('Only the group admin can edit this group.')
  await updateDoc(ref, { name: name.trim().slice(0, 80) || 'Group chat' })
}

export async function removeGroupMember(conversationId: string, uid: string, memberUid: string) {
  if (!db) return
  const ref = doc(db, 'conversations', conversationId); const snapshot = await getDoc(ref); const data = snapshot.data()
  if (!snapshot.exists() || data?.adminId !== uid) throw new Error('Only the group admin can remove members.')
  await updateDoc(ref, { memberIds: (data.memberIds || []).filter((id: string) => id !== memberUid) })
}

export async function leaveGroup(conversationId: string, uid: string) {
  if (!db) return
  const ref = doc(db, 'conversations', conversationId); const snapshot = await getDoc(ref); const data = snapshot.data()
  if (!snapshot.exists() || data?.type !== 'group' || !Array.isArray(data.memberIds) || !data.memberIds.includes(uid)) throw new Error('You are not a member of this group.')
  if (data.adminId === uid) throw new Error('The group admin must assign another admin before leaving.')
  await updateDoc(ref, { memberIds: data.memberIds.filter((id: string) => id !== uid) })
}

export async function addGroupMembers(conversationId: string, uid: string, members: UserProfile[]) {
  if (!db || !members.length) return
  const ref = doc(db, 'conversations', conversationId); const snapshot = await getDoc(ref); const data = snapshot.data()
  if (!snapshot.exists() || data?.type !== 'group' || !Array.isArray(data.memberIds) || !data.memberIds.includes(uid)) throw new Error('Only group members can add members.')
  const current = Array.isArray(data.memberIds) ? data.memberIds.map(String) : []
  const additions = [...new Set(members.map(member => member.uid))].filter(id => !current.includes(id) && id !== uid)
  for (const member of members) if (additions.includes(member.uid) && await getFriendship(uid, member.uid) !== 'friends') throw new Error('You can only add accepted friends.')
  if (additions.length) await updateDoc(ref, { memberIds: [...current, ...additions] })
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

export async function saveProfile(uid: string, values: Pick<UserProfile, 'displayName' | 'username' | 'bio' | 'notificationsEnabled' | 'discoverable'> & { activeStatus?: boolean }) {
  if (!db) return
  const userRef = doc(db, 'users', uid)
  const current = await getDoc(userRef)
  const oldUsername = current.exists() ? normalizeUsername(String(current.data().username || '')) : ''
  const username = normalizeUsername(values.username)
  if (username.length < 3) throw new Error('Username must be at least 3 characters.')
  await reserveUsername(uid, username, uid)
  await updateDoc(userRef, { displayName: values.displayName.trim(), username, bio: String(values.bio || '').trim().slice(0, 280), notificationsEnabled: values.notificationsEnabled, discoverable: values.discoverable, activeStatus: values.activeStatus !== false, updatedAt: serverTimestamp() })
  if (oldUsername && oldUsername !== username) {
    const oldRef = doc(db, 'usernames', oldUsername)
    const old = await getDoc(oldRef)
    if (old.exists() && old.data().uid === uid) await deleteDoc(oldRef)
  }
}

export function watchCalls(uid: string, callback: (items: CallRecord[]) => void): Unsubscribe | undefined {
  if (!db) return undefined
  return onSnapshot(query(collection(db, 'calls'), where('memberIds', 'array-contains', uid), limit(50)), snapshot => callback(snapshot.docs.map(item => { const data = item.data(); const type: CallRecord['type'] = data.type === 'video' ? 'video' : 'audio'; return { id: item.id, type, status: String(data.status || 'completed'), memberIds: Array.isArray(data.memberIds) ? data.memberIds : [], callerId: String(data.callerId || ''), calleeId: String(data.calleeId || ''), createdAt: asTimestamp(data.createdAt) } }).sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0))))
}

export async function createCall(memberIds: string[], type: 'audio' | 'video', initiatorId?: string) {
  if (!db) return
  const unique = [...new Set(memberIds)].sort()
  if (unique.length !== 2) throw new Error('Calls are available between two people only.')
  const callerId = initiatorId && unique.includes(initiatorId) ? initiatorId : unique[0]; const calleeId = unique.find(id => id !== callerId) || unique[1]
  if (await isBlockedBetween(callerId, calleeId)) throw new Error('You cannot call this user.')
  if (await getFriendship(callerId, calleeId) !== 'friends') throw new Error('You can call this person after becoming friends.')
  const callId = unique.slice().sort().join('_')
  const callRef = doc(db, 'calls', callId)
  await runTransaction(db, async transaction => {
    const existing = await transaction.get(callRef)
    if (existing.exists() && ['ringing', 'connected'].includes(String(existing.data().status || ''))) {
      throw new Error('This conversation already has an active call.')
    }
    transaction.set(callRef, { memberIds: unique, callerId, calleeId, type, status: 'ringing', createdAt: serverTimestamp(), callerCandidates: [], calleeCandidates: [] })
  })
  return callId
}

export async function declineCall(callId: string) {
  if (!db) return
  await updateDoc(doc(db, 'calls', callId), { status: 'declined', endedAt: serverTimestamp() })
}
