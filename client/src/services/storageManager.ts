import { getDownloadURL, ref, uploadBytes, deleteObject, getMetadata as getStorageMetadata } from 'firebase/storage'
import { auth, storage } from '../firebase'

export type UploadMetadata = { ownerId: string; originalName: string; mimeType: string; sizeBytes: number; conversationId?: string; twittId?: string; scope?: 'conversation' | 'twitt' }
export type StorageObject = { provider: string; storageKey: string; url: string; originalName: string; mimeType: string; sizeBytes: number }

export interface StorageProvider {
  upload(file: File, metadata: UploadMetadata): Promise<StorageObject>
  download(storageKey: string): Promise<string>
  delete(storageKey: string): Promise<void>
  getMetadata(storageKey: string): Promise<{ sizeBytes: number; mimeType: string }>
}

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'application/pdf', 'text/plain'])
const maxFileSize = 50 * 1024 * 1024
const socialAllowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'])
const socialMaxFileSize = 5 * 1024 * 1024
const mediaApiUrl = (import.meta.env.VITE_MEDIA_API_URL || '').replace(/\/$/, '')

async function mediaHeaders() {
  const token = (await auth?.currentUser?.getIdToken())?.trim()
  if (!token || /[\r\n]/.test(token)) throw new Error('Please sign in again before sharing media.')
  // The media edge function authenticates with the Firebase bearer token;
  // forwarding an untrimmed optional Supabase key can make fetch reject the
  // request before it reaches the server on Android WebViews.
  return { Authorization: `Bearer ${token}` }
}

function validateFile(file: File, metadata?: UploadMetadata) {
  if (metadata?.scope === 'twitt') {
    if (!metadata.twittId) throw new Error('Twitt media is missing its post ID.')
    if (!socialAllowedTypes.has(file.type)) throw new Error('Twitts support photos and PDF files only.')
    if (file.size > socialMaxFileSize) throw new Error('Twitt media must be smaller than 5 MB.')
    return
  }
  if (!allowedTypes.has(file.type)) throw new Error('This file type is not supported.')
  if (file.size > maxFileSize) throw new Error('Files must be smaller than 50 MB.')
}

async function optimizeTwittImage(file: File): Promise<File> {
  if (!file.type.startsWith('image/') || file.type === 'image/gif' || typeof createImageBitmap !== 'function') return file
  try {
    const bitmap = await createImageBitmap(file)
    const maxDimension = 1920
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(bitmap.width * scale))
    canvas.height = Math.max(1, Math.round(bitmap.height * scale))
    const context = canvas.getContext('2d')
    if (!context) { bitmap.close(); return file }
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    bitmap.close()
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82))
    if (!blob || blob.size >= file.size) return file
    return new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg', lastModified: file.lastModified })
  } catch {
    return file
  }
}

const firebaseProvider: StorageProvider = {
  async upload(file, metadata) {
    if (!storage) throw new Error('Media storage is not configured.')
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const prefix = metadata.scope === 'twitt' ? 'twitt-media' : 'conversation-media'
    const parent = metadata.scope === 'twitt' ? metadata.twittId || 'twitt' : metadata.conversationId || 'shared'
    const storageKey = `${prefix}/${parent}/${metadata.ownerId}/${crypto.randomUUID()}-${safeName}`
    const fileRef = ref(storage, storageKey)
    await uploadBytes(fileRef, file, { contentType: file.type })
    return { provider: 'firebase-compatibility', storageKey, url: await getDownloadURL(fileRef), originalName: file.name, mimeType: file.type, sizeBytes: file.size }
  },
  download: async storageKey => storage ? getDownloadURL(ref(storage, storageKey)) : Promise.reject(new Error('Media storage is not configured.')),
  delete: async storageKey => { if (storage) await deleteObject(ref(storage, storageKey)) },
  getMetadata: async storageKey => { if (!storage) throw new Error('Media storage is not configured.'); const value = await getStorageMetadata(ref(storage, storageKey)); return { sizeBytes: value.size, mimeType: value.contentType || 'application/octet-stream' } },
}

// Backblaze B2 is used behind this server endpoint. Provider keys never ship here.
// The browser receives a short-lived result only; provider keys never ship here.
const managedProvider: StorageProvider = {
  async upload(file, metadata) {
    const body = new FormData()
    body.append('file', file)
    body.append('metadata', JSON.stringify(metadata))
    const response = await fetch(`${mediaApiUrl}/upload`, { method: 'POST', headers: await mediaHeaders(), body })
    if (!response.ok) { const error = await response.json().catch(() => null); throw new Error(error?.error || 'Media upload failed.') }
    return response.json() as Promise<StorageObject>
  },
  async download(storageKey) {
    const response = await fetch(`${mediaApiUrl}/download?key=${encodeURIComponent(storageKey)}`, { headers: await mediaHeaders() })
    if (!response.ok) throw new Error('Media is unavailable.')
    const value = await response.json() as { url: string }
    return value.url
  },
  async delete(storageKey) {
    const response = await fetch(`${mediaApiUrl}/delete?key=${encodeURIComponent(storageKey)}`, { method: 'POST', headers: await mediaHeaders() })
    if (!response.ok) throw new Error('Media deletion failed.')
  },
  async getMetadata(storageKey) {
    const response = await fetch(`${mediaApiUrl}/metadata?key=${encodeURIComponent(storageKey)}`, { headers: await mediaHeaders() })
    if (!response.ok) throw new Error('Media metadata is unavailable.')
    return response.json()
  },
}

// The provider is intentionally selected in one place. A secure B2 provider can replace this
// without changing chat, Twitt, or profile code; B2 credentials must never ship to the browser.
export const StorageManager = {
  async upload(file: File, metadata: UploadMetadata) {
    validateFile(file, metadata)
    const prepared = metadata.scope === 'twitt' ? await optimizeTwittImage(file) : file
    return mediaApiUrl ? managedProvider.upload(prepared, { ...metadata, mimeType: prepared.type, sizeBytes: prepared.size }) : firebaseProvider.upload(prepared, { ...metadata, mimeType: prepared.type, sizeBytes: prepared.size })
  },
  download: (storageKey: string) => mediaApiUrl ? managedProvider.download(storageKey) : firebaseProvider.download(storageKey),
  delete: (storageKey: string) => mediaApiUrl ? managedProvider.delete(storageKey) : firebaseProvider.delete(storageKey),
  getMetadata: (storageKey: string) => mediaApiUrl ? managedProvider.getMetadata(storageKey) : firebaseProvider.getMetadata(storageKey),
}
