import { VFC, FC } from 'react'
import { useFormik } from 'formik'
import { TextInput } from '../../components/text-input'
import { AuthTemplate } from './auth-template'

interface RegisterModel {
  email: string
  nick: string
  name: string
  password: string
  registerSecretCode: string
}

const links = [
  {
    id: 1,
    title: 'Kirjautumiseen',
    href: '',
  },
]

const initialValues: RegisterModel = {
  email: '',
  password: '',
  nick: '',
  registerSecretCode: '',
  name: '',
}

export const Register: VFC = () => {
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
    <AuthTemplate title="Rekisteröidy" links={links}>
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
        </div>
        <div className="p-1">
          <TextInput
            id="nick"
            name="nick"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nick}
            placeholder="Käyttäjätunnus / Nick*"
          />
        </div>
        <div className="p-1">
          <TextInput
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Etunimi Sukunimi*"
          />
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
          <TextInput
            id="registerCode"
            name="registerCode"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Saamasi rekisteröintitunnus*"
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
