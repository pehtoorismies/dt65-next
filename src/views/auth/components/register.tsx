import { useFormik } from 'formik'
import { useEffect } from 'react'

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
          validate={validateEmail}
        />
        <TextInput
          id="nick"
          name="nick"
          type="text"
          placeholder="Käyttäjätunnus / Nick*"
          onChange={handleChange}
          value={values.nick}
          error={errors.nick}
          validate={isRequired}
        />

        <TextInput
          id="name"
          name="name"
          type="text"
          placeholder="Etunimi Sukunimi*"
          onChange={handleChange}
          value={values.name}
          error={errors.name}
          validate={isRequired}
        />

        <TextInput
          id="password"
          name="password"
          type="password"
          placeholder="Salasana*"
          onChange={handleChange}
          value={values.password}
          error={errors.password}
          validate={validatePassword}
        />

        <TextInput
          id="registerSecretCode"
          name="registerSecretCode"
          type="text"
          placeholder="Saamasi rekisteröintitunnus*"
          onChange={handleChange}
          value={values.registerSecretCode}
          error={errors.registerSecretCode}
          validate={isRequired}
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
