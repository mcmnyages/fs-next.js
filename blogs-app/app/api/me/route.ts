 
import { NextResponse } from "next/server"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const instant = false

export async function GET(request: Request) {
  const authorization = request.headers.get("Authorization")

  console.log('Authorization',authorization)
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const token = authorization.split(" ")[1]

  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
    columns: {
      id: true,
      username: true,
      name: true,
    },
  })

  if (!user) {
    return NextResponse.json(
      { error: "Invalid API token" },
      { status: 401 }
    )
  }

  return NextResponse.json(user)
}
