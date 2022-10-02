import {
  providerAdmin,
  providerClient,
} from '@firebase-monorepo-template/common-test'
import * as firebaseTest from '@firebase/rules-unit-testing'

describe('users', () => {
  describe('read', () => {
    beforeEach(async () => {
      await providerAdmin.setupUser()
    })
    test('認証してれば読み取れる', async () => {
      await firebaseTest.assertSucceeds(providerClient.userADoc.get())
      await firebaseTest.assertSucceeds(providerClient.userBDoc.get())
      await firebaseTest.assertFails(
        providerClient.unAuthFirestore.doc(providerClient.userADoc.path).get(),
      )
    })
  })
  describe('create', () => {
    test('自分のところにだけ作成ができる', async () => {
      const user = providerClient.userA
      await firebaseTest.assertSucceeds(providerClient.userADoc.set(user))
    })
    test('他人のところには作成ができない', async () => {
      await firebaseTest.assertFails(
        providerClient.userBDoc.set(providerClient.userA),
      )
    })
  })
})
