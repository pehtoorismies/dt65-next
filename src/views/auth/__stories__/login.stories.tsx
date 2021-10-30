import { Meta, Story } from '@storybook/react'
import { Login, LoginProps } from '../login'

export default {
  component: Login,
  title: 'Auth Forms',
} as Meta

const Template: Story<LoginProps> = (args) => <Login {...args} />

export const LoginComponent = Template.bind({})
