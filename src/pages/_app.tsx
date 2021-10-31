import './base.css'

import { UserContextProvider } from '#context/user-context'
import { Layout } from '#components/layout/layout'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  )
}
export default MyApp
