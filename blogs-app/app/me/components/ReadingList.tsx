import { markAsRead } from "@/app/actions/blogs"

export type ReadingListItem = {
  blogId: number
  read: boolean
  blog: {
    title: string
    author: string
    url: string
  }
}

type ReadingListProps = {
  items: ReadingListItem[]
}

const EmptyMessage = ({ testId, children }: { testId: string; children: string }) => (
  <p
    data-testid={testId}
    className="rounded-xl border border-dashed border-stone-300 bg-stone-50 p-4 text-sm text-stone-500"
  >
    {children}
  </p>
)

const ReadingList = ({ items }: ReadingListProps) => {
  const unreadBlogs = items.filter((item) => !item.read)
  const readBlogs = items.filter((item) => item.read)

  return (
    <div data-testid="reading-list-section" className="border-t border-stone-100 pt-6">
      <h2 className="text-xl font-extrabold text-stone-900">My Reading List</h2>
      <p className="mt-1 text-sm text-stone-500">
        Keep track of blogs you want to read and those you have finished.
      </p>

      <section data-testid="unread-section" className="mt-6">
        <h3 className="mb-4 text-lg font-bold text-stone-800">
          Unread Blogs ({unreadBlogs.length})
        </h3>

        {items.length === 0 ? (
          <EmptyMessage testId="empty-reading-list">No unread blogs.</EmptyMessage>
        ) : unreadBlogs.length === 0 ? (
          <EmptyMessage testId="no-unread-blogs">No unread blogs.</EmptyMessage>
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
                  <p className="text-sm text-stone-500">By {item.blog.author}</p>
                </div>

                <form action={markAsRead}>
                  <input type="hidden" name="blogId" value={item.blogId} />
                  <button
                    data-testid={`mark-read-${item.blogId}`}
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
      </section>

      <section data-testid="read-section" className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-stone-800">
          Read Blogs ({readBlogs.length})
        </h3>

        {readBlogs.length === 0 ? (
          <EmptyMessage testId="no-read-blogs">No read blogs yet.</EmptyMessage>
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
                <p className="text-sm text-stone-500">By {item.blog.author}</p>
                <span className="mt-2 inline-block text-xs font-semibold text-green-700">
                  ✓ Read
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default ReadingList
