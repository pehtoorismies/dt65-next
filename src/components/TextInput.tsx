import type { VFC, ChangeEvent } from 'react'

interface Props {
  id: string
  name: string
  type: 'email' | 'text' | 'password'
  placeholder: string
  onChange: (event: ChangeEvent<unknown>) => void
  value: string
  error?: string
  autoComplete?:
    | 'on'
    | 'off'
    | 'email'
    | 'current-password'
    | 'new-password'
    | 'name'
}

export const TextInput: VFC<Props> = (props) => {
  return (
    <div className="p-1">
      <input
        {...props}
        className="w-full focus:ring-indigo-500 focus:border-indigo-500 rounded-none rounded-r-md border-gray-300"
      />
      {props.error && (
        <span className="text-red-600 font-semibold">{props.error}</span>
      )}
    </div>
  )
}
