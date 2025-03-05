import z from 'zod'

export const userUpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Не валидный email').optional(),
  avatarUrl: z.string().optional(),
})
