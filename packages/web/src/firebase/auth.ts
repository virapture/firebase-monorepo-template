import {
  getAuth,
  NextOrObserver,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithCustomToken as _signInWithCustomToken,
  Unsubscribe,
  User,
  UserCredential,
} from 'firebase/auth'
import { getFirebaseApp } from './firebase'
export function getAuthApp() {
  return getAuth(getFirebaseApp())
}
export function signInWithCustomToken(token: string): Promise<UserCredential> {
  return _signInWithCustomToken(getAuthApp(), token)
}
export function onAuthStateChanged(
  nextOrObserver: NextOrObserver<User>,
): Unsubscribe {
  return _onAuthStateChanged(getAuthApp(), nextOrObserver)
}
