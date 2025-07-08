import {z} from 'zod'

export const EmailSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export type EmailFormType = z.infer<typeof EmailSchema>
