import { useSessionStore } from 'entities/session'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/router'
import { authTokenService } from 'shared/api'
import { Button } from 'shared/ui'

export const AuthLogoutButton = () => {
  const router = useRouter()
  const setIsAuth = useSessionStore((state) => state.setIsAuth)

  const handleOnClick = () => {
    setIsAuth(false)
    authTokenService.removeTokens()
    router.push('/auth/login')
  }

  return (
    <Button
      variant="ghost"
      className="w-full flex items-center justify-start p-2"
      onClick={handleOnClick}
    >
      <LogOut />
      Выход
    </Button>
  )
}
