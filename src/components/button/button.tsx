import { LoadingIcon } from './loading'

import type { FC } from 'react'

export interface ButtonProps {
  isLoading?: boolean
}

// bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded
export const Button: FC<ButtonProps> = ({ isLoading, children }) => {
  return (
    <button
      type="button"
      className="inline-flex items-center px-4 py-2 border border-transparent text-white leading-6 rounded bg-pink-400 hover:bg-pink-500 focus:border-pink-700 transition ease-in-out duration-150 cursor-not-allowe"
    >
      {isLoading && <LoadingIcon />}
      {children}
    </button>
  )
}
