
import { eq, sql, and } from "drizzle-orm"
import { db } from "@/db"
import { blogs, readingList,users } from "@/db/schema"

export const getBlogs = async () => {
  return db.query.blogs.findMany()
}

export const addBlog = async (title: string, author: string, url: string) => {
  await db.insert(blogs).values({ title, author, url })
}

export const likeBlog = async (id: number) => {
  await db
    .update(blogs)
    .set({
      likes: sql`${blogs.likes} + 1`,
    })
    .where(eq(blogs.id, id))
}

export const getBlogById = (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id)
  })
}

// Add blog to reading list
export const addBlogToReadingList = async (
  userId: number,
  blogId: number
) => {
  await db
    .insert(readingList)
    .values({ userId, blogId })
    .onConflictDoNothing()
}

// Check if blog is already in reading list
export const isInReadingList = async (
  userId: number,
  blogId: number
) => {
  return db.query.readingList.findFirst({
    where: and(
      eq(readingList.userId, userId),
      eq(readingList.blogId, blogId)
    )
  })
}

// Get user's reading list
export const getReadingList = async (userId: number) => {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: {
      blog: true,
    },
  })
}


// Mark a blog as read
export const markBlogAsRead = async (
  username: string,
  blogId: number
) => {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (!user) return

  await db
    .update(readingList)
    .set({ read: true })
    .where(
      and(
        eq(readingList.userId, user.id),
        eq(readingList.blogId, blogId)
      )
    )
}