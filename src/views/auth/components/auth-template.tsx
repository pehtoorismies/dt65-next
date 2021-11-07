import { Link } from '#components/link'

import { AlertBox } from './alert-box'

import type { FC } from 'react'

interface LinkType {
  id: number
  title: string
  href: string
}

interface Props {
  title: string
  generalError?: string
  links: LinkType[]
}

export const AuthTemplate: FC<Props> = ({
  generalError,
  children,
  title,
  links,
}) => {
  return (
    <div>
      <div className="py-12 px-2 sm:px-6 lg:px-8">
        <div className="rounded bg-white rounded overflow-hidden shadow-xl p-5 grid max-w-md container-md mx-auto">
          <h1 className="text-3xl font-bold my-2 uppercase text-center">
            {title}
          </h1>
          {generalError && <AlertBox title="Virhe" text={generalError} />}
          {children}
          {links.map(({ id, title, href }) => (
            <Link key={id} href={href}>
              {title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
