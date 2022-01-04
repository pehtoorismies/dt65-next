import * as t from 'io-ts'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

export const decodeError = (errors: t.Errors): AuthFailure => {
  const missingKeys = errors.map((error) =>
    error.context.map(({ key }) => key).join('.')
  )
  return {
    code: 'decode_error',
    message: `${missingKeys}`,
  }
}

export const AuthData = t.type({
  accessToken: t.string,
  idToken: t.string,
  expiresIn: t.string,
})

export const AuthFailure = t.type({
  message: t.string,
  code: t.string,
})

export type AuthData = t.TypeOf<typeof AuthData>
export type AuthFailure = t.TypeOf<typeof AuthFailure>

const AuthDataResponse = t.intersection([
  AuthData,
  t.type({ type: t.literal('success') }),
])

const AuthFailureResponse = t.intersection([
  AuthFailure,
  t.type({ type: t.literal('error') }),
])

const AuthOkResponse = t.intersection([
  t.type({ message: t.literal('ok') }),
  t.type({ type: t.literal('success') }),
])
export type AuthOkResponseC = t.TypeOf<typeof AuthOkResponse>

export const LoginResponse = t.union([AuthDataResponse, AuthFailureResponse])
export type LoginResponseC = t.TypeOf<typeof LoginResponse>

export const ForgotPasswordResponse = t.union([
  AuthOkResponse,
  AuthFailureResponse,
])
export type ForgotPasswordResponseC = t.TypeOf<typeof ForgotPasswordResponse>

export const RegisterResponse = t.union([AuthOkResponse, AuthFailureResponse])
export type RegisterResponseC = t.TypeOf<typeof RegisterResponse>

export const isAuthData = (auth: AuthData | AuthFailure): auth is AuthData => {
  return (auth as AuthData).idToken !== undefined
}

export const validateAuthError = (
  res: unknown
): TE.TaskEither<AuthFailure, AuthFailure> => {
  return pipe(res, AuthFailure.decode, TE.fromEither, TE.mapLeft(decodeError))
}

export const LoginModel = t.type({
  email: t.string,
  password: t.string,
})
export type LoginModelC = t.TypeOf<typeof LoginModel>

export const ForgotPasswordModel = t.type({
  email: t.string,
})
export type ForgotPasswordModelC = t.TypeOf<typeof ForgotPasswordModel>

export const RegisterModel = t.type({
  email: t.string,
  nick: t.string,
  name: t.string,
  password: t.string,
  registerSecretCode: t.string,
})
export type RegisterModelC = t.TypeOf<typeof RegisterModel>
