export type BookType = {
  error?: string
  title: string
  subtitle: string
  authors?: string
  publisher?: string
  isbn10?: number
  isbn13: number
  pages?: number
  year?: number
  rating?: number
  desc?: string
  price: number
  image: string
  url: string
  pdf?: {
    [chapter: string]: string
  }
}

export type BooksResponse = {
  total: string
  books: BookType[]
}
