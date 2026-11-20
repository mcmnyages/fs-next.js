
import Link from "next/link"
import { getBlogs } from '../services/blogs'


export const instant = false

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams

  const allBlogs = await getBlogs()

  const filteredBlogs = filter
    ? allBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(filter.toLowerCase())
    )
    : allBlogs

  const blogs = [...filteredBlogs].sort(
    (a, b) => b.likes - a.likes
  )

  return (
    <div>
      <h1>Blogs</h1>
      <form action="/blogs" method="GET">
        <input
          type="text"
          name="filter"
          placeholder="Search blogs by title"
          defaultValue={filter || ""}
        />

        <button type="submit">Search</button>
      </form>
      {blogs.map(blog => (
        <div key={blog.id}>
          <Link href={`/blogs/${blog.id}`}>
            <h2>{blog.title}</h2>
          </Link>
          <p>Author: {blog.author}</p>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes}</p>
        </div>
      ))}
    </div>
  )
}

export default Blogs
