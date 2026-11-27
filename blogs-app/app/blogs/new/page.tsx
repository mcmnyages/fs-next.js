
"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog } from "../../actions/blogs"
import { useNotification } from "../../components/NotificationContext"

const NewBlog = () => {
  const [state, formAction, isPending] = useActionState(createBlog, {
    error: "",
    success: false,
    values: {
      title: "",
      author: "",
      url: "",
    },
  })

  const router = useRouter()
  const { showNotification } = useNotification()

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully!", "success")
      router.push("/blogs")
    }

    if (state.error) {
      showNotification(state.error, "error")
    }
  }, [state, showNotification, router])

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">

        <div className="mb-8 border-b border-stone-100 pb-6">
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
            New Entry
          </span>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-900">
            Create a new blog
          </h2>

          <p className="mt-1 text-sm text-stone-500">
            Share a great article or link with the community
            (minimum 5 characters per field).
          </p>
        </div>

        <form action={formAction} className="space-y-6">

          <div>
            <label className="block text-sm font-semibold text-stone-800">
              Title

              <input
                type="text"
                name="title"
                required
                minLength={5}
                defaultValue={state.values?.title}
                placeholder="e.g. Designing Calm Interfaces with Tailwind"
                className="mt-2 block w-full rounded-xl border border-stone-300 bg-stone-50/60 px-4 py-3 text-sm font-normal text-stone-900 placeholder-stone-400 transition focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-500/15"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-800">
              Author

              <input
                type="text"
                name="author"
                required
                minLength={5}
                defaultValue={state.values?.author}
                placeholder="e.g. Jane Doe"
                className="mt-2 block w-full rounded-xl border border-stone-300 bg-stone-50/60 px-4 py-3 text-sm font-normal text-stone-900 placeholder-stone-400 transition focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-500/15"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-800">
              URL

              <input
                type="url"
                name="url"
                required
                minLength={5}
                defaultValue={state.values?.url}
                placeholder="https://example.com/article"
                className="mt-2 block w-full rounded-xl border border-stone-300 bg-stone-50/60 px-4 py-3 text-sm font-normal text-stone-900 placeholder-stone-400 transition focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-500/15"
              />
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              data-testid="create-blog-button"
              disabled={isPending}
              className="w-full cursor-pointer rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-stone-950 shadow-sm transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {isPending ? "Creating..." : "Create"}
            </button>
          </div>

          {state.error && (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
              {state.error}
            </p>
          )}

        </form>
      </div>
    </main>
  )
}

export default NewBlog
