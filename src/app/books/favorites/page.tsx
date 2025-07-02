'use client'

import {useAppSelector, useAppDispatch} from '@/lib/hooks'
import {clearAllFavorites} from '@/lib/features/favorites-slice'
import Loading from '@/components/loading'
import NoDataMessage from '@/components/no-data-message'
import ErrorMessage from '@/components/error-message'
import {useState} from 'react'
import FavoritesContent from '@/components/favorites-content'

export default function FavoritesPage() {
  const {items: favoriteBooks, loading, error} = useAppSelector(state => state.favorite)
  const dispatch = useAppDispatch()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleClearAllFavorites = () => {
    dispatch(clearAllFavorites())
    setIsDialogOpen(false)
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage error={error as string} />
  }

  if (favoriteBooks.length === 0) {
    return <NoDataMessage />
  }

  return <FavoritesContent books={favoriteBooks} onClearAll={handleClearAllFavorites} />
}
