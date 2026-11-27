const BlogFilter = ({ filter }: { filter: string }) => (
  <form action="/blogs" method="GET" className="flex w-full max-w-md items-center gap-2">
    <input
      data-testid="filter-input"
      type="text"
      name="filter"
      placeholder="Search blogs by title..."
      defaultValue={filter}
      className="w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900"
    />
    <button data-testid="search-button" type="submit" className="shrink-0 cursor-pointer rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white">
      Search
    </button>
  </form>
)

export default BlogFilter
