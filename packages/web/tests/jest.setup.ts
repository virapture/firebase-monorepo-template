import {
  commonAfterAll,
  commonAfterEach,
  commonBeforeAll,
} from '@firebase-monorepo-template/common-test'
beforeAll(async () => {
  await commonBeforeAll()
})
afterAll(async () => {
  await commonAfterAll()
})
afterEach(async () => {
  await commonAfterEach()
})
