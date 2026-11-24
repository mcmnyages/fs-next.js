import Link from "next/link"
import { getBlogs } from "../services/blogs"

export const instant = false

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams

  const allBlogs = await getBlogs()

  const filteredBlogs = filter
    ? allBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLowerCase())
      )
    : allBlogs

  const blogs = [...filteredBlogs].sort((a, b) => b.likes - a.likes)

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8 flex flex-col justify-between gap-6 border-b border-stone-200 pb-8 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-amber-600">
            Curated Feed · Sorted by Likes
          </p>
          <h1 className="mt-1 text-4xl font-black tracking-tight text-stone-900">
            Blogs
          </h1>
        </div>

        <form
          action="/blogs"
          method="GET"
          className="flex w-full max-w-md items-center gap-2"
        >
          <input
            type="text"
            name="filter"
            placeholder="Search blogs by title..."
            defaultValue={filter || ""}
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 shadow-xs transition focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/15"
          />
          <button
            type="submit"
            className="shrink-0 cursor-pointer rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            Search
          </button>
        </form>
      </div>

      {blogs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-12 text-center">
          <p className="text-base font-semibold text-stone-700">
            No matching blogs found
          </p>
          <p className="mt-1 text-sm text-stone-500">
            Try clearing your search filter or check back later.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {blogs.map((blog, index) => (
            <article
              key={blog.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md"
            >
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 ring-1 ring-inset ring-amber-600/20">
                    #{index + 1} Top Liked
                  </span>
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">
                    ♥ {blog.likes} {blog.likes === 1 ? "like" : "likes"}
                  </span>
                </div>

                <Link href={`/blogs/${blog.id}`} className="block">
                  <h2 className="text-xl font-bold leading-snug text-stone-900 transition group-hover:text-amber-700">
                    {blog.title}
                  </h2>
                </Link>

                <p className="mt-2 text-sm text-stone-600">
                  Author:{" "}
                  <span className="font-medium text-stone-800">
                    {blog.author}
                  </span>
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4 text-xs text-stone-500">
                <p className="truncate pr-4">
                  URL:{" "}
                  <a
                    href={blog.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-amber-700 underline decoration-amber-300 underline-offset-2 hover:text-amber-800"
                  >
                    {blog.url}
                  </a>
                </p>
                <Link
                  href={`/blogs/${blog.id}`}
                  className="shrink-0 font-semibold text-stone-800 transition group-hover:translate-x-0.5 group-hover:text-amber-700"
                >
                  Read →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}

export default Blogs