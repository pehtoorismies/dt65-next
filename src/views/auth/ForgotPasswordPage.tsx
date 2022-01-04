import Head from 'next/head'
import * as E from 'fp-ts/Either'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { ForgotPassword } from './components/ForgotPassword'
import { authService } from './services/auth-service'

import type { NextPage } from 'next'
import type { ForgotPasswordModelC } from '#domain/auth'

export const ForgotPasswordPage: NextPage = () => {
  const router = useRouter()
  const [isSubmitting, setSubmitting] = useState(false)
  const [generalError, setGeneralError] = useState('')

  const onSubmit = async (model: ForgotPasswordModelC) => {
    setSubmitting(true)
    const forgotPassword = authService.forgotPasswordTask(model)
    const result = await forgotPassword()

    setSubmitting(false)

    if (E.isRight(result)) {
      switch (result.right.type) {
        case 'success': {
          return await router.push('/')
        }
        case 'error': {
          return setGeneralError(result.right.message)
        }
      }
    } else {
      setGeneralError(result.left.message)
    }
  }

  return (
    <>
      <Head>
        <title>DT65 - Unohtunut salasana</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ForgotPassword
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        generalError={generalError}
      />
    </>
  )
}
