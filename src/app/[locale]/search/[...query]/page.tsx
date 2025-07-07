'use client'

import {searchBooks} from '@/config/api/book'
import BooksLists from '@/components/catalog/books-list'
import {PaginationBlock} from '@/components/ui/pagination-block'
import {use} from 'react'
import Loading from '@/components/ui/loading'
import ErrorMessage from '@/components/ui/error-message'
import NoDataMessage from '@/components/ui/no-data-message'
import {useRouter} from 'next/navigation'
import {useTranslations} from 'next-intl'

export default function SearchPage({params}: {params: Promise<{query: string[]}>}) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [query, currentPage = '1'] = resolvedParams.query
  const t = useTranslations('searchResults')

  const {data, error, isLoading} = searchBooks(query, currentPage)

  if (!query) {
    router.push('/search')
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage error={error.message || 'Unknown error'} />
  }

  if (!data || !data.books || data.books.length === 0) {
    return <NoDataMessage />
  }

  return (
    <div className="container mx-auto px-4 space-y-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {t('title', {query})}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm font-inter">
          {t('description', {count: data.total})}
        </p>
      </div>

      <BooksLists books={data.books} />

      <PaginationBlock
        query={query}
        currentPage={currentPage}
        totalItems={data.total}
        basePath="search"
      />
    </div>
  )
}
