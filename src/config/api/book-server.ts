import type {BookType} from '@/types/book'
import {ENDPOINTS} from './endpoints'

export async function getBookServer(isbn13: string): Promise<BookType | null> {
  try {
    const res = await fetch(ENDPOINTS.book(isbn13), {
      next: {revalidate: 3600},
    })
    if (!res.ok) return null
    const data = await res.json()
    return data
  } catch {
    return null
  }
}
