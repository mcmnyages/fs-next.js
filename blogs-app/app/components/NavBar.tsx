"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-white/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-stone-900"
          >
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
            <span>BlogList</span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2 text-sm font-medium text-stone-600">
            <Link
              href="/"
              className="rounded-lg px-3 py-1.5 transition hover:bg-stone-100 hover:text-stone-950"
            >
              Home
            </Link>
            <Link
              href="/blogs"
              className="rounded-lg px-3 py-1.5 transition hover:bg-stone-100 hover:text-stone-950"
            >
              Blogs
            </Link>
            <Link
              href="/users"
              className="rounded-lg px-3 py-1.5 transition hover:bg-stone-100 hover:text-stone-950"
            >
              Users
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          {session ? (
            <>
              <Link
                href="/blogs/new"
                className="rounded-full bg-amber-500 px-4 py-1.5 font-semibold text-stone-950 shadow-sm transition hover:bg-amber-400 active:scale-[0.99]"
              >
                + Create New
              </Link>
              <span className="hidden md:inline rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                <em className="not-italic font-semibold text-stone-900">
                  {session.user?.name}
                </em>{" "}
                logged in
              </span>
              <button
                onClick={() => signOut()}
                className="cursor-pointer rounded-lg border border-stone-300 bg-white px-3 py-1.5 font-medium text-stone-700 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-3 py-1.5 font-medium text-stone-700 transition hover:bg-stone-100 hover:text-stone-950"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-stone-900 px-4 py-1.5 font-semibold text-white transition hover:bg-amber-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}