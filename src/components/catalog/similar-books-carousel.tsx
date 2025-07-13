'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {getSimilarBooks} from '@/services/api/book'
import {BookType} from '@/types/book'
import CardBook from '@/components/book/card-book'
import Loading from '@/components/ui/loading'
import ErrorMessage from '@/components/ui/error-message'
import {useTranslations} from 'next-intl'

interface SimilarBooksCarouselProps {
  title: string
}

export default function SimilarBooksCarousel({title}: SimilarBooksCarouselProps) {
  const {data, isLoading, error} = getSimilarBooks(title)
  const t = useTranslations()

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage error={error.message || 'Unknown error'} />
  }

  if (!data || !data.books || data.books.length === 0) {
    return null
  }

  return (
    <div className="mb-12 border-t dark:border-gray-700 pt-8">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {t('similarBooks')}
      </h2>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full px-4"
      >
        <CarouselContent>
          {data.books.slice(0, 10).map((book: BookType) => (
            <CarouselItem
              key={book.isbn13}
              className="basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <CardBook {...book} hideBuyButton={true} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="xl:-left-12 left-2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800" />
        <CarouselNext className="xl:-right-12 right-2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800" />
      </Carousel>
    </div>
  )
}
