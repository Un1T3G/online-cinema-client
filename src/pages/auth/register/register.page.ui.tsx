import { AuthGoogleOAuth, AuthRegisterForm } from 'features/auth'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'shared/ui'

export const AuthRegisterPage = () => {
  return (
    <div className="flex-1 w-full flex justify-center items-center">
      <Card className="w-full max-w-96">
        <CardHeader>
          <CardTitle className="text-2xl">Регистрация</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthRegisterForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="block text-sm">
            У есть аккаунт?
            <Link href="/auth/login" className="font-medium text-blue-500">
              Авторизация
            </Link>
          </p>
          <AuthGoogleOAuth />
        </CardFooter>
      </Card>
    </div>
  )
}
