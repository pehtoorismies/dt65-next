import { AlertBox } from './AlertBox'

import type { FC } from 'react'

interface Props {
  title: string
  generalError?: string
}

export const AuthTemplate: FC<Props> = ({ generalError, children, title }) => {
  return (
    <div>
      <div className="py-12 px-2 sm:px-6 lg:px-8">
        <div className="rounded bg-white rounded overflow-hidden shadow-xl p-5 grid max-w-md container-md mx-auto">
          <h1 className="text-3xl font-bold my-2 uppercase text-center">
            {title}
          </h1>
          {generalError && <AlertBox title="Virhe" text={generalError} />}
          {children}
        </div>
      </div>
    </div>
  )
}
