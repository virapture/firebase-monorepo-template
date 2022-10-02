import {
  collection,
  collectionGroup,
  CollectionReference,
  doc,
  DocumentReference,
  FieldValue,
  getFirestore,
  Query,
  Timestamp,
  WriteBatch,
  writeBatch,
} from 'firebase/firestore'
import { getFirebaseApp } from './firebase'

export function getFirestoreApp() {
  const firebaseApp = getFirebaseApp()
  return getFirestore(firebaseApp)
}

export function getCollection<T>(path: string): CollectionReference<T> {
  return collection(getFirestoreApp(), path) as CollectionReference<T>
}

export function getBatch(): WriteBatch {
  return writeBatch(getFirestoreApp())
}

export function getCollectionGroup<T>(collectionId: string): Query<T> {
  return collectionGroup(getFirestoreApp(), collectionId) as Query<T>
}

export function getDocument<T>(path: string): DocumentReference<T> {
  return doc(getFirestoreApp(), path) as DocumentReference<T>
}

export function toDate(firestoreTimestamp: FirestoreTimestamp): Date {
  if (firestoreTimestamp instanceof Timestamp) {
    return firestoreTimestamp.toDate()
  }
  if (firestoreTimestamp instanceof FieldValue) {
    return new Date()
  }
  return firestoreTimestamp as Date
}
