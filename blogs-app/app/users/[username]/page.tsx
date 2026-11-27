import { notFound } from "next/navigation"
import { getUserByUsername } from "../../services/users"
import UserProfile from "./components/UserProfile"

export const instant = false

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>
}) => {
  const { username } = await params
  const user = await getUserByUsername(username)

  if (!user) {
    notFound()
  }

  return <UserProfile user={user} />
}

export default UserPage
