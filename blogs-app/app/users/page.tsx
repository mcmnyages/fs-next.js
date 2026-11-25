import Link from "next/link"
import { getUsers } from "../services/users"

export const instant = false

const Users = async () => {
  const users = await getUsers()

  return (
    <div className="flex min-h-screen justify-center bg-background px-4 py-12 text-foreground sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-6">
        <div className="border-b border-black/10 pb-5 dark:border-white/10">
          <h1 className="text-3xl font-extrabold tracking-tight">Users</h1>
          <p className="mt-1 text-sm opacity-75">
            Directory of all registered accounts.
          </p>
        </div>

        <div className="grid gap-4">
          {users.map((user) => (
            <Link
              key={user.id}
              href={`/users/${user.username}`}
              className="group block rounded-xl border border-black/10 bg-background p-5 shadow-sm transition-all duration-150 hover:border-indigo-500 hover:shadow-md dark:border-white/10 dark:hover:border-indigo-500"
            >
              <h2 className="text-lg font-semibold text-indigo-600 group-hover:text-indigo-500 dark:text-indigo-400">
                {user.name}
              </h2>
              <p className="text-sm opacity-60">@{user.username}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Users