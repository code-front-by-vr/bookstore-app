import {useTranslations} from 'next-intl'

export default function CartEmpty() {
  const t = useTranslations('cartEmpty')

  return (
    <div className="text-center py-16">
      <p className="text-gray-500 text-3xl">{t('title')}</p>
      <p className="text-gray-400 text-lg mt-2">{t('description')}</p>
    </div>
  )
}
