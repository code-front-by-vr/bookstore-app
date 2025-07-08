import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Bell, Edit} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import type {ProfilePreferencesProps} from '@/types/profile'

export default function ProfilePreferences({user}: ProfilePreferencesProps) {
  const t = useTranslations('profile')

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/60">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-bebas-neue text-xl tracking-wide flex items-center gap-2">
            <Bell className="w-5 h-5" />
            {t('preferences')}
          </CardTitle>
          <CardDescription className="font-inter">{t('preferencesDescription')}</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="font-inter">
          <Edit className="w-4 h-4 mr-2" />
          {t('edit')}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/40">
          <div className="space-y-1">
            <div className="font-medium font-inter">{t('notifications')}</div>
            <div className="text-sm text-muted-foreground font-inter">
              {t('notificationsDescription')}
            </div>
          </div>
          <Badge variant={user.notifications ? 'default' : 'secondary'}>
            {user.notifications ? t('on') : t('off')}
          </Badge>
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/40">
          <div className="space-y-1">
            <div className="font-medium font-inter">{t('newsletter')}</div>
            <div className="text-sm text-muted-foreground font-inter">
              {t('newsletterDescription')}
            </div>
          </div>
          <Badge variant={user.newsletter ? 'default' : 'secondary'}>
            {user.newsletter ? t('subscribed') : t('unsubscribed')}
          </Badge>
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/40">
          <div className="space-y-1">
            <div className="font-medium font-inter">{t('promotions')}</div>
            <div className="text-sm text-muted-foreground font-inter">
              {t('promotionsDescription')}
            </div>
          </div>
          <Badge variant={user.promotions ? 'default' : 'secondary'}>
            {user.promotions ? t('enabled') : t('disabled')}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
