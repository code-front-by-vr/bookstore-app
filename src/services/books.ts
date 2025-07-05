import {ENDPOINTS} from '@/config/api/endpoints'
import {fetcher} from '@/config/fetcher'
import type {BookType} from '@/types/book'

export const fetchBookByIsbn = async (isbn: string): Promise<BookType | null> => {
  try {
    return await fetcher(ENDPOINTS.book(isbn))
  } catch (e) {
    console.error(`Error fetching book ${isbn}:`, e)
    return null
  }
}
