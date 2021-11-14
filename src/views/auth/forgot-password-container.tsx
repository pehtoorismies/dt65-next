import Head from 'next/head'
import * as E from 'fp-ts/Either'
import { useState } from 'react'

import { ForgotPassword } from './components/forgot-password'
import { auth0ApiClient } from './auth0-api-client'

import type { NextPage } from 'next'
import type { ForgotPasswordModel } from '#domain/auth'

export const ForgotPasswordPageContainer: NextPage = () => {
  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit = async ({ email }: ForgotPasswordModel) => {
    setSubmitting(true)
    const result = await auth0ApiClient.forgotPassword(email)

    if (E.isRight(result)) {
      // write to local storage
    } else {
      const { message } = result.left
    }

    setSubmitting(false)
  }

  return (
    <div>
      <Head>
        <title>DT65 - Kirjaudu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ForgotPassword onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}
