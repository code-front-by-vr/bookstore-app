'use client'

import React from 'react'
import BooksLists from '@/components/catalog/books-list'
import ErrorMessage from '@/components/ui/error-message'
import NoDataMessage from '@/components/ui/no-data-message'
import Loading from '@/components/ui/loading'
import {PaginationBlock} from '@/components/ui/pagination-block'
import {getAllBooks} from '@/config/api/book'
import {useTranslations} from 'next-intl'

export default function AllBooksPage({params}: {params: Promise<{page: string}>}): React.ReactNode {
  const resolvedParams = React.use(params)
  const currentPage = resolvedParams.page || '1'

  const {data, isLoading, error} = getAllBooks(currentPage)
  const t = useTranslations('allBooks')

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
        <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">{t('title')}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm font-inter">
          {t('description', {count: data.total})}
        </p>
      </div>

      <BooksLists books={data.books} />

      <PaginationBlock
        basePath="books"
        query="all"
        currentPage={currentPage}
        totalItems={data.total}
      />
    </div>
  )
}
