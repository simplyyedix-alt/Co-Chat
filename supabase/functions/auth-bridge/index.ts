const corsHeaders = {
  'Access-Control-Allow-Origin': Deno.env.get('APP_ORIGIN') || '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function response(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (request.method !== 'POST') return response({ error: 'POST required' }, 405)

  const header = request.headers.get('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : ''
  const apiKey = Deno.env.get('FIREBASE_WEB_API_KEY') || ''
  if (!token || !apiKey) return response({ error: 'Missing identity configuration' }, 500)

  const verification = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken: token }),
  })
  if (!verification.ok) return response({ error: 'Invalid Firebase identity token' }, 401)
  const payload = await verification.json() as { users?: Array<{ localId?: string; email?: string; displayName?: string; photoUrl?: string }> }
  const user = payload.users?.[0]
  if (!user?.localId) return response({ error: 'Identity could not be verified' }, 401)

  return response({ uid: user.localId, email: user.email || '', displayName: user.displayName || '', photoURL: user.photoUrl || '' })
})
