import { HomeIcon, PlusIcon, UserIcon, UsersIcon } from '@heroicons/react/solid'
import NextLink from 'next/link'

import { Link } from '@components/link'

import type { FC } from 'react'

export interface LayoutProps {
  title: string
}

const iconClass = 'h-8 w-8 text-black-500 cursor-pointer'

export const Layout: FC<LayoutProps> = ({ children, title }) => {
  return (
    <div>
      <nav className="flex items-center justify-between bg-gray-100 fixed w-full p-2 ">
        <div className="flex items-center h-8">
          <div className="font-semibold text-xl mr-6">DT65.events</div>
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
          <div className="mr-2">pehtoorismies</div>
          <UserIcon className={iconClass} />
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
