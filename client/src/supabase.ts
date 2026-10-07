import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabaseReady = Boolean(supabaseUrl && supabaseAnonKey)
export const socialBackend: 'firebase' | 'supabase' = import.meta.env.VITE_SOCIAL_BACKEND === 'supabase' && supabaseReady ? 'supabase' : 'firebase'
export const supabase = supabaseReady
  ? createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false, autoRefreshToken: false } })
  : null

export async function verifyFirebaseIdentity(idToken: string) {
  if (!supabase) throw new Error('Supabase is not configured.')
  const { data, error } = await supabase.functions.invoke('auth-bridge', { headers: { Authorization: `Bearer ${idToken}` } })
  if (error) throw error
  return data as { uid: string; email: string; displayName: string; photoURL: string }
}

export async function invokeSocialApi(idToken: string, payload: { action: 'view' | 'like' | 'comment'; twittId: string; text?: string }) {
  if (!supabase) throw new Error('Supabase is not configured.')
  const { data, error } = await supabase.functions.invoke('social-api', {
    body: payload,
    headers: { Authorization: `Bearer ${idToken}` },
  })
  if (error) throw error
  return data as { recorded?: boolean; liked?: boolean; id?: string }
}
