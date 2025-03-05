import { zodResolver } from '@hookform/resolvers/zod'
import { movieUpdateFormSchema, useMovieUpdateMutation } from 'entities/movies'
import { ReactNode, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import {
  ActorResponse,
  GenreResponse,
  MovieResponse,
  MovieUpdateDto,
  errorCatch,
} from 'shared/api'
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
import MultipleSelector from 'shared/ui/multi-select'
import { toast } from 'sonner'

interface IProps {
  movie: MovieResponse
  actors: ActorResponse[]
  genres: GenreResponse[]
  imageUploadSlot: (props: {
    src: string
    onChangeSrc: (newSrc: string) => void
  }) => ReactNode
  videoUploadSlot: (props: {
    onChangeSrc: (newSrc: string) => void
  }) => ReactNode
}

export const MovieUpdateForm = ({
  movie,
  actors,
  genres,
  imageUploadSlot,
  videoUploadSlot,
}: IProps) => {
  const form = useForm<MovieUpdateDto>({
    defaultValues: {
      title: movie.title,
      slug: movie.slug,
      poster: movie.poster,
      bigPoster: movie.bigPoster,
      videoUrl: movie.videoUrl,
      country: movie.country,
      year: movie.year,
      duration: movie.duration,
      genres: movie.genres.map((genre) => genre.id),
      actors: movie.actors.map((actor) => actor.id),
    },
    resolver: zodResolver(movieUpdateFormSchema as any),
    mode: 'onSubmit',
  })
  const { mutateAsync, isPending } = useMovieUpdateMutation(movie.id, {
    onSuccess: () => {
      toast.success('Фильм успешно обновлен')
    },
    onError: (error) => {
      toast.error(errorCatch(error))
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(data).catch((error) => toast.error(errorCatch(error)))
  })

  const handleGenerateSlug = () => {
    form.setValue('slug', generateSlug(form.getValues('title')))
  }

  const genreOptions = useMemo(
    () => genres.map((x) => ({ label: x.name, value: x.id })),
    [genres]
  )

  const actorOptions = useMemo(
    () => actors.map((x) => ({ label: x.name, value: x.id })),
    [actors]
  )

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input placeholder="Jhon whick" {...field} />
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
                      placeholder="jhob-whick"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            name="country"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Страна</FormLabel>
                <FormControl>
                  <Input placeholder="USA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="duration"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Длительность {`(в мин)`}</FormLabel>
                <FormControl>
                  <Input placeholder="102" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="year"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Год</FormLabel>
                <FormControl>
                  <Input placeholder="2012" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="genres"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Жанры</FormLabel>
                <FormControl>
                  <MultipleSelector
                    options={genreOptions}
                    placeholder="Выберите жанры"
                    className="dark"
                    value={
                      field.value
                        ? genreOptions.filter((x) =>
                            field.value.includes(x.value)
                          )
                        : []
                    }
                    onChange={(newValue) =>
                      field.onChange(newValue.map((option) => option.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="actors"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Актеры</FormLabel>
                <FormControl>
                  <MultipleSelector
                    options={actorOptions}
                    placeholder="Выберите актеров"
                    className="dark"
                    value={
                      field.value
                        ? actorOptions.filter((x) =>
                            field.value.includes(x.value)
                          )
                        : []
                    }
                    onChange={(newValue) =>
                      field.onChange(newValue.map((option) => option.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="poster"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Постер</FormLabel>
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
          <FormField
            name="bigPoster"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Большой постер</FormLabel>
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
        </div>
        <FormField
          name="videoUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2 w-full md:w-1/2">
              <FormLabel>Видео</FormLabel>
              <FormControl>
                {videoUploadSlot({
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
