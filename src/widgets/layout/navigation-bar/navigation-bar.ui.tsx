import { useGenresQuery } from 'entities/genres'
import { useUserProfileQuery } from 'entities/users'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, ErrorCard, Icons, Skeleton } from 'shared/ui'
import { getNavigationBarConfig } from './navigation-bar.lib'

export const NavigationBar = () => {
  const { data: user } = useUserProfileQuery()
  const {
    data: genres,
    isLoading: genresIsLoading,
    isError: genresIsError,
    error: genresError,
  } = useGenresQuery()
  const router = useRouter()

  const showUserNavigation = Boolean(user)
  const showAdminNavigation =
    user?.role === 'ADMIN' && router.asPath.includes('manage')

  const navigationType = showUserNavigation
    ? showAdminNavigation
      ? 'admin'
      : 'user'
    : 'ghost'
  const navigationConfig = getNavigationBarConfig(navigationType)

  const Genres = () => {
    if (showAdminNavigation) {
      return null
    }

    if (genresIsLoading) {
      return (
        <div className="space-y-2 p-4">
          <Skeleton className="h-9" />
          <Skeleton className="h-9" />
          <Skeleton className="h-9" />
          <Skeleton className="h-9" />
        </div>
      )
    }

    if (genresIsError) {
      return <ErrorCard error={genresError} className="m-2" />
    }

    return (
      <div className="space-y-2 p-4">
        <div className="text-base text-muted-foreground font-semibold">
          Жанры
        </div>
        {genres!.data.map((genre) => (
          <Button
            key={genre.id}
            className="w-full font-semibold justify-start"
            variant={
              router.pathname === `/genre/${genre.slug}`
                ? 'default'
                : 'secondary'
            }
            asChild
          >
            <Link href={`/genre/${genre.slug}`}>
              <Icons icon={genre.icon} />
              {genre.name}
            </Link>
          </Button>
        ))}
      </div>
    )
  }

  return (
    <nav className="space-y-4">
      <div className="p-4 space-y-2">
        <div className="text-base text-muted-foreground font-bold">Меню</div>
        {navigationConfig.map((item) => {
          const Icon = item.icon

          return (
            <Button
              key={item.path}
              className="w-full font-semibold justify-start"
              variant={router.pathname === item.path ? 'default' : 'secondary'}
              asChild
            >
              <Link href={item.path}>
                <Icon />
                {item.title}
              </Link>
            </Button>
          )
        })}
      </div>
      <Genres />
    </nav>
  )
}
