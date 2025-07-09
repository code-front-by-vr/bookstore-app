'use client'

import {useRef} from 'react'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {LogOut, Camera} from 'lucide-react'
import {useTranslations} from 'next-intl'
import type {ProfileHeaderProps} from '@/types/profile'

export default function ProfileHeader({user, onSignOut, onAvatarUpdate}: ProfileHeaderProps) {
  const t = useTranslations('profile')
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleClickOpenFileInput() {
    fileInputRef.current?.click()
  }

  function handleClickChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      console.error('Пожалуйста, выберите файл изображения')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      console.error('Размер файла не должен превышать 5MB')
      return
    }

    const imageUrl = URL.createObjectURL(file)
    onAvatarUpdate?.(imageUrl)

    console.log('Аватар успешно обновлен')

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-purple-500/5 dark:from-primary/10 dark:via-primary/20 dark:to-purple-500/10 border-border/60 backdrop-blur-sm">
      <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 sm:gap-4 md:gap-6">
          <div className="relative group">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-primary to-purple-500 p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-sm sm:text-lg md:text-2xl lg:text-4xl font-bebas-neue text-primary">
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
              className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 md:-bottom-2 md:-right-2 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full shadow-lg group-hover:scale-110 transition-transform"
              onClick={handleClickOpenFileInput}
              title={t('uploadAvatar')}
            >
              <Camera className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleClickChangeFile}
              className="hidden"
            />
          </div>

          <div className="flex-1 space-y-2 sm:space-y-3 md:space-y-4 min-w-0">
            <div className="space-y-0.5 sm:space-y-1 md:space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 md:gap-3">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bebas-neue tracking-wide truncate">
                  {user.name}
                </h2>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-inter truncate">
                {user.email}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground font-inter">
                {t('memberSince')} {user.memberSince}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6">
              <div className="text-center">
                <div className="text-base sm:text-lg md:text-2xl font-bebas-neue text-primary">
                  {user.totalOrders}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-inter">
                  {t('totalOrders')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-base sm:text-lg md:text-2xl font-bebas-neue text-primary">
                  {user.totalSpent}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-inter">
                  {t('totalSpent')}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-3 w-full sm:w-auto lg:w-auto">
            <Button
              onClick={onSignOut}
              variant="outline"
              size="sm"
              className="font-inter text-xs sm:text-sm md:text-base font-medium text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20 hover:border-destructive/40 px-3 py-1.5"
            >
              <LogOut className="w-3 h-3 md:w-4 md:h-4 mr-1.5 sm:mr-2" />
              {t('signOut')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
