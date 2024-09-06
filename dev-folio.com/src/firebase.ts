import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  browserLocalPersistence,
  connectAuthEmulator,
  getAuth,
  setPersistence,
} from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions'
import { getPerformance } from 'firebase/performance'
import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check'

const firebaseConfig = {
  apiKey: 'AIzaSyC4wlr5LjBuOj-scXHNZiRbCxUDl90JFuw',
  authDomain: 'dev-folio-com.firebaseapp.com',
  projectId: 'dev-folio-com',
  storageBucket: 'dev-folio-com.appspot.com',
  messagingSenderId: '264351709313',
  appId: '1:264351709313:web:5ed6e9403f61bf9987b580',
  measurementId: 'G-RCBGC5S7R8',
}

const app = initializeApp(firebaseConfig)

export const analytics = getAnalytics(app)

export const auth = getAuth(app)

export const db = getFirestore(app)

export const storage = getStorage(app)

export const functions = getFunctions(app)

export const deployPortfolio = httpsCallable<void, { message: string }>(functions, 'deployPortfolio')

export const getOpenGraphImage = httpsCallable<{ url: string }, { imageUrl: string }>(functions, 'getOpenGraphImage')

export const checkSubdomain = httpsCallable<{ subdomain: string }, { exists: boolean }>(functions, 'checkSubdomain')

export const deleteSubdomain = httpsCallable<{ subdomain: string }, { message: string }>(functions, 'deleteSubdomain')

export const applyCustomDomain = httpsCallable<void, { message: string }>(functions, 'applyCustomDomain')

try {
  getPerformance(app)
}
catch {
  // performance seems to only work in production
}

export const persistancePromise = setPersistence(auth, browserLocalPersistence)

export const googleProvider = new GoogleAuthProvider()

export const githubProvider = new GithubAuthProvider()

githubProvider.addScope('user:email')

export const logAnalytics = (eventName: string, eventParams?: Record<string, any>) => {
  if (!import.meta.env.PROD) return

  logEvent(analytics, eventName, eventParams)
}

if (import.meta.env.DEV) {
  console.log('INFO: Using Firebase emulators')

  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectStorageEmulator(storage, 'localhost', 9199)
  connectFunctionsEmulator(functions, '127.0.0.1', 5001)
}

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LeAsTEqAAAAAFkBMpH2_AoDNg0o60nRgfozKhP6'),
  isTokenAutoRefreshEnabled: true,
})
