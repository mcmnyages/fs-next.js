import Link from "next/link"
import { getBlogs } from "./services/blogs"

export const instant = false

export default async function Home() {
  const blogs = await getBlogs()

  const topLiked = [...blogs].sort((a, b) => b.likes - a.likes).slice(0, 3)
  const latestBlogs = [...blogs]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 3)

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-stone-200/90 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 px-8 py-12 text-white shadow-sm sm:px-12 sm:py-16">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-amber-300 ring-1 ring-inset ring-amber-400/30">
            Community Reading Room
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            Discover ideas worth bookmarking.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-stone-300 sm:text-lg">
            A curated hub for insightful links, deep dives, and community
            favorites. Upvote the posts you love or share a new link with the
            feed.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/blogs"
              className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-stone-950 shadow-sm transition hover:bg-amber-400 active:scale-[0.99]"
            >
              Explore All Blogs
            </Link>
            <Link
              href="/blogs/new"
              className="rounded-xl border border-stone-600 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xs transition hover:border-amber-400/50 hover:bg-white/15"
            >
              + Share a Blog
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
          <div>
            <p className="text-2xl font-black text-amber-400">{blogs.length}</p>
            <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
              Published Posts
            </p>
          </div>
          <div>
            <p className="text-2xl font-black text-amber-400">
              {blogs.reduce((sum, b) => sum + b.likes, 0)}
            </p>
            <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
              Total Likes
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/users"
              className="group inline-flex flex-col text-left"
            >
              <span className="text-sm font-bold text-white transition group-hover:text-amber-300">
                Meet Contributors →
              </span>
              <span className="text-xs text-stone-400">
                Browse active authors
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Two-Column Editorial Spotlights */}
      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Top Liked */}
        <div className="rounded-3xl border border-stone-200 bg-white p-7 shadow-xs">
          <div className="mb-5 flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600">
                Crowd Favorites
              </p>
              <h2 className="mt-0.5 text-xl font-extrabold text-stone-900">
                Trending Now
              </h2>
            </div>
            <Link
              href="/blogs"
              className="text-xs font-bold text-stone-600 transition hover:text-amber-700"
            >
              View all →
            </Link>
          </div>

          <div className="space-y-3">
            {topLiked.map((blog, idx) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.id}`}
                className="group flex items-start justify-between gap-4 rounded-2xl border border-transparent bg-stone-50/80 p-4 transition hover:border-amber-200 hover:bg-amber-50/50"
              >
                <div className="flex items-start gap-3.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-extrabold text-amber-800">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-stone-900 transition group-hover:text-amber-800">
                      {blog.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-stone-500">
                      by {blog.author}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-stone-700 ring-1 ring-stone-200">
                  ♥ {blog.likes}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Latest Posts */}
        <div className="rounded-3xl border border-stone-200 bg-white p-7 shadow-xs">
          <div className="mb-5 flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-500">
                Just Added
              </p>
              <h2 className="mt-0.5 text-xl font-extrabold text-stone-900">
                Fresh Off the Press
              </h2>
            </div>
            <Link
              href="/blogs/new"
              className="text-xs font-bold text-amber-700 transition hover:text-amber-800"
            >
              + Add post
            </Link>
          </div>

          <div className="space-y-3">
            {latestBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.id}`}
                className="group block rounded-2xl border border-transparent bg-stone-50/80 p-4 transition hover:border-stone-300 hover:bg-stone-100/70"
              >
                <h3 className="font-bold text-stone-900 transition group-hover:text-amber-800">
                  {blog.title}
                </h3>
                <div className="mt-1.5 flex items-center justify-between text-xs text-stone-500">
                  <span>by {blog.author}</span>
                  <span className="font-semibold text-stone-700">
                    Read post →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}