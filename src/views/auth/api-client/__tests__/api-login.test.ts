import * as E from 'fp-ts/Either'

import { apiLogin } from '../api-login'

const mockFetchLoginSuccess = async (url: string) => {
  switch (url) {
    case '/api/login': {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          accessToken: 'someToken',
          idToken: 'someIdToken',
          expiresIn: '123',
        }),
      }
    }
    default: {
      throw new Error(`Unhandled request: ${url}`)
    }
  }
}
const mockFetchLoginError = async (url: string) => {
  switch (url) {
    case '/api/login': {
      return {
        ok: false,
        status: 400,
        json: async () => ({
          code: 'test_error',
          message: 'test message',
        }),
      }
    }
    default: {
      throw new Error(`Unhandled request: ${url}`)
    }
  }
}

describe('Api login', () => {
  it('login success', async () => {
    window.fetch = jest.fn().mockImplementation(mockFetchLoginSuccess)
    const login = apiLogin({ password: '123', email: 'some@email.com' })
    const response = await login()

    if (E.isLeft(response)) {
      throw new Error('Fail test')
    }

    expect(response.right.accessToken).toBe('someToken')
  })

  it('login error', async () => {
    window.fetch = jest.fn().mockImplementation(mockFetchLoginError)
    const login = apiLogin({ password: '123', email: 'some@email.com' })
    const response = await login()

    if (E.isRight(response)) {
      throw new Error('Fail test')
    }

    expect(response.left.message).toBe('test message')
    expect(response.left.code).toBe('test_error')
  })
})
