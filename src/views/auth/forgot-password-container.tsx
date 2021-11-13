import Head from 'next/head'
import * as E from 'fp-ts/Either'
import { useState } from 'react'

import { Login } from './components/login'
import { auth0ApiClient } from './auth0-api-client'

import type { LoginModel } from './components/login'
import type { NextPage } from 'next'

export const ForgotPasswordPageContainer: NextPage = () => {
  const [isSubmitting, setSubmitting] = useState(false)
  const [fieldError, setFieldError] = useState('')

  const onSubmit = async (values: LoginModel) => {
    setSubmitting(true)
    const result = await auth0ApiClient.login(values)()

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
