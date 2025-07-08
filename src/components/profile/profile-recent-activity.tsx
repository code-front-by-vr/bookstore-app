import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {BookOpen, Calendar} from 'lucide-react'
import {useTranslations} from 'next-intl'
import type {ProfileRecentActivityProps} from '@/types/profile'

export default function ProfileRecentActivity({stats}: ProfileRecentActivityProps) {
  const t = useTranslations('profile')

  const getTranslatedAction = (action: string): string => {
    const normalizedAction = action.toLowerCase().trim()

    switch (normalizedAction) {
      case 'added to favorites':
        return t('activityActions.addedToFavorites')
      case 'added to cart':
        return t('activityActions.addedToCart')
      case 'purchased':
        return t('activityActions.purchased')
      case 'reviewed':
        return t('activityActions.reviewed')
      case 'downloaded':
        return t('activityActions.downloaded')
      case 'rated':
        return t('activityActions.rated')
      default:
        return action
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/60">
      <CardHeader>
        <CardTitle className="font-bebas-neue text-xl tracking-wide">
          {t('recentActivity')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {stats.recentActivity.map(activity => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-background/30 border border-border/30"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-inter">
                <span className="font-medium">{getTranslatedAction(activity.action)}</span>
                <span className="text-muted-foreground"> {activity.title}</span>
              </p>
              <p className="text-xs text-muted-foreground font-inter flex items-center gap-1 mt-1">
                <Calendar className="w-3 h-3" />
                {activity.date}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
