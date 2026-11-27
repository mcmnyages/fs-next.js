
import { notFound } from "next/navigation"
import { auth } from "@/auth"
import { db } from "@/db"
import { blogs, readingList } from "@/db/schema"
import { and, eq } from "drizzle-orm"

import { likeBlogAction, addToReadingList } from "../../actions/blogs"

export const instant = false

const BlogPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const blogId = Number(id)

  if (!Number.isInteger(blogId) || blogId <= 0) {
    notFound()
  }

  const session = await auth()
  const sessionUserId = Number(session?.user?.id)
  const userId = Number.isInteger(sessionUserId) && sessionUserId > 0
    ? sessionUserId
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

  const { blog } = row
  const alreadyAdded = row.readingListBlogId != null

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <article
        data-testid="blog-detail"
        className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm"
      >
        {/* Blog Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-900 px-8 py-10 text-white">
          <span className="inline-block rounded-full bg-amber-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 ring-1 ring-amber-300/30">
            Featured Post
          </span>

          <h2
            data-testid="blog-title"
            className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl"
          >
            {blog.title}
          </h2>

          <p className="mt-3 text-sm text-stone-300">
            Author:{" "}
            <span
              data-testid="blog-author"
              className="font-semibold text-white"
            >
              {blog.author}
            </span>
          </p>
        </div>

        {/* Blog Content */}
        <div className="space-y-6 p-8">
          <div className="rounded-2xl bg-stone-50 p-4 ring-1 ring-stone-200/80">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Source URL
            </p>

            <p className="mt-1 break-all text-sm font-medium text-amber-700">
              URL:{" "}
              <a
                href={blog.url}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-amber-300 underline-offset-4 hover:text-amber-800"
              >
                {blog.url}
              </a>
            </p>
          </div>

          {/* Likes Section */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 pt-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-lg font-bold text-amber-800">
                ♥
              </span>

              <div>
                <p className="text-lg font-extrabold text-stone-900">
                  Likes: {blog.likes}
                </p>

                <p className="text-xs text-stone-500">
                  Show appreciation for this post
                </p>
              </div>
            </div>

            <form action={likeBlogAction}>
              <input
                type="hidden"
                name="id"
                value={blog.id}
              />

              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-stone-950 shadow-sm transition hover:bg-amber-400 active:scale-[0.98]"
              >
                Like
              </button>
            </form>
          </div>

          {/* Reading List Section */}
          {userId !== null && (
            <div
              data-testid="reading-list-control"
              className="border-t border-stone-200 pt-6"
            >
              {alreadyAdded ? (
                <div className="rounded-xl bg-green-50 px-5 py-3 text-sm font-semibold text-green-700">
                  ✓ Added to your reading list
                </div>
              ) : (
                <form action={addToReadingList}>
                  <input
                    type="hidden"
                    name="blogId"
                    value={blog.id}
                  />

                  <button
                    data-testid="add-to-reading-list-button"
                    type="submit"
                    className="w-full cursor-pointer rounded-xl bg-stone-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-stone-700 active:scale-[0.98]"
                  >
                    + Add to reading list
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Login Prompt */}
          {userId === null && (
            <div className="border-t border-stone-200 pt-6">
              <a
                href="/login"
                className="block rounded-xl bg-stone-100 px-5 py-3 text-center text-sm font-semibold text-stone-700 transition hover:bg-stone-200"
              >
                Log in to add this blog to your reading list
              </a>
            </div>
          )}
        </div>
      </article>
    </main>
  )
}

export default BlogPage
