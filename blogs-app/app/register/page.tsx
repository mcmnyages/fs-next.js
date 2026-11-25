"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    error: ""
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-black/10 bg-background p-8 shadow-xl dark:border-white/10">
        <div>
          <h2 className="text-center text-3xl font-extrabold tracking-tight">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm opacity-75">
            Or{" "}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              sign in to your existing account
            </a>
          </p>
        </div>

        <form action={formAction} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium opacity-90">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                className="mt-1 block w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 placeholder-black/40 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/20 dark:placeholder-white/40 sm:text-sm"
                placeholder="johndoe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium opacity-90">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 placeholder-black/40 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/20 dark:placeholder-white/40 sm:text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium opacity-90">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="mt-1 block w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 placeholder-black/40 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/20 dark:placeholder-white/40 sm:text-sm"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium opacity-90">
                Confirm Password
              </label>
              <input
                type="password"
                name="passwordConfirm"
                required
                className="mt-1 block w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 placeholder-black/40 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/20 dark:placeholder-white/40 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {state.error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-300">
              {state.error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-150"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}