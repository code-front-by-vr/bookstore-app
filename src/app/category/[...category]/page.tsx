'use client'

import React from 'react'
import {getBooksByCategory} from '@/config/api/book'
import BooksLists from '@/components/books-list'
import {notFound} from 'next/navigation'
import {PaginationBlock} from '@/components/pagination-block'

export default function CategoryPage({
  params,
}: {
  params: Promise<{category: string[]; page: string}>
}): React.ReactNode {
  const unwrappedParams = React.use(params)
  const category = unwrappedParams.category[0]
  const currentPage = unwrappedParams.category[1] ? +unwrappedParams.category[1] : 1

  const {data, isLoading, error} = getBooksByCategory(category, currentPage)

  if (isLoading) return <div className="px-4 py-8">Loading...</div>
  if (error) return <div className="px-4 py-8">Error: {error.message}</div>

  if (!data?.books || data.books.length === 0) return notFound()

  return (
    <div className="px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold  capitalize">{category} Books</h1>
      <p className="text-gray-600  text-sm font-inter">Found {data.total} books </p>
      <BooksLists books={data.books} />
      <PaginationBlock category={category} currentPage={currentPage} totalItems={data.total} />
    </div>
  )
}
