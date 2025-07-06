'use client'

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {routing} from '@/i18n/routing'
import {usePathname, useRouter} from '@/i18n/navigation'
import {useParams} from 'next/navigation'
import {ReactNode} from 'react'

type Props = {
  children: ReactNode
  defaultValue: string
  label: string
}

export default function LocaleSwitcherSelect({defaultValue, label}: Props) {
  const router = useRouter()

  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(nextLocale: string) {
    router.replace({pathname}, {locale: nextLocale})
  }

  return (
    <Select defaultValue={defaultValue} onValueChange={onSelectChange}>
      <SelectTrigger
        className="w-[60px] h-8 border-none bg-transparent focus:ring-0 focus:ring-offset-0 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 shadow-none focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        aria-label={label}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="min-w-[60px] w-auto">
        {routing.locales.map(locale => (
          <SelectItem key={locale} value={locale}>
            {locale.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
