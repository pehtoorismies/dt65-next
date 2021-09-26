import { FC } from 'react'
import { Link } from '@components/link'

interface LinkType {
  id: number
  title: string
  href: string
}

interface Props {
  title: string
  links: LinkType[]
}

export const AuthTemplate: FC<Props> = ({ children, title, links }) => {
  return (
    <div>
      <div className="bg-gray-50 py-12 px-2 sm:px-6 lg:px-8 bg-pink-100">
        <div className="rounded bg-white rounded overflow-hidden shadow-xl p-5 grid max-w-md container-md mx-auto">
          <h1 className="text-3xl font-bold my-2 uppercase text-center">
            {title}
          </h1>
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
