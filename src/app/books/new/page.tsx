'use client'

import React from 'react'
import {getNewBooks} from '@/config/api/book'
import BooksLists from '@/components/catalog/books-list'
import ErrorMessage from '@/components/ui/error-message'
import NoDataMessage from '@/components/ui/no-data-message'
import Loading from '@/components/ui/loading'

export default function NewBooksPage(): React.ReactNode {
  const {data, isLoading, error} = getNewBooks()

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
      <h3 className="text-3xl font-bold mb-6 capitalize">New Books</h3>
      <p className="text-gray-600 mb-4 text-sm font-inter">Found {data.total} books </p>
      <BooksLists books={data.books} />
    </>
  )
}
