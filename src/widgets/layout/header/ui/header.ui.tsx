import { useSessionStore } from 'entities/session'
import { MoviesSearchBar } from 'features/movies'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { NoSSR, useIsMobile } from 'shared/lib'
import { Button } from 'shared/ui'
import { Profile } from './profile'

interface IProps {
  toggleMobileSheet: VoidFunction
}

export const Header = ({ toggleMobileSheet }: IProps) => {
  const isAuth = useSessionStore((state) => state.isAuth)
  const isMobile = useIsMobile()

  return (
    <header className="fixed flex items-center justify-between top-[0] space-x-4 md:space-x-0 left-0 md:left-[256px] right-0 h-16 border-b border-divider px-4 bg-background/50 backdrop-blur z-50">
      <MoviesSearchBar />
      <NoSSR>
        {isMobile ? (
          <Button variant="outline" size="icon" onClick={toggleMobileSheet}>
            <Menu />
          </Button>
        ) : isAuth ? (
          <Profile />
        ) : (
          <Button asChild>
            <Link href="/auth/login">Войти</Link>
          </Button>
        )}
      </NoSSR>
    </header>
  )
}
