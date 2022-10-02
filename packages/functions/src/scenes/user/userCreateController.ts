import admin from 'firebase-admin'
import { User } from '@firebase-monorepo-template/common'
import { defaultFunctions } from '../../functionConstant'
import * as functions from 'firebase-functions'
import { logError } from '../../utils/errorLogger'

export class UserCreateController {
  constructor(
    private readonly data: User,
    private readonly reference: admin.firestore.DocumentReference,
  ) {
    if (!data) {
      throw new functions.https.HttpsError('invalid-argument', 'no user data')
    }
  }

  async onCreate() {
    await this.reference.update({
      message: `${this.data.username}様。ご登録ありがとうございます`,
    })
  }
}

export default defaultFunctions.firestore
  .document(`users/{userId}`)
  .onCreate(async (snapshot, _) => {
    try {
      await new UserCreateController(
        snapshot.data() as User,
        snapshot.ref,
      ).onCreate()
    } catch (error) {
      await logError(error)
    }
  })
