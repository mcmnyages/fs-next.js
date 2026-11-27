
"use server"

import { redirect } from "next/navigation"
import { sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

import {
  addBlog,
  likeBlog,
  markBlogAsRead,
} from "../services/blogs"

import { auth } from "@/auth"
import { blogs, readingList } from "@/db/schema"
import { db } from "@/db"
import { randomUUID } from "node:crypto"

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
  const session = await auth()
  const username = session?.user?.email
  const userId = Number(session?.user?.id)

  if (!username || !Number.isInteger(userId) || userId <= 0) {
    redirect("/login")
  }

  const title = (formData.get("title") as string)?.trim() || ""
  const author = (formData.get("author") as string)?.trim() || ""
  const url = (formData.get("url") as string)?.trim() || ""

  const values = { title, author, url }
  const stayOnForm = formData.get("afterCreate") === "another"

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
    await addBlog(title, author, url, userId)
  } catch (error) {
    console.error("Error creating blog:", error)

    return {
      error: "Failed to create blog. Please try again.",
      success: false,
      values,
    }
  }

  revalidatePath("/blogs")
  revalidatePath("/users")

  if (!stayOnForm) {
    const cookieStore = await cookies()
    cookieStore.set("blog-created", "1", {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: 30,
    })
    redirect("/blogs")
  }

  return {
    error: "",
    success: true,
    stayOnForm,
    submissionId: randomUUID(),
    values: {
      title: "",
      author: "",
      url: "",
    },
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


export const addToReadingList = async (formData: FormData) => {
  const session = await auth()
  const userId = Number(session?.user?.id)

  if (!Number.isInteger(userId) || userId <= 0) {
    redirect("/login")
  }

  const blogId = Number(formData.get("blogId"))

  if (!Number.isInteger(blogId) || blogId <= 0) {
    throw new Error("Invalid blog ID")
  }

  await db.execute(sql`
    INSERT INTO ${readingList} ("user_id", "blog_id", "read")
    SELECT ${userId}, ${blogId}, false
    WHERE EXISTS (
      SELECT 1 FROM ${blogs}
      WHERE ${blogs.id} = ${blogId}
        AND (${blogs.userId} IS NULL OR ${blogs.userId} <> ${userId})
    )
    ON CONFLICT DO NOTHING
  `)

  revalidatePath("/me")
}


export const markAsRead = async (formData: FormData) => {
  const session = await auth()
  const userId = Number(session?.user?.id)

  if (!Number.isInteger(userId) || userId <= 0) {
    redirect("/login")
  }

  const blogId = Number(formData.get("blogId"))

  if (!Number.isInteger(blogId) || blogId <= 0) {
    throw new Error("Invalid blog ID")
  }

  await markBlogAsRead(userId, blogId)

  revalidatePath("/me")
}
