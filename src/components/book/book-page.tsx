'use client'

import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks'
import {BookType} from '@/types/book'
import {toggleFavorite} from '@/lib/redux/features/favorites-slice'
import HomeLink from '@/components/layout/home-link'
import BookImage from './book-image'
import BookInfo from './book-info'
import BookDescription from './book-description'
import SubscribeSection from '@/components/sections/subscribe-section'

export default function BookPage({book}: {book: BookType}) {
  const dispatch = useAppDispatch()

  const isFavorite = useAppSelector(state =>
    state.favorite.items.some(item => item.isbn13 === book.isbn13)
  )

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(toggleFavorite(book))
  }

  return (
    <div className="py-8">
      <HomeLink />

      <div className="flex flex-col lg:flex-row gap-12 mb-12">
        <div className="lg:w-80 flex-shrink-0">
          <div className="relative aspect-[3/4] w-full max-w-80 mx-auto overflow-hidden rounded-lg bg-gray-50 hover:shadow-lg transition-shadow duration-200 group">
            <BookImage
              src={book.image}
              alt={book.title}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
              heartSize={25}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200 pointer-events-none" />
          </div>
        </div>

        <BookInfo data={book} />
      </div>

      {book.desc && <BookDescription description={book.desc} />}
      <SubscribeSection />
    </div>
  )
}
