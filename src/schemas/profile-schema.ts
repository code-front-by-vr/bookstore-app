import {z} from 'zod'

export const profileSchema = z.object({
  name: z.string().min(2, 'Введите имя'),
  email: z.string().email('Неверный email'),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
})

export const preferencesSchema = z.object({
  notifications: z.boolean(),
  newsletter: z.boolean(),
  promotions: z.boolean(),
})

export type PreferencesSchema = z.infer<typeof preferencesSchema>
export type ProfilePersonalSchema = z.infer<typeof profileSchema>
