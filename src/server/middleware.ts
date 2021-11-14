import * as t from 'io-ts'
import * as E from 'fp-ts/Either'

import type { NextApiRequest, NextApiResponse } from 'next'

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>

export const withVerifyPostMethod =
  (handler: Handler) => async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
      return res.status(400).json({
        message: 'Invalid http method',
        code: 'invalid_request',
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
        message: 'Missing fields',
        code: 'invalid_request',
        type: 'error',
      })
    }

    return handler(req, res)
  }
