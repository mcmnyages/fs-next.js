
"use client"

import { useActionState, useEffect } from "react"
import { createBlog } from "../../actions/blogs"
import { useNotification } from "../../components/NotificationContext"
import { useRouter } from "next/navigation"



const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    error: "",
    success: false,
    values: {
      title: "",
      author: "",
      url: ""
    }
  })
  const router = useRouter()
  const { showNotification } = useNotification()

  useEffect(() => {
    if (state.success) {
      showNotification("blog created", "success")
      router.push("/blogs")
    }

    if (state.error) {
      showNotification(state.error, "error")
    }
  }, [state, showNotification, router])

  return (
    <div>
      <h2>Create a new blog</h2>

      <form action={formAction}>
        <div>
          <label>
            Title
            <input
              type="text"
              name="title"
              required
              minLength={5}
              defaultValue={state.values?.title}
            />
          </label>
        </div>

        <div>
          <label>
            Author
            <input
              type="text"
              name="author"
              required
              minLength={5}
              defaultValue={state.values?.author}
            />
          </label>
        </div>

        <div>
          <label>
            URL
            <input
              type="url"
              name="url"
              required
              minLength={5}
              defaultValue={state.values?.url}
            />
          </label>
        </div>

        <button type="submit">Create</button>

        {state.error && (
          <p style={{ color: "red" }}>{state.error}</p>
        )}
      </form>
    </div>
  )
}

export default NewBlog
