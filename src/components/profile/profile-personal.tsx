import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Edit, User, Mail, Phone, MapPin, Globe, Hash} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import type {ProfilePersonalProps} from '@/types/profile'

export default function ProfilePersonal({user}: ProfilePersonalProps) {
  const t = useTranslations('profile')

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-bebas-neue text-xl tracking-wide">
              {t('personalInfo')}
            </CardTitle>
            <CardDescription className="font-inter">{t('personalInfoDescription')}</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="font-inter">
            <Edit className="w-4 h-4 mr-2" />
            {t('edit')}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium font-inter flex items-center gap-2">
                <User className="w-4 h-4" />
                {t('name')}
              </label>
              <Input value={user.name} readOnly className="font-inter" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium font-inter flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {t('email')}
              </label>
              <Input value={user.email} readOnly className="font-inter" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium font-inter flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {t('phone')}
              </label>
              <Input value={user.phone} readOnly className="font-inter" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium font-inter flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {t('country')}
              </label>
              <Input value={user.country} readOnly className="font-inter" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium font-inter flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {t('city')}
              </label>
              <Input value={user.city} readOnly className="font-inter" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium font-inter flex items-center gap-2">
                <Hash className="w-4 h-4" />
                {t('postalCode')}
              </label>
              <Input value={user.postalCode} readOnly className="font-inter" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium font-inter flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {t('address')}
            </label>
            <Input value={user.address} readOnly className="font-inter" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
