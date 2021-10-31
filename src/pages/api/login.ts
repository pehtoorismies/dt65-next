import { loginAuth0User } from '#server/auth0'

import type { NextApiRequest, NextApiResponse } from 'next'

type Error = {
  code: string
  message: string
}

type Data = {
  accessToken: string
  idToken: string
  expiresIn: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Error | Data>
) {
  if (req.method !== 'POST') {
    res
      .status(400)
      .json({ message: 'Invalid http method', code: 'invalid_request' })
  } else {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
      res
        .status(400)
        .json({ message: 'Missing fields', code: 'invalid_request' })
    }
    const response = await loginAuth0User(email, password)

    switch (response.type) {
      case 'success': {
        const { type, ...rest } = response
        return res.status(200).json(rest)
      }
      case 'error': {
        const { type, ...rest } = response
        return res.status(400).json(rest)
      }
    }
  }
}
