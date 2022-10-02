import { Mock, userAId, userBId, userCId, userDId, userEId } from './mock'
import firebase from 'firebase/compat'
import { Setup } from './setup'

export class TestClientRepository {
  constructor(readonly setup: Setup, readonly mock: Mock) {}

  get unAuthFirestore() {
    return this.setup.clientFirestoreUnAuthenticated
  }

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
    return this.setup.clientFirestoreAuthenticated.collection('users')
  }

  get userA() {
    return this.mock.userFactory.build()
  }

  get userB() {
    return this.mock.userFactory.build({ username: 'userB' })
  }
}
