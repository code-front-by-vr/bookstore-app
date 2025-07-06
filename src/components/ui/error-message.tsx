import HomeButton from '@/components/layout/home-link'
import {useTranslations} from 'next-intl'

export default function ErrorMessage({error}: {error: string}) {
  const t = useTranslations('error')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">{t('title')}</h3>
        <p className="text-red-600">{t('description', {error})}</p>
        <div className="mt-4">
          <HomeButton />
        </div>
      </div>
    </div>
  )
}
