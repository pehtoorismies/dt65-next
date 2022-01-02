import { useFormik } from 'formik'
import { useEffect } from 'react'

import { TextInput } from '#components/TextInput'
import { Link } from '#components/Link'
import { Button } from '#components/button/Button'
import { createErrorObject } from '#views/auth/components/create-error-object'

import { AuthTemplate } from './AuthTemplate'
import {
  isRequired,
  validateEmail,
  validateName,
  validatePassword,
} from './validations'

import type { RegisterModel } from '#domain/auth'
import type { VFC } from 'react'

const validate = ({
  email,
  name,
  nick,
  password,
  registerSecretCode,
}: RegisterModel): Partial<RegisterModel> => {
  return createErrorObject([
    ['email', validateEmail(email)],
    ['name', validateName(name)],
    ['nick', isRequired(nick, 'Käyttäjätunnus/nick')],
    ['password', validatePassword(password)],
    [
      'registerSecretCode',
      isRequired(registerSecretCode, 'Rekisteröintitunnus'),
    ],
  ])
}

const INITIAL_VALUES: RegisterModel = {
  email: '',
  password: '',
  nick: '',
  registerSecretCode: '',
  name: '',
}

export interface RegisterProps {
  onSubmit: (values: RegisterModel) => void
  fieldError?: string
  generalError?: string
  isSubmitting: boolean
}

export const Register: VFC<RegisterProps> = ({
  onSubmit,
  fieldError,
  generalError,
  isSubmitting,
}) => {
  const formik = useFormik<RegisterModel>({
    initialValues: INITIAL_VALUES,
    onSubmit,
    validate,
  })

  const {
    setSubmitting,
    setErrors,
    handleSubmit,
    values,
    errors,
    handleChange,
  } = formik

  useEffect(() => {
    setSubmitting(isSubmitting)
    if (fieldError) {
      setErrors({
        email: fieldError,
        password: fieldError,
      })
    }
  }, [fieldError, isSubmitting, setSubmitting, setErrors])

  return (
    <AuthTemplate title="Rekisteröidy" generalError={generalError}>
      <form onSubmit={handleSubmit}>
        <TextInput
          id="email"
          name="email"
          type="email"
          placeholder="Sähköpostiosoite*"
          onChange={handleChange}
          value={values.email}
          error={errors.email}
          autoComplete="email"
        />
        <TextInput
          id="nick"
          name="nick"
          type="text"
          placeholder="Käyttäjätunnus / Nick*"
          onChange={handleChange}
          value={values.nick}
          error={errors.nick}
        />

        <TextInput
          id="name"
          name="name"
          type="text"
          placeholder="Etunimi Sukunimi*"
          onChange={handleChange}
          value={values.name}
          error={errors.name}
        />

        <TextInput
          id="password"
          name="password"
          type="password"
          placeholder="Salasana*"
          onChange={handleChange}
          value={values.password}
          error={errors.password}
          autoComplete="new-password"
        />

        <TextInput
          id="registerSecretCode"
          name="registerSecretCode"
          type="text"
          placeholder="Saamasi rekisteröintitunnus*"
          onChange={handleChange}
          value={values.registerSecretCode}
          error={errors.registerSecretCode}
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
