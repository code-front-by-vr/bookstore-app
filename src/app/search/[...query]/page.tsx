'use client'

import {searchBooks} from '@/config/api/book'
import BooksLists from '@/components/books-list'
import {PaginationBlock} from '@/components/pagination-block'
import {use} from 'react'
import Loading from '@/components/loading'
import ErrorMessage from '@/components/error-message'
import NoDataMessage from '@/components/no-data-message'

export default function SearchPage({params}: {params: Promise<{query: string[]}>}) {
  const resolvedParams = use(params)
  const [query, currentPage = '1'] = resolvedParams.query

  const {data, error, isLoading} = searchBooks(query, +currentPage)

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Search books</h3>
          <p className="text-gray-600">Enter a query to search for books</p>
        </div>
      </div>
    )
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
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">For your query "{query}"</h3>
        <p className="text-gray-600  text-sm font-inter">Found {data.total} books</p>
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
