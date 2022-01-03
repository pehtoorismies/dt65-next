import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

import {
  AuthData,
  AuthError,
  decodeError,
  ForgotPasswordModel,
  LoginModel,
  RegisterModel,
  validateAuthError,
} from '#domain/auth'

export const authService = {
  forgotPasswordTask: (
    model: ForgotPasswordModel
  ): TE.TaskEither<AuthError, AuthData> => {
    return pipe(
      model,
      postRequest('forgot-password'),
      TE.chain(processByStatusCode),
      TE.chain(parseJsonResponse)
    )
  },
  loginTask: (model: LoginModel): TE.TaskEither<AuthError, AuthData> => {
    return pipe(
      model,
      postRequest('login'),
      TE.chain(processByStatusCode),
      TE.chain(parseJsonResponse),
      TE.chain(validateSuccessResponse)
    )
  },
  registerTask: (model: RegisterModel): TE.TaskEither<AuthError, AuthData> => {
    return pipe(
      model,
      postRequest('register'),
      TE.chain(processByStatusCode),
      TE.chain(parseJsonResponse)
    )
  },
}

const validateSuccessResponse = (
  res: unknown
): TE.TaskEither<AuthError, AuthData> =>
  pipe(res, AuthData.decode, TE.fromEither, TE.mapLeft(decodeError))

const onRejected =
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

const parseJsonResponse = (response: Response) =>
  TE.tryCatch(() => {
    return response.json()
  }, onRejected('parse-json'))

const processByStatusCode = (
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

type ApiPath = 'forgot-password' | 'login' | 'register'
type Model = ForgotPasswordModel | LoginModel | RegisterModel

const postRequest =
  (path: ApiPath) =>
  (model: Model): TE.TaskEither<AuthError, Response> =>
    TE.tryCatch((): Promise<Response> => {
      return fetch(`/api/${path}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
      })
    }, onRejected('fetch-request'))
