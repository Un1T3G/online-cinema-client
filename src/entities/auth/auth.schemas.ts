import * as z from 'zod'

export const authLoginSchema = z.object({
  email: z.string().email('Не валидный email'),
  password: z.string().nonempty('Введите пароль'),
})

export const authRegisterSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Не валидный email'),
  password: z.string().min(8, 'Минимум 8 символов').nonempty('Введите пароль'),
  avatarUrl: z.string().optional(),
})
