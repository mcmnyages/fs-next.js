
'use server'

import { redirect } from 'next/navigation'
import { eq } from "drizzle-orm"
import { revalidatePath } from 'next/cache'
import { addBlog, likeBlog, addBlogToReadingList } from '../services/blogs'
import { auth } from '@/auth'
import { users, blogs } from "@/db/schema"
import { db } from "@/db"

export const createBlog = async (
  prevState: {
    error: string
    values?: {
      title: string
      author: string
      url: string
    }
  },
  formData: FormData
) => {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string

  if (!title || title.length < 5) {
    return {
      error: "Title must be at least 5 characters long!",
      success: false,
      values: { title, author, url }
    }
  }

  if (!author || author.length < 5) {
    return {
      error: "Author must be at least 5 characters long!",
      success: false,
      values: { title, author, url }
    }
  }

  if (!url || url.length < 5) {
    return {
      error: "Url must be at least 5 characters long!",
      success: false,
      values: { title, author, url }
    }
  }

  await addBlog(title, author, url)

  revalidatePath("/blogs")
  return { error: "", success: true }
}

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await likeBlog(id)

  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

// Add to reading list
export const addToReadingList = async (formData: FormData) => {
  const session = await auth()
  const username = session?.user?.email

  if (!username) {
    redirect("/login")
  }

  const blogId = Number(formData.get("blogId"))

  const user = await db.query.users.findFirst({
    where: eq(users.username, username)
  })

  if (!user) {
    throw new Error("User not found")
  }

  const blog = await db.query.blogs.findFirst({
    where: eq(blogs.id, blogId)
  })

  if (!blog) {
    throw new Error("Blog not found")
  }

  // Users cannot add their own blogs
  if (blog.userId === user.id) {
    return
  }

  await addBlogToReadingList(user.id, blogId)

  revalidatePath(`/blogs/${blogId}`)
}
