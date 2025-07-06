import {Loader2} from 'lucide-react'
import {useTranslations} from 'next-intl'

export default function Loading() {
  const t = useTranslations('loading')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
        <span className="ml-2 font-inter text-lg">{t('title')}</span>
      </div>
    </div>
  )
}
