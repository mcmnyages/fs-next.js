import type { blogs } from "@/db/schema"
import BlogCard from "./BlogCard"

type Blog = typeof blogs.$inferSelect

const BlogGrid = ({ blogs }: { blogs: Blog[] }) => (
  <div data-testid="blogs-list" className="grid gap-5 md:grid-cols-2">
    {blogs.map((blog, index) => <BlogCard key={blog.id} blog={blog} rank={index + 1} />)}
  </div>
)

export default BlogGrid
