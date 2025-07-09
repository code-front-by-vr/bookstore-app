import {useState} from 'react'
import {useTranslations} from 'next-intl'
import {AuthCardLayout} from './auth-card-layout'
import {Input} from '../ui/input'
import {Button} from '../ui/button'
import {Eye, EyeOff, Lock, Mail, User} from 'lucide-react'
import Link from 'next/link'

import {zodResolver} from '@hookform/resolvers/zod'
import {signUpSchema, type SignUpFormType} from '@/schemas/auth-schema'
import {useForm} from 'react-hook-form'

export function SignUpForm({onSubmit}: {onSubmit: (data: SignUpFormType) => Promise<void>}) {
  const t = useTranslations('auth')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
  })

  return (
    <AuthCardLayout
      title={t('signUpTitle')}
      subtitle={t('signUpSubtitle')}
      footerText={t('haveAccount')}
      footerLinkText={t('signIn')}
      footerLinkHref="/auth/signin"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('firstName')}
                {...register('firstName')}
                className="pl-9 font-inter"
                disabled={isSubmitting}
              />
            </div>
            {errors.firstName && (
              <p className="text-destructive text-sm font-inter">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('lastName')}
                {...register('lastName')}
                className="pl-9 font-inter"
                disabled={isSubmitting}
              />
            </div>
            {errors.lastName && (
              <p className="text-destructive text-sm font-inter">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder={t('email')}
              {...register('email')}
              className="pl-9 font-inter"
              disabled={isSubmitting}
            />
          </div>
          {errors.email && (
            <p className="text-destructive text-sm font-inter">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder={t('password')}
              {...register('password')}
              className="pl-9 pr-9 font-inter"
              disabled={isSubmitting}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={t('confirmPassword')}
              {...register('confirmPassword')}
              className="pl-9 pr-9 font-inter"
              disabled={isSubmitting}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isSubmitting}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          {errors.confirmPassword && (
            <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="text-xs text-muted-foreground font-inter">
          {t('agreeToTerms')}{' '}
          <Link href="/terms" className="text-primary hover:underline">
            {t('termsOfService')}
          </Link>{' '}
          {t('and')}{' '}
          <Link href="/privacy" className="text-primary hover:underline">
            {t('privacyPolicy')}
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full h-11 font-inter font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>{t('loading')}</span>
            </div>
          ) : (
            t('createAccount')
          )}
        </Button>
      </form>
    </AuthCardLayout>
  )
}
