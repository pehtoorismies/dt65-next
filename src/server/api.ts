import { getAuthConfig } from '#config/config'
import { ForgotPasswordModel, LoginModel, RegisterModel } from '#domain/auth'

import { withVerifyBodyParameters, withVerifyPostMethod } from './middleware'
import {
  createAuth0User,
  loginAuth0User,
  requestChangePasswordEmail,
} from './auth0'

import type {
  ForgotPasswordModelC,
  ForgotPasswordResponseC,
  LoginModelC,
  LoginResponseC,
  RegisterModelC,
  RegisterResponseC,
} from '#domain/auth'
import type { NextApiRequest, NextApiResponse } from 'next'

const authConfig = getAuthConfig()

const registerHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseC>
) => {
  const model = req.body as RegisterModelC

  if (model.registerSecretCode !== authConfig.registerSecretCode) {
    res.status(401).json({
      type: 'error',
      code: 'invalid_secret_code',
      message: 'Secret code is invalid',
    })
  }

  const result = await createAuth0User(model)
  return respondWithStatus(res, result)
}

const loginHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<LoginResponseC>
) => {
  const result = await loginAuth0User(req.body as LoginModelC)
  return respondWithStatus(res, result)
}

const forgotPasswordHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ForgotPasswordResponseC>
) => {
  const { email } = req.body as ForgotPasswordModelC
  if (!emailSanityCheck(email)) {
    return res.status(400).json({
      message: 'Email address is falsy',
      code: 'invalid_request',
      type: 'error',
    })
  }

  const result = await requestChangePasswordEmail({ email })
  return respondWithStatus(res, result)
}

const respondWithStatus = <
  E extends { type: 'error' },
  T extends { type: 'success' }
>(
  res: NextApiResponse,
  response: E | T
) => {
  switch (response.type) {
    case 'success': {
      return res.status(200).json(response)
    }
    case 'error': {
      return res.status(400).json(response)
    }
  }
}

const emailSanityCheck = (value: string): boolean => {
  return !(
    value.trim().length < 6 ||
    !value.includes('@') ||
    !value.includes('.')
  )
}

export const loginApi = withVerifyPostMethod(
  withVerifyBodyParameters(LoginModel)(loginHandler)
)

export const registerApi = withVerifyPostMethod(
  withVerifyBodyParameters(RegisterModel)(registerHandler)
)

export const forgotPasswordApi = withVerifyPostMethod(
  withVerifyBodyParameters(ForgotPasswordModel)(forgotPasswordHandler)
)
