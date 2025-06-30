'use client'

import {getBook} from '@/config/api/book'
import {BookType} from '@/types/book'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from './ui/card'
import Image from 'next/image'
import {Check, Heart, ShoppingCart, Star} from 'lucide-react'
import {Button} from './ui/button'
import {useState} from 'react'

export default function CardBook({
  title,
  isbn13,
  price,
  image,
  subtitle,
}: BookType): React.ReactNode {
  const [isInCart, setIsInCart] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const {data} = getBook(isbn13)
  const rating = data?.rating || 0

  function renderRating() {
    return (
      <div className="flex items-center gap-1 mt-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
          />
        ))}
      </div>
    )
  }

  return (
    <Card key={isbn13} className="border-none shadow-none flex flex-col h-full p-0 gap-2">
      <CardHeader className="relative aspect-[3/4] max-h-[200px] overflow-hidden rounded-md p-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-contain bg-gray-100 scale-110"
          sizes="(max-width: 768px) 50vw, 220px"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-1.5 right-1.5 z-10 p-1 rounded-full bg-white/70 hover:bg-white transition"
        >
          <Heart
            size={16}
            className={`transition-colors duration-200 ${
              isFavorite ? 'text-pink-500 fill-pink-500' : 'text-gray-300'
            }`}
          />
        </button>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className=" mb-2 line-clamp-1 sm:line-clamp-2 sm:h-[2rem] h-[1.6rem]">
          {title}
        </CardTitle>
        <CardDescription className="text-xs text-gray-500 line-clamp-1 font-inter">
          By {data?.authors}, {data?.year}
        </CardDescription>
        {renderRating()}
      </CardContent>
      <CardFooter className="mt-auto flex flex-col items-stretch gap-1">
        <p className="text-sm font-semibold text-primary">{price}</p>
        <Button
          variant="ghost"
          size="sm"
          className={`group w-full h-8 px-3 py-1.5 text-xs font-medium border rounded-md transition-all duration-200
      ${
        isInCart
          ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200'
          : 'border-gray-200 text-muted-foreground hover:bg-primary/10 hover:text-primary'
      }
    `}
          onClick={() => setIsInCart(!isInCart)}
        >
          {isInCart ? (
            <Check size={14} className="mr-1" />
          ) : (
            <ShoppingCart size={14} className="mr-1" />
          )}
          {isInCart ? 'Добавлено' : 'В корзину'}
        </Button>
      </CardFooter>
    </Card>
  )
}
