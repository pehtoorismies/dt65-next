import { LoadingIcon } from './LoadingIcon'

import type { FC } from 'react'

export interface ButtonProps {
  isLoading?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

// bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded
export const Button: FC<ButtonProps> = ({
  isLoading,
  type,
  className,
  children,
}) => {
  const classes = `inline-flex items-center px-4 py-2 border border-transparent text-white leading-6 rounded bg-pink-400 hover:bg-pink-500 focus:border-pink-700 transition ease-in-out duration-150 cursor-not-allowed ${
    className ?? ''
  }`

  return (
    <button type={type || 'button'} className={classes}>
      {isLoading && <LoadingIcon />}
      {children}
    </button>
  )
}
//  className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded"
