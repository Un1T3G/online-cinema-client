import Image from 'next/image'
import { UserResponse } from 'shared/api'

interface IProps {
  user: UserResponse
}

export const UserProfileRow = ({ user }: IProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-9 h-9 rounded-full overflow-hidden border border-divider">
        <Image
          src={user.avatarUrl}
          alt={user.name}
          fill
          className="object-cover"
          priority={true}
        />
      </div>
      <div className="text-base font-black">{user.name}</div>
    </div>
  )
}
