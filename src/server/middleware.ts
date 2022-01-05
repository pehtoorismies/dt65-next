import * as t from 'io-ts'
import * as E from 'fp-ts/Either'

import { AUTH_ERROR_CODES } from '#config/constants'

import type { NextApiRequest, NextApiResponse } from 'next'

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>

export const withVerifyPostMethod =
  (handler: Handler) => async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
      return res.status(400).json({
        message: 'Invalid http method. Use POST.',
        code: AUTH_ERROR_CODES.INVALID_HTTP_METHOD,
        type: 'error',
      })
    }

    return handler(req, res)
  }

export const withVerifyBodyParameters =
  (model: t.Decoder<any, any>) =>
  (handler: Handler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const p = model.decode(req.body)
    if (E.isLeft(p)) {
      return res.status(400).json({
        message: 'Missing required fields',
        code: AUTH_ERROR_CODES.REQUEST_MISSING_FIELDS,
        type: 'error',
      })
    }

    return handler(req, res)
  }
