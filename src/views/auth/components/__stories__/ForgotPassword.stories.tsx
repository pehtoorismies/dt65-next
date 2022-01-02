import { ForgotPassword, ForgotPasswordProps } from '../ForgotPassword'

import type { Meta, Story } from '@storybook/react'

export default {
  component: ForgotPassword,
  title: 'Auth Forms',
} as Meta

const Template: Story<ForgotPasswordProps> = (args) => (
  <ForgotPassword {...args} />
)

export const ForgotPasswordComponent = Template.bind({})
