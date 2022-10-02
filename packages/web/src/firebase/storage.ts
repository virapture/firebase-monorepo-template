import { getStorage } from 'firebase/storage'
import { getFirebaseApp } from './firebase'
export function getStorageApp() {
  return getStorage(getFirebaseApp())
}
