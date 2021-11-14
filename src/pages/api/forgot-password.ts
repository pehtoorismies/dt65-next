import { requestChangePasswordEmail } from '#server/auth0'
import { ForgotPasswordModel } from '#domain/auth'
import {
  withVerifyBodyParameters,
  withVerifyPostMethod,
} from '#server/middleware'

import type { AuthError } from '#domain/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ResponseError, ResponseSuccess } from '#server/response'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<
    ResponseError<AuthError> | ResponseSuccess<{ message: string }>
  >
) => {
  const { type } = await requestChangePasswordEmail(
    req.body as ForgotPasswordModel
  )

  return type === 'error'
    ? res.status(400).json({
        type: 'error',
        message: 'Could not send password',
        code: 'server_error',
      })
    : res.status(200).json({ type: 'success', message: 'ok' })
}

export default withVerifyPostMethod(
  withVerifyBodyParameters(ForgotPasswordModel)(handler)
)
