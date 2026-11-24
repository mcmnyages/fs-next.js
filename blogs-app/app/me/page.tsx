import { auth } from "../../auth"
import { db } from "../../db"
import { users } from "../../db/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { generateToken } from "../actions/users"

export const instant = false

const MePage = async () => {
  const session = await auth()

  const username = session?.user?.email
  console.log("Username", username)
  if (!username) {
    redirect("/login")
  }

  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (!user) {
    redirect("/login")
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 px-8 py-8 text-white">
          <span className="inline-block rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-300 ring-1 ring-inset ring-amber-400/30">
            Account Settings
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight">
            My Profile
          </h1>
          <p className="mt-1 text-sm text-stone-300">
            Manage your identity details and personal API access token.
          </p>
        </div>

        {/* Profile Body */}
        <div className="space-y-8 p-8">
          <div className="grid gap-4 rounded-2xl border border-stone-200/80 bg-stone-50/80 p-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Name
              </p>
              <p className="mt-1 text-base font-bold text-stone-900">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Username
              </p>
              <p className="mt-1 text-base font-semibold text-stone-800">
                {user.username}
              </p>
            </div>
          </div>

          {/* API Token Section */}
          <div className="border-t border-stone-100 pt-6">
            <h2 className="text-xl font-extrabold text-stone-900">
              Personal API Token
            </h2>
            <p className="mt-1 text-xs text-stone-500">
              Use this token to authenticate external requests. Generating a
              new token may invalidate your previous one.
            </p>

            <div className="mt-4">
              {user.token ? (
                <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-4">
                  <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-800">
                    Active Token
                  </p>
                  <p className="break-all rounded-xl border border-stone-200 bg-white p-3.5 font-mono text-sm text-stone-900 select-all">
                    {user.token}
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-4 text-sm text-stone-500">
                  No token has been generated yet.
                </div>
              )}
            </div>

            <form action={generateToken} className="mt-5">
              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-stone-950 shadow-sm transition hover:bg-amber-400 active:scale-[0.99]"
              >
                Generate new token
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MePage 