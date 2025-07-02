'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {getNewBooks} from '@/config/api/book'
import {BookType} from '@/types/book'
import CardBook from './card-book'
import Link from 'next/link'
import Loading from './loading'
import ErrorMessage from './error-message'
import NoDataMessage from './no-data-message'

export default function NewReleasesCarousel(): React.ReactNode {
  const {data, isLoading, error} = getNewBooks()

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage error={error.message || 'Unknown error'} />
  }

  if (!data || !data.books || data.books.length === 0) {
    return <NoDataMessage />
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-4">
        <Link
          href="/books/new"
          className="border-b-2 border-transparent hover:border-primary transition-all duration-200"
        >
          New Releases
        </Link>
      </h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full px-4"
      >
        <CarouselContent>
          {data?.books.map((book: BookType) => (
            <CarouselItem
              key={book.isbn13}
              className="basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 "
            >
              <CardBook {...book} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  )
}
