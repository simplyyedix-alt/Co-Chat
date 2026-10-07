import { Timestamp, type Unsubscribe } from 'firebase/firestore'
import { auth } from '../firebase'
import { supabaseAnonKey, supabaseProjectUrl, supabaseReady } from '../supabase'
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
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, apikey: supabaseAnonKey, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
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

const profileFromRow = (row: Record<string, unknown> | null | undefined): UserProfile | null => {
  if (!row?.uid) return null
  return { uid: String(row.uid), displayName: String(row.display_name || 'Co-Chat member'), email: String(row.email || ''), username: String(row.username || ''), photoURL: String(row.photo_url || ''), bio: String(row.bio || ''), notificationsEnabled: row.notifications_enabled !== false, discoverable: row.discoverable !== false, activeStatus: row.active_status !== false, lastSeen: timestamp(row.last_seen), profileComplete: true }
}

export async function upsertProfile(uid: string, profile: Partial<UserProfile>) {
  await request({ action: 'profile-upsert', displayName: profile.displayName || '', email: profile.email || '', photoURL: profile.photoURL || '', username: profile.username || '', bio: profile.bio || '' })
  return true
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
    return {
      id: String(nested.id || item.conversation_id || ''), name, memberIds: members,
      type: nested.type === 'group' ? ('group' as const) : ('direct' as const), adminId: nested.admin_id ? String(nested.admin_id) : undefined,
      lastMessage: String(nested.last_message || ''), lastSenderId: nested.last_sender_id ? String(nested.last_sender_id) : undefined,
      lastMessageAt: timestamp(nested.last_message_at), createdAt: timestamp(nested.created_at),
      avatar: name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase() || 'U',
      active: profile?.activeStatus !== false, lastSeen: profile?.lastSeen || null, photoURL: profile?.photoURL || '', unreadCount: Number(item.unread_count || 0), hiddenFor: item.hidden_at ? [uid] : [],
    }
  }).filter(item => item.id && !item.hiddenFor?.includes(uid)).sort((a, b) => (b.lastMessageAt?.toMillis() || b.createdAt?.toMillis() || 0) - (a.lastMessageAt?.toMillis() || a.createdAt?.toMillis() || 0)).filter((item, index, items) => item.type !== 'direct' || items.findIndex(candidate => candidate.type === 'direct' && [...candidate.memberIds].sort().join(':') === [...item.memberIds].sort().join(':')) === index)
}

export async function listMessages(conversationId: string, uid: string): Promise<ChatMessage[]> {
  const data = await request<{ items?: Record<string, unknown>[] }>({ action: 'messages', conversationId })
  return (data.items || []).map(item => ({
    id: String(item.id || ''), text: String(item.text || ''), senderId: String(item.sender_id || ''), createdAt: timestamp(item.created_at),
    attachment: attachment(item.attachment), replyTo: item.reply_to ? { id: String((item.reply_to as Record<string, unknown>).id || ''), text: String((item.reply_to as Record<string, unknown>).text || ''), senderId: String((item.reply_to as Record<string, unknown>).senderId || (item.reply_to as Record<string, unknown>).sender_id || '') } : null,
    seenBy: Array.isArray(item.seen_by) ? item.seen_by.map(String) : [], hiddenFor: Array.isArray(item.hidden_for) ? item.hidden_for.map(String) : [],
  })).filter(item => !item.hiddenFor?.includes(uid)).sort((a, b) => (a.createdAt?.toMillis() || 0) - (b.createdAt?.toMillis() || 0))
}

export function watchConversations(uid: string, callback: (items: Conversation[]) => void): Unsubscribe {
  let active = true
  const refresh = () => listConversations(uid).then(items => { if (active) callback(items) }).catch(() => undefined)
  refresh()
  const timer = window.setInterval(refresh, 7000)
  return () => { active = false; window.clearInterval(timer) }
}

export function watchMessages(conversationId: string, uid: string, callback: (items: ChatMessage[]) => void): Unsubscribe {
  let active = true
  const refresh = () => listMessages(conversationId, uid).then(items => { if (active) callback(items) }).catch(() => undefined)
  refresh()
  const timer = window.setInterval(refresh, 5000)
  return () => { active = false; window.clearInterval(timer) }
}

export async function sendMessage(conversationId: string, text: string, attachmentValue: ChatAttachment | null, replyTo?: ChatMessage | null) {
  return request({ action: 'send-message', conversationId, text, attachment: attachmentValue, replyTo: replyTo ? { id: replyTo.id, text: replyTo.text, senderId: replyTo.senderId } : null })
}

export async function createDirect(otherUid: string, name: string) {
  const data = await request<{ id?: string }>({ action: 'create-direct', otherUid, name })
  return String(data.id || '')
}

export async function deleteConversation(conversationId: string) {
  await request({ action: 'delete-conversation', conversationId })
}
