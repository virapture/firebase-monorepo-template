import { logger, Response } from 'firebase-functions'
import { HttpsError } from 'firebase-functions/lib/providers/https'
import { isEmulator } from '../firebaseConstant'

/**
 * エラー送信
 * @param error
 */
export async function logError(error: unknown): Promise<void> {
  logger.error(error)
  if (isEmulator) {
    return
  }
  const { captureException, GCPFunction } = await import('@sentry/serverless')
  GCPFunction.init({
    // 下記コマンドでセットしておく
    // firebase functions:secrets:set SENTRY_DSN
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
  })
  captureException(error)
}

/**
 * エラー処理してレスポンスを返す
 * @param error
 * @param response
 */
export function logErrorWithResponse(error: unknown, response: Response) {
  logError(error).then()
  if (error instanceof HttpsError) {
    const code = error.httpErrorCode.status
    const message: string = code === 404 ? 'Not Found' : 'Unexception Error'
    response.status(error.httpErrorCode.status).send(message)
    return
  }
  response.status(500).send('Unexception Error')
}
