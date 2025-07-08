import type {EmailFormType} from '@/schemas/common/email-schema'

export type AuthCardLayoutProps = {
  title: string
  subtitle: string
  children: React.ReactNode
  footerText: string
  footerLinkText: string
  footerLinkHref: string
}

export type ForgotPasswordFormProps = {
  onSubmit: (data: EmailFormType) => Promise<void>
}
