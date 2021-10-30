import { Form, Formik } from 'formik'

import { TextInput } from '@components/text-input'

import { AuthTemplate } from './auth-template'
import { validateEmail, validatePassword } from './validations'

import type { FormikHelpers } from 'formik'
import type { VFC } from 'react'


interface LoginModel {
  email: string
  password: string
}

const links = [
  {
    id: 1,
    title: 'Salasana unohtunut?',
    href: '',
  },
  { id: 2, title: 'Rekisteröitymiseen', href: '' },
]

const initialValues: LoginModel = { email: '', password: '' }

export interface LoginProps {
  onSubmit: (values: LoginModel, actions: FormikHelpers<LoginModel>) => void
}

export const Login: VFC<LoginProps> = ({ onSubmit }) => {
  return (
    <AuthTemplate title="Kirjaudu" links={links}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="Sähköpostiosoite*"
            validate={validateEmail}
          />
          <TextInput
            id="password"
            name="password"
            type="password"
            placeholder="Salasana*"
            validate={validatePassword}
          />
          <div className="p-1">
            <button
              type="submit"
              className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded"
            >
              Kirjaudu
            </button>
          </div>
        </Form>
      </Formik>
    </AuthTemplate>
  )
}
