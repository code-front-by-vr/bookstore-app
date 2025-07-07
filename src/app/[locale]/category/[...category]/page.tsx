import React from 'react'
import BooksLists from '@/components/catalog/books-list'
import {PaginationBlock} from '@/components/ui/pagination-block'
import type {BooksResponse} from '@/types/book'
import NoDataMessage from '@/components/ui/no-data-message'
import ErrorMessage from '@/components/ui/error-message'
import {ENDPOINTS} from '@/config/api/endpoints'
import {getTranslations} from 'next-intl/server'

export async function generateStaticParams() {
  const categories = ['javascript', 'python', 'react', 'nodejs', 'java', 'php']
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
  params: Promise<{category: string[]}>
}): Promise<React.ReactNode> {
  const resolvedParams = await params
  const t = await getTranslations('category')
  const [category, currentPage = '1'] = resolvedParams.category

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
      <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 capitalize">
        {t('title', {category})}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm font-inter">
        {t('description', {count: data.total})}
      </p>
      <BooksLists books={data.books} />
      <PaginationBlock query={category} currentPage={currentPage} totalItems={data.total} />
    </div>
  )
}
