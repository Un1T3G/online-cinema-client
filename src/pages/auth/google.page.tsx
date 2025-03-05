import { useSessionStore } from 'entities/session'
import { Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { authTokenService } from 'shared/api'

export const GoggleAuthPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const setIsAuth = useSessionStore((state) => state.setIsAuth)

  useEffect(() => {
    const accessToken = searchParams?.get('access_token')
    const refreshToken = searchParams?.get('refresh_token')

    if (!accessToken || !refreshToken) {
      console.log(accessToken, refreshToken)
      return
    }

    const tokens = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    }

    setIsAuth(true)
    authTokenService.setTokens(tokens)
    router.push('/')
  }, [router.asPath, searchParams])

  return (
    <div className="flex-1 w-full flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  )
}
