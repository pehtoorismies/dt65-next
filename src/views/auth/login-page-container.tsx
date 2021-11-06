import Head from 'next/head'
import * as E from 'fp-ts/Either'

import { Login } from './components/login'
import { auth0ApiClient } from './auth0-api-client'

import type { FormikHelpers } from 'formik'
import type { LoginModel } from './components/login'
import type { NextPage } from 'next'

const onSubmit = async (
  values: LoginModel,
  actions: FormikHelpers<LoginModel>
) => {
  actions.setSubmitting(true)
  const result = await auth0ApiClient.login(values)()

  if (E.isRight(result)) {
    // write to local storage
  } else {
    const { message } = result.left
    actions.setErrors({ email: message, password: message })
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
