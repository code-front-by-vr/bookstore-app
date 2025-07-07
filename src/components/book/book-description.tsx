import {useTranslations} from 'next-intl'

export default function BookDescription({description}: {description: string | undefined}) {
  if (!description) return null
  const t = useTranslations('bookInfo')

  return (
    <div className="mb-12 border-t dark:border-gray-700 pt-8">
      <h4 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {t('description')}
      </h4>
      <div className="font-inter text-base leading-relaxed whitespace-pre-line text-gray-700 dark:text-gray-300">
        {description}
      </div>
    </div>
  )
}
