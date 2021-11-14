import { requestChangePasswordEmail } from '#server/auth0'
import { ForgotPasswordModel } from '#domain/auth'
import {
  withVerifyBodyParameters,
  withVerifyPostMethod,
} from '#server/middleware'

import type { AuthError } from '#domain/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ResponseError, ResponseSuccess } from '#server/response'

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
    ResponseError<AuthError> | ResponseSuccess<{ message: string }>
  >
) => {
  const response = await requestChangePasswordEmail(
    req.body as ForgotPasswordModel
  )

  return isAuthError(response)
    ? res.status(400).json({
        type: 'error',
        ...response,
      })
    : res.status(200).json({ type: 'success', ...response })
}

export default withVerifyPostMethod(
  withVerifyBodyParameters(ForgotPasswordModel)(handler)
)
