import NavBar from "./components/NavBar"
import { Suspense } from "react"
import { NotificationProvider } from "./components/NotificationContext"
import Notification from "./components/Notification"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NotificationProvider>
          <Suspense fallback={<div className="h-16" />}>
          <NavBar />
        </Suspense>
          <Notification />
          {children}
        </NotificationProvider>
      </body>
    </html>
  )
}
