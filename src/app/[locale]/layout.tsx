import type {Metadata} from 'next'
import {Bebas_Neue, Inter} from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'
import Container from '@/components/layout/container'
import Footer from '@/components/layout/footer'
import StoreProvider from '@/app/[locale]/StoreProvider'

import {NextIntlClientProvider, hasLocale} from 'next-intl'
import {notFound} from 'next/navigation'
import {routing} from '@/i18n/routing'

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas-neue',
})

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BookStore - Онлайн магазин книг',
  description:
    'Найдите и купите любимые книги в нашем онлайн книжном магазине. Широкий выбор IT-литературы, новинки и бестселлеры.',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body
        className={`${bebasNeue.variable} ${inter.variable} antialiased min-h-dvh flex flex-col`}
        suppressHydrationWarning={true}
      >
        <StoreProvider>
          <NextIntlClientProvider>
            <Header />
            <main className="flex-1">
              <Container>{children}</Container>
            </main>
            <Footer />
          </NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
