import '../styles/global.css'

import { none } from 'fp-ts/Option'

import { UserContextProvider } from '#context/UserContext'
import { Layout } from '#components/layout/Layout'

import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps, err }: AppProps & { err: unknown }) => {
  return (
    <UserContextProvider getUser={getUser}>
      <Layout>
        <Component {...pageProps} err={err} />
      </Layout>
    </UserContextProvider>
  )
}

export default MyApp

const getUser = () => {
  return none
}
