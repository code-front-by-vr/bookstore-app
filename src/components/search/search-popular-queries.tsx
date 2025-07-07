import Link from 'next/link'
import {POPULAR_QUERIES} from '@/config/constants'
import {useTranslations} from 'next-intl'

export default function SearchPopularQueries() {
  const t = useTranslations('searchPage')
  return (
    <div className="flex flex-wrap gap-2 justify-center items-center">
      <span className="text-sm text-gray-500 dark:text-gray-400">{t('popularQueries')}</span>
      {POPULAR_QUERIES.map((query, i) => (
        <span key={query} className="flex items-center gap-1">
          <Link
            href={`/search/${query}/1`}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            {query}
          </Link>
          {i < POPULAR_QUERIES.length - 1 && (
            <span className="text-gray-300 dark:text-gray-600">•</span>
          )}
        </span>
      ))}
    </div>
  )
}
