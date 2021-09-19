import { Meta } from '@storybook/react'

import { VFC } from 'react'
import { Login } from '../login'

export default {
  component: Login,
  title: 'Auth/Login',
} as Meta

export const LoginComponent: VFC = () => <Login />
