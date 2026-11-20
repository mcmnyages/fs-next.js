
import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

export const getBlogs = async () => {
  return db.query.blogs.findMany()
}

export const addBlog = async (title: string, author: string, url: string) => {
  await db.insert(blogs).values({title,author,url})
}
export const likeBlog = async (id: number) => {
  const blog = await getBlogById(id)

  if (blog) {
    blog.likes += 1
  }
}

export const getBlogById = (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id)
  })
} 