import * as admin from 'firebase-admin'
import { Mock } from './mock'
import { TestAdminRepository } from './testAdminRepository'
import TestAdminAuthRepository from './testAdminAuthRepository'
import { Setup } from './setup'
import { TestClientRepository } from './testClientRepository'
import firebase from 'firebase/compat/app'

export class TestProvider {
  readonly projectId: string
  admin: TestAdminRepository
  client: TestClientRepository
  authRepository: TestAdminAuthRepository

  static async initialize(): Promise<TestProvider> {
    const setup = await Setup.initialize()
    return new TestProvider(setup)
  }

  constructor(private readonly setup: Setup) {
    this.projectId = setup.env.projectId
    this.authRepository = new TestAdminAuthRepository(this.setup.adminAuth)
    this.admin = new TestAdminRepository(
      setup.adminFirestore,
      new Mock({
        arrayUnion: admin.firestore.FieldValue.arrayUnion,
        defaultTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        increment: admin.firestore.FieldValue.increment,
        nowTimestamp: admin.firestore.Timestamp.now(),
        serverTimestamp: admin.firestore.FieldValue.serverTimestamp,
      }),
    )
    this.client = new TestClientRepository(
      setup,
      new Mock({
        arrayUnion: firebase.firestore.FieldValue.arrayUnion,
        defaultTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        increment: firebase.firestore.FieldValue.increment,
        nowTimestamp: firebase.firestore.Timestamp.now(),
        serverTimestamp: firebase.firestore.FieldValue.serverTimestamp,
      }),
    )
  }

  // エミュレータが起動され続けている場合に前のデータが残っている可能性あるため
  async beforeAll() {
    await this.clean()
  }

  // firebaseとのlistenerを削除しないとテストが終了できない
  async afterAll() {
    await this.deleteAll()
  }

  // Firestoreのデータを初期化
  async afterEach() {
    await this.clean()
  }

  /// データ初期化
  private async clean() {
    await this.setup.clearFirestoreData()
    await this.authRepository.deleteUsers()
  }

  private async deleteAll() {
    await this.setup.cleanup()
  }
}
