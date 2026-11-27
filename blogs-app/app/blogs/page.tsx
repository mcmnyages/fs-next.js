import { getBlogs } from "../services/blogs"
import BlogFilter from "./components/BlogFilter"
import BlogGrid from "./components/BlogGrid"
import EmptyBlogState from "./components/EmptyBlogState"

export const instant = false

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter = "" } = await searchParams
  const allBlogs = await getBlogs()

  const blogs = allBlogs
    .filter((blog) => blog.title.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.likes - a.likes)

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8 flex flex-col justify-between gap-6 border-b border-stone-200 pb-8 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-amber-600">
            Curated Feed · Sorted by Likes
          </p>
          <h1 className="mt-1 text-4xl font-black tracking-tight text-stone-900">Blogs</h1>
        </div>
        <BlogFilter filter={filter} />
      </header>

      {blogs.length === 0 ? <EmptyBlogState /> : <BlogGrid blogs={blogs} />}
    </main>
  )
}

export default Blogs
