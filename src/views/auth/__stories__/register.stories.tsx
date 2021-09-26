import { Meta, Story } from '@storybook/react'
import { Register, RegisterProps } from '../register'

export default {
  component: Register,
  title: 'Auth Forms',
} as Meta

const Template: Story<RegisterProps> = (args) => <Register {...args} />

export const RegisterComponent = Template.bind({})
