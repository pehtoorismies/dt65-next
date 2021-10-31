import './base.css'

import { none } from 'fp-ts/Option'

import { UserContextProvider } from '#context/user-context'
import { Layout } from '#components/layout/layout'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider getUser={getUser}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  )
}
export default MyApp

const getUser = () => {
  return none
}
