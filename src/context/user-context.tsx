import { createContext, useContext } from 'react'
import { none, Option } from 'fp-ts/Option'

import type { FC } from 'react'
import type { User } from '@domain/user'

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

export const UserContextProvider: FC = ({ children }) => {
  //  find user
  // const value = localStorage.getItem('user')

  return (
    <UserContext.Provider value={{ user: none }}>
      {children}
    </UserContext.Provider>
  )
}
