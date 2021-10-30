import Head from 'next/head'

import { Layout } from '@components/layout/layout'

import type { NextPage } from 'next'

const CreateEvent: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="Luo uusi tapahtuma">Creaete</Layout>
    </div>
  )
}

export default CreateEvent
