import { loginAuth0User } from '#server/auth0'
import { isAuthData } from '#domain/auth'

import type { AuthData, AuthError } from '#domain/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ResponseSuccess, ResponseError } from '#server/response'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseError<AuthError> | ResponseSuccess<AuthData>>
) {
  if (req.method !== 'POST') {
    return res.status(400).json({
      message: 'Invalid http method',
      code: 'invalid_request',
      type: 'error',
    })
  } else {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
      return res.status(400).json({
        message: 'Missing fields',
        code: 'invalid_request',
        type: 'error',
      })
    }
    const response = await loginAuth0User(email, password)
    return isAuthData(response)
      ? res.status(200).json({ type: 'success', ...response })
      : res.status(400).json({ type: 'error', ...response })
  }
}
