type ProfileDetailsProps = {
  name: string
  username: string
}

const ProfileDetails = ({ name, username }: ProfileDetailsProps) => (
  <div
    data-testid="user-profile"
    className="grid gap-4 rounded-2xl border border-stone-200/80 bg-stone-50/80 p-5 sm:grid-cols-2"
  >
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
        Name
      </p>
      <p data-testid="user-name" className="mt-1 text-base font-bold text-stone-900">
        {name}
      </p>
    </div>

    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
        Username
      </p>
      <p data-testid="user-username" className="mt-1 text-base font-semibold text-stone-800">
        {username}
      </p>
    </div>
  </div>
)

export default ProfileDetails
