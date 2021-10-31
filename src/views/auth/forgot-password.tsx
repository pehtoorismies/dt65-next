import { Form, Formik } from 'formik'
import { TextInput } from '@components/text-input'

import { AuthTemplate } from './auth-template'
import { validateEmail } from './validations'

import type { FormikHelpers } from 'formik'
import type { VFC } from 'react'


interface ForgotPasswordModel {
  email: string
}

const initialValues: ForgotPasswordModel = { email: '' }

const links = [
  {
    id: 1,
    href: '',
    title: 'Kirjatumiseen',
  },
]

export interface ForgotPasswordProps {
  onSubmit: (
    values: ForgotPasswordModel,
    actions: FormikHelpers<ForgotPasswordModel>
  ) => void
}

export const ForgotPassword: VFC<ForgotPasswordProps> = ({ onSubmit }) => {
  return (
    <AuthTemplate title="Unohtunut salasana" links={links}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="Sähköpostiosoite*"
            validate={validateEmail}
          />

          <div className="p-1">
            <button
              type="submit"
              className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded"
            >
              Lähetä salasana
            </button>
          </div>
        </Form>
      </Formik>
    </AuthTemplate>
  )
}
