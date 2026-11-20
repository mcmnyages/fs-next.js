import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { likeBlogAction } from "../../actions/blogs"


export const instant = false
const BlogPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>URL: {blog.url}</p>
      <p>Likes: {blog.likes}</p>

      <form action={likeBlogAction}>
        <input
          type="hidden"
          name="id"
          value={blog.id}
        />
        <button type="submit">Like</button>
      </form>
    </div>
  )
}

export default BlogPage