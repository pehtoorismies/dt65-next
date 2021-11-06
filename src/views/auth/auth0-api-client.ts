import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'

import {
  AuthData,
  AuthError,
  validateAuthData,
  validateAuthError,
} from '#domain/auth-response'

import { LoginModel } from './components/login'

const onRejected = (error: unknown): AuthError => {
  if (error instanceof Error) {
    return {
      code: 'network_error',
      message: 'fix later',
    }
  }
  return {
    code: 'network_error',
    message: 'fix later',
  }
}

const parseJsonResponse = (response: Response) =>
  TE.tryCatch((): Promise<unknown> => response.json(), onRejected)

const postLogin = (model: LoginModel): TE.TaskEither<AuthError, Response> =>
  TE.tryCatch((): Promise<Response> => {
    return fetch('/api/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(model),
    })
  }, onRejected)

const processResponse = (x: Response): TE.TaskEither<AuthError, Response> => {
  if (x.status === 200) {
    return TE.of(x)
  }

  return pipe(
    x,
    parseJsonResponse,
    TE.chain(validateAuthError),
    TE.chain((ae: AuthError) => TE.left(ae))
  )
}

export const auth0ApiClient = {
  login: (model: LoginModel): TE.TaskEither<AuthError, AuthData> => {
    return pipe(
      model,
      postLogin,
      TE.chain(processResponse),
      TE.chain(parseJsonResponse),
      TE.chain(validateAuthData)
    )
  },
}
