'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {getBooksByCategory} from '@/config/api/book'
import {BookType, BooksCarouselProps} from '@/types/book'
import CardBook from '@/components/book/card-book'
import Link from 'next/link'
import Loading from '@/components/ui/loading'
import ErrorMessage from '@/components/ui/error-message'
import {useTranslations} from 'next-intl'

export default function BooksCarousel({category, title}: BooksCarouselProps): React.ReactNode {
  const {data, isLoading, error} = getBooksByCategory(category)
  const t = useTranslations('allBooks')
  if (isLoading) return <Loading />
  if (error) return <ErrorMessage error={error.message || 'Unknown error'} />

  const renderRoute = () => {
    if (title == 'allBooks') {
      return '/books/all/1'
    }
    return `/category/${category.toLowerCase()}/1`
  }

  const renderTitle = () => {
    if (title === 'allBooks') {
      return t('title')
    }
    return category
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        <Link
          href={renderRoute()}
          className="border-b-2 border-transparent hover:border-primary transition-all duration-200"
        >
          {renderTitle()}
        </Link>
      </h2>
      <Carousel
        opts={{
          align: 'start',
          dragFree: true,
        }}
        className="w-full px-4"
      >
        <CarouselContent>
          {data?.books.map((book: BookType) => (
            <CarouselItem
              key={book.isbn13}
              className="basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <CardBook {...book} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="xl:-left-12 left-2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800" />
        <CarouselNext className="xl:-right-12 right-2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800" />
      </Carousel>
    </>
  )
}
