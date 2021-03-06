import NextLink from 'next/link'

import type { FC } from 'react'

interface Props {
  href: string
  classes?: string
}

export const Link: FC<Props> = ({ children, href, classes }) => {
  const className = `text-grey-900 font-semibold hover:text-gray-600 py-2 ${
    classes ?? ''
  }`
  return (
    <NextLink href={href}>
      <a className={className}>{children}</a>
    </NextLink>
  )
}
