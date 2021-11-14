import { createAuth0User } from '#server/auth0'
import {
  withVerifyBodyParameters,
  withVerifyPostMethod,
} from '#server/middleware'
import { isAuthData, RegisterModel } from '#domain/auth'

import type { AuthData, AuthError } from '#domain/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ResponseSuccess, ResponseError } from '#server/response'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseError<AuthError> | ResponseSuccess<AuthData>>
) => {
  const response = await createAuth0User(req.body as RegisterModel)
  return isAuthData(response)
    ? res.status(200).json({ type: 'success', ...response })
    : res.status(400).json({ type: 'error', ...response })
}

export default withVerifyPostMethod(
  withVerifyBodyParameters(RegisterModel)(handler)
)
