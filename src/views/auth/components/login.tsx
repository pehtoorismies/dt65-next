import { useFormik } from 'formik'
import { useEffect } from 'react'

import { TextInput } from '#components/text-input'
import { Button } from '#components/button/button'
import { Link } from '#components/link'

import { AuthTemplate } from './auth-template'
import { validateEmail, validatePassword } from './validations'

import type { VFC } from 'react'
import type { LoginModel } from '#domain/auth'

const INITIAL_VALUES: LoginModel = { email: '', password: '' }

export interface LoginProps {
  onSubmit: (values: LoginModel) => void
  fieldError?: string
  generalError?: string
  isSubmitting: boolean
}

export const Login: VFC<LoginProps> = ({
  onSubmit,
  fieldError,
  generalError,
  isSubmitting,
}) => {
  const formik = useFormik<LoginModel>({
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
    <AuthTemplate title="Kirjaudu" generalError={generalError}>
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
          id="password"
          name="password"
          type="password"
          placeholder="Salasana*"
          onChange={handleChange}
          value={values.password}
          error={errors.password}
          validate={validatePassword}
        />
        <div className="p-1">
          <Button isLoading={isSubmitting} type="submit" className="w-full">
            Kirjaudu
          </Button>
        </div>
      </form>
      <Link href="/auth/forgot-password">Unohtunut salasana</Link>
      <Link href="/auth/register">Rekisteröidy</Link>
    </AuthTemplate>
  )
}
