
import { auth } from "@/auth"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { generateToken } from "@/app/actions/users"
import { markAsRead } from "@/app/actions/blogs"
import { getReadingList } from "@/app/services/blogs"
import type { InferSelectModel } from "drizzle-orm"
import type { blogs, readingList } from "@/db/schema"

type ReadingListItem = InferSelectModel<typeof readingList> & {
  blog: InferSelectModel<typeof blogs>
}

export const instant = false

const MePage = async () => {
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

  // Fetch reading list
  const readingListItems: ReadingListItem[] = await getReadingList(user.id)

  // Separate read and unread blogs
  const unreadBlogs = readingListItems.filter((item) => !item.read)
  const readBlogs = readingListItems.filter((item) => item.read)

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 px-8 py-8 text-white">
          <span className="inline-block rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-300 ring-1 ring-inset ring-amber-400/30">
            Account Settings
          </span>

          <h1 className="mt-3 text-3xl font-black tracking-tight">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-stone-300">
            Manage your identity details and personal API access token.
          </p>
        </div>

        {/* Profile Body */}
        <div className="space-y-8 p-8">

          {/* User Information */}
          <div className="grid gap-4 rounded-2xl border border-stone-200/80 bg-stone-50/80 p-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Name
              </p>

              <p className="mt-1 text-base font-bold text-stone-900">
                {user.name}
              </p>
            </div>

            <div>
              <p
                data-testid="user-username"
                className="mt-1 text-base font-semibold text-stone-800"
              >
                {user.username}
              </p>
            </div>
          </div>

          {/* API Token Section */}
          <div className="border-t border-stone-100 pt-6">
            <h2 className="text-xl font-extrabold text-stone-900">
              Personal API Token
            </h2>

            <p className="mt-1 text-xs text-stone-500">
              Use this token to authenticate external requests. Generating a
              new token may invalidate your previous one.
            </p>

            <div className="mt-4">
              {user.token ? (
                <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-4">
                  <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-800">
                    Active Token
                  </p>

                  <p className="break-all rounded-xl border border-stone-200 bg-white p-3.5 font-mono text-sm text-stone-900 select-all">
                    {user.token}
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-4 text-sm text-stone-500">
                  No token has been generated yet.
                </div>
              )}
            </div>

            <form action={generateToken} className="mt-5">
              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-stone-950 shadow-sm transition hover:bg-amber-400 active:scale-[0.99]"
              >
                Generate new token
              </button>
            </form>
          </div>

          {/* Reading List */}
          <div className="border-t border-stone-100 pt-6">
            <h2 className="text-xl font-extrabold text-stone-900">
              My Reading List
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              Keep track of blogs you want to read and those you have finished.
            </p>

            {/* Unread Blogs */}
            <div className="mt-6">
              <h3 className="mb-4 text-lg font-bold text-stone-800">
                Unread Blogs ({unreadBlogs.length})
              </h3>

              {unreadBlogs.length === 0 ? (
                <p className="rounded-xl border border-dashed border-stone-300 bg-stone-50 p-4 text-sm text-stone-500">
                  No unread blogs.
                </p>
              ) : (
                <div className="space-y-3">
                  {unreadBlogs.map((item) => (
                    <div
                      key={item.blogId}
                      className="flex flex-col justify-between gap-3 rounded-xl border border-stone-200 p-4 sm:flex-row sm:items-center"
                    >
                      <div>
                        <a
                          href={item.blog.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-stone-900 hover:text-amber-600"
                        >
                          {item.blog.title}
                        </a>

                        <p className="text-sm text-stone-500">
                          By {item.blog.author}
                        </p>
                      </div>

                      <form action={markAsRead}>
                        <input
                          type="hidden"
                          name="blogId"
                          value={item.blogId}
                        />

                        <button
                          type="submit"
                          className="cursor-pointer rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-stone-950 transition hover:bg-amber-400"
                        >
                          Mark as read
                        </button>
                      </form>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Read Blogs */}
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-bold text-stone-800">
                Read Blogs ({readBlogs.length})
              </h3>

              {readBlogs.length === 0 ? (
                <p className="rounded-xl border border-dashed border-stone-300 bg-stone-50 p-4 text-sm text-stone-500">
                  No read blogs yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {readBlogs.map((item) => (
                    <div
                      key={item.blogId}
                      className="rounded-xl border border-stone-200 bg-stone-50 p-4"
                    >
                      <a
                        href={item.blog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-stone-900 hover:text-amber-600"
                      >
                        {item.blog.title}
                      </a>

                      <p className="text-sm text-stone-500">
                        By {item.blog.author}
                      </p>

                      <span className="mt-2 inline-block text-xs font-semibold text-green-700">
                        ✓ Read
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

export default MePage
