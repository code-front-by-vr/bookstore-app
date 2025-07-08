import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Heart, ShoppingBag} from 'lucide-react'
import {useTranslations} from 'next-intl'
import Link from 'next/link'
import {Badge} from '@/components/ui/badge'
import type {ProfileStatsProps} from '@/types/profile'

export default function ProfileStats({stats}: ProfileStatsProps) {
  const t = useTranslations('profile')

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border-border/60">
        <CardHeader>
          <CardTitle className="font-bebas-neue text-xl tracking-wide">{t('quickStats')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/books/favorites">
            <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/40 hover:bg-background/80 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-primary" />
                <span className="font-inter">{t('favoriteBooks')}</span>
              </div>
              <Badge variant="secondary">{stats.favoriteBooks}</Badge>
            </div>
          </Link>
          <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/40">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <span className="font-inter">{t('orderHistory')}</span>
            </div>
            <Badge variant="secondary">{stats.recentOrders.length}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
