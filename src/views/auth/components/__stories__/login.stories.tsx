import { Login, LoginProps } from '../login'

import type { Meta, Story } from '@storybook/react'

export default {
  component: Login,
  title: 'Auth Forms',
} as Meta

const Template: Story<LoginProps> = (args) => <Login {...args} />

export const LoginComponent = Template.bind({})
