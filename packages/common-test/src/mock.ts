import { User } from '@firebase-monorepo-template/common'
import { Factory } from 'fishery'

export const userAId = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAA'
export const userBId = 'BBBBBBBBBBBBBBBBBBBBBBBBBBBB'
export const userCId = 'CCCCCCCCCCCCCCCCCCCCCCCCCCCC'
export const userDId = 'DDDDDDDDDDDDDDDDDDDDDDDDDDDD'
export const userEId = 'EEEEEEEEEEEEEEEEEEEEEEEEEEEE'

export class Mock {
  defaultTimestamp: FirestoreTimestamp
  nowTimestamp: FirestoreTimestamp
  serverTimestamp: () => FirestoreFieldValue
  arrayUnion: (...elements: unknown[]) => FirestoreFieldValue
  increment: (n: number) => FirestoreFieldValue

  constructor(payload: {
    defaultTimestamp: FirestoreTimestamp
    nowTimestamp: FirestoreTimestamp
    serverTimestamp: () => FirestoreFieldValue
    arrayUnion: (...elements: unknown[]) => FirestoreFieldValue
    increment: (n: number) => FirestoreFieldValue
  }) {
    this.arrayUnion = payload.arrayUnion
    this.defaultTimestamp = payload.defaultTimestamp
    this.nowTimestamp = payload.nowTimestamp
    this.serverTimestamp = payload.serverTimestamp
    this.increment = payload.increment
  }

  userFactory = Factory.define<User>(({ params }) => ({
    createdAt: this.defaultTimestamp,
    updatedAt: this.defaultTimestamp,
    username: params.username ?? 'userA',
    message: params.message ?? '',
  }))
}
