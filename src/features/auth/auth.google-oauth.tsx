import { useRouter } from 'next/router'
import { Button } from 'shared/ui'

export const AuthGoogleOAuth = () => {
  const router = useRouter()

  const handleOnClick = () => {
    router.push(`${process.env.SERVER_URL}/api/auth/google`)
  }

  return (
    <Button className="w-full" onClick={handleOnClick}>
      Авторизация через Google
    </Button>
  )
}
