import Head from 'next/head'
import * as E from 'fp-ts/Either'
import { useState } from 'react'

import { Login } from './components/Login'
import { authService } from './services/auth-service'

import type { NextPage } from 'next'
import type { LoginModel } from '#domain/auth'

export const LoginPage: NextPage = () => {
  const [isSubmitting, setSubmitting] = useState(false)
  const [fieldError, setFieldError] = useState('')

  const onSubmit = async (values: LoginModel) => {
    setSubmitting(true)
    const login = authService.loginTask(values)
    const result = await login()

    if (E.isRight(result)) {
      // write to local storage
    } else {
      const { message } = result.left
      setFieldError(message)
    }

    setSubmitting(false)
  }

  return (
    <div>
      <Head>
        <title>DT65 - Kirjaudu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        fieldError={fieldError}
      />
    </div>
  )
}
