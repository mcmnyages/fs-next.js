
"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  return (
    <div
      data-testid="notification"
      role="alert"
      aria-live="polite"
      className={`mb-2.5 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm ${
        type === "success"
          ? "bg-green-600"
          : "bg-red-600"
      }`}
    >
      {message}
    </div>
  )
}
