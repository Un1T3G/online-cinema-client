import { useSessionStore } from 'entities/session'
import { useUserProfileQuery } from 'entities/users'
import Link from 'next/link'
import { Button, VideoPlayer } from 'shared/ui'

interface IProps {
  url: string
}

export const MoviePlayer = ({ url }: IProps) => {
  const isAuth = useSessionStore((state) => state.isAuth)
  const { data: user } = useUserProfileQuery()

  if (user && user.isHasPremium) {
    return <VideoPlayer url={url} />
  }

  return (
    <div className="h-[380px] w-full flex flex-col items-center justify-center rounded-lg bg-zinc-800 p-4">
      <p className="mb-2 text-center sm:text-left">
        Для просмотра фильмов необходимо оформить премиум-подписку.
      </p>
      <Button asChild>
        <Link href={isAuth ? '/premium' : '/auth/login'}>Купить премиум</Link>
      </Button>
    </div>
  )
}
