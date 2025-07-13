'use client'

import {use} from 'react'
import {getBook} from '@/services/api/book'
import SubscribeSection from '@/components/sections/subscribe-section'
import Loading from '@/components/ui/loading'
import ErrorMessage from '@/components/ui/error-message'
import NoDataMessage from '@/components/ui/no-data-message'
import {toggleFavorite} from '@/lib/redux/features/favorites-slice'
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks'
import {BookType} from '@/types/book'
import HomeLink from '@/components/layout/home-link'
import BookDescription from '@/components/book/book-description'
import BookMainSection from '@/components/book/book-main-section'
import SimilarBooksCarousel from '@/components/catalog/similar-books-carousel'

export default function BookPage({params}: {params: Promise<{isbn13: string}>}) {
  const resolvedParams = use(params)
  const {data, isLoading, error} = getBook(resolvedParams.isbn13)

  const dispatch = useAppDispatch()
  const isFavorite = useAppSelector(state =>
    state.favorite.items.some(book => book.isbn13 === resolvedParams.isbn13)
  )

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage error={error.message || 'Unknown error'} />
  }

  if (!data) {
    return <NoDataMessage />
  }

  function handleToggleFavorite(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleFavorite(data as BookType))
  }

  return (
    <>
      <HomeLink />
      <BookMainSection
        data={data}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />
      <BookDescription description={data.desc} />
      <SimilarBooksCarousel title={data.title} />
      <SubscribeSection />
    </>
  )
}
