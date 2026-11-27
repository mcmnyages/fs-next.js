import { notFound } from "next/navigation"
import { and, eq } from "drizzle-orm"

import { auth } from "@/auth"
import { db } from "@/db"
import { blogs, readingList } from "@/db/schema"
import BlogDetail from "./components/BlogDetail"

export const instant = false

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blogId = Number(id)

  if (!Number.isInteger(blogId) || blogId <= 0) {
    notFound()
  }

  const session = await auth()
  const parsedUserId = Number(session?.user?.id)
  const userId = Number.isInteger(parsedUserId) && parsedUserId > 0
    ? parsedUserId
    : null

  const [row] = await db
    .select({
      blog: blogs,
      readingListBlogId: readingList.blogId,
    })
    .from(blogs)
    .leftJoin(
      readingList,
      and(
        eq(readingList.userId, userId ?? -1),
        eq(readingList.blogId, blogs.id),
      ),
    )
    .where(eq(blogs.id, blogId))
    .limit(1)

  if (!row?.blog) {
    notFound()
  }

  return (
    <BlogDetail
      blog={row.blog}
      userId={userId}
      alreadyAdded={row.readingListBlogId !== null}
    />
  )
}

export default BlogPage
