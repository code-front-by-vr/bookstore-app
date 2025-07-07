'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Button} from '@/components/ui/button'
import {routing} from '@/i18n/routing'
import {usePathname, useRouter} from '@/i18n/navigation'
import {useParams} from 'next/navigation'
import {ReactNode} from 'react'
import {ChevronDown} from 'lucide-react'

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
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-[60px] h-8 border-none bg-transparent focus:ring-0 focus:ring-offset-0 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 shadow-none focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-2 text-base font-medium justify-between"
          aria-label={label}
        >
          {defaultValue.toUpperCase()}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[60px] w-auto" align="end">
        {routing.locales.map(locale => (
          <DropdownMenuItem
            key={locale}
            onClick={() => onSelectChange(locale)}
            className="font-inter text-sm justify-center"
          >
            {locale.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
