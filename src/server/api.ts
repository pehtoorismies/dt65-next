import { withSentry } from '@sentry/nextjs'

import { getAuthConfig } from '#config/config'
import { ForgotPasswordModel, LoginModel, RegisterModel } from '#domain/auth'
import { AUTH_ERROR_CODES } from '#config/constants'

import { withVerifyBodyParameters, withVerifyPostMethod } from './middleware'
import {
  createAuth0User,
  loginAuth0User,
  nickExists,
  requestChangePasswordEmail,
} from './auth0'

import type {
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
    return res.status(401).json({
      type: 'error',
      code: AUTH_ERROR_CODES.INVALID_REGISTER_SECRET,
      message: 'Secret code is invalid',
    })
  }

  const existingNick = await nickExists(model.nick)

  if (existingNick) {
    return res.status(401).json({
      type: 'error',
      code: AUTH_ERROR_CODES.NICK_ALREADY_EXISTS,
      message: 'Nick exists',
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
  const { email } = req.body
  if (!emailSanityCheck(email)) {
    return res.status(400).json({
      message: 'Email address is falsy',
      code: AUTH_ERROR_CODES.INVALID_EMAIL_FORMAT,
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

export const loginApi = withSentry(
  withVerifyPostMethod(withVerifyBodyParameters(LoginModel)(loginHandler))
)

export const registerApi = withSentry(
  withVerifyPostMethod(withVerifyBodyParameters(RegisterModel)(registerHandler))
)

export const forgotPasswordApi = withSentry(
  withVerifyPostMethod(
    withVerifyBodyParameters(ForgotPasswordModel)(forgotPasswordHandler)
  )
)
