import { VFC, FC } from 'react'
import { useFormik } from 'formik'
import { TextInput } from '../../components/text-input'
import { AuthTemplate } from './auth-template'

interface ForgotPasswordModel {
  email: string
}

const initialValues: ForgotPasswordModel = { email: '' }

const links = [
  {
    id: 1,
    href: '',
    title: 'Kirjatumiseen',
  },
]

export const ForgotPassword: VFC = () => {
  const formik = useFormik({
    initialValues,
    validate: (values) => {
      return {}
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <AuthTemplate title="Unohtunut salasana" links={links}>
      <form onSubmit={formik.handleSubmit}>
        <div className="p-1">
          <TextInput
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Sähköpostiosoite*"
          />
          {formik.touched['email'] && formik.errors['email'] && <div>werw</div>}
        </div>
        <div className="p-1">
          <button
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded"
          >
            Lähetä linkki
          </button>
        </div>
      </form>
    </AuthTemplate>
  )
}
