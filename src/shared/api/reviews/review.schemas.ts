import { z } from 'zod'

export const reviewLeaveSchema = z.object({
  text: z.string().nonempty('Введите текст отзыва'),
  rating: z
    .string({ invalid_type_error: 'Введите оценку' })
    .min(1)
    .max(5)
    .default('1'),
})
