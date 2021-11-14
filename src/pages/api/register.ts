import { createAuth0User } from '#server/auth0'
import {
  withVerifyBodyParameters,
  withVerifyPostMethod,
} from '#server/middleware'
import { RegisterModel } from '#domain/auth'
import { getAuthConfig } from '#config/config'

import type { AuthError } from '#domain/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ResponseSuccess, ResponseError } from '#server/response'

const authConfig = getAuthConfig()

const isAuthError = (
  auth: AuthError | { message: 'ok' }
): auth is AuthError => {
  return (
    (auth as AuthError).message !== undefined &&
    (auth as AuthError).code !== undefined
  )
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<
    ResponseError<AuthError> | ResponseSuccess<{ message: 'ok' }>
  >
) => {
  const model = req.body as RegisterModel

  if (model.registerSecretCode !== authConfig.registerSecretCode) {
    res.status(401).json({
      type: 'error',
      code: 'invalid_secret_code',
      message: 'Secret code is invalid',
    })
  }

  const response = await createAuth0User(model)
  return !isAuthError(response)
    ? res.status(200).json({ type: 'success', ...response })
    : res.status(400).json({ type: 'error', ...response })
}

export default withVerifyPostMethod(
  withVerifyBodyParameters(RegisterModel)(handler)
)
