import BooksLists from './books-list'
import FavoritesHeader from './favorites-header'
import {FavoritesContentProps} from '@/types/book'

export default function FavoritesContent({books, onClearAll}: FavoritesContentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <FavoritesHeader count={books.length} onClearAll={onClearAll} />
      <BooksLists books={books} />
    </div>
  )
}
