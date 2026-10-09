import { Timestamp, type Unsubscribe } from 'firebase/firestore'
import { auth } from '../firebase'
import { supabase, supabaseAnonKey, supabaseProjectUrl, supabaseReady } from '../supabase'
import type { ChatAttachment, ChatMessage, Conversation } from './chat'
import type { UserProfile } from './chat'

const enabled = import.meta.env.VITE_CHAT_BACKEND === 'supabase' && supabaseReady
const endpoint = `${supabaseProjectUrl.replace(/\/$/, '')}/functions/v1/chat-api`

const timestamp = (value: unknown) => {
  if (!value) return null
  const date = new Date(String(value))
  return Number.isNaN(date.getTime()) ? null : Timestamp.fromDate(date)
}

async function request<T>(payload: Record<string, unknown>): Promise<T> {
  const token = await auth?.currentUser?.getIdToken()
  if (!token) throw new Error('Please sign in before using chat.')
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 10000)
  let response: Response
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, apikey: supabaseAnonKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
  } finally {
    window.clearTimeout(timeout)
  }
  const data = await response.json().catch(() => null)
  if (!response.ok) throw new Error(typeof data?.error === 'string' ? data.error : `Chat request failed (${response.status})`)
  return data as T
}

const attachment = (value: unknown): ChatAttachment | null => {
  if (!value || typeof value !== 'object') return null
  const item = value as Record<string, unknown>
  return { name: String(item.name || 'file'), url: String(item.url || ''), type: String(item.type || ''), size: Number(item.size || 0) }
}

export function isSupabaseChatEnabled() { return enabled }

export type StudyLeaderboardEntry = { uid: string; displayName: string; username: string; photoURL: string; weeklySeconds: number; totalSeconds: number; active: boolean; label: string }
export type StudyStats = { totalSeconds: number; weeklySeconds: number; weekKey: string; studyDays: string[] }

const profileFromRow = (row: Record<string, unknown> | null | undefined): UserProfile | null => {
  if (!row?.uid) return null
  return { uid: String(row.uid), displayName: String(row.display_name || 'Co-Chat member'), email: String(row.email || ''), username: String(row.username || ''), photoURL: String(row.photo_url || ''), bio: String(row.bio || ''), notificationsEnabled: row.notifications_enabled !== false, discoverable: row.discoverable !== false, activeStatus: row.active_status !== false, lastSeen: timestamp(row.last_seen), profileComplete: true }
}

export async function upsertProfile(uid: string, profile: Partial<UserProfile>) {
  await request({ action: 'profile-upsert', displayName: profile.displayName || '', email: profile.email || '', photoURL: profile.photoURL || '', username: profile.username || '', bio: profile.bio || '', notificationsEnabled: profile.notificationsEnabled, discoverable: profile.discoverable, activeStatus: profile.activeStatus })
  return true
}

export async function saveStudySession(seconds: number, weekKey: string, studyDay?: string) {
  return request<StudyStats & { ok: boolean }>({ action: 'study-save', seconds, weekKey, studyDay })
}

export async function getStudyStats(weekKey: string): Promise<StudyStats> {
  const data = await request<StudyStats>({ action: 'study-stats', weekKey })
  return { totalSeconds: Number(data.totalSeconds || 0), weeklySeconds: Number(data.weeklySeconds || 0), weekKey: String(data.weekKey || weekKey), studyDays: Array.isArray(data.studyDays) ? data.studyDays.filter((day): day is string => typeof day === 'string') : [] }
}

export async function updateStudyPresence(active: boolean, label = '') {
  await request({ action: 'study-presence', active, label })
}

export async function getStudyLeaderboard(mode: 'friends' | 'public', uids: string[], weekKey: string) {
  const data = await request<{ items?: StudyLeaderboardEntry[] }>({ action: 'study-leaderboard', mode, uids, weekKey })
  return Array.isArray(data.items) ? data.items : []
}

export async function getProfile(uid: string): Promise<UserProfile | null> {
  const data = await request<{ profile?: Record<string, unknown> | null }>({ action: 'profile', uid })
  return profileFromRow(data.profile)
}

export async function listConversations(uid: string): Promise<Conversation[]> {
  const data = await request<{ items?: Record<string, unknown>[] }>({ action: 'conversations' })
  return (data.items || []).map(item => {
    const nested = (item.conversations || {}) as Record<string, unknown>
    const members = Array.isArray(item.member_ids) ? item.member_ids.map(value => typeof value === 'object' && value ? String((value as Record<string, unknown>).uid || '') : String(value)) : []
    const profile = profileFromRow(item.other_profile as Record<string, unknown> | null)
    const name = String(nested.type === 'group' ? (nested.name || 'Group chat') : (profile?.displayName || nested.name || 'Conversation'))
    const lastSeen = profile?.lastSeen || null
    const lastSeenMs = lastSeen?.toMillis() || 0
    return {
      id: String(nested.id || item.conversation_id || ''), name, memberIds: members,
      type: nested.type === 'group' ? ('group' as const) : ('direct' as const), adminId: nested.admin_id ? String(nested.admin_id) : undefined,
      lastMessage: String(nested.last_message || ''), lastSenderId: nested.last_sender_id ? String(nested.last_sender_id) : undefined,
      lastMessageAt: timestamp(nested.last_message_at), createdAt: timestamp(nested.created_at), username: profile?.username || '',
      avatar: name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase() || 'U',
      active: profile?.activeStatus !== false && lastSeenMs > 0 && Date.now() - lastSeenMs < 90000, lastSeen, photoURL: String(nested.type === 'group' ? (nested.photo_url || '') : (profile?.photoURL || '')), unreadCount: Number(item.unread_count || 0), hiddenFor: item.hidden_at ? [uid] : [],
    }
  }).filter(item => item.id && !item.hiddenFor?.includes(uid)).sort((a, b) => (b.lastMessageAt?.toMillis() || b.createdAt?.toMillis() || 0) - (a.lastMessageAt?.toMillis() || a.createdAt?.toMillis() || 0)).filter((item, index, items) => item.type !== 'direct' || items.findIndex(candidate => candidate.type === 'direct' && [...candidate.memberIds].sort().join(':') === [...item.memberIds].sort().join(':')) === index)
}

export async function listMessages(conversationId: string, uid: string, since?: number): Promise<ChatMessage[]> {
  const data = await request<{ items?: Record<string, unknown>[] }>({ action: 'messages', conversationId, ...(since ? { since: new Date(since).toISOString() } : {}) })
  return (data.items || []).map(item => ({
    id: String(item.id || ''), text: String(item.text || ''), senderId: String(item.sender_id || ''), createdAt: timestamp(item.created_at),
    attachment: attachment(item.attachment), sneak: item.sneak ? { recipientId: String((item.sneak as Record<string, unknown>).recipient_id || (item.sneak as Record<string, unknown>).recipientId || ''), state: String((item.sneak as Record<string, unknown>).state || 'unopened') as 'unopened' | 'consumed' | 'expired', expiresAt: timestamp((item.sneak as Record<string, unknown>).expires_at || (item.sneak as Record<string, unknown>).expiresAt), consumedAt: timestamp((item.sneak as Record<string, unknown>).consumed_at || (item.sneak as Record<string, unknown>).consumedAt) } : undefined, replyTo: item.reply_to ? { id: String((item.reply_to as Record<string, unknown>).id || ''), text: String((item.reply_to as Record<string, unknown>).text || ''), senderId: String((item.reply_to as Record<string, unknown>).senderId || (item.reply_to as Record<string, unknown>).sender_id || '') } : null,
    seenBy: Array.isArray(item.seen_by) ? item.seen_by.map(String) : [], hiddenFor: Array.isArray(item.hidden_for) ? item.hidden_for.map(String) : [],
  })).filter(item => !item.hiddenFor?.includes(uid)).sort((a, b) => (a.createdAt?.toMillis() || 0) - (b.createdAt?.toMillis() || 0))
}

export function watchConversations(uid: string, callback: (items: Conversation[]) => void): Unsubscribe {
  let active = true
  let inFlight = false
  let fallbackTimer: number | null = null
  const refresh = () => {
    if (!active || inFlight || document.visibilityState === 'hidden') return
    inFlight = true
    void listConversations(uid).then(items => { if (active) callback(items) }).catch(() => undefined).finally(() => { inFlight = false })
  }
  refresh()
  const startFallback = () => { if (fallbackTimer === null) fallbackTimer = window.setInterval(refresh, 10000) }
  const stopFallback = () => { if (fallbackTimer !== null) { window.clearInterval(fallbackTimer); fallbackTimer = null } }
  const fallbackStart = window.setTimeout(startFallback, 5000)
  const channel = supabase?.channel(`chat-conversations:${uid}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'conversation_members', filter: `uid=eq.${uid}` }, refresh)
    .subscribe((status) => { if (status === 'SUBSCRIBED') { window.clearTimeout(fallbackStart); stopFallback() } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') startFallback() })
  const onVisibilityChange = () => { if (document.visibilityState === 'visible') refresh() }
  document.addEventListener('visibilitychange', onVisibilityChange)
  return () => { active = false; window.clearTimeout(fallbackStart); stopFallback(); document.removeEventListener('visibilitychange', onVisibilityChange); if (channel) void supabase?.removeChannel(channel) }
}

export function watchMessages(conversationId: string, uid: string, callback: (items: ChatMessage[]) => void): Unsubscribe {
  let active = true
  let inFlight = false
  let fallbackTimer: number | null = null
  let latestSyncedAt = 0
  const syncedMessages = new Map<string, ChatMessage>()
  const refresh = (full = false) => {
    if (!active || inFlight || document.visibilityState === 'hidden') return
    inFlight = true
    const since = full ? undefined : latestSyncedAt || undefined
    void listMessages(conversationId, uid, since).then(items => {
      if (!active) return
      if (!since) {
        syncedMessages.clear()
        items.forEach(item => syncedMessages.set(item.id, item))
        latestSyncedAt = items.reduce((max, item) => Math.max(max, item.createdAt?.toMillis() || 0), 0)
        callback([...syncedMessages.values()])
        return
      }
      // Incremental responses are merged by ID so reconnects and duplicate
      // realtime events cannot duplicate a message or change its ordering.
      items.forEach(item => syncedMessages.set(item.id, item))
      callback([...syncedMessages.values()].sort((a, b) => (a.createdAt?.toMillis() || 0) - (b.createdAt?.toMillis() || 0)))
      latestSyncedAt = Math.max(latestSyncedAt, ...items.map(item => item.createdAt?.toMillis() || 0))
    }).catch(() => undefined).finally(() => { inFlight = false })
  }
  refresh(true)
  const startFallback = () => { if (fallbackTimer === null) fallbackTimer = window.setInterval(() => refresh(), 10000) }
  const stopFallback = () => { if (fallbackTimer !== null) { window.clearInterval(fallbackTimer); fallbackTimer = null } }
  const fallbackStart = window.setTimeout(startFallback, 5000)
  const channel = supabase?.channel(`chat-messages:${conversationId}`)
    .on('broadcast', { event: 'message' }, () => refresh())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversationId}` }, (payload) => refresh(payload.eventType === 'UPDATE'))
    .subscribe((status) => { if (status === 'SUBSCRIBED') { window.clearTimeout(fallbackStart); stopFallback() } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') startFallback() })
  const onVisibilityChange = () => { if (document.visibilityState === 'visible') refresh() }
  document.addEventListener('visibilitychange', onVisibilityChange)
  return () => { active = false; window.clearTimeout(fallbackStart); stopFallback(); document.removeEventListener('visibilitychange', onVisibilityChange); if (channel) void supabase?.removeChannel(channel) }
}

export async function sendMessage(conversationId: string, text: string, attachmentValue: ChatAttachment | null, replyTo?: ChatMessage | null) {
  return request({ action: 'send-message', conversationId, text, attachment: attachmentValue, replyTo: replyTo ? { id: replyTo.id, text: replyTo.text, senderId: replyTo.senderId } : null })
}

export async function sendSneak(conversationId: string, recipientId: string, attachmentValue: ChatAttachment) {
  await request({ action: 'send-sneak', conversationId, recipientId, attachment: attachmentValue })
}

export async function consumeSneak(conversationId: string, messageId: string) {
  return request<{ url: string; type: string }>({ action: 'consume-sneak', conversationId, messageId })
}

export async function createDirect(otherUid: string, name: string) {
  const data = await request<{ id?: string }>({ action: 'create-direct', otherUid, name })
  return String(data.id || '')
}

export async function createGroup(name: string, memberIds: string[]) {
  const data = await request<{ id?: string }>({ action: 'create-group', name, memberIds })
  return String(data.id || '')
}

export async function updateGroup(conversationId: string, name: string, photoURL = '') {
  await request({ action: 'update-group', conversationId, name, photoURL })
}

export async function addGroupMembers(conversationId: string, memberIds: string[]) {
  await request({ action: 'add-group-members', conversationId, memberIds })
}

export async function removeGroupMember(conversationId: string, memberUid: string) {
  await request({ action: 'remove-group-member', conversationId, memberUid })
}

export async function leaveGroup(conversationId: string) {
  await request({ action: 'leave-group', conversationId })
}

export async function deleteConversation(conversationId: string) {
  await request({ action: 'delete-conversation', conversationId })
}

export async function markRead(conversationId: string) { await request({ action: 'mark-read', conversationId }) }
export async function unsend(conversationId: string, messageId: string) { await request({ action: 'unsend-message', conversationId, messageId }) }
export async function deleteForMe(conversationId: string, messageId: string) { await request({ action: 'delete-message-for-me', conversationId, messageId }) }
