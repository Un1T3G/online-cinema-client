import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import {
  useUserProfileQuery,
  useUserUpdateProfileMutation,
  userUpdateSchema,
} from 'entities/users'
import { Mail, User } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserUpdateDto, errorCatch } from 'shared/api'
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

interface IProps {
  imageUploadSlot: (props: {
    src: string
    onChangeSrc: (newSrc: string) => void
  }) => ReactNode
}

export const UserUpdateForm = ({ imageUploadSlot }: IProps) => {
  const { data } = useUserProfileQuery()
  const form = useForm<UserUpdateDto>({
    defaultValues: {
      name: data?.name || '',
      email: data?.email || '',
      avatarUrl: data?.avatarUrl || '',
    },
    resolver: zodResolver(userUpdateSchema),
    mode: 'onSubmit',
  })

  const queryClient = useQueryClient()
  const { mutate } = useUserUpdateProfileMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
      toast.success('Профиль успешно обновлен')
    },
    onError: (error) => toast.error(errorCatch(error)),
  })

  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = form.handleSubmit(async (formData: UserUpdateDto) => {
    setIsLoading(true)
    mutate({
      name: formData.name,
      email: data?.authByOAuth ? undefined : formData.email,
      avatarUrl: formData.avatarUrl,
    })
    await sleep(300).catch((error) => toast.error(errorCatch(error)))
    setIsLoading(false)
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full max-w-md">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
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
                  placeholder="jhon.doe@example.com"
                  {...field}
                  readOnly={data?.authByOAuth}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="avatarUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Аватар</FormLabel>
              <FormControl>
                {imageUploadSlot({
                  src: field.value ? field.value : '/file.svg',
                  onChangeSrc: (newSrc) => field.onChange(newSrc),
                })}
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
          Обновить
        </LoadingButton>
      </form>
    </Form>
  )
}
