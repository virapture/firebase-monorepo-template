# firebase monorepo template

[日本語はこちら](./tree/main/README-ja.md)

This is a template repository that shares entities with firebase web/cloud functions and also allows unit tests to be shared.

[See here for the explanation in the article](https://qiita.com/mogmet/fafe7c58cb7649cf1b36)

The following functions are prepared as templates.

- Entity sharing using yarn workspace
- firestore/security-rule, template implementation of unittest of cloud functions
- Automatic deployment when develop/main merge is done
- Automatic generation of hosting URL for preview when PR is submitted

## package description

[packages](./tree/main/packages) contains the following packages for each role.

- [common](./tree/main/packages/common)
- [common-test](./tree/main/packages/common-test)
- [functions](./tree/main/packages/functions)
- [web](./tree/main/packages/web)

### common

Place entities and other items that you want to use commonly in all projects.
User entity is placed as a template.

### common-test

Place common processes to be used for testing.

### functions

Place cloud functions.

### web

Place web project.
Only the bare typescript is placed so that it can be placed in both react and vue.
Also, the security rule test is placed here.

## How to install

Copy the template by clicking the "Use this template" button at the top of the repository.

After copying the template, replace the following words throughout the project.

```
s/virapture\/firebase-monorepo-template/your-account\/your-repository-name/g
s/firebase-monorepo-template/your-repository-name/g
```

Replace the firebase project id with your own.
```
s/fir-monorepo-template-dev/your-firebase-dev-project-id/g
s/fir-monorepo-template-prd/your-firebase-prod-project-id/g
```

Set up github secrets so that you can run the CD.
[github secrets setting page](. /settings/secrets/actions)

The two secret names are `GOOGLE_APPLICATION_CREDENTIALS_DEV` and `GOOGLE_APPLICATION_CREDENTIALS_PROD`.
The values can be found [here](https://cloud.google.com/docs/authentication/getting-started) to create a service account for deployment.
Set the contents of the downloaded JSON file as is.
Prepare for the dev environment and the production environment respectively.

### cloud functions setup

Catch errors in cloud functions and send them to sentry.
Set the DSN value for sentry with the following command.

```shell
firebase functions:secrets:set SENTRY_DSN
````

### web setup

web is initialized using files in the env directory.
Since the files dev.env / prod.env are prepared, enter the values of firebase on the client side for each environment.

Translated with www.DeepL.com/Translator (free version)