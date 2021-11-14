import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

import {
  AuthError,
  ForgotPasswordModel,
  LoginModel,
  RegisterModel,
  validateAuthError,
} from '#domain/auth'

export const onRejected =
  (context: string) =>
  (error: unknown): AuthError => {
    if (error instanceof Error) {
      return {
        code: 'rejected error',
        message: context,
      }
    }
    return {
      code: 'rejected error',
      message: context,
    }
  }

export const parseJsonResponse = (response: Response) =>
  TE.tryCatch(() => {
    return response.json()
  }, onRejected('parse-json'))

export const processByStatusCode = (
  x: Response
): TE.TaskEither<AuthError, Response> => {
  if (x.status === 200) {
    return TE.right(x)
  }

  // process error
  return pipe(
    x,
    parseJsonResponse,
    TE.chain(validateAuthError),
    TE.chain((authError: AuthError) => TE.left(authError))
  )
}

type Path = 'forgot-password' | 'login' | 'register'
type Model = ForgotPasswordModel | LoginModel | RegisterModel

const fetcher = (path: Path, model: Model) => {
  return fetch(`/api/${path}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(model),
  })
}

export const postRequest =
  (path: Path) =>
  (model: Model): TE.TaskEither<AuthError, Response> =>
    TE.tryCatch((): Promise<Response> => {
      return fetcher(path, model)
    }, onRejected('fetch-request'))
