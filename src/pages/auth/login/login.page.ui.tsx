import { AuthGoogleOAuth, AuthLoginForm } from 'features/auth'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'shared/ui'

export const AuthLoginPage = () => {
  return (
    <div className="flex-1 w-full flex justify-center items-center">
      <Card className="w-full max-w-96">
        <CardHeader>
          <CardTitle className="text-2xl">Авторизация</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthLoginForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="block text-sm">
            У вас нет аккаунта?
            <Link href="/auth/register" className="font-medium text-blue-500">
              Зарегистрируйтесь
            </Link>
          </p>
          <AuthGoogleOAuth />
        </CardFooter>
      </Card>
    </div>
  )
}
