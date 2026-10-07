import { getDownloadURL, ref, uploadBytes, deleteObject, getMetadata as getStorageMetadata } from 'firebase/storage'
import { storage } from '../firebase'

export type UploadMetadata = { ownerId: string; originalName: string; mimeType: string; sizeBytes: number; conversationId?: string }
export type StorageObject = { provider: string; storageKey: string; url: string; originalName: string; mimeType: string; sizeBytes: number }

export interface StorageProvider {
  upload(file: File, metadata: UploadMetadata): Promise<StorageObject>
  download(storageKey: string): Promise<string>
  delete(storageKey: string): Promise<void>
  getMetadata(storageKey: string): Promise<{ sizeBytes: number; mimeType: string }>
}

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'application/pdf', 'text/plain'])
const maxFileSize = 50 * 1024 * 1024
const mediaApiUrl = (import.meta.env.VITE_MEDIA_API_URL || '').replace(/\/$/, '')

function validateFile(file: File) {
  if (!allowedTypes.has(file.type)) throw new Error('This file type is not supported.')
  if (file.size > maxFileSize) throw new Error('Files must be smaller than 50 MB.')
}

const firebaseProvider: StorageProvider = {
  async upload(file, metadata) {
    if (!storage) throw new Error('Media storage is not configured.')
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const storageKey = `conversation-media/${metadata.conversationId || 'shared'}/${metadata.ownerId}/${crypto.randomUUID()}-${safeName}`
    const fileRef = ref(storage, storageKey)
    await uploadBytes(fileRef, file, { contentType: file.type })
    return { provider: 'firebase-compatibility', storageKey, url: await getDownloadURL(fileRef), originalName: file.name, mimeType: file.type, sizeBytes: file.size }
  },
  download: async storageKey => storage ? getDownloadURL(ref(storage, storageKey)) : Promise.reject(new Error('Media storage is not configured.')),
  delete: async storageKey => { if (storage) await deleteObject(ref(storage, storageKey)) },
  getMetadata: async storageKey => { if (!storage) throw new Error('Media storage is not configured.'); const value = await getStorageMetadata(ref(storage, storageKey)); return { sizeBytes: value.size, mimeType: value.contentType || 'application/octet-stream' } },
}

// B2 is primary and IDrive e2 is the fallback behind this server endpoint.
// The browser receives a short-lived result only; provider keys never ship here.
const managedProvider: StorageProvider = {
  async upload(file, metadata) {
    const body = new FormData()
    body.append('file', file)
    body.append('metadata', JSON.stringify(metadata))
    const response = await fetch(`${mediaApiUrl}/upload`, { method: 'POST', body })
    if (!response.ok) throw new Error('Media upload failed.')
    return response.json() as Promise<StorageObject>
  },
  async download(storageKey) {
    const response = await fetch(`${mediaApiUrl}/download?key=${encodeURIComponent(storageKey)}`)
    if (!response.ok) throw new Error('Media is unavailable.')
    const value = await response.json() as { url: string }
    return value.url
  },
  async delete(storageKey) {
    const response = await fetch(`${mediaApiUrl}/delete`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ storageKey }) })
    if (!response.ok) throw new Error('Media deletion failed.')
  },
  async getMetadata(storageKey) {
    const response = await fetch(`${mediaApiUrl}/metadata?key=${encodeURIComponent(storageKey)}`)
    if (!response.ok) throw new Error('Media metadata is unavailable.')
    return response.json()
  },
}

// The provider is intentionally selected in one place. A secure B2 provider can replace this
// without changing chat, Twitt, or profile code; B2 credentials must never ship to the browser.
export const StorageManager = {
  async upload(file: File, metadata: UploadMetadata) { validateFile(file); return mediaApiUrl ? managedProvider.upload(file, metadata) : firebaseProvider.upload(file, metadata) },
  download: (storageKey: string) => mediaApiUrl ? managedProvider.download(storageKey) : firebaseProvider.download(storageKey),
  delete: (storageKey: string) => mediaApiUrl ? managedProvider.delete(storageKey) : firebaseProvider.delete(storageKey),
  getMetadata: (storageKey: string) => mediaApiUrl ? managedProvider.getMetadata(storageKey) : firebaseProvider.getMetadata(storageKey),
}
