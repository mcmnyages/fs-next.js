
"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react"
import { usePathname } from "next/navigation"

type NotificationType = "success" | "error"

type NotificationContextType = {
  message: string
  type: NotificationType
  showNotification: (
    message: string,
    type?: NotificationType
  ) => void
}

const NotificationContext = createContext<NotificationContextType>({
  message: "",
  type: "success",
  showNotification: () => {},
})

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname()
  const [message, setMessage] = useState("")
  const [type, setType] = useState<NotificationType>("success")

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showNotification = useCallback(
    (msg: string, notifType: NotificationType = "success") => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      setMessage(msg)
      setType(notifType)

      timeoutRef.current = setTimeout(() => {
        setMessage("")
        timeoutRef.current = null
      }, 5000)
    },
    []
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (pathname !== "/blogs") return

    const timer = window.setTimeout(() => {
      const hasBlogCreatedFlash = document.cookie
        .split(";")
        .some((cookie) => cookie.trim() === "blog-created=1")

      if (!hasBlogCreatedFlash) return

      document.cookie = "blog-created=; Max-Age=0; Path=/; SameSite=Lax"
      showNotification("Blog created successfully!", "success")
    }, 0)

    return () => window.clearTimeout(timer)
  }, [pathname, showNotification])

  return (
    <NotificationContext.Provider
      value={{ message, type, showNotification }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () =>
  useContext(NotificationContext)
