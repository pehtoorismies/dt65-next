import Head from 'next/head'

import { User } from '#domain/user'

import type { NextPage } from 'next'

interface Props {
  user: User | null
}

export const HomePageContainer: NextPage<Props> = ({ user }) => {
  return (
    <div>
      <Head>
        <title>DT65 Events</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && user.nick}
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  )
}
