const BlogSource = ({ url }: { url: string }) => (
  <section className="rounded-2xl bg-stone-50 p-4 ring-1 ring-stone-200/80">
    <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Source URL</p>
    <p className="mt-1 break-all text-sm font-medium text-amber-700">
      URL: {" "}
      <a href={url} target="_blank" rel="noreferrer" className="underline decoration-amber-300 underline-offset-4 hover:text-amber-800">
        {url}
      </a>
    </p>
  </section>
)

export default BlogSource
