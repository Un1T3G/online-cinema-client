import { useHydrationZustand } from '@codebayu/use-hydration-zustand'
import { useSessionStore } from 'entities/session'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect } from 'react'
import { AuthEvents, authTokenService } from 'shared/api'
import { toast } from 'sonner'

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const { isAuth, setIsAuth } = useSessionStore()
  const isHydrated = useHydrationZustand(useSessionStore)
  const router = useRouter()

  useEffect(() => {
    const handleRefreshTokens = () => {
      toast.success('Токен успешно обновлён')
    }

    const handleTokensExpired = () => {
      toast.error('Токен истёк')
      setIsAuth(false)
    }

    document.addEventListener(
      AuthEvents.onRefreshTokens.type,
      handleRefreshTokens
    )
    document.addEventListener(
      AuthEvents.onTokensExpired.type,
      handleTokensExpired
    )

    return () => {
      document.removeEventListener(
        AuthEvents.onRefreshTokens.type,
        handleRefreshTokens
      )
      document.removeEventListener(
        AuthEvents.onTokensExpired.type,
        handleTokensExpired
      )
    }
  }, [])

  useEffect(() => {
    const accessToken = authTokenService.getAccessToken()

    const isNotRoutePage = () => {
      return router.asPath.includes('auth') === false
    }

    if (accessToken === undefined && isAuth && isHydrated && isNotRoutePage()) {
      router.push('/auth/login')
      setIsAuth(false)
    }
  }, [router.asPath, isAuth, isHydrated])

  return <>{children}</>
}
