
"use client"

import { useActionState } from "react"
import Link from "next/link"
import { registerUser } from "@/app/actions/users"

const initialState = {
  error: "",
}

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(
    registerUser,
    initialState
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground sm:px-6 lg:px-8">

      <div className="w-full max-w-md space-y-8 rounded-2xl border border-black/10 bg-background p-8 shadow-xl dark:border-white/10">

        <div>
          <h2 className="text-center text-3xl font-extrabold tracking-tight">
            Create your account
          </h2>

          <p className="mt-2 text-center text-sm opacity-75">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              Sign in
            </Link>
          </p>
        </div>

        <form action={formAction} className="mt-8 space-y-5">

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium"
            >
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              placeholder="johndoe"
              className="mt-1 block w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/20"
            />

            {state.error.toLowerCase().includes("username") && (
              <p
                data-testid="username-error"
                role="alert"
                className="mt-1 text-sm text-red-500"
              >
                {state.error}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="John Doe"
              className="mt-1 block w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              placeholder="••••••••"
              className="mt-1 block w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/20"
            />

            {state.error.toLowerCase().includes("password must") && (
              <p
                data-testid="password-error"
                role="alert"
                className="mt-1 text-sm text-red-500"
              >
                {state.error}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-medium"
            >
              Confirm Password
            </label>

            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              required
              autoComplete="new-password"
              placeholder="••••••••"
              className="mt-1 block w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/20"
            />

            {state.error.toLowerCase().includes("passwords do not match") && (
              <p
                data-testid="passwordConfirm-error"
                role="alert"
                className="mt-1 text-sm text-red-500"
              >
                {state.error}
              </p>
            )}
          </div>

          {state.error.toLowerCase().includes("already exists") && (
            <p role="alert" className="text-sm text-red-500">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            data-testid="register-button"
            disabled={pending}
            className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-indigo-700 disabled:opacity-50"
          >
            {pending ? "Creating account..." : "Register"}
          </button>

        </form>

      </div>
    </div>
  )
}
