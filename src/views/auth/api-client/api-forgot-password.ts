import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'

import { AuthData, AuthError } from '#domain/auth'

import { processByStatusCode, parseJsonResponse, postRequest } from './common'

import type { ForgotPasswordModel } from '#domain/auth'

export const apiForgotPassword = (
  model: ForgotPasswordModel
): TE.TaskEither<AuthError, AuthData> => {
  return pipe(
    model,
    postRequest('forgot-password'),
    TE.chain(processByStatusCode),
    TE.chain(parseJsonResponse)
  )
}
