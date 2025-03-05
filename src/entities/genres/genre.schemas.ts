import * as z from 'zod'

export const genreUpdateFormSchema = z.object({
  name: z.string().nonempty('Введите название'),
  slug: z.string().nonempty('Введите ссылку'),
  description: z.string().nonempty('Введите описание'),
  icon: z.string().nonempty('Введите название иконку'),
})
