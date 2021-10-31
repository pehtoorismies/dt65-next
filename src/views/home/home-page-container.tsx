import { fold } from 'fp-ts/Option'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useUserContext } from '#context/user-context'

import type { NextPage } from 'next'

export const HomePageContainer: NextPage = () => {
  const { user } = useUserContext()
  const router = useRouter()

  const redirect = fold(
    () => router.push('/login'),
    () => router.push('/events')
  )

  useEffect(() => {
    redirect(user).then()
  }, [user, redirect])

  return (
    <div className="m-auto w-full py-32">
      <h1 className="text-center text-5xl">..Downtown 65 Events..</h1>
    </div>
  )
}
