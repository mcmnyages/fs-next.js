"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"

import { useNotification } from "../components/NotificationContext"
import LoginForm from "./components/LoginForm"

export default function LoginPage() {
  const router = useRouter()
  const { showNotification } = useNotification()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(event.currentTarget)

    try {
      const result = await signIn("credentials", {
        username: formData.get("username"),
        password: formData.get("password"),
        redirect: false,
      })

      if (!result || result.error) {
        setError("Invalid username or password")
        return
      }

      showNotification("Successfully logged in!", "success")
      router.push("/")
      router.refresh()
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return <LoginForm onSubmit={handleSubmit} error={error} loading={loading} />
}
