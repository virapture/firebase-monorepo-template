declare type FirestoreTimestamp =
  | Date
  | import('firebase-admin').firestore.Timestamp
  | import('firebase-admin').firestore.FieldValue
declare type FirestoreDocumentReference =
  import('firebase-admin').firestore.DocumentReference
declare type FirestoreDocumentSnapshot =
  import('firebase-admin').firestore.DocumentSnapshot
declare type FirestoreFieldValue = import('firebase-admin').firestore.FieldValue
