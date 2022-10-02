import admin from 'firebase-admin'
import dotenv from 'dotenv'

export const isEmulator =
  !!process.env.FUNCTIONS_EMULATOR ||
  !!process.env.FIRESTORE_EMULATOR_HOST ||
  process.env.UNIT_TEST === 'true'

export function getFirebaseAdmin(): admin.app.App {
  if (admin.apps.length && admin.apps[0]) {
    return admin.apps[0]
  }
  if (isEmulator) {
    process.env.FIRESTORE_EMULATOR_HOST = '0.0.0.0:8080'
    process.env.FIREBASE_AUTH_EMULATOR_HOST = '0.0.0.0:9099'
  }
  if (!process.env.FIREBASE_CONFIG) {
    const envFile = process.env.GCLOUD_PROJECT?.includes('dev') ? 'dev' : 'prod'
    const envPath = `../env/${envFile}.env`
    dotenv.config({ path: envPath })
  }
  const firebaseConfig = process.env.FIREBASE_CONFIG
  if (!firebaseConfig) {
    throw Error('FIREBASE_CONFIG not found... ')
  }
  const firebaseConfigJson = JSON.parse(firebaseConfig)
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw Error('GOOGLE_APPLICATION_CREDENTIALS not found... ')
  }
  return admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: firebaseConfigJson.databaseURL,
    projectId: firebaseConfigJson.projectId,
    storageBucket: firebaseConfigJson.storageBucket,
  })
}

export function getStorageAdmin() {
  return getFirebaseAdmin().storage()
}
export function getAuthAdmin() {
  return getFirebaseAdmin().auth()
}
export function getFirestoreAdmin() {
  const firestore = getFirebaseAdmin().firestore()
  const setting: FirebaseFirestore.Settings = {
    timestampsInSnapshots: true,
  }
  if (isEmulator) {
    console.warn('[Firestore]: use emulator')
    setting.host = 'localhost:8080'
    setting.ssl = false
  }
  firestore.settings(setting)
  return firestore
}
