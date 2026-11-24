
import { notFound } from "next/navigation"
import { auth } from "@/auth"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

import { getBlogById, isInReadingList } from "../../services/blogs"
import { likeBlogAction, addToReadingList } from "../../actions/blogs"

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

  // Get logged-in user
  const session = await auth()
  const username = session?.user?.email

  const user = username
    ? await db.query.users.findFirst({
        where: eq(users.username, username),
      })
    : null

  // Check ownership
  const isOwner = user && blog.userId === user.id

  // Check reading list
  const alreadyAdded = user
    ? await isInReadingList(user.id, blog.id)
    : null

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <article className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-900 px-8 py-10 text-white">
          <span className="inline-block rounded-full bg-amber-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 ring-1 ring-amber-300/30">
            Featured Post
          </span>

          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            {blog.title}
          </h2>

          <p className="mt-3 text-sm text-stone-300">
            Author:{" "}
            <span className="font-semibold text-white">
              {blog.author}
            </span>
          </p>
        </div>

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
              <input type="hidden" name="id" value={blog.id} />

              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-stone-950 shadow-sm transition hover:bg-amber-400 active:scale-[0.98]"
              >
                Like
              </button>
            </form>
          </div>

          {/* Reading list button */}
          {user && !isOwner && (
            <div className="border-t border-stone-200 pt-6">
              {alreadyAdded ? (
                <p className="rounded-xl bg-green-50 px-5 py-3 text-sm font-semibold text-green-700">
                  ✓ Added to your reading list
                </p>
              ) : (
                <form action={addToReadingList}>
                  <input
                    type="hidden"
                    name="blogId"
                    value={blog.id}
                  />

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-stone-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-stone-700"
                  >
                    + Add to reading list
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </article>
    </main>
  )
}

export default BlogPage
