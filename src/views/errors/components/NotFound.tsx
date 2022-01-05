import Image from 'next/image'

import type { VFC } from 'react'
import { Link } from '#components/Link'

export interface Props {}

export const NotFound: VFC<Props> = ({}) => {
  return (
    <div className="flex flex-col justify-center items-center bg-slate-200 p-5">
      <h1 className="text-6xl font-semibold py-3">PUMMI</h1>

      <Image
        src="/finger-up.jpg"
        alt="Finger up"
        width={250}
        height={250}
        className="rounded-2xl"
      />

      <p className="text-1xl font-semibold py-3">Sivua ei löytynyt</p>
      <Link href="/" classes="text-center">
        Poistu
      </Link>
    </div>
  )
}
