import { VFC } from 'react'
import * as React from 'react'

interface Props {
  id: string
  name: string
  type: 'email' | 'text' | 'password'
  onChange: (event: React.ChangeEvent<unknown>) => void
  value: string
  placeholder: string
}

export const TextInput: VFC<Props> = (props) => {
  return (
    <input
      {...props}
      className="w-full focus:ring-indigo-500 focus:border-indigo-500 rounded-none rounded-r-md border-gray-300"
    />
  )
}
