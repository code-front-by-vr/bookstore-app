import React from 'react'
import BooksLists from '@/components/books-list'
import {PaginationBlock} from '@/components/pagination-block'
import type {BooksResponse} from '@/types/book'
import NoDataMessage from '@/components/no-data-message'
import ErrorMessage from '@/components/error-message'
import {ENDPOINTS} from '@/config/endpoints'

export async function generateStaticParams() {
  const categories = ['javascript', 'python', 'react', 'node.js', 'java', 'php']
  const pagesPerCategory = 3

  const params = []

  for (const category of categories) {
    for (let page = 1; page <= pagesPerCategory; page++) {
      params.push({
        category: [category, page.toString()],
      })
    }
  }

  return params
}

export default async function CategoryPage({
  params,
}: {
  params: {category: string[]}
}): Promise<React.ReactNode> {
  const [category, currentPage = '1'] = params.category

  const res = await fetch(ENDPOINTS.search(category, currentPage))

  if (!res.ok) {
    return <ErrorMessage error={res.statusText || 'Unknown error'} />
  }

  const data: BooksResponse = await res.json()

  if (!data || !data.books || data.books.length === 0) {
    return <NoDataMessage />
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h3 className="text-3xl font-bold  capitalize">{category} Books</h3>
      <p className="text-gray-600  text-sm font-inter">Found {data.total} books </p>
      <BooksLists books={data.books} />
      <PaginationBlock query={category} currentPage={currentPage} totalItems={data.total} />
    </div>
  )
}
