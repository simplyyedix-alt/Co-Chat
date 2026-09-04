import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAXMyuXjnS3l8oCDbt_pfkORmlmJE094lY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'co-chatt.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'co-chatt',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:883596884512:web:eed71eaecfdf27a9b91a45',
}

export const firebaseReady = Object.values(firebaseConfig).every(Boolean)
const app = firebaseReady ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null

export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null
export const googleProvider = new GoogleAuthProvider()
