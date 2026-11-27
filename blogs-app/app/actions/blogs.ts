
"use server"

import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

import {
  addBlog,
  likeBlog,
  addBlogToReadingList,
  markBlogAsRead,
} from "../services/blogs"

import { auth } from "@/auth"
import { users, blogs } from "@/db/schema"
import { db } from "@/db"

// Get the authenticated user
const getAuthenticatedUser = async () => {
  const session = await auth()
  const username = session?.user?.email

  if (!username) {
    redirect("/login")
  }

  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (!user) {
    redirect("/login")
  }

  return user
}

// Create a blog
export const createBlog = async (
  prevState: {
    error: string
    success?: boolean
    values?: {
      title: string
      author: string
      url: string
    }
  },
  formData: FormData,
) => {
  const user = await getAuthenticatedUser()

  const title = (formData.get("title") as string)?.trim() || ""
  const author = (formData.get("author") as string)?.trim() || ""
  const url = (formData.get("url") as string)?.trim() || ""

  const values = { title, author, url }

  if (!title || title.length < 5) {
    return {
      error: "Title must be at least 5 characters long!",
      success: false,
      values,
    }
  }

  if (!author || author.length < 5) {
    return {
      error: "Author must be at least 5 characters long!",
      success: false,
      values,
    }
  }

  if (!url || url.length < 5) {
    return {
      error: "Url must be at least 5 characters long!",
      success: false,
      values,
    }
  }

  try {
    // Save the authenticated user's ID as the blog owner
    await addBlog(title, author, url, user.id)

    revalidatePath("/blogs")
    revalidatePath("/users")
    revalidatePath("/me")

    return {
      error: "",
      success: true,
      values: {
        title: "",
        author: "",
        url: "",
      },
    }
  } catch (error) {
    console.error("Error creating blog:", error)

    return {
      error: "Failed to create blog. Please try again.",
      success: false,
      values,
    }
  }
}

// Like a blog
export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get("id"))

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid blog ID")
  }

  await likeBlog(id)

  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}


// Add a blog to the reading list
export const addToReadingList = async (formData: FormData) => {
  const user = await getAuthenticatedUser()

  const blogId = Number(formData.get("blogId"))

  if (!Number.isInteger(blogId) || blogId <= 0) {
    throw new Error("Invalid blog ID")
  }

  const blog = await db.query.blogs.findFirst({
    where: eq(blogs.id, blogId),
  })

  if (!blog) {
    throw new Error("Blog not found")
  }

  // Users cannot add their own blogs
  if (blog.userId === user.id) {
    return
  }

  // Avoid duplicate reading-list entries
  await addBlogToReadingList(user.id, blogId)

  // Refresh affected pages
  revalidatePath(`/blogs/${blogId}`)
  revalidatePath("/blogs")
  revalidatePath("/me")
}


// Mark a blog as read
export const markAsRead = async (formData: FormData) => {
  const user = await getAuthenticatedUser()

  const blogId = Number(formData.get("blogId"))

  if (!Number.isInteger(blogId) || blogId <= 0) {
    throw new Error("Invalid blog ID")
  }

  // Update reading list
  await markBlogAsRead(user.id, blogId)

  // Revalidate the profile page
  revalidatePath("/me")

  // Force a fresh server-rendered page
  redirect("/me")
}
