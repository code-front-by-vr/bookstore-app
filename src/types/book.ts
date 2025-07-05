import {ReactNode} from 'react'

export type BookType = {
  error?: string
  title: string
  subtitle: string
  authors?: string
  publisher?: string
  isbn10?: string
  isbn13: string
  pages?: string
  year?: string
  rating?: number
  desc?: string
  price: string
  image: string
  url: string
  pdf?: {
    [chapter: string]: string
  }
}

export type BooksResponse = {
  total: number
  page?: number
  books: BookType[]
}

export type BooksCarouselProps = {
  category: string
  title?: string
}

export type PaginationBlockProps = {
  query: string
  currentPage: string
  totalItems: number
  pageSize?: number
  basePath?: string
}

export type BookMainSectionProps = {
  data: BookType
  isFavorite: boolean
  onToggleFavorite: (e: React.MouseEvent) => void
}

export type BookDetailFieldProps = {
  label: string
  icon?: ReactNode
  value: string | number
  isMono?: boolean
  className?: string
}

export type PdfPreviewProps = {
  pdf: {
    [chapter: string]: string
  }
}

export type BookImageProps = {
  src: string
  alt: string
  isFavorite: boolean
  onToggleFavorite: (e: React.MouseEvent) => void
  className?: string
  heartSize?: number
}

// Favorite Types

export type FavoritesHeaderProps = {
  count: number
  onClearAll: () => void
}

export type FavoritesContentProps = {
  books: BookType[]
  onClearAll: () => void
}

export type FavoriteStateType = {
  items: BookType[]
  loading: boolean
  error: string | null
}

export type RemoveAllDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  children: React.ReactNode
}

// Cart Types
export type CartStateType = {
  items: CartItemType[]
  totalPrice: number
  loading: boolean
  error: string | null
}

export type CartItemType = {
  book: BookType
  quantity: number
}

export type CartHeaderProps = {
  cartItems: CartItemType[]
  handleClearAll: () => void
}

export type CartSummaryProps = {
  totalPrice: number
  handleCheckout: () => void
}
