import { createContext, useContext } from 'react'
import { none, Option } from 'fp-ts/Option'

import type { FC } from 'react'
import type { User } from '#domain/user'

interface UserContextProps {
  user: Option<User>
}

// const user: User = {
//   nick: 'peht',
//   id: '123',
//   name: 'kok kokar',
// }

const UserContext = createContext<UserContextProps>({ user: none })

export const useUserContext = () => {
  const contextValue = useContext(UserContext)
  if (!contextValue) {
    throw new Error('Expect value to be set')
  }
  return contextValue
}

interface UserContextProvider {
  getUser: () => Option<User>
}

export const UserContextProvider: FC<UserContextProvider> = ({
  children,
  getUser,
}) => {
  const user = getUser()
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}
