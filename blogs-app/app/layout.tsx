
import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'Bloglist',
  description: 'A simple blog application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">home</Link>
          {' | '}
          <Link href="/blogs">blogs</Link>
          {' | '}
          <Link href="/users">users</Link>
          {' | '}
          <Link href="/blogs/new">create new</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
