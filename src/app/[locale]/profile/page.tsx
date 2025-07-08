'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import ProfileHeader from '@/components/profile/profile-header'
import ProfileSections from '@/components/profile/profile-sections'
import {useTranslations} from 'next-intl'
import Container from '@/components/layout/container'
import {useAppSelector} from '@/lib/redux/hooks'
import HomeLink from '@/components/layout/home-link'

// Mock data for profile page
const mockUser = {
  name: 'Александр Иванов',
  email: 'alexander.ivanov@example.com',
  phone: '+7 (999) 123-45-67',
  address: 'ул. Пушкина, дом 15, кв. 42',
  city: 'Минск',
  country: 'Беларусь',
  postalCode: '101000',
  memberSince: 'июль 2025',
  totalOrders: 15,
  totalSpent: '$2,450',
  notifications: true,
  newsletter: true,
  promotions: false,
}

// for getting real favorites count
const getUserStats = (favoritesCount: number) => ({
  favoriteBooks: favoritesCount,
  recentOrders: [
    {
      id: '1',
      title: 'JavaScript: The Good Parts',
      date: '2024-01-15',
      status: 'delivered',
      total: '$35.99',
    },
    {
      id: '2',
      title: 'Clean Code',
      date: '2024-01-10',
      status: 'delivered',
      total: '$42.50',
    },
  ],
  recentActivity: [
    {
      id: '1',
      action: 'Added to favorites',
      title: 'React Patterns',
      date: '2 hours ago',
    },
    {
      id: '2',
      action: 'Purchased',
      title: 'TypeScript Handbook',
      date: '1 day ago',
    },
    {
      id: '3',
      action: 'Added to cart',
      title: 'Node.js Design Patterns',
      date: '3 days ago',
    },
    {
      id: '4',
      action: 'Reviewed',
      title: 'Vue.js 3 Cookbook',
      date: '1 week ago',
    },
  ],
})

export default function ProfilePage() {
  const router = useRouter()
  const t = useTranslations('profile')
  const [isEditMode, setIsEditMode] = useState(false)

  const favoritesCount = useAppSelector(state => state.favorite.items.length)

  const handleSignOut = () => {
    console.log('Sign out clicked')
    router.push('/auth/signin')
  }

  return (
    <div className="py-8 px-4 min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-700/20">
      <Container>
        <HomeLink />
        <div className="pt-2 pb-8 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl lg:text-4xl font-bebas-neue tracking-wide">{t('title')}</h2>
            <p className="text-muted-foreground font-inter">{t('description')}</p>
          </div>
          <ProfileHeader user={mockUser} onSignOut={handleSignOut} />
          <ProfileSections user={mockUser} stats={getUserStats(favoritesCount)} />
        </div>
      </Container>
    </div>
  )
}
