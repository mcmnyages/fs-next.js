
"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "../../db"
import { users } from "../../db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { auth } from "../../auth"

export const registerUser = async (
  prevState: { error: string },
  formData: FormData
) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  if (!username || username.length < 4) {
    return { error: "Username must be at least 4 characters long" }
  }

  if (!password || password.length < 4) {
    return { error: "Password must be at least 4 characters long" }
  }

  if (password !== passwordConfirm) {
    return { error: "Passwords do not match" }
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.username, username))

  if (existingUser.length > 0) {
    return { error: "Username already exists" }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({
    username,
    name,
    passwordHash,
  })

  redirect("/login")
}


export const generateToken = async () => {
  const session = await auth()
  const username = session?.user?.email

  if (!username) {
    redirect("/login")
  }

  // Generate a new unique token
  const token = crypto.randomUUID()

  // Update the logged-in user's token
  const result = await db
    .update(users)
    .set({ token })
    .where(eq(users.username, username))
    .returning({ id: users.id })

  if (result.length === 0) {
    throw new Error("User not found")
  }

  // Refresh profile data
  revalidatePath("/me")

  // Force a fresh server-rendered profile
  redirect("/me")
}
