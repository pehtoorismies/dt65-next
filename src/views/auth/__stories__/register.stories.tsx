import { Meta } from '@storybook/react'

import { VFC } from 'react'
import { Register } from '../register'

export default {
  component: Register,
  title: 'Auth/Register',
} as Meta

export const LoginComponent: VFC = () => <Register />
