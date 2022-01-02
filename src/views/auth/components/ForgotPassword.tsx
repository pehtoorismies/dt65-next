import { useFormik } from 'formik'

import { TextInput } from '#components/TextInput'
import { Button } from '#components/button/Button'
import { Link } from '#components/Link'
import { createErrorObject } from '#views/auth/components/create-error-object'

import { AuthTemplate } from './AuthTemplate'
import { validateEmail } from './validations'

import type { VFC } from 'react'
import type { ForgotPasswordModel } from '#domain/auth'

const validate = ({
  email,
}: ForgotPasswordModel): Partial<ForgotPasswordModel> => {
  return createErrorObject([['email', validateEmail(email)]])
}

const INITIAL_VALUES: ForgotPasswordModel = { email: '' }

export interface ForgotPasswordProps {
  generalError?: string
  isSubmitting: boolean
  onSubmit: (values: ForgotPasswordModel) => void
}

export const ForgotPassword: VFC<ForgotPasswordProps> = ({
  onSubmit,
  generalError,
  isSubmitting,
}) => {
  const formik = useFormik<ForgotPasswordModel>({
    initialValues: INITIAL_VALUES,
    onSubmit,
    validate,
  })

  return (
    <AuthTemplate title="Unohtunut salasana" generalError={generalError}>
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
        <div className="p-1">
          <Button isLoading={isSubmitting} type="submit" className="w-full">
            Lähetä salasana
          </Button>
        </div>
      </form>
      <Link href="/auth/login">Kirjautumiseen</Link>
    </AuthTemplate>
  )
}
