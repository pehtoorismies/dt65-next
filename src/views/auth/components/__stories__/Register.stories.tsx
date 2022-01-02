import { Register, RegisterProps } from '../Register'

import type { Meta, Story } from '@storybook/react'

export default {
  component: Register,
  title: 'Auth Forms',
} as Meta

const Template: Story<RegisterProps> = (args) => <Register {...args} />

export const RegisterComponent = Template.bind({})
