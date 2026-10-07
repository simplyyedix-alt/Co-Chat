import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabaseReady = Boolean(supabaseUrl && supabaseAnonKey)
export const supabaseProjectUrl = supabaseUrl
export { supabaseAnonKey }
export const socialBackend: 'firebase' | 'supabase' = import.meta.env.VITE_SOCIAL_BACKEND === 'supabase' && supabaseReady ? 'supabase' : 'firebase'
export const supabase = supabaseReady
  ? createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false, autoRefreshToken: false } })
  : null

export async function verifyFirebaseIdentity(idToken: string) {
  if (!supabaseReady) throw new Error('Supabase is not configured.')
  const result = await fetch(`${supabaseUrl}/functions/v1/auth-bridge`, {
    method: 'POST',
    headers: { apikey: supabaseAnonKey, Authorization: `Bearer ${idToken}`, 'Content-Type': 'application/json' },
  })
  const data = await result.json().catch(() => null)
  if (!result.ok) throw new Error(typeof data?.error === 'string' ? data.error : `Identity verification failed (${result.status})`)
  return data as { uid: string; email: string; displayName: string; photoURL: string }
}

export async function invokeSocialApi(idToken: string, payload: { action: 'feed' | 'comments' | 'create' | 'view' | 'like' | 'comment' | 'delete-twitt' | 'hide' | 'comment-like' | 'delete-comment'; twittId?: string; commentId?: string; text?: string; community?: string; cursor?: string | null }) {
  if (!supabaseReady) throw new Error('Supabase is not configured.')
  const result = await fetch(`${supabaseUrl}/functions/v1/social-api`, {
    method: 'POST',
    headers: { apikey: supabaseAnonKey, Authorization: `Bearer ${idToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await result.json().catch(() => null)
  if (!result.ok) throw new Error(typeof data?.error === 'string' ? data.error : `Social request failed (${result.status})`)
  return data as { recorded?: boolean; liked?: boolean; id?: string; items?: unknown[] }
}
