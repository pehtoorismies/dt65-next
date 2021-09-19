import { VFC, FC } from 'react'
import { useFormik } from 'formik'
import { TextInput } from '../../components/text-input'
import { AuthTemplate } from './auth-template'

interface LoginModel {
  email: string
  password: string
}

const links = [
  {
    id: 1,
    title: 'Salasana unohtunut?',
    href: '',
  },
  { id: 2, title: 'Rekisteröitymiseen', href: '' },
]

const initialValues: LoginModel = { email: '', password: '' }

export const Login: VFC = () => {
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
    <AuthTemplate title="Kirjaudu" links={links}>
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
          <TextInput
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Salasana*"
          />
        </div>
        <div className="p-1">
          <button
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded"
          >
            Kirjaudu
          </button>
        </div>
      </form>
    </AuthTemplate>
  )
}
