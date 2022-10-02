import { User } from '@firebase-monorepo-template/common'

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

  user({ username = 'userA' }: { username?: string } = {}): User {
    return {
      createdAt: this.defaultTimestamp,
      updatedAt: this.defaultTimestamp,
      username,
    }
  }
}
