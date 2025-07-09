import {useState} from 'react'
import {AuthCardLayout} from './auth-card-layout'
import {Input} from '../ui/input'
import {Eye, EyeOff, Lock, Mail} from 'lucide-react'
import {Button} from '../ui/button'

import {useForm} from 'react-hook-form'
import Link from 'next/link'
import {zodResolver} from '@hookform/resolvers/zod'
import {signInSchema, type SignInFormType} from '@/schemas/auth-schema'
import {useTranslations} from 'next-intl'

export function SignInForm({onSubmit}: {onSubmit: (data: SignInFormType) => Promise<void>}) {
  const t = useTranslations('auth')
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
  })

  return (
    <AuthCardLayout
      title={t('signInTitle')}
      subtitle={t('signInSubtitle')}
      footerText={t('noAccount')}
      footerLinkText={t('createAccount')}
      footerLinkHref="/auth/signup"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
          {errors.password && (
            <p className="text-destructive text-sm font-inter">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-sm font-inter">
            <input type="checkbox" className="rounded border-border" disabled={isSubmitting} />
            <span className="text-muted-foreground">{t('rememberMe')}</span>
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-primary hover:underline font-inter"
          >
            {t('forgotPassword')}
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
            t('signIn')
          )}
        </Button>
      </form>
    </AuthCardLayout>
  )
}
