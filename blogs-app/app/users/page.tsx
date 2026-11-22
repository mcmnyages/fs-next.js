
import Link from "next/link"
import { getUsers } from "../services/users"

export const instant=false
const Users = async () => {
  const users = await getUsers()

  return (
    <div>
      <h1>Users</h1>

      {users.map(user => (
        <div key={user.id}>
          <Link href={`/users/${user.username}`}>
            <h2>{user.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Users
