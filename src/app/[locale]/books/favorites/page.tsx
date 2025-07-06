'use client'

import {useAppSelector, useAppDispatch} from '@/lib/redux/hooks'
import {clearAllFavorites} from '@/lib/redux/features/favorites-slice'
import Loading from '@/components/ui/loading'
import BooksEmpty from '@/components/book/books-empty'
import ErrorMessage from '@/components/ui/error-message'
import BooksLists from '@/components/catalog/books-list'
import FavoritesHeader from '@/components/favorites/favorites-header'

export default function FavoritesPage() {
  const {items: favoriteBooks, loading, error} = useAppSelector(state => state.favorite)
  const dispatch = useAppDispatch()

  const handleClearAllFavorites = () => {
    dispatch(clearAllFavorites())
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage error={error as string} />
  }

  return (
    <>
      <FavoritesHeader count={favoriteBooks.length} onClearAll={handleClearAllFavorites} />
      {favoriteBooks.length === 0 ? <BooksEmpty /> : <BooksLists books={favoriteBooks} />}
    </>
  )
}
