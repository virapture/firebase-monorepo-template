# firebase monorepo template

firebaseのweb/cloud functionsでentityを共有しつつ、unit testも共有にかけるようにしたテンプレートリポジトリです。

[記事での説明はこちらを参照](https://qiita.com/mogmet/items/fafe7c58cb7649cf1b36)

下記の機能をテンプレートとして準備しています。

- yarn workspaceを用いたentityの共通化
- firestore/security-rule, cloud functionsのunittestのテンプレート実装
- develop/mainマージされた時に自動でデプロイ
- PRを出した時に自動的にプレビュー用のhosting URLの生成

## package description

[packages](./packages)には役割ごとに下記のパッケージが配置されています。

- [common](./packages/common)
- [common-test](./packages/common-test)
- [functions](./packages/functions)
- [web](./packages/web)

### common

全プロジェクトで共通で使いたいentityなどを配置します。
テンプレートとしてUser entityを配置しています。

### common-test

テストで使う共通処理を配置しています。

### functions

cloud functionsを配置します。

### web

webプロジェクトを配置します。
reactでもvueでもおけるように素のtypescriptだけ置いてます。
また、security ruleのテストはここに記載しております。

## インストール方法

リポジトリのトップの「Use this template」ボタンでテンプレートをコピーします。

テンプレートコピー後、下記のワードをプロジェクト全体で置換します。

```
s/virapture\/firebase-monorepo-template/your-account\/your-repository-name/g
s/firebase-monorepo-template/your-repository-name/g
```

firebaseのproject idを自分のものに置換します
```
s/fir-monorepo-template-dev/your-firebase-dev-project-id/g
s/fir-monorepo-template-prd/your-firebase-prod-project-id/g
```

CDを動かせるようにgithubのsecretsを設定します。
[github secrets setting page](./settings/secrets/actions)

secret名は `GOOGLE_APPLICATION_CREDENTIALS_DEV`と`GOOGLE_APPLICATION_CREDENTIALS_PROD`の2つを設定します。
値は[こちら](https://cloud.google.com/docs/authentication/getting-started)からデプロイ用のサービス アカウントを作成します。
ダウンロードしたJSONファイルの中身をそのまま設定します。
dev環境とproduction環境でそれぞれ準備しておきましょう。

### cloud functions setup

cloud functionsでエラーをキャッチしてsentryに送るようにしています。
sentry用のDSN値を下記コマンドでセットしておきます。

```shell
firebase functions:secrets:set SENTRY_DSN
```

### web setup

envディレクトリにあるファイルを使ってwebは初期化を行うようにしています。
dev.env / prod.env とファイルを準備しているのでそれぞれの環境ごとにclient側のfirebaseの値を入力してください。
