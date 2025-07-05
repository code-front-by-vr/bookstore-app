'use client'

import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks'
import {setLang} from '@/lib/redux/features/lang-slice'
import {LangType} from '@/types/book'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'

const languages = [
  {code: 'en', name: 'English', flag: '🇺🇸'},
  {code: 'ru', name: 'Русский', flag: '🇷🇺'},
] as const

export default function LanguageSelector() {
  const dispatch = useAppDispatch()
  const currentLang = useAppSelector(state => state.lang.lang)

  const handleLanguageChange = (value: string) => {
    dispatch(setLang(value as LangType))
  }

  return (
    <Select value={currentLang} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-fit h-8 px-2 py-2 border-none bg-transparent hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-none data-[state=open]:ring-0 data-[state=open]:border-none shadow-none">
        <SelectValue>
          <div className="flex items-center gap-1.5 text-sm font-medium">
            <span className="uppercase font-inter">{currentLang}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end" className="min-w-[140px]">
        {languages.map(language => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center gap-2">
              <span className="text-base">{language.flag}</span>
              <span className="text-sm font-inter">{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
