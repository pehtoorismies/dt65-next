import { requestChangePasswordEmail } from '#server/auth0'

import type { AuthError } from '#domain/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ResponseError, ResponseSuccess } from '#server/response'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    ResponseError<AuthError> | ResponseSuccess<{ message: string }>
  >
) {
  if (req.method !== 'POST') {
    return res.status(400).json({
      message: 'Invalid http method',
      code: 'invalid_request',
      type: 'error',
    })
  } else {
    const email = req.body.email

    if (!email) {
      return res.status(400).json({
        message: 'Missing fields',
        code: 'invalid_request',
        type: 'error',
      })
    }
    const { type } = await requestChangePasswordEmail(email)

    return type === 'error'
      ? res
          .status(400)
          .json({
            type: 'error',
            message: 'Could not send password',
            code: 'server_error',
          })
      : res.status(200).json({ type: 'success', message: 'ok' })
  }
}
