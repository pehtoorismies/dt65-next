import { Meta } from '@storybook/react'

import { VFC } from 'react'
import { ForgotPassword } from '../forgot-password'

export default {
  component: ForgotPassword,
  title: 'Auth/ForgotPassword',
} as Meta

export const LoginComponent: VFC = () => <ForgotPassword />
