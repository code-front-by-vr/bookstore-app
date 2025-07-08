'use client'

import {Laptop, Moon, Sun} from 'lucide-react'
import {useTheme} from 'next-themes'
import {useTranslations} from 'next-intl'

import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeSwitcher() {
  const {setTheme} = useTheme()
  const t = useTranslations('theme')

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8 md:w-10 md:h-10">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">{t('toggleTheme')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="font-inter" onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" /> {t('light')}
        </DropdownMenuItem>
        <DropdownMenuItem className="font-inter" onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" /> {t('dark')}
        </DropdownMenuItem>
        <DropdownMenuItem className="font-inter" onClick={() => setTheme('system')}>
          <Laptop className="mr-2 h-4 w-4" /> {t('system')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
