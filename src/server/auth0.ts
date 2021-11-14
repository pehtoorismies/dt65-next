import * as t from 'io-ts'
import { isRight } from 'fp-ts/lib/Either'
import { AuthenticationClient, ManagementClient } from 'auth0'

import { getAuthConfig } from '#config/config'

import type { TokenResponse } from 'auth0'
import type {
  AuthData,
  AuthError,
  ForgotPasswordModel,
  LoginModel,
  RegisterModel,
} from '#domain/auth'

const Auth0Error = t.type({
  name: t.string,
  message: t.type({
    error: t.string,
    error_description: t.string,
  }),
})

const authConfig = getAuthConfig()

const auth0 = new AuthenticationClient(authConfig)

const getAuth0Management = async (): Promise<ManagementClient> => {
  const client = await auth0.clientCredentialsGrant({
    audience: `https://${authConfig.domain}/api/v2/`,
    scope: 'read:users update:users',
  })
  return new ManagementClient({
    token: client.access_token,
    domain: authConfig.domain,
  })
}

export const loginAuth0User = async (
  model: LoginModel
): Promise<AuthError | AuthData> => {
  try {
    const authZeroUser: TokenResponse = await auth0.passwordGrant({
      password: model.password,
      username: model.email,
      scope:
        'read:events write:events read:me write:me read:users openid profile',
      audience: authConfig.jwtAudience,
    })

    return {
      accessToken: authZeroUser.access_token,
      idToken: authZeroUser.id_token || '',
      expiresIn: '0',
    }
  } catch (error) {
    if (error instanceof Error) {
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
    }

    return {
      code: 'unexpect_error',
      message: 'Unknown error occurred',
    }
  }
}

export const createAuth0User = async (
  model: RegisterModel
): Promise<AuthError | { message: 'ok' }> => {
  const management = await getAuth0Management()

  try {
    await management.createUser({
      connection: 'Username-Password-Authentication',
      email: model.email,
      nickname: model.nick,
      password: model.password,
      name: model.name,
      verify_email: true,
      email_verified: false,
      user_metadata: {
        subscribeWeeklyEmail: true,
        subscribeEventCreationEmail: true,
      },
      app_metadata: { role: 'USER' },
    })

    return { message: 'ok' }
  } catch (error) {
    if (error instanceof Error) {
      return {
        code: error.name,
        message: error.message,
      }
    }

    return {
      code: 'server_error',
      message: 'Something wrong with sending',
    }
  }
}

export const requestChangePasswordEmail = async (
  model: ForgotPasswordModel
): Promise<AuthError | { message: 'ok' }> => {
  try {
    await auth0.requestChangePasswordEmail({
      email: model.email,
      connection: 'Username-Password-Authentication',
    })
    return { message: 'ok' }
  } catch (error) {
    console.error(error)
    return {
      message: 'Something wrong with sending',
      code: 'server_error',
    }
  }
}
