import { useFormik } from 'formik'

import { TextInput } from '#components/text-input'
import { Link } from '#components/link'
import { Button } from '#components/button/button'

import { AuthTemplate } from './auth-template'
import { isRequired, validateEmail, validatePassword } from './validations'

import type { VFC } from 'react'
import type { RegisterModel } from '#domain/auth'

const INITIAL_VALUES: RegisterModel = {
  email: '',
  password: '',
  nick: '',
  registerSecretCode: '',
  name: '',
}

const validate = (values: RegisterModel) => {
  const errors: Partial<RegisterModel> = {}
  errors.email = validateEmail(values.email)
  errors.password = validatePassword(values.password)
  errors.nick = isRequired(values.nick)
  errors.registerSecretCode = isRequired(values.registerSecretCode)
  errors.name = isRequired(values.name)
  return errors
}

export interface RegisterProps {
  generalError?: string
  isSubmitting: boolean
  onSubmit: (values: RegisterModel) => void
}

export const Register: VFC<RegisterProps> = ({
  onSubmit,
  generalError,
  isSubmitting,
}) => {
  const formik = useFormik<RegisterModel>({
    initialValues: INITIAL_VALUES,
    onSubmit,
    validate,
  })

  return (
    <AuthTemplate title="Rekisteröidy" generalError={generalError}>
      <form onSubmit={formik.handleSubmit}>
        <TextInput
          id="email"
          name="email"
          type="email"
          placeholder="Sähköpostiosoite*"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <TextInput
          id="nick"
          name="nick"
          type="text"
          placeholder="Käyttäjätunnus / Nick*"
          onChange={formik.handleChange}
          value={formik.values.nick}
          error={formik.errors.nick}
        />

        <TextInput
          id="name"
          name="name"
          type="text"
          placeholder="Etunimi Sukunimi*"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />

        <TextInput
          id="password"
          name="password"
          type="password"
          placeholder="Salasana*"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />

        <TextInput
          id="registerSecretCode"
          name="registerSecretCode"
          type="text"
          placeholder="Saamasi rekisteröintitunnus*"
          onChange={formik.handleChange}
          value={formik.values.registerSecretCode}
          error={formik.errors.registerSecretCode}
        />
        <div className="p-1">
          <Button isLoading={isSubmitting} type="submit" className="w-full">
            Rekisteröidy
          </Button>
        </div>
      </form>
      <Link href="/auth/login">Kirjautumiseen</Link>
    </AuthTemplate>
  )
}
