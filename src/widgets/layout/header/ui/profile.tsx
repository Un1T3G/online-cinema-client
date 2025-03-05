import { UserProfileRow, useUserProfileQuery } from 'entities/users'
import { AuthLogoutButton } from 'features/auth'
import { ChevronDown, User } from 'lucide-react'
import Link from 'next/link'
import {
  Button,
  ErrorCard,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from 'shared/ui'

export const Profile = () => {
  const { data, isSuccess, isError, error, isLoading } = useUserProfileQuery()

  if (isError) {
    return <ErrorCard error={error} />
  }

  if (isLoading) {
    return (
      <div className="flex space-x-2">
        <Skeleton className="w-9 h-9 rounded-full" />
        <Skeleton className="w-24 h-9" />
      </div>
    )
  }

  if (isSuccess) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center space-x-2">
            <UserProfileRow user={data!} />
            <ChevronDown className="w-4 h-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="bg-card text-white w-full max-w-36 p-2">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start p-2"
            asChild
          >
            <Link href="/profile">
              <User />
              Профиль
            </Link>
          </Button>
          {data.role === 'ADMIN' && (
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start p-2"
              asChild
            >
              <Link href="/manage">
                <User />
                Админ
              </Link>
            </Button>
          )}
          <AuthLogoutButton />
        </PopoverContent>
      </Popover>
    )
  }

  return <></>
}
