import { useFormik } from 'formik'
import { useEffect } from 'react'

import { TextInput } from '#components/text-input'
import { Button } from '#components/button/button'
import { Link } from '#components/link'

import { AuthTemplate } from './auth-template'
import { validateEmail, validatePassword } from './validations'

import type { VFC } from 'react'

export interface LoginModel {
  email: string
  password: string
}

const INITIAL_VALUES: LoginModel = { email: '', password: '' }

export interface LoginProps {
  onSubmit: (values: LoginModel) => void
  fieldError?: string
  generalError?: string
  isSubmitting: boolean
}

const validate = (values: LoginModel) => {
  const errors: Partial<LoginModel> = {}
  errors.email = validateEmail(values.email)
  errors.password = validatePassword(values.email)
  return errors
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
    validate,
  })
  useEffect(() => {
    formik.setSubmitting(isSubmitting)
    if (fieldError) {
      formik.setErrors({
        email: fieldError,
        password: fieldError,
      })
    }
  }, [fieldError, isSubmitting, formik])

  return (
    <AuthTemplate title="Kirjaudu" generalError={generalError}>
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
          id="password"
          name="password"
          type="password"
          placeholder="Salasana*"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
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
