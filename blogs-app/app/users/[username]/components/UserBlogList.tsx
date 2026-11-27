type UserBlog = {
  id: number
  title: string
  author: string
}

const UserBlogList = ({ blogs }: { blogs: UserBlog[] }) => (
  <section className="mt-6">
    <h2 className="text-xl font-bold">Blogs</h2>
    {blogs.length === 0 ? (
      <p className="mt-2 text-sm text-stone-500">This user has not published any blogs yet.</p>
    ) : (
      <ul className="mt-3 space-y-3">
        {blogs.map((blog) => (
          <li key={blog.id} className="rounded-xl border border-stone-200 bg-white p-4">
            <h3 className="font-semibold">{blog.title}</h3>
            <p className="mt-1 text-sm text-stone-500">{blog.author}</p>
          </li>
        ))}
      </ul>
    )}
  </section>
)

export default UserBlogList
