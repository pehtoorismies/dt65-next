import { VFC } from 'react'
import { useFormik } from 'formik'

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
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold font-main">Kirjaudu</h1>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-1">
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Sähköpostiosoite"
            />
            {formik.touched['email'] && formik.errors['email'] && (
              <div>werw</div>
            )}
          </div>
          <div className="p-1">
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Salasana"
            />
          </div>
          <div className="p-1">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Kirjaudu
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
