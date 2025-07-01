'use client'

import {searchBooks} from '@/config/api/book'
import BooksLists from '@/components/books-list'
import {Button} from '@/components/ui/button'
import {Loader2, ArrowLeft} from 'lucide-react'
import Link from 'next/link'
import {PaginationBlock} from '@/components/pagination-block'
import React from 'react'

export default function SearchPage({params}: {params: Promise<{query: string[]}>}) {
  const unwrappedParams = React.use(params)
  const query = unwrappedParams.query[0]
  const currentPage = unwrappedParams.query[1] ? +unwrappedParams.query[1] : 1

  const {data, error, isLoading} = searchBooks(query, +currentPage)

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Search books</h1>
          <p className="text-gray-600">Enter a query to search for books</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Search books...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Search error</h1>
          <p className="text-red-600">An error occurred while searching for books</p>
        </div>
      </div>
    )
  }

  if (!data || !data.books || data.books.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Search results</h1>
          <p className="text-gray-600">No books found for query "{query}"</p>
          <Link href="/">
            <Button className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">For your query "{query}"</h1>
        <p className="text-gray-600  text-sm font-inter">Found {data.total} books</p>
      </div>

      <BooksLists books={data.books} />

      <PaginationBlock
        query={query}
        currentPage={+currentPage}
        totalItems={data.total}
        basePath="search"
      />
    </div>
  )
}
