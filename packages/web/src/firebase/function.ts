import { getFunctions, httpsCallable } from 'firebase/functions'
import { getFirebaseApp } from './firebase'
export function getFunctionApp() {
  return getFunctions(getFirebaseApp(), 'asia-northeast1')
}
export function getHttpsCallable<RequestData = unknown, ResponseData = unknown>(
  name: string,
) {
  return httpsCallable<RequestData, ResponseData>(getFunctionApp(), name)
}
