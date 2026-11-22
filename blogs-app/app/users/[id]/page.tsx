
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  getUserById,
  getBlogsByUserId,
} from "../../services/users"


export const instant= false

const UserPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const userId = Number(id)

  if (!Number.isInteger(userId) || userId < 1) {
    notFound()
  }

  const user = await getUserById(userId)

  if (!user) {
    notFound()
  }

  const blogs = await getBlogsByUserId(userId)

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Username: {user.username}</p>

      <h2>Added blogs</h2>

      {blogs.map(blog => (
        <div key={blog.id}>
          <Link href={`/blogs/${blog.id}`}>
            <h3>{blog.title}</h3>
          </Link>
          <p>Author: {blog.author}</p>
        </div>
      ))}
    </div>
  )
}

export default UserPage
