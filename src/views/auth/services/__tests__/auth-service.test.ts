import * as E from 'fp-ts/Either'

import { authService } from '../auth-service'

const mockSuccess = async (url: string) => {
  switch (url) {
    case '/api/login': {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          type: 'success',
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
const mockError = async (url: string) => {
  switch (url) {
    case '/api/forgot-password': {
      return {
        ok: false,
        status: 400,
        json: async () => ({
          type: 'error',
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

describe('Api', () => {
  describe('login', () => {
    it('200 auth data', async () => {
      window.fetch = jest.fn().mockImplementation(mockSuccess)
      const login = authService.loginTask({
        email: 'some@email.com',
        password: '123123',
      })
      const response = await login()

      if (E.isLeft(response)) {
        throw new Error('Fail test')
      }

      const { right: result } = response
      if (result.type === 'error') {
        throw new Error('Fail test')
      }

      expect(result.accessToken).toBe('someToken')
      expect(result.idToken).toBe('someIdToken')
      expect(result.expiresIn).toBe('123')
    })
  })

  describe('forgotPassword', () => {
    it('400 error', async () => {
      window.fetch = jest.fn().mockImplementation(mockError)
      const forgotPassword = authService.forgotPasswordTask({
        email: 'some@email.com',
      })
      const response = await forgotPassword()
      if (E.isLeft(response)) {
        throw new Error('Fail test')
      }

      expect(response.right.message).toBe('test message')
    })
  })
})
