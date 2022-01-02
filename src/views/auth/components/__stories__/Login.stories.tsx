import { Login, LoginProps } from '../Login'

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
  generalError:
    'Manducare foris ducunt ad placidus navis. The special uniqueness of meditation is to emerge with futility.',
}
FieldError.args = {
  ...NoError.args,
  fieldError: 'Wrong email / password',
}
