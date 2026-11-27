
import { eq, sql, and } from "drizzle-orm"
import { db } from "@/db"
import { blogs, readingList } from "@/db/schema"

// Get all blogs
export const getBlogs = async () => {
  return db.query.blogs.findMany()
}

// Create a blog and associate it with its owner
export const addBlog = async (
  title: string,
  author: string,
  url: string,
  userId: number,
) => {
  await db.insert(blogs).values({
    title,
    author,
    url,
    userId,
  })
}

// Like a blog
export const likeBlog = async (id: number) => {
  await db
    .update(blogs)
    .set({
      likes: sql`${blogs.likes} + 1`,
    })
    .where(eq(blogs.id, id))
}

// Get a blog by ID
export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

// Add a blog to a user's reading list
export const addBlogToReadingList = async (
  userId: number,
  blogId: number,
) => {
  await db
    .insert(readingList)
    .values({
      userId,
      blogId,
      read: false,
    })
    .onConflictDoNothing()
}

// Check whether a blog is already in a user's reading list
export const isInReadingList = async (
  userId: number,
  blogId: number,
) => {
  return db.query.readingList.findFirst({
    where: and(
      eq(readingList.userId, userId),
      eq(readingList.blogId, blogId),
    ),
  })
}

// Get a user's reading list, including the associated blog
export const getReadingList = async (userId: number) => {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: {
      blog: true,
    },
  })
}

// Mark a reading-list item as read
export const markBlogAsRead = async (
  userId: number,
  blogId: number,
) => {
  await db
    .update(readingList)
    .set({
      read: true,
    })
    .where(
      and(
        eq(readingList.userId, userId),
        eq(readingList.blogId, blogId),
      ),
    )
}
