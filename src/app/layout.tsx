import type {Metadata} from 'next'
import {Bebas_Neue, Inter} from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Container from '@/components/container'
import Footer from '@/components/footer'
import StoreProvider from './StoreProvider'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${inter.variable} antialiased min-h-dvh flex flex-col`}
      >
        <StoreProvider>
          <Header />
          <main className="flex-1">
            <Container>{children}</Container>
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}
