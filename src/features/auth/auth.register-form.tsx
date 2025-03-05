import { zodResolver } from '@hookform/resolvers/zod'
import { authRegisterSchema, useAuthRegisterMutation } from 'entities/auth'
import { useSessionStore } from 'entities/session'
import { KeyRound, Mail, User } from 'lucide-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthRegisterDto, authTokenService, errorCatch } from 'shared/api'
import { sleep } from 'shared/lib'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputWithLeadingIcon,
  LoadingButton,
} from 'shared/ui'
import { toast } from 'sonner'

export const AuthRegisterForm = () => {
  const form = useForm<AuthRegisterDto>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      avatarUrl: '',
    },
    resolver: zodResolver(authRegisterSchema),
    mode: 'onSubmit',
  })

  const setIsAuth = useSessionStore((state) => state.setIsAuth)

  const router = useRouter()
  const { mutate } = useAuthRegisterMutation({
    onSuccess: (data) => {
      setIsAuth(true)
      toast('Успешная авторизация')
      authTokenService.setTokens(data.tokens)
      router.push('/')
    },
    onError: (error) => toast.error(errorCatch(error)),
  })

  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = form.handleSubmit(async (data: AuthRegisterDto) => {
    setIsLoading(true)
    mutate(data)
    await sleep(300)
    setIsLoading(false)
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full max-w-md">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <InputWithLeadingIcon
                  icon={User}
                  placeholder="Jhon"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <InputWithLeadingIcon
                  icon={Mail}
                  type="email"
                  placeholder="jhon.doe@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>пароль</FormLabel>
              <FormControl>
                <InputWithLeadingIcon
                  icon={KeyRound}
                  type="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          loading={isLoading}
          type="submit"
          className="w-full mt-4"
        >
          Зарегистрироваться
        </LoadingButton>
      </form>
    </Form>
  )
}
