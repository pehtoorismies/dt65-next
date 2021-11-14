import Head from 'next/head'
import * as E from 'fp-ts/Either'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { ForgotPassword } from './components/forgot-password'
import { apiForgotPassword } from './api-client/api-forgot-password'

import type { NextPage } from 'next'
import type { ForgotPasswordModel } from '#domain/auth'

export const ForgotPasswordPageContainer: NextPage = () => {
  const router = useRouter()
  const [isSubmitting, setSubmitting] = useState(false)
  const [generalError, setGeneralError] = useState('')

  const onSubmit = async (model: ForgotPasswordModel) => {
    setSubmitting(true)
    const forgotPassword = apiForgotPassword(model)
    const result = await forgotPassword()

    if (E.isRight(result)) {
      await router.push('/login')
    } else {
      setGeneralError(result.left.message)
    }

    setSubmitting(false)
  }

  return (
    <div>
      <Head>
        <title>DT65 - Unohtunut salasana</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ForgotPassword
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        generalError={generalError}
      />
    </div>
  )
}
