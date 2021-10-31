import { HomeIcon, PlusIcon, UserIcon, UsersIcon } from '@heroicons/react/solid'
import NextLink from 'next/link'
import { toNullable } from 'fp-ts/Option'

import { useUserContext } from '#context/user-context'
import { Link } from '#components/link'

import type { FC, VFC } from 'react'
import type { User } from '#domain/user'

export interface Props {
  user: User
}

const iconClass = 'h-8 w-8 text-black-500 cursor-pointer'

const UserProfile: VFC<Props> = ({ user }) => {
  return (
    <>
      <div className="mr-2">{user.nick}</div>
      <UserIcon className={iconClass} />
    </>
  )
}

export const Layout: FC = ({ children }) => {
  const { user: maybeUser } = useUserContext()
  const user = toNullable(maybeUser)

  return (
    <div>
      <nav className="flex items-center justify-between border-gray-300 bg-gray-50 fixed w-full p-2 border-t-0 border-b border-r-0 border-l-0">
        <div className="flex items-center h-8">
          <Link href="/" classes="text-blue-600">
            <div className="font-semibold text-xl mr-6">Dt65</div>
          </Link>
          <ul className="hidden md:flex">
            <li className="mr-6">
              <Link href="/events" classes="text-blue-600">
                Tapahtumat
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/events/create" classes="text-blue-600">
                Luo uusi
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/users">Käyttäjät</Link>
            </li>
          </ul>
        </div>
        <div className="mr-2 hidden md:flex items-center">
          {user && <UserProfile user={user} />}
        </div>
      </nav>

      <nav className="flex items-center justify-between md:hidden bg-gray-50 fixed bottom-0 w-full p-3 border-t-2 border-gray-300">
        <NextLink href="/events">
          <HomeIcon className={iconClass} />
        </NextLink>
        <NextLink href="/events/create">
          <PlusIcon className={iconClass} />
        </NextLink>
        <NextLink href="/users">
          <UsersIcon className={iconClass} />
        </NextLink>
        <NextLink href="/me">
          <UserIcon className={iconClass} />
        </NextLink>
      </nav>
      <main className="pt-12 pb-16 md:pb-0 px-2">{children}</main>
    </div>
  )
}
