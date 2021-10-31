import { loginAuth0User } from '#server/auth0'

import type { AuthResponseData, AuthResponseError } from '#domain/auth-response'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponseError | AuthResponseData>
) {
  if (req.method !== 'POST') {
    res.status(400).json({
      message: 'Invalid http method',
      code: 'invalid_request',
      type: 'error',
    })
  } else {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
      res.status(400).json({
        message: 'Missing fields',
        code: 'invalid_request',
        type: 'error',
      })
    }
    const response = await loginAuth0User(email, password)

    switch (response.type) {
      case 'success': {
        return res.status(200).json(response)
      }
      case 'error': {
        return res.status(400).json(response)
      }
    }
  }
}
