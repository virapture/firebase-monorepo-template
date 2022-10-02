type AdminFirestore = import('firebase-admin').firestore.Firestore
declare type FirestoreTimestamp =
  | Date
  | import('firebase-admin').firestore.Timestamp
  | import('firebase-admin').firestore.FieldValue
  | import('firebase/firestore').Timestamp
  | import('firebase/firestore').FieldValue
declare type FirestoreDocumentReference =
  | import('firebase-admin').firestore.DocumentReference
  | import('firebase/firestore').DocumentReference
declare type FirestoreDocumentSnapshot =
  | import('firebase-admin').firestore.DocumentSnapshot
  | import('firebase/firestore').DocumentSnapshot
declare type FirestoreFieldValue =
  | import('firebase-admin').firestore.FieldValue
  | import('firebase/firestore').FieldValue
