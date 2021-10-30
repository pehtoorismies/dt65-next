import { VFC } from 'react'
import { ErrorMessage, Field, FormikHelpers, Formik, Form } from 'formik'
import { AuthTemplate } from './auth-template'
import { validateEmail, validatePassword, isRequired } from './validations'
import { TextInput } from '@components/text-input'

interface RegisterModel {
  email: string
  nick: string
  name: string
  password: string
  registerSecretCode: string
}

const links = [
  {
    id: 1,
    title: 'Kirjautumiseen',
    href: '',
  },
]

const initialValues: RegisterModel = {
  email: '',
  password: '',
  nick: '',
  registerSecretCode: '',
  name: '',
}

export interface RegisterProps {
  onSubmit: (
    values: RegisterModel,
    actions: FormikHelpers<RegisterModel>
  ) => void
}

export const Register: VFC<RegisterProps> = ({ onSubmit }) => {
  return (
    <AuthTemplate title="Rekisteröidy" links={links}>
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
            id="nick"
            name="nick"
            type="text"
            placeholder="Käyttäjätunnus / Nick*"
            validate={isRequired}
          />

          <TextInput
            id="name"
            name="name"
            type="text"
            placeholder="Etunimi Sukunimi*"
            validate={isRequired}
          />

          <TextInput
            id="password"
            name="password"
            type="password"
            placeholder="Salasana*"
            validate={validatePassword}
          />

          <TextInput
            id="registerSecretCode"
            name="registerSecretCode"
            type="text"
            placeholder="Saamasi rekisteröintitunnus*"
            validate={isRequired}
          />
          <div className="p-1">
            <button
              type="submit"
              className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded"
            >
              Rekisteröidy
            </button>
          </div>
        </Form>
      </Formik>
    </AuthTemplate>
  )
}
