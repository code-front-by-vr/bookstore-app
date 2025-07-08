'use client'

import {useTranslations} from 'next-intl'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {EmailSchema, EmailFormType} from '@/schemas/common/email-schema'
import {AuthCardLayout} from './auth-card-layout'
import {Input} from '../ui/input'
import {Button} from '../ui/button'
import {Mail} from 'lucide-react'
import type {ForgotPasswordFormProps} from '@/types/auth'

export default function ForgotPasswordForm({onSubmit}: ForgotPasswordFormProps) {
  const t = useTranslations('auth')

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<EmailFormType>({
    resolver: zodResolver(EmailSchema),
  })

  return (
    <AuthCardLayout
      title={t('resetPassword')}
      subtitle={t('enterEmailToReset')}
      footerText=""
      footerLinkText={t('backToSignIn')}
      footerLinkHref="/auth/signin"
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
            t('resetPassword')
          )}
        </Button>
      </form>
    </AuthCardLayout>
  )
}
