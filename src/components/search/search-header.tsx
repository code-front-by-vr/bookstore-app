import {useTranslations} from 'next-intl'

export default function SearchHeader() {
  const t = useTranslations('searchPage')
  return (
    <div className="text-center max-w-4xl mx-auto mb-12">
      <h3 className="text-4xl font-bold mb-4">{t('title')}</h3>
      <p className="text-xl text-gray-600 leading-relaxed">{t('description')}</p>
    </div>
  )
}
