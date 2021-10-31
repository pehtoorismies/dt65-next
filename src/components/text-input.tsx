import { ErrorMessage, Field } from 'formik'

import type { VFC } from 'react'

interface Props {
  id: string
  name: string
  type: 'email' | 'text' | 'password'
  placeholder: string
  validate?: (value: string) => undefined | string | Promise<string>
}

export const TextInput: VFC<Props> = (props) => {
  return (
    <div className="p-1">
      <Field
        {...props}
        className="w-full focus:ring-indigo-500 focus:border-indigo-500 rounded-none rounded-r-md border-gray-300"
      />
      <span className="text-red-600 font-semibold">
        <ErrorMessage name={props.name} />
      </span>
    </div>
  )
}
