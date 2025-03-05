import * as z from 'zod'

export const actorUpdateFormSchema = z.object({
  name: z.string().nonempty('Введите название'),
  slug: z.string().nonempty('Введите ссылку'),
  photoUrl: z.string().nonempty('Введите постер'),
})
