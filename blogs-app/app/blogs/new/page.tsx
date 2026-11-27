"use client"

import { useActionState, useEffect } from "react"

import { createBlog } from "../../actions/blogs"
import { useNotification } from "../../components/NotificationContext"
import BlogCreationForm from "./components/BlogCreationForm"

const NewBlog = () => {
  const [state, formAction, isPending] = useActionState(createBlog, {
    error: "",
    success: false,
    values: { title: "", author: "", url: "" },
  })
  const { showNotification } = useNotification()

  useEffect(() => {
    if (!state.success || !state.stayOnForm || !state.submissionId) return

    const handledSubmissionKey = "last-add-another-blog-submission"
    if (sessionStorage.getItem(handledSubmissionKey) === state.submissionId) return

    sessionStorage.setItem(handledSubmissionKey, state.submissionId)
    showNotification("Blog created successfully!", "success")
  }, [state.success, state.stayOnForm, state.submissionId, showNotification])

  return <BlogCreationForm state={state} formAction={formAction} isPending={isPending} />
}

export default NewBlog
