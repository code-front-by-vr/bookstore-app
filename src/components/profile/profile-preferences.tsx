import {useEffect} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Bell} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {Switch} from '@/components/ui/switch'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {preferencesSchema, type PreferencesSchema} from '@/schemas/profile-schema'
import {useAppDispatch} from '@/lib/redux/hooks'
import {updateUser} from '@/lib/redux/features/user-slice'
import type {ProfilePreferencesProps} from '@/types/profile'

export default function ProfilePreferences({user}: ProfilePreferencesProps) {
  const t = useTranslations('profile')
  const dispatch = useAppDispatch()

  const {setValue, watch, reset} = useForm<PreferencesSchema>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      notifications: false,
      newsletter: false,
      promotions: false,
    },
  })

  const values = watch()

  useEffect(() => {
    if (user) {
      reset({
        notifications: user.notifications,
        newsletter: user.newsletter,
        promotions: user.promotions,
      })
    }
  }, [user, reset])

  function handleSwitchChange(field: keyof PreferencesSchema, checked: boolean) {
    setValue(field, checked, {shouldDirty: true})
    dispatch(updateUser({[field]: checked}))
  }

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
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/40">
          <div className="space-y-1">
            <div className="font-medium font-inter">{t('notifications')}</div>
            <div className="text-sm text-muted-foreground font-inter">
              {t('notificationsDescription')}
            </div>
          </div>
          <Switch
            checked={values.notifications}
            onCheckedChange={checked => handleSwitchChange('notifications', checked)}
          />
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/40">
          <div className="space-y-1">
            <div className="font-medium font-inter">{t('newsletter')}</div>
            <div className="text-sm text-muted-foreground font-inter">
              {t('newsletterDescription')}
            </div>
          </div>
          <Switch
            checked={values.newsletter}
            onCheckedChange={checked => handleSwitchChange('newsletter', checked)}
          />
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/40">
          <div className="space-y-1">
            <div className="font-medium font-inter">{t('promotions')}</div>
            <div className="text-sm text-muted-foreground font-inter">
              {t('promotionsDescription')}
            </div>
          </div>
          <Switch
            checked={values.promotions}
            onCheckedChange={checked => handleSwitchChange('promotions', checked)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
