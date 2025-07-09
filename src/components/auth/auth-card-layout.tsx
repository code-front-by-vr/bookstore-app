import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '../ui/card'
import Link from 'next/link'
import type {AuthCardLayoutProps} from '@/types/auth'

export function AuthCardLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthCardLayoutProps) {
  return (
    <div className="min-h-[81vh] flex items-center justify-center px-4 py-8 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-700/20">
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-lg border-border/60 shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <CardTitle className="text-2xl font-bebas-neue tracking-wider">{title}</CardTitle>
          <CardDescription className="text-muted-foreground font-inter">{subtitle}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {children}

          <div className="text-center text-sm font-inter">
            <span className="text-muted-foreground">{footerText} </span>
            <Link href={footerLinkHref} className="text-primary hover:underline font-medium">
              {footerLinkText}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
