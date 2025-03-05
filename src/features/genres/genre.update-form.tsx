import { zodResolver } from '@hookform/resolvers/zod'
import { genreUpdateFormSchema, useGenreUpdateMutation } from 'entities/genres'
import { useForm } from 'react-hook-form'
import { GenreResponse, GenreUpdateDto, errorCatch } from 'shared/api'
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
  Textarea,
} from 'shared/ui'
import { toast } from 'sonner'

interface IProps {
  genre: GenreResponse
}

export const GenreUpdateForm = ({ genre }: IProps) => {
  const form = useForm<GenreUpdateDto>({
    defaultValues: {
      slug: genre.slug,
      name: genre.name,
      description: genre.description,
      icon: genre.icon,
    },
    resolver: zodResolver(genreUpdateFormSchema as any),
    mode: 'onSubmit',
  })
  const { mutateAsync, isPending } = useGenreUpdateMutation(genre.id, {
    onSuccess: () => {
      toast.success('Категория успешно обновлен')
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input placeholder="Genre" {...field} />
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
                      placeholder="genre"
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
          <FormField
            name="icon"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Иконка</FormLabel>
                <FormControl>
                  <Input placeholder="Star" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder="Описание категории" {...field} />
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
