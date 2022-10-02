import * as admin from 'firebase-admin'
import { Mock, userAId, userBId, userCId, userDId, userEId } from './mock'
import { User } from '@firebase-monorepo-template/common'

export class TestAdminRepository {
  readonly adminFirestore!: admin.firestore.Firestore
  readonly mock: Mock

  constructor(adminFirestore: admin.firestore.Firestore, mock: Mock) {
    this.adminFirestore = adminFirestore
    this.mock = mock
  }

  get userADoc(): admin.firestore.DocumentReference {
    return this.userCollection.doc(userAId)
  }

  get userBDoc(): admin.firestore.DocumentReference {
    return this.userCollection.doc(userBId)
  }

  get userCDoc(): admin.firestore.DocumentReference {
    return this.userCollection.doc(userCId)
  }

  get userDDoc(): admin.firestore.DocumentReference {
    return this.userCollection.doc(userDId)
  }

  get userEDoc(): admin.firestore.DocumentReference {
    return this.userCollection.doc(userEId)
  }

  get userCollection() {
    return this.adminFirestore.collection('users')
  }

  get userA() {
    return this.mock.user()
  }

  async setupUser(): Promise<void> {
    await this.userADoc.set(this.userA)
  }

  async fetchUserA(): Promise<User> {
    return (await this.userADoc.get()).data() as User
  }
}
