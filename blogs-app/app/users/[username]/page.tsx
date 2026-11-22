import { notFound } from "next/navigation"
import { getUserByUsername } from "../../services/users"

export const instant=false

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>
}) => {
  const { username } = await params

  console.log("Username from URL:", username)

  const user = await getUserByUsername(username)

  console.log("User from database:", user)

  if (!user) {
    notFound()
  }

  return (
    <div>
      <h1>{user.name}</h1>

      <h2>Blogs</h2>

      {user.blogs.map(blog => (
        <div key={blog.id}>
          <h3>{blog.title}</h3>
          <p>{blog.author}</p>
        </div>
      ))}
    </div>
  )
}

export default UserPage