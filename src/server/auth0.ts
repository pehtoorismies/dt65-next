import * as t from 'io-ts'
import { isRight } from 'fp-ts/lib/Either'
import { AuthenticationClient } from 'auth0'

import { getAuthConfig } from '#config/config'

import type { TokenResponse } from 'auth0'
import type { AuthData, AuthError } from '#domain/auth'

const authConfig = getAuthConfig()

const auth0 = new AuthenticationClient(authConfig)

export const loginAuth0User = async (
  email: string,
  password: string
): Promise<AuthError | AuthData> => {
  try {
    const authZeroUser: TokenResponse = await auth0.passwordGrant({
      password,
      username: email,
      scope:
        'read:events write:events read:me write:me read:users openid profile',
      audience: authConfig.jwtAudience,
    })

    return {
      accessToken: authZeroUser.access_token || '',
      idToken: authZeroUser.id_token || '',
      expiresIn: '0',
    }
  } catch (error: any) {
    const authError = Auth0Error.decode({
      name: error.name,
      message: JSON.parse(error.message),
    })
    if (isRight(authError)) {
      return {
        code: authError.right.message.error,
        message: authError.right.message.error_description,
      }
    }

    return {
      code: 'unexpect_error',
      message: 'Unknown error occurred',
    }
  }
}

export const requestChangePasswordEmail = async (
  email: string
): Promise<{ type: 'success' | 'error' }> => {
  try {
    await auth0.requestChangePasswordEmail({
      email,
      connection: 'Username-Password-Authentication',
    })
    return { type: 'success' }
  } catch (error) {
    console.error(error)
    return { type: 'error' }
  }
}

const Auth0Error = t.type({
  name: t.string,
  message: t.type({
    error: t.string,
    error_description: t.string,
  }),
})
