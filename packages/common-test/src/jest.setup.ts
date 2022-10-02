import { TestProvider } from './testProvider'
import { TestAdminRepository } from './testAdminRepository'
import { Mock } from './mock'
import { TestClientRepository } from './testClientRepository'
const providePromise = TestProvider.initialize()
export let provider: TestProvider
export let providerAdmin: TestAdminRepository
export let providerClient: TestClientRepository
export let mock: Mock
export async function commonBeforeAll(): Promise<void> {
  provider = await providePromise
  providerAdmin = provider.admin
  providerClient = provider.client
  mock = providerAdmin.mock
  await provider.beforeAll()
}
export async function commonAfterAll(): Promise<void> {
  await provider.afterAll()
}
export async function commonAfterEach(): Promise<void> {
  await provider.afterEach()
}
