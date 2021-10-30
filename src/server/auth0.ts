import * as t from 'io-ts'
import { isRight } from 'fp-ts/lib/Either'
import { AuthenticationClient } from 'auth0'

import { getAuthConfig } from '@config/config'

import type { TokenResponse } from 'auth0'

const authConfig = getAuthConfig()

const auth0 = new AuthenticationClient(authConfig)

type Data = {
  type: 'success'
  accessToken: string
  idToken: string
  expiresIn: string
}

type Error = {
  type: 'error'
  code: string
  message: string
}

export const loginAuth0User = async (
  email: string,
  password: string
): Promise<Data | Error> => {
  try {
    const authZeroUser: TokenResponse = await auth0.passwordGrant({
      password,
      username: email,
      scope:
        'read:events write:events read:me write:me read:users openid profile',
      audience: authConfig.jwtAudience,
    })

    return {
      type: 'success',
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
        type: 'error',
        code: authError.right.message.error,
        message: authError.right.message.error_description,
      }
    }

    return {
      type: 'error',
      code: 'unexpect_error',
      message: 'Unknown error occured',
    }
  }
}

const Auth0Error = t.type({
  name: t.string,
  message: t.type({
    error: t.string,
    error_description: t.string,
  }),
})

type Auth0Error = t.TypeOf<typeof Auth0Error>
