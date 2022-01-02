import Head from 'next/head'
import * as E from 'fp-ts/Either'
import { useState } from 'react'

import { Register } from './components/register'
import { apiRegister } from './api-client/api-register'

import type { NextPage } from 'next'
import type { RegisterModel } from '#domain/auth'

export const RegisterPageContainer: NextPage = () => {
  const [isSubmitting, setSubmitting] = useState(false)
  const [fieldError, setFieldError] = useState('')

  const onSubmit = async (values: RegisterModel) => {
    setSubmitting(true)
    const result = await apiRegister(values)()

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
