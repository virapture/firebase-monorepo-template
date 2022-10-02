import { providerAdmin } from '@firebase-monorepo-template/common-test'
import { UserCreateController } from '../src/scenes/user/userCreateController'
describe('userUpdateTransactionController test', () => {
  beforeEach(async () => {
    await providerAdmin.setupUser()
  })
  test('ユーザ情報が更新されるか', async () => {
    await new UserCreateController(
      providerAdmin.userA,
      providerAdmin.userADoc,
    ).onCreate()
    const user = await providerAdmin.fetchUserA()
    expect(user.message).toBe('userA様。ご登録ありがとうございます')
  })
})
