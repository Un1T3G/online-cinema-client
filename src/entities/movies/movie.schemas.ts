import * as z from 'zod'

export const movieUpdateFormSchema = z.object({
  title: z.string().nonempty('Введите название'),
  slug: z.string().nonempty('Введите ссылку'),
  poster: z.string().nonempty('Введите постер'),
  bigPoster: z.string().nonempty('Введите большой постер'),
  videoUrl: z.string().nonempty('Введите ссылку на видео'),
  country: z.string().nonempty('Введите страну'),
  year: z.number(),
  duration: z.number(),
  genres: z.array(z.string()).nonempty('Выберите хотя бы один жанр'),
  actors: z.array(z.string()).nonempty('Выберите хотя бы одного актера'),
})
