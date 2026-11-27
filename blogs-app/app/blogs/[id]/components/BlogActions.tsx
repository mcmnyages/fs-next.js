import { likeBlogAction } from "@/app/actions/blogs"
import ReadingListControl from "./ReadingListControl"

type BlogActionsProps = {
  blogId: number
  likes: number
  userId: number | null
  alreadyAdded: boolean
}

const BlogActions = ({ blogId, likes, userId, alreadyAdded }: BlogActionsProps) => (
  <>
    <section className="flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 pt-6">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-lg font-bold text-amber-800">♥</span>
        <div>
          <p className="text-lg font-extrabold text-stone-900">Likes: {likes}</p>
          <p className="text-xs text-stone-500">Show appreciation for this post</p>
        </div>
      </div>
      <form action={likeBlogAction}>
        <input type="hidden" name="id" value={blogId} />
        <button type="submit" className="cursor-pointer rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-stone-950 shadow-sm transition hover:bg-amber-400 active:scale-[0.98]">
          Like
        </button>
      </form>
    </section>

    {userId !== null ? (
      <section data-testid="reading-list-control" className="border-t border-stone-200 pt-6">
        <ReadingListControl blogId={blogId} alreadyAdded={alreadyAdded} />
      </section>
    ) : (
      <section className="border-t border-stone-200 pt-6">
        <a href="/login" className="block rounded-xl bg-stone-100 px-5 py-3 text-center text-sm font-semibold text-stone-700 transition hover:bg-stone-200">
          Log in to add this blog to your reading list
        </a>
      </section>
    )}
  </>
)

export default BlogActions
