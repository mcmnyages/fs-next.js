
"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useNotification } from "../components/NotificationContext"

export default function LoginPage() {
  const router = useRouter()
  const { showNotification } = useNotification()

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-black/10 bg-background p-8 shadow-xl dark:border-white/10">

        <div>
          <h2 className="text-center text-3xl font-extrabold tracking-tight">
            Sign in to your account
          </h2>

          <p className="mt-2 text-center text-sm opacity-75">
            Or{" "}
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              create a new account
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium opacity-90"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                name="username"
                required
                autoComplete="username"
                placeholder="johndoe"
                className="mt-1 block w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/20 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium opacity-90"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="mt-1 block w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/20 sm:text-sm"
              />
            </div>
          </div>

          {error && (
            <div
              data-testid="error-message"
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-300"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            data-testid="login-button"
            disabled={loading}
            className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  )
}
