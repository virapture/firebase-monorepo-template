import {
  initializeTestEnvironment,
  RulesTestContext,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing'
import {
  FieldValue,
  Firestore,
  serverTimestamp,
  setLogLevel,
  Timestamp,
} from 'firebase/firestore'
import firebase from 'firebase/compat'
import * as admin from 'firebase-admin'
import * as fs from 'fs'
import { userAId, userBId } from './mock'
export class Setup {
  readonly projectId: string
  readonly auth: { email: string; uid: string }
  readonly admin: admin.app.App
  readonly adminAuth: admin.auth.Auth
  readonly adminFirestore: admin.firestore.Firestore
  get clientFirestoreAuthenticated(): firebase.firestore.Firestore {
    return this.authenticatedContext.firestore()
  }
  get clientFirestoreAuthenticatedB(): firebase.firestore.Firestore {
    return this.authenticatedContextB.firestore()
  }
  get clientFirestoreUnAuthenticated(): firebase.firestore.Firestore {
    return this.unauthenticatedContext.firestore()
  }
  env!: RulesTestEnvironment
  authenticatedContext!: RulesTestContext
  authenticatedContextB!: RulesTestContext
  unauthenticatedContext!: RulesTestContext

  constructor() {
    this.projectId = (process.env.FIREBASE_PROJECT_ID as string) ?? 'dev'
    process.env.FIRESTORE_EMULATOR_HOST = '0.0.0.0:8080'
    process.env.FIREBASE_AUTH_EMULATOR_HOST = '0.0.0.0:9099'
    process.env.FIREBASE_CONFIG = `{"projectId": "${this.projectId}"}`
    process.env.GCLOUD_PROJECT = this.projectId
    const uid = userAId
    this.auth = {
      email: `${uid}@test.com`,
      uid,
    }
    this.admin = admin.apps.length ? admin.apps[0]! : admin.initializeApp()
    this.adminAuth = this.admin.auth()
    this.adminFirestore = this.admin.firestore()
  }

  static async initialize(): Promise<Setup> {
    // // セットしないと間違ったwarningがたくさん出てしまう
    // // 関連 issue: https://github.com/firebase/firebase-js-sdk/issues/5872
    setLogLevel('error')
    const setup = new Setup()
    const env = await initializeTestEnvironment({
      firestore: {
        rules: fs.readFileSync('../../firestore.rules', 'utf8'),
      },
      projectId: setup.projectId,
    })
    setup.authenticatedContext = env.authenticatedContext(setup.auth.uid, {})
    setup.authenticatedContextB = env.authenticatedContext(userBId, {})
    setup.unauthenticatedContext = env.unauthenticatedContext()
    setup.env = env
    return setup
  }

  get authenticatedContextFirestore(): Firestore {
    const client = this.authenticatedContext!.firestore()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return client as any
  }

  clearFirestoreData(): Promise<void> | undefined {
    return this.env?.clearFirestore()
  }

  cleanup(): Promise<void> | undefined {
    return this.env?.cleanup()
  }

  fromDate(date: Date): Timestamp {
    return Timestamp.fromDate(date)
  }

  serverTimestamp(): FieldValue {
    return serverTimestamp()
  }

  adminServerTimestamp(): admin.firestore.FieldValue {
    // eslint-disable-next-line import/namespace
    return admin.firestore.FieldValue.serverTimestamp()
  }

  fromAdminDate(date: Date): admin.firestore.FieldValue {
    // eslint-disable-next-line import/namespace
    return admin.firestore.Timestamp.fromDate(date)
  }

  sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
