'use client'

import React from 'react'
import {getNewBooks} from '@/config/api/book'
import BooksLists from '@/components/catalog/books-list'
import ErrorMessage from '@/components/ui/error-message'
import NoDataMessage from '@/components/ui/no-data-message'
import Loading from '@/components/ui/loading'
import {useTranslations} from 'next-intl'

export default function NewBooksPage(): React.ReactNode {
  const {data, isLoading, error} = getNewBooks()
  const t = useTranslations('newBooks')

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
    <>
      <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">{t('title')}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm font-inter">
        {t('description', {count: data.total})}
      </p>
      <BooksLists books={data.books} />
    </>
  )
}
