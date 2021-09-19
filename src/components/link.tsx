import { FC } from 'react'
import NextLink from 'next/link'

interface Props {
  href: string
}

export const Link: FC<Props> = ({ children, href }) => {
  return (
    <NextLink href={href}>
      <a className="text-grey-900 text-center font-semibold hover:text-gray-600 py-2">
        {children}
      </a>
    </NextLink>
  )
}
