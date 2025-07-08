import {NextIntlClientProvider} from 'next-intl'

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>
}
