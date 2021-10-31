import * as t from 'io-ts'

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

export type AuthResponseData = AuthData & {
  type: 'success'
}

export type AuthResponseError = AuthError & {
  type: 'error'
}
