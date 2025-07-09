import {z} from 'zod'

export const signInSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
})

export const signUpSchema = signInSchema
  .extend({
    confirmPassword: z.string().min(6, 'Минимум 6 символов'),
    firstName: z.string().min(2, 'Введите имя'),
    lastName: z.string().min(2, 'Введите фамилию'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

export type SignInFormType = z.infer<typeof signInSchema>
export type SignUpFormType = z.infer<typeof signUpSchema>
