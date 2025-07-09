'use client'

import {useRouter} from 'next/navigation'
import ProfileHeader from '@/components/profile/profile-header'
import ProfileSections from '@/components/profile/profile-sections'
import {useTranslations} from 'next-intl'
import Container from '@/components/layout/container'
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks'
import HomeLink from '@/components/layout/home-link'
import {fetchUser, updateUser} from '@/lib/redux/features/user-slice'
import {useEffect} from 'react'

// for getting user stats
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

  const dispatch = useAppDispatch()
  const {userData: user, isHydrated} = useAppSelector(state => state.user)
  const favoritesCount = useAppSelector(state => state.favorite.items.length)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  function handleSignOut() {
    router.push('/auth/signin')
  }

  function handleAvatarUpdate(avatarUrl: string) {
    dispatch(updateUser({avatar: avatarUrl}))
  }

  return (
    <div className="py-2 sm:py-4 md:py-6 lg:py-8 px-2 sm:px-3 md:px-4 min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-700/20">
      <Container>
        <HomeLink />
        <div className="pt-1 md:pt-2 pb-3 sm:pb-4 md:pb-6 lg:pb-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
          <div className="space-y-1 md:space-y-2">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bebas-neue tracking-wide">
              {t('title')}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-inter">
              {t('description')}
            </p>
          </div>
          {isHydrated && (
            <ProfileHeader
              user={user}
              onSignOut={handleSignOut}
              onAvatarUpdate={handleAvatarUpdate}
            />
          )}
          {isHydrated && <ProfileSections user={user} stats={getUserStats(favoritesCount)} />}
        </div>
      </Container>
    </div>
  )
}
