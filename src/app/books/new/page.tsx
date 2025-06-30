'use client'

import React from 'react'
import {getNewBooks} from '@/config/api/book'
import {notFound} from 'next/navigation'
import BooksLists from '@/components/books-list'

export default function NewBooksPage(): React.ReactNode {
  const {data, isLoading, error} = getNewBooks()

  if (isLoading) return <div className="px-4 py-8">Loading...</div>
  if (error) return <div className="px-4 py-8">Error: {error.message}</div>

  if (!data?.books || data.books.length === 0) return notFound()

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">New Books</h1>
      <p className="text-gray-600 mb-4 text-sm font-inter">Found {data.total} books </p>
      <BooksLists books={data.books} />
    </div>
  )
}
