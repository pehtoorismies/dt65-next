import { NotFound, Props } from '../NotFound'

import type { Meta, Story } from '@storybook/react'

export default {
  component: NotFound,
  title: 'Views/Errors/NotFound',
} as Meta

const Template: Story<Props> = (args) => <NotFound {...args} />

export const Default = Template.bind({})

Default.args = {}
