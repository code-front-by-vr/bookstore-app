'use client'

import {useState} from 'react'
import ForgotPasswordForm from '@/components/auth/forgot-password-form'
import {AuthCardLayout} from '@/components/auth/auth-card-layout'
import {Mail} from 'lucide-react'
import {useTranslations} from 'next-intl'
import type {EmailFormType} from '@/schemas/common/email-schema'

export default function ForgotPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false)
  const t = useTranslations('auth')

  async function onSubmit(data: EmailFormType) {
    // TODO: API for reset password
    console.log('Reset password for:', data.email)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <AuthCardLayout
        title={t('checkEmail')}
        subtitle={t('resetLinkSent')}
        footerText=""
        footerLinkText={t('backToSignIn')}
        footerLinkHref="/auth/signin"
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="w-8 h-8 text-primary" />
          </div>
        </div>
      </AuthCardLayout>
    )
  }

  return <ForgotPasswordForm onSubmit={onSubmit} />
}
