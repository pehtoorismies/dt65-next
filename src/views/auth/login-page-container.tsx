import Head from 'next/head'
import { pipe } from 'fp-ts/function'
import { fold } from 'fp-ts/Either'

import { AuthData, AuthError } from '#domain/auth-response'

import { Login } from './components/login'

import type { FormikHelpers } from 'formik'
import type { LoginModel } from './components/login'
import type { NextPage } from 'next'

const onSubmit = async (
  values: LoginModel,
  actions: FormikHelpers<LoginModel>
) => {
  actions.setSubmitting(true)
  const response = await fetch('/api/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })

  if (response.status === 200) {
    const authData = await response.json()

    pipe(
      AuthData.decode(authData),
      fold(
        () => {},
        () => {}
      )
    )
  } else if (response.status === 400) {
    const authError = await response.json()

    pipe(
      AuthError.decode(authError),
      fold(
        () => {},
        () => {}
      )
    )
  } else {
    console.error('Internal server error', response)
  }

  actions.setSubmitting(false)
}

export const LoginPageContainer: NextPage = () => {
  return (
    <div>
      <Head>
        <title>DT65 - Kirjaudu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login onSubmit={onSubmit} />
    </div>
  )
}
