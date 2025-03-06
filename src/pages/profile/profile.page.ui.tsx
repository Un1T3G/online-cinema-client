import { useUserProfileQuery } from 'entities/users'
import { Mail, User } from 'lucide-react'
import Image from 'next/image'
import { Card } from 'shared/ui'
import { UserUpdateModal } from 'widgets/users'

export const ProfilePage = () => {
  const { data } = useUserProfileQuery()

  return (
    <div className="flex-1 w-full">
      <h1 className="text-2xl mb-2">Профиль</h1>
      {data && (
        <Card className="flex flex-col items-center sm:items-start sm:flex-row justify-center sm:justify-start space-y-4 space-x-4 sm:space-y-0 sm:space-x-4 p-4">
          <div className="space-y-2">
            <div className="relative w-36 h-36 rounded-lg border border-divider overflow-hidden">
              <Image
                src={
                  Boolean(data.avatarUrl)
                    ? data.avatarUrl
                    : '/default-avatar.jpg'
                }
                alt={data.name}
                fill
                className="object-cover"
              />
            </div>
            <UserUpdateModal />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-1 text-sm text-foreground">
              <User className="w-5 h-5" />
              <span>
                Имя: <b>{data.name}</b>
              </span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-foreground">
              <Mail className="w-5 h-5" />
              <span>
                Электронная почта: <b>{data.email}</b>
              </span>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
