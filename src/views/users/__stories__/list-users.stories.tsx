import faker from 'faker'
import { v4 as uuidv4 } from 'uuid'

import { ListUsers, ListUsersProps } from '../list-users'

import type { User } from '@domain/user'
import type { Meta, Story } from '@storybook/react'

export default {
  component: ListUsers,
  title: 'ListUsers',
} as Meta

const Template: Story<ListUsersProps> = (args) => <ListUsers {...args} />

export const Primary = Template.bind({})

const getRandomUser = (): User => {
  return {
    name: faker.name.findName(),
    nick: faker.internet.email(),
    id: uuidv4(),
  }
}

Primary.args = {
  users: [getRandomUser(), getRandomUser(), getRandomUser(), getRandomUser()],
}
