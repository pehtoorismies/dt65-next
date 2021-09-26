import type { NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '@components/layout/layout'

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
