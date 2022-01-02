import { Button } from '../Button'

import type { Meta, Story } from '@storybook/react'

export default {
  component: Button,
  title: 'Button',
} as Meta

const Template: Story = (args) => <Button {...args} />

export const Primary = Template.bind({})

Primary.args = {
  children: 'Nappi',
  isLoading: true,
}

Primary.args = {
  children: 'Nappi',
  isLoading: true,
  className: 'w-full',
}
