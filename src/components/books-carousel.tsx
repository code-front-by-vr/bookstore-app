'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {getBooksByCategory} from '@/api/book'
import {BookType} from '@/types/book'
import CardBook from './card-book'

interface BooksListProps {
  category: string
  title?: string
}

export default function BooksCarousel({category, title}: BooksListProps): React.ReactNode {
  const {data, isLoading, error} = getBooksByCategory(category)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <h2 className="text-3xl font-bold mb-4">{title || category}</h2>
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
              className="basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
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
