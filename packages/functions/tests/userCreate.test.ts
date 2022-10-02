import { provider } from '@firebase-monorepo-template/common-test'
import { UserCreateController } from '../src/scenes/user/userCreateController'
describe('userUpdateTransactionController test', () => {
  beforeEach(async () => {
    await provider.admin.setupUser()
  })
  test('ユーザ情報が更新されるか', async () => {
    await new UserCreateController(
      provider.admin.mock.user(),
      provider.admin.userADoc,
    ).onCreate()
    const user = await provider.admin.fetchUserA()
    expect(user.message).toBe('userA様。ご登録ありがとうございます')
  })
})
