import HomeButton from '@/components/layout/home-link'
import {useTranslations} from 'next-intl'

export default function NoDataMessage() {
  const t = useTranslations('noData')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {t('nothingFound')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 font-inter text-lg">{t('noBooksFound')}</p>
        <div className="mt-4">
          <HomeButton />
        </div>
      </div>
    </div>
  )
}
