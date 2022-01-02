import { useFormik } from 'formik'

import { TextInput } from '#components/text-input'
import { Button } from '#components/button/button'
import { Link } from '#components/link'

import { AuthTemplate } from './auth-template'
import { validateEmail } from './validations'

import type { VFC } from 'react'
import type { ForgotPasswordModel } from '#domain/auth'

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
          validate={validateEmail}
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
