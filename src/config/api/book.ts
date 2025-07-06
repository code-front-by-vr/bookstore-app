'use client'

import {fetcher} from '@/config/fetcher'
import {BooksResponse, BookType} from '@/types/book'
import {ENDPOINTS} from '@/config/api/endpoints'
import useSWR, {type SWRResponse} from 'swr'

export function getNewBooks(): SWRResponse<BooksResponse, Error> {
  return useSWR(ENDPOINTS.new, fetcher)
}

export function getBook(isbn13: string): SWRResponse<BookType, Error> {
  return useSWR(ENDPOINTS.book(isbn13), fetcher)
}

export function getBooksByCategory(
  category: string,
  page: string = '1'
): SWRResponse<BooksResponse, Error> {
  return useSWR(ENDPOINTS.search(category, page), fetcher)
}

export function searchBooks(query: string, page: string = '1'): SWRResponse<BooksResponse, Error> {
  const key = query.trim() ? ENDPOINTS.search(query, page) : null
  return useSWR(key, fetcher)
}

export function getSimilarBooks(title: string): SWRResponse<BooksResponse, Error> {
  const keyword = title ? title.split(' ').find(word => word.trim().length > 3) || '' : ''
  const key = keyword.trim() ? ENDPOINTS.search(keyword) : null
  return useSWR(key, fetcher)
}

// Without SWR
export const fetchBookByIsbn = async (isbn: string): Promise<BookType | null> => {
  try {
    return await fetcher(ENDPOINTS.book(isbn))
  } catch (e) {
    console.error(`Error fetching book ${isbn}:`, e)
    return null
  }
}
