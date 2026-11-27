const BlogHeader = ({ title, author }: { title: string; author: string }) => (
  <header className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-900 px-8 py-10 text-white">
    <span className="inline-block rounded-full bg-amber-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 ring-1 ring-amber-300/30">
      Featured Post
    </span>
    <h1 data-testid="blog-title" className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
      {title}
    </h1>
    <p className="mt-3 text-sm text-stone-300">
      Author: <span data-testid="blog-author" className="font-semibold text-white">{author}</span>
    </p>
  </header>
)

export default BlogHeader
