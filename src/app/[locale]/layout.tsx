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
import {ThemeProvider} from '@/components/layout/theme-provider'

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
  icons: {
    icon: [
      {url: '/favicon.ico', sizes: 'any', type: 'image/x-icon'},
      {url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon'},
      {url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon'},
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
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
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body
        className={`${bebasNeue.variable} ${inter.variable} antialiased min-h-dvh flex flex-col`}
        suppressHydrationWarning
      >
        <StoreProvider>
          <ThemeProvider>
            <NextIntlClientProvider>
              <Header />
              <main className="flex-1">
                <Container>{children}</Container>
              </main>
              <Footer />
            </NextIntlClientProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
