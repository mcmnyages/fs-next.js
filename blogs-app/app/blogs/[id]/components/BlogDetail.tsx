import type { blogs } from "@/db/schema"
import BlogActions from "./BlogActions"
import BlogHeader from "./BlogHeader"
import BlogSource from "./BlogSource"

type Blog = typeof blogs.$inferSelect

const BlogDetail = ({ blog, userId, alreadyAdded }: {
  blog: Blog
  userId: number | null
  alreadyAdded: boolean
}) => (
  <main className="mx-auto max-w-3xl px-6 py-12">
    <article data-testid="blog-detail" className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
      <BlogHeader title={blog.title} author={blog.author} />
      <div className="space-y-6 p-8">
        <BlogSource url={blog.url} />
        <BlogActions blogId={blog.id} likes={blog.likes} userId={userId} alreadyAdded={alreadyAdded} />
      </div>
    </article>
  </main>
)

export default BlogDetail
