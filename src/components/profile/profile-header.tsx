'use client'

import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {LogOut, Camera} from 'lucide-react'
import {useTranslations} from 'next-intl'
import type {ProfileHeaderProps} from '@/types/profile'

export default function ProfileHeader({user, onSignOut}: ProfileHeaderProps) {
  const t = useTranslations('profile')

  return (
    <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-purple-500/5 dark:from-primary/10 dark:via-primary/20 dark:to-purple-500/10 border-border/60 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-primary to-purple-500 p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl lg:text-4xl font-bebas-neue text-primary">
                    {user.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')
                      .toUpperCase()}
                  </span>
                )}
              </div>
            </div>
            <Button
              size="icon"
              variant="secondary"
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full shadow-lg group-hover:scale-110 transition-transform"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <h1 className="text-2xl lg:text-3xl font-bebas-neue tracking-wide">{user.name}</h1>
              </div>
              <p className="text-muted-foreground font-inter">{user.email}</p>
              <p className="text-sm text-muted-foreground font-inter">
                {t('memberSince')} {user.memberSince}
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <div className="text-2xl font-bebas-neue text-primary">{user.totalOrders}</div>
                <div className="text-sm text-muted-foreground font-inter">{t('totalOrders')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bebas-neue text-primary">{user.totalSpent}</div>
                <div className="text-sm text-muted-foreground font-inter">{t('totalSpent')}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full sm:w-auto lg:w-auto">
            <Button
              onClick={onSignOut}
              variant="outline"
              className="font-inter font-medium text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20 hover:border-destructive/40"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t('signOut')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
