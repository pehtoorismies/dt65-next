import * as t from 'io-ts'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

const decodeError = (errors: t.Errors): AuthError => {
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

export const AuthError = t.type({
  message: t.string,
  code: t.string,
})

export type AuthData = t.TypeOf<typeof AuthData>
export type AuthError = t.TypeOf<typeof AuthError>

export const isAuthData = (auth: AuthData | AuthError): auth is AuthData => {
  return (auth as AuthData).idToken !== undefined
}

export const validateAuthData = (
  res: unknown
): TE.TaskEither<AuthError, AuthData> => {
  return pipe(res, AuthData.decode, TE.fromEither, TE.mapLeft(decodeError))
}

export const validateAuthError = (
  res: unknown
): TE.TaskEither<AuthError, AuthError> => {
  return pipe(res, AuthError.decode, TE.fromEither, TE.mapLeft(decodeError))
}

export const LoginModel = t.type({
  email: t.string,
  password: t.string,
})
export type LoginModel = t.TypeOf<typeof LoginModel>

export const ForgotPasswordModel = t.type({
  email: t.string,
})
export type ForgotPasswordModel = t.TypeOf<typeof ForgotPasswordModel>

export const RegisterModel = t.type({
  email: t.string,
  nick: t.string,
  name: t.string,
  password: t.string,
  registerSecretCode: t.string,
})
export type RegisterModel = t.TypeOf<typeof RegisterModel>
