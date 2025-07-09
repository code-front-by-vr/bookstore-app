import {useEffect, useState} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Edit, User, Mail, Phone, MapPin, Globe, Hash, Save, X} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import type {FieldProps, ProfilePersonalProps} from '@/types/profile'

import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {profileSchema, type ProfilePersonalSchema} from '@/schemas/profile-schema'
import {updateUser} from '@/lib/redux/features/user-slice'
import {useAppDispatch} from '@/lib/redux/hooks'

function Field({label, icon, field, readOnly, register, error}: FieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium font-inter flex items-center gap-2">
        {icon} {label}
      </label>
      <Input {...register(field)} readOnly={readOnly} className="font-inter" />
      {error?.message && <p className="text-sm text-destructive font-inter">{error.message}</p>}
    </div>
  )
}

export default function ProfilePersonal({user}: ProfilePersonalProps) {
  const t = useTranslations('profile')
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty, isSubmitting},
  } = useForm<ProfilePersonalSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
    },
  })

  useEffect(() => {
    reset({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      country: user.country,
      postalCode: user.postalCode,
    })
  }, [user, reset])

  function onSubmit(data: ProfilePersonalSchema) {
    dispatch(updateUser(data))
    setIsEditing(false)
  }

  function handleCancel() {
    reset()
    setIsEditing(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-bebas-neue text-xl tracking-wide">
              {t('personalInfo')}
            </CardTitle>
            <CardDescription className="font-inter">{t('personalInfoDescription')}</CardDescription>
          </div>
          <div className="flex items-center justify-end min-h-[32px]">
            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  className="font-inter"
                  disabled={isSubmitting || !isDirty}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {t('save')}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="font-inter"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  <X className="w-4 h-4 mr-2" />
                  {t('cancel')}
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="font-inter"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                {t('edit')}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label={t('name')}
              icon={<User className="w-4 h-4" />}
              field="name"
              readOnly={!isEditing}
              register={register}
              error={errors.name}
            />
            <Field
              label={t('email')}
              icon={<Mail className="w-4 h-4" />}
              field="email"
              readOnly={!isEditing}
              register={register}
              error={errors.email}
            />
            <Field
              label={t('phone')}
              icon={<Phone className="w-4 h-4" />}
              field="phone"
              readOnly={!isEditing}
              register={register}
              error={errors.phone}
            />

            <Field
              label={t('country')}
              icon={<Globe className="w-4 h-4" />}
              field="country"
              readOnly={!isEditing}
              register={register}
              error={errors.country}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label={t('city')}
              icon={<MapPin className="w-4 h-4" />}
              field="city"
              readOnly={!isEditing}
              register={register}
              error={errors.city}
            />
            <Field
              label={t('postalCode')}
              icon={<Hash className="w-4 h-4" />}
              field="postalCode"
              readOnly={!isEditing}
              register={register}
              error={errors.postalCode}
            />
          </div>
          <Field
            label={t('address')}
            icon={<MapPin className="w-4 h-4" />}
            field="address"
            readOnly={!isEditing}
            register={register}
            error={errors.address}
          />
        </CardContent>
      </Card>
    </form>
  )
}
