import { Login, LoginProps } from '../login'

import type { Meta, Story } from '@storybook/react'

export default {
  component: Login,
  title: 'Auth Forms',
} as Meta

const Template: Story<LoginProps> = (args) => <Login {...args} />

export const NoError = Template.bind({})
export const IsSubmitting = Template.bind({})
export const GeneralError = Template.bind({})
export const FieldError = Template.bind({})

NoError.args = {
  isSubmitting: false,
}
IsSubmitting.args = {
  ...NoError.args,
  isSubmitting: true,
}

GeneralError.args = {
  ...NoError.args,
  generalError: 'Some general error',
}
FieldError.args = {
  ...NoError.args,
  fieldError: 'Wrong email / password',
}
