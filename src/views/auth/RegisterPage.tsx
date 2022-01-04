import Head from 'next/head'
import * as E from 'fp-ts/Either'
import { useState } from 'react'

import { Register } from './components/Register'
import { authService } from './services/auth-service'

import type { NextPage } from 'next'
import type { RegisterModelC } from '#domain/auth'

export const RegisterPage: NextPage = () => {
  const [isSubmitting, setSubmitting] = useState(false)
  const [fieldError, setFieldError] = useState('')

  const onSubmit = async (model: RegisterModelC) => {
    setSubmitting(true)
    const register = authService.registerTask(model)
    const result = await register()

    if (E.isRight(result)) {
      // redirect to somewhere
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
      <Register
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        fieldError={fieldError}
      />
    </div>
  )
}
