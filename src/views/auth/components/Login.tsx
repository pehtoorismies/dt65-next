import { useFormik } from 'formik'
import { useEffect } from 'react'

import { TextInput } from '#components/TextInput'
import { Button } from '#components/button/Button'
import { Link } from '#components/Link'
import { createErrorObject } from '#views/auth/components/create-error-object'

import { AuthTemplate } from './AuthTemplate'
import { validateEmail, validatePassword } from './validations'

import type { VFC } from 'react'
import type { LoginModelC } from '#domain/auth'

const validate = ({ email, password }: LoginModelC): Partial<LoginModelC> => {
  return createErrorObject([
    ['email', validateEmail(email)],
    ['password', validatePassword(password)],
  ])
}

const INITIAL_VALUES: LoginModelC = { email: '', password: '' }

export interface LoginProps {
  onSubmit: (values: LoginModelC) => void
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
  const formik = useFormik<LoginModelC>({
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
    <AuthTemplate title="Kirjaudu" generalError={generalError}>
      <button
        type="button"
        onClick={() => {
          throw new Error('Sentry Frontend Error')
        }}
      >
        Throw error
      </button>
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
          id="password"
          name="password"
          type="password"
          placeholder="Salasana*"
          onChange={handleChange}
          value={values.password}
          error={errors.password}
          autoComplete="current-password"
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
