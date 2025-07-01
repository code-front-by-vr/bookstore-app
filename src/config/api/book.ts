import {fetcher} from '@/config/fetcher'
import {BooksResponse, BookType} from '@/types/book'
import useSWR, {type SWRResponse} from 'swr'

const newBookEndpoint = 'https://api.itbook.store/1.0/new'
const bookEndpoint = 'https://api.itbook.store/1.0/books/'
const categoryEndpoint = 'https://api.itbook.store/1.0/search/'

export function getNewBooks(): SWRResponse<BooksResponse, Error> {
  return useSWR(newBookEndpoint, fetcher)
}

export function getBook(isbn13: number): SWRResponse<BookType, Error> {
  return useSWR(`${bookEndpoint}${isbn13}`, fetcher)
}

export function getBooksByCategory(
  category: string,
  page: number = 1
): SWRResponse<BooksResponse, Error> {
  return useSWR(`${categoryEndpoint}${category}/${page}`, fetcher)
}

export function searchBooks(query: string, page: number = 1): SWRResponse<BooksResponse, Error> {
  return useSWR(query.trim() ? `${categoryEndpoint}${query}/${page}` : null, fetcher)
}
