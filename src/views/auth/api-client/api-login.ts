import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'

import { AuthData, AuthError, decodeError } from '#domain/auth'

import { parseJsonResponse, processByStatusCode, postRequest } from './common'

import type { LoginModel } from '#domain/auth'

const validateSuccessResponse = (
  res: unknown
): TE.TaskEither<AuthError, AuthData> =>
  pipe(res, AuthData.decode, TE.fromEither, TE.mapLeft(decodeError))

export const apiLogin = (
  model: LoginModel
): TE.TaskEither<AuthError, AuthData> => {
  return pipe(
    model,
    postRequest('login'),
    TE.chain(processByStatusCode),
    TE.chain(parseJsonResponse),
    TE.chain(validateSuccessResponse)
  )
}
