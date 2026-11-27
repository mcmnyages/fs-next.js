"use client"

import { useState } from "react"
import { addToReadingList } from "@/app/actions/blogs"

const ReadingListControl = ({
  blogId,
  alreadyAdded,
}: {
  blogId: number
  alreadyAdded: boolean
}) => {
  const [added, setAdded] = useState(alreadyAdded)
  const [pending, setPending] = useState(false)

  const handleAdd = async (formData: FormData) => {
    setPending(true)
    try {
      await addToReadingList(formData)
      setAdded(true)
    } finally {
      setPending(false)
    }
  }

  return added ? (
    <div className="rounded-xl bg-green-50 px-5 py-3 text-sm font-semibold text-green-700">
      ✓ Added to your reading list
    </div>
  ) : (
    <form action={handleAdd}>
      <input type="hidden" name="blogId" value={blogId} />
      <button
        data-testid="add-to-reading-list-button"
        type="submit"
        disabled={pending}
        className="w-full cursor-pointer rounded-xl bg-stone-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-stone-700 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Adding..." : "+ Add to reading list"}
      </button>
    </form>
  )
}

export default ReadingListControl
