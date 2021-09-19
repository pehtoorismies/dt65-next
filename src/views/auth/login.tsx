import { VFC, FC } from 'react'
import { useFormik } from 'formik'
import { Link } from '../../components/link'
import { TextInput } from '../../components/text-input'

interface LoginModel {
  email: string
  password: string
}

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
    <div>
      <div className="bg-gray-50 py-12 px-2 sm:px-6 lg:px-8 bg-pink-100">
        <div className="rounded bg-white rounded overflow-hidden shadow-xl p-5 grid max-w-md container-md mx-auto">
          <h1 className="text-3xl font-bold my-2 uppercase text-center">
            Kirjaudu
          </h1>
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
              {formik.touched['email'] && formik.errors['email'] && (
                <div>werw</div>
              )}
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
          <Link href="">Salasana unohtunut?</Link>
          <Link href="">Rekisteröitymiseen</Link>
        </div>
      </div>
    </div>
  )
}
