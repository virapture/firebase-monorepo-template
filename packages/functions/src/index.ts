import * as admin from 'firebase-admin'
admin.initializeApp()

const cloudFunctions: { [key: string]: string } = {
  onCreateUser: './scenes/user/userCreateController',
}
// 定義した内容をexportsに追加する
for (const name in cloudFunctions) {
  // 環境変数の関数名を見て、定義した関数名と同じなら、呼び出す判定を追加
  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === name) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    exports[name] = require(cloudFunctions[name]).default
  }
}
