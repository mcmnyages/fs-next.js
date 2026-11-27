import Link from "next/link"
import type { blogs } from "@/db/schema"

type Blog = typeof blogs.$inferSelect

const BlogCard = ({ blog, rank }: { blog: Blog; rank: number }) => (
  <article className="group relative flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md">
    <div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 ring-1 ring-inset ring-amber-600/20">#{rank} Top Liked</span>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">
          ♥ {blog.likes} {blog.likes === 1 ? "like" : "likes"}
        </span>
      </div>
      <Link href={`/blogs/${blog.id}`} className="block">
        <h2 className="text-xl font-bold leading-snug text-stone-900 transition group-hover:text-amber-700">{blog.title}</h2>
      </Link>
      <p className="mt-2 text-sm text-stone-600">
        Author: <span className="font-medium text-stone-800">{blog.author}</span>
      </p>
    </div>

    <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4 text-xs text-stone-500">
      <p className="truncate pr-4">
        URL: {" "}
        <a href={blog.url} target="_blank" rel="noreferrer" className="font-medium text-amber-700 underline decoration-amber-300 underline-offset-2 hover:text-amber-800">
          {blog.url}
        </a>
      </p>
      <Link href={`/blogs/${blog.id}`} className="shrink-0 font-semibold text-stone-800 transition group-hover:translate-x-0.5 group-hover:text-amber-700">
        Read →
      </Link>
    </div>
  </article>
)

export default BlogCard
