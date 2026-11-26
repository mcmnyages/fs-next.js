import { NextResponse } from "next/server"
import { db } from "@/db" // adjust path if your db client is elsewhere
import { readingList, blogs, users } from "@/db/schema" // adjust path if needed

export async function DELETE() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  try {
    await db.delete(readingList)
    await db.delete(blogs)
    await db.delete(users)

    return NextResponse.json(
      { message: "All tables cleared successfully" },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error resetting database:", error)
    return NextResponse.json(
      { error: "Failed to reset database" },
      { status: 500 },
    )
  }
}