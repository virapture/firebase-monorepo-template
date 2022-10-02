import { Mock, userAId, userBId, userCId, userDId, userEId } from './mock'
import firebase from 'firebase/compat'

export class TestClientRepository {
  constructor(
    readonly clientFirestore: firebase.firestore.Firestore,
    readonly clientFirestoreB: firebase.firestore.Firestore,
    readonly mock: Mock,
  ) {}

  get userADoc(): firebase.firestore.DocumentReference {
    return this.userCollection.doc(userAId)
  }

  get userBDoc(): firebase.firestore.DocumentReference {
    return this.userCollection.doc(userBId)
  }

  get userCDoc(): firebase.firestore.DocumentReference {
    return this.userCollection.doc(userCId)
  }

  get userDDoc(): firebase.firestore.DocumentReference {
    return this.userCollection.doc(userDId)
  }

  get userEDoc(): firebase.firestore.DocumentReference {
    return this.userCollection.doc(userEId)
  }

  get userCollection(): firebase.firestore.CollectionReference {
    return this.clientFirestore.collection('users')
  }

  get userA() {
    return this.mock.userFactory.build()
  }

  get userB() {
    return this.mock.userFactory.build({ username: 'userB' })
  }
}
