import { VFC } from 'react'
import { User } from '../../domain/user'

export interface ListUsersProps {
  users: User[]
}

export const ListUsers: VFC<ListUsersProps> = ({ users }) => {
  const userTable = users.map(({ nick, name, id }, index) => {
    const evenStyle = index % 2 === 0 ? 'bg-red-200' : ''
    return (
      <tr key={id} className={evenStyle}>
        <td className="p-1">{nick}</td>
        <td className="p-1">{name}</td>
      </tr>
    )
  })

  return (
    <div className="p-2">
      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th className="w-1/2 text-left p-1">Nick</th>
            <th className="w-1/2 text-left p-1">Nimi</th>
          </tr>
        </thead>
        <tbody>{userTable}</tbody>
      </table>
    </div>
  )
}
