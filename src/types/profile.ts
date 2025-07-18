import type {ProfilePersonalSchema} from '@/schemas/profile-schema'
import {useForm} from 'react-hook-form'

export type User = {
  name: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  postalCode: string
  memberSince: string
  totalOrders: number
  totalSpent: string
  avatar?: string | null
  notifications: boolean
  newsletter: boolean
  promotions: boolean
}

export type Order = {
  id: string
  title: string
  date: string
  status: string
  total: string
}

export type Activity = {
  id: string
  action: string
  title: string
  date: string
}

export type Stats = {
  favoriteBooks: number
  recentOrders: Order[]
  recentActivity: Activity[]
}

export type ProfileHeaderProps = {
  user: Pick<User, 'name' | 'email' | 'memberSince' | 'totalOrders' | 'totalSpent' | 'avatar'>
  onSignOut: () => void
  onAvatarUpdate?: (avatarUrl: string) => void
}

export type ProfilePersonalProps = {
  user: Pick<User, 'name' | 'email' | 'phone' | 'address' | 'city' | 'country' | 'postalCode'>
}

export type ProfilePreferencesProps = {
  user: Pick<User, 'notifications' | 'newsletter' | 'promotions'>
}

export type ProfileStatsProps = {
  stats: Pick<Stats, 'favoriteBooks' | 'recentOrders'>
}

export type ProfileRecentActivityProps = {
  stats: Pick<Stats, 'recentActivity'>
}

export type ProfileSectionsProps = {
  user: Omit<User, 'memberSince' | 'totalOrders' | 'totalSpent' | 'avatar'>
  stats: Stats
}

export type FieldProps = {
  label: string
  icon: React.ReactNode
  field: keyof ProfilePersonalSchema
  readOnly: boolean
  register: ReturnType<typeof useForm<ProfilePersonalSchema>>['register']
  error?: {message?: string}
}

export type UserStateType = {
  userData: User
  loading: boolean
  error: string | null
  isHydrated: boolean
}
