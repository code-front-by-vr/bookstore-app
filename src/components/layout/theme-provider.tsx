'use client'

import {ThemeProvider as NextThemesProvider} from 'next-themes'

export function ThemeProvider({children}: {children: React.ReactNode}) {
  return (
    <div suppressHydrationWarning>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </NextThemesProvider>
    </div>
  )
}
