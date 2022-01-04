import * as E from 'fp-ts/Either'

import { authService } from '../auth-service'

// const mockFetchLoginSuccess = async (url: string) => {
//   switch (url) {
//     case '/api/login': {
//       return {
//         ok: true,
//         status: 200,
//         json: async () => ({
//           accessToken: 'someToken',
//           idToken: 'someIdToken',
//           expiresIn: '123',
//         }),
//       }
//     }
//     default: {
//       throw new Error(`Unhandled request: ${url}`)
//     }
//   }
// }
const mockForgotPassword400 = async (url: string) => {
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
  describe('forgotPassword', () => {
    it('400 error', async () => {
      window.fetch = jest.fn().mockImplementation(mockForgotPassword400)
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
