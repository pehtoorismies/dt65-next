import Head from 'next/head'
import * as E from 'fp-ts/Either'
import { useState } from 'react'

import { Register } from './components/register'
import { apiForgotPassword } from './api-client/api-forgot-password'

import type { NextPage } from 'next'
import type { RegisterModel } from '#domain/auth'

export const RegisterPageContainer: NextPage = () => {
  const [isSubmitting, setSubmitting] = useState(false)
  const [fieldError, setFieldError] = useState('')

  const onSubmit = async (values: RegisterModel) => {
    setSubmitting(true)
    const result = await apiForgotPassword.login(values)()

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
      <Register
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        fieldError={fieldError}
      />
    </div>
  )
}
