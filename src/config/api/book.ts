'use client'

import {fetcher} from '@/config/fetcher'
import {BooksResponse, BookType} from '@/types/book'
import {ENDPOINTS} from '@/config/endpoints'
import useSWR, {type SWRResponse} from 'swr'

export function getNewBooks(): SWRResponse<BooksResponse, Error> {
  return useSWR(ENDPOINTS.new, fetcher)
}

export function getBook(isbn13: string): SWRResponse<BookType, Error> {
  return useSWR(ENDPOINTS.book(isbn13), fetcher)
}

export function getBooksByCategory(
  category: string,
  page: number = 1
): SWRResponse<BooksResponse, Error> {
  return useSWR(ENDPOINTS.search(category, page), fetcher)
}

export function searchBooks(query: string, page: number = 1): SWRResponse<BooksResponse, Error> {
  const key = query.trim() ? ENDPOINTS.search(query, page) : null
  return useSWR(key, fetcher)
}
