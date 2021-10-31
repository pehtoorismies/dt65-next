import Head from 'next/head'

import { Login } from './login'

import type { NextPage } from 'next'

export const LoginPageContainer: NextPage = () => {
  return (
    <div>
      <Head>
        <title>DT65 - Kirjaudu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </div>
  )
}
