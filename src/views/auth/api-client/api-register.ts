import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'

import { AuthData, AuthError } from '#domain/auth'

import { parseJsonResponse, processByStatusCode, postRequest } from './common'

import type { RegisterModel } from '#domain/auth'

export const apiRegister = (
  model: RegisterModel
): TE.TaskEither<AuthError, AuthData> => {
  return pipe(
    model,
    postRequest('register'),
    TE.chain(processByStatusCode),
    TE.chain(parseJsonResponse)
  )
}
