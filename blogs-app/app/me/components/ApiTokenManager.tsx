"use client"

import { useState } from "react"
import { generateToken } from "@/app/actions/users"

const ApiTokenManager = ({ initialToken }: { initialToken: string | null }) => {
  const [token, setToken] = useState(initialToken)
  const [isPending, setIsPending] = useState(false)

  const handleGenerate = async () => {
    setIsPending(true)

    try {
      setToken(await generateToken())
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div data-testid="api-token-section" className="border-t border-stone-100 pt-6">
      <h2 className="text-xl font-extrabold text-stone-900">
        Personal API Token
      </h2>

      <p className="mt-1 text-xs text-stone-500">
        Use this token to authenticate external requests.
        Generating a new token may invalidate your previous one.
      </p>

      <div className="mt-4">
        {token ? (
          <div
            data-testid="token-display"
            className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-4"
          >
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-800">
              Active Token
            </p>

            <p
              data-testid="api-token"
              className="break-all rounded-xl border border-stone-200 bg-white p-3.5 font-mono text-sm text-stone-900 select-all"
            >
              {token}
            </p>
          </div>
        ) : (
          <div
            data-testid="no-token-message"
            className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-4 text-sm text-stone-500"
          >
            No token has been generated yet.
          </div>
        )}
      </div>

      <form action={handleGenerate} className="mt-5">
        <button
          data-testid="generate-token-button"
          type="submit"
          disabled={isPending}
          className="cursor-pointer rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-stone-950 shadow-sm transition hover:bg-amber-400 disabled:cursor-wait disabled:opacity-70"
        >
          {isPending ? "Generating..." : "Generate new token"}
        </button>
      </form>
    </div>
  )
}

export default ApiTokenManager
