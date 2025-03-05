import { zodResolver } from '@hookform/resolvers/zod'
import { actorUpdateFormSchema, useActorUpdateMutation } from 'entities/actors'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { ActorResponse, ActorUpdateDto, errorCatch } from 'shared/api'
import { generateSlug } from 'shared/lib'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  LoadingButton,
} from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  actor: ActorResponse
  imageUploadSlot: (props: {
    src: string
    onChangeSrc: (newSrc: string) => void
  }) => ReactNode
}

export const ActorUpdateForm = ({ actor, imageUploadSlot }: IProps) => {
  const form = useForm<ActorUpdateDto>({
    defaultValues: {
      slug: actor.slug,
      name: actor.name,
      photoUrl: actor.photoUrl,
    },
    resolver: zodResolver(actorUpdateFormSchema as any),
    mode: 'onSubmit',
  })
  const { mutateAsync, isPending } = useActorUpdateMutation(actor.id, {
    onSuccess: () => {
      toast.success('Актер успешно обновлен')
    },
    onError: (error) => {
      toast.error(errorCatch(error))
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(data).catch((error) => toast.error(errorCatch(error)))
  })

  const handleGenerateSlug = () => {
    form.setValue('slug', generateSlug(form.getValues('name')))
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input placeholder="Jhon" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="slug"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Ссылка</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="jhon"
                      {...field}
                      className="pr-[148px]"
                    />
                  </FormControl>
                  <Button
                    variant="secondary"
                    className="absolute top-1/2 right-2 -translate-y-1/2 py-1 h-6"
                    onClick={handleGenerateSlug}
                  >
                    Сгенерировать
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="photoUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2 w-full md:w-1/2">
              <FormLabel>Фото</FormLabel>
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
        <LoadingButton type="submit" loading={isPending}>
          Сохранить
        </LoadingButton>
      </form>
    </Form>
  )
}
