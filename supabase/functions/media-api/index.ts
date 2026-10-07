import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from 'npm:@aws-sdk/client-s3@3.758.0'
import { getSignedUrl } from 'npm:@aws-sdk/s3-request-presigner@3.758.0'

const configuredOrigin = Deno.env.get('APP_ORIGIN') || '*'
const allowedOrigin = configuredOrigin === '*' ? '*' : (() => {
  try { return new URL(configuredOrigin).origin } catch { return configuredOrigin.replace(/\/$/, '') }
})()
const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

const maxFileSize = 50 * 1024 * 1024
const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'application/pdf', 'text/plain'])
const socialMaxFileSize = 5 * 1024 * 1024
const socialAllowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'])

function response(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
}

async function verifyFirebaseToken(request: Request) {
  const header = request.headers.get('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : ''
  const apiKey = Deno.env.get('FIREBASE_WEB_API_KEY') || ''
  if (!token || !apiKey) return null
  const result = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken: token }),
  })
  if (!result.ok) return null
  const payload = await result.json() as { users?: Array<{ localId?: string }> }
  return payload.users?.[0]?.localId || null
}

function b2Config() {
  const clean = (value: string) => value.trim().replace(/^['"]|['"]$/g, '').replace(/\s+/g, '')
  let endpoint = (Deno.env.get('B2_ENDPOINT') || '').trim().replace(/\/$/, '')
  const keyId = clean(Deno.env.get('B2_KEY_ID') || '')
  const applicationKey = clean(Deno.env.get('B2_APPLICATION_KEY') || '')
  const bucket = clean(Deno.env.get('B2_BUCKET') || '')
  if (endpoint && !/^https?:\/\//i.test(endpoint)) endpoint = `https://${endpoint}`
  const region = Deno.env.get('B2_REGION')?.trim() || endpoint.match(/^https?:\/\/s3\.([^.]+)\.backblazeb2\.com$/i)?.[1] || ''
  const missing = [!endpoint && 'B2_ENDPOINT', !keyId && 'B2_KEY_ID', !applicationKey && 'B2_APPLICATION_KEY', !bucket && 'B2_BUCKET', !region && 'B2_REGION (or a regional B2_ENDPOINT)'].filter(Boolean)
  if (missing.length) throw new Error(`B2 configuration is incomplete: missing ${missing.join(', ')}`)
  return { endpoint, keyId, applicationKey, bucket, region }
}

function client() {
  const config = b2Config()
  return { config, s3: new S3Client({ region: config.region, endpoint: config.endpoint, forcePathStyle: true, credentials: { accessKeyId: config.keyId, secretAccessKey: config.applicationKey } }) }
}

function safeSegment(value: string, fallback: string) {
  const cleaned = value.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 80)
  return cleaned || fallback
}

function keyFromRequest(request: Request) {
  const key = new URL(request.url).searchParams.get('key') || ''
  if ((!key.startsWith('conversation-media/') && !key.startsWith('twitt-media/')) || key.includes('..') || key.includes('\\')) throw new Error('Invalid storage key')
  return key
}

function signedUrl(s3: S3Client, bucket: string, key: string, responseContentType?: string) {
  return getSignedUrl(s3, new GetObjectCommand({ Bucket: bucket, Key: key, ...(responseContentType ? { ResponseContentType: responseContentType } : {}) }), { expiresIn: 604800 })
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (!['GET', 'POST'].includes(request.method)) return response({ error: 'Unsupported method' }, 405)

  const uid = await verifyFirebaseToken(request)
  if (!uid) return response({ error: 'Authentication required' }, 401)

  try {
    const { config, s3 } = client()
    const url = new URL(request.url)

    if (request.method === 'POST' && url.pathname.endsWith('/upload')) {
      const form = await request.formData()
      const file = form.get('file')
      if (!(file instanceof File)) return response({ error: 'file is required' }, 400)
      let metadata: { originalName?: string; mimeType?: string; conversationId?: string; twittId?: string; scope?: string } = {}
      try { metadata = JSON.parse(String(form.get('metadata') || '{}')) } catch { return response({ error: 'Invalid metadata' }, 400) }
      const socialUpload = metadata.scope === 'twitt'
      const sizeLimit = socialUpload ? socialMaxFileSize : maxFileSize
      const typeAllowlist = socialUpload ? socialAllowedTypes : allowedTypes
      if (file.size <= 0 || file.size > sizeLimit) return response({ error: socialUpload ? 'Twitt media must be smaller than 5 MB' : 'Files must be smaller than 50 MB' }, 400)
      if (!typeAllowlist.has(file.type)) return response({ error: socialUpload ? 'Twitts support photos and PDF files only' : 'This file type is not supported' }, 400)
      if (socialUpload && !metadata.twittId) return response({ error: 'twittId is required for Twitt media' }, 400)
      const parent = safeSegment(socialUpload ? metadata.twittId || 'twitt' : metadata.conversationId || 'shared', socialUpload ? 'twitt' : 'shared')
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-120) || 'file'
      const key = `${socialUpload ? 'twitt-media' : 'conversation-media'}/${parent}/${safeSegment(uid, 'user')}/${crypto.randomUUID()}-${safeName}`
      await s3.send(new PutObjectCommand({ Bucket: config.bucket, Key: key, Body: new Uint8Array(await file.arrayBuffer()), ContentType: file.type, Metadata: { ownerid: uid, originalname: file.name.slice(0, 200) } }))
      return response({ provider: 'backblaze-b2', storageKey: key, url: await signedUrl(s3, config.bucket, key, file.type), originalName: file.name, mimeType: file.type, sizeBytes: file.size })
    }

    const key = keyFromRequest(request)
    if (url.pathname.endsWith('/download')) return response({ url: await signedUrl(s3, config.bucket, key) })
    if (url.pathname.endsWith('/metadata')) {
      const head = await s3.send(new HeadObjectCommand({ Bucket: config.bucket, Key: key }))
      return response({ sizeBytes: Number(head.ContentLength || 0), mimeType: head.ContentType || 'application/octet-stream' })
    }
    if (request.method === 'POST' && url.pathname.endsWith('/delete')) {
      await s3.send(new DeleteObjectCommand({ Bucket: config.bucket, Key: key }))
      return response({ deleted: true })
    }
    return response({ error: 'Unknown media operation' }, 404)
  } catch (error) {
    console.error(error)
    return response({ error: error instanceof Error ? error.message : 'Media operation failed' }, 400)
  }
})
