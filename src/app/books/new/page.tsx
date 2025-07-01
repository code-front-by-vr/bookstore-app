'use client'

import React from 'react'
import {getNewBooks} from '@/config/api/book'
import BooksLists from '@/components/books-list'
import {ArrowLeft, Loader2} from 'lucide-react'
import {Button} from '@/components/ui/button'
import Link from 'next/link'

export default function NewBooksPage(): React.ReactNode {
  const {data, isLoading, error} = getNewBooks()

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Loading books...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-600">An error occurred while loading books</p>
        </div>
      </div>
    )
  }

  if (!data || !data.books || data.books.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No books found</h1>
          <p className="text-gray-600">No books found for new books</p>
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">New Books</h1>
      <p className="text-gray-600 mb-4 text-sm font-inter">Found {data.total} books </p>
      <BooksLists books={data.books} />
    </div>
  )
}
