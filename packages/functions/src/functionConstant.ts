import * as functions from 'firebase-functions'

const defaultRunOptions: functions.RuntimeOptions = {
  memory: '256MB',
  timeoutSeconds: 60,
}
const middleRunOptions: functions.RuntimeOptions = {
  memory: '512MB',
  timeoutSeconds: 60,
}
export const defaultFunctions = functions
  .region('asia-northeast1')
  .runWith(defaultRunOptions)
export const middleFunctions = functions
  .region('asia-northeast1')
  .runWith(middleRunOptions)
// Hostingで使う場合はus-centralでないと動かないので下記リージョンでのCFを使用する
export const usCentralFunctions = functions
  .region('us-central1')
  .runWith(defaultRunOptions)
export const usCentralFunctionsXL = functions.region('us-central1').runWith({
  memory: '1GB',
  timeoutSeconds: 180,
})
export const usCentralFunctionsXXL = functions.region('us-central1').runWith({
  memory: '2GB',
  timeoutSeconds: 300,
})
export const usCentralFunctions8Gb = functions.region('us-central1').runWith({
  memory: '8GB',
  timeoutSeconds: 300,
})
