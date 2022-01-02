import '../src/pages/base.css'
import { UserContextProvider } from '../src/context/UserContext'
import { none, some } from 'fp-ts/Option'

const USER_MAP = {
  none,
  exampleUser: some({
    id: 1,
    nick: 'example-user',
    name: 'Example User',
  }),
}

export const globalTypes = {
  user: {
    name: 'UserContext',
    description: 'Logged in user',
    defaultValue: USER_MAP['default'],
    toolbar: {
      icon: 'user',
      items: Object.keys(USER_MAP),
      showName: true,
    },
  },
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
}

const withUserContext = (Story, context) => {
  const user = context.globals.user ?? Object.keys(USER_MAP)[0]
  const getUser = () => {
    return USER_MAP[user]
  }

  return (
    <UserContextProvider getUser={getUser}>
      <Story {...context} />
    </UserContextProvider>
  )
}

export const decorators = [withUserContext]
