import { Button, ButtonProps } from '../Button'

import type { Meta, Story } from '@storybook/react'

export default {
  component: Button,
  title: 'Button',
} as Meta

const Template: Story<ButtonProps> = (args) => (
  <Button {...args}>Button text</Button>
)

export const Primary = Template.bind({})
export const Full = Template.bind({})

Primary.args = {
  isLoading: true,
}

Full.args = {
  isLoading: true,
  className: 'w-full',
}
