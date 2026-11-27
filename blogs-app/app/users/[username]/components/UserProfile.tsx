import UserBlogList from "./UserBlogList"

type UserProfileProps = {
  user: {
    name: string
    username: string
    blogs: { id: number; title: string; author: string }[]
  }
}

const UserProfile = ({ user }: UserProfileProps) => (
  <main className="mx-auto max-w-3xl px-6 py-12">
    <header className="border-b border-stone-200 pb-5">
      <p className="text-sm text-stone-500">@{user.username}</p>
      <h1 className="mt-1 text-3xl font-extrabold tracking-tight">{user.name}</h1>
    </header>
    <UserBlogList blogs={user.blogs} />
  </main>
)

export default UserProfile
