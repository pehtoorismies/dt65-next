import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import * as T from 'io-ts'

import {
  ForgotPasswordResponse,
  LoginResponse,
  RegisterResponse,
} from '#domain/auth'

import type {
  ForgotPasswordModelC,
  ForgotPasswordResponseC,
  LoginModelC,
  LoginResponseC,
  RegisterModelC,
  RegisterResponseC,
} from '#domain/auth'

export const authService = {
  forgotPasswordTask: (
    model: ForgotPasswordModelC
  ): TE.TaskEither<Error, ForgotPasswordResponseC> => {
    return pipe(
      model,
      postRequest('forgot-password'),
      TE.chain(parseJsonResponse),
      TE.chainW(
        (x: unknown): TE.TaskEither<T.Errors, ForgotPasswordResponseC> => {
          return pipe(x, ForgotPasswordResponse.decode, TE.fromEither)
        }
      ),
      TE.mapLeft(mapErrors)
    )
  },
  loginTask: (model: LoginModelC): TE.TaskEither<Error, LoginResponseC> => {
    return pipe(
      model,
      postRequest('login'),
      TE.chain(parseJsonResponse),
      TE.chainW((x: unknown): TE.TaskEither<T.Errors, LoginResponseC> => {
        return pipe(x, LoginResponse.decode, TE.fromEither)
      }),
      TE.mapLeft(mapErrors)
    )
  },
  registerTask: (
    model: RegisterModelC
  ): TE.TaskEither<Error, RegisterResponseC> => {
    return pipe(
      model,
      postRequest('register'),
      TE.chain(parseJsonResponse),
      TE.chainW((x: unknown): TE.TaskEither<T.Errors, RegisterResponseC> => {
        return pipe(x, RegisterResponse.decode, TE.fromEither)
      }),
      TE.mapLeft(mapErrors)
    )
  },
}

type ApiPath = 'forgot-password' | 'login' | 'register'
type Model = ForgotPasswordModelC | LoginModelC | RegisterModelC

const postRequest =
  (path: ApiPath) =>
  (model: Model): TE.TaskEither<Error, Response> =>
    TE.tryCatch((): Promise<Response> => {
      return fetch(`/api/${path}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
      })
    }, onErrorThrow)

const parseJsonResponse = (response: Response): TE.TaskEither<Error, unknown> =>
  TE.tryCatch(() => {
    return response.json()
  }, onErrorThrow)

const onErrorThrow = (error: unknown): Error => {
  if (error instanceof Error) {
    return error
  }
  return new Error('Some unexpected error')
}

const mapErrors = (error: Error | T.Errors) => {
  if (error instanceof Error) {
    return error
  }
  return new Error('Unexpected error occurred')
}
