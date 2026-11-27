import { auth } from "@/auth"
import { db } from "@/db"
import { blogs, readingList, users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"

import ApiTokenManager from "@/app/me/components/ApiTokenManager"
import ProfileDetails from "@/app/me/components/ProfileDetails"
import ReadingList from "@/app/me/components/ReadingList"

export const instant = false

const MePage = async () => {
  const session = await auth()
  const username = session?.user?.email

  if (!username) {
    redirect("/login")
  }

  const profileRows = await db
    .select({
      user: users,
      readingListItem: readingList,
      blog: blogs,
    })
    .from(users)
    .leftJoin(readingList, eq(readingList.userId, users.id))
    .leftJoin(blogs, eq(blogs.id, readingList.blogId))
    .where(eq(users.username, username))

  const user = profileRows[0]?.user

  if (!user) {
    redirect("/login")
  }

  const readingListItems = profileRows
    .filter((row) => row.readingListItem !== null && row.blog !== null)
    .map((row) => ({
      ...row.readingListItem!,
      blog: row.blog!,
    }))

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
        <header className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 px-8 py-8 text-white">
          <span className="inline-block rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-300 ring-1 ring-inset ring-amber-400/30">
            Account Settings
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight">My Profile</h1>
          <p className="mt-1 text-sm text-stone-300">
            Manage your identity details and personal API access token.
          </p>
        </header>

        <div className="space-y-8 p-8">
          <ProfileDetails name={user.name} username={user.username} />
          <ApiTokenManager initialToken={user.token} />
          <ReadingList items={readingListItems} />
        </div>
      </div>
    </main>
  )
}

export default MePage
