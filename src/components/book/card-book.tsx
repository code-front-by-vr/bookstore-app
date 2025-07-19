'use client'

import {getBook} from '@/services/api/book'
import {BookType} from '@/types/book'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '../ui/card'
import {Check, ShoppingCart} from 'lucide-react'
import {Button} from '../ui/button'
import BookRating from './book-rating'
import BookImage from './book-image'
import Link from 'next/link'
import {toggleFavorite} from '@/lib/redux/features/favorites-slice'
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks'
import {addToCart} from '@/lib/redux/features/cart-slice'
import {useTranslations} from 'next-intl'

interface CardBookProps extends BookType {
  hideBuyButton?: boolean
}

export default function CardBook({
  title,
  isbn13,
  price,
  image,
  hideBuyButton = false,
}: CardBookProps): React.ReactNode {
  const dispatch = useAppDispatch()
  const {data} = getBook(isbn13)
  const rating = data?.rating || 0
  const cartItems = useAppSelector(state => state.cart.items)
  const isInCart = cartItems.some(item => item.book.isbn13 === isbn13)
  const t = useTranslations('addToCartButton')

  const isFavorite = useAppSelector(state =>
    state.favorite.items.some(book => book.isbn13 === isbn13)
  )

  function handleClickAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    if (data) {
      dispatch(addToCart({book: data, quantity: 1}))
    }
  }

  function handleToggleFavorite(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (data) {
      dispatch(toggleFavorite(data))
    }
  }
  return (
    <Card key={isbn13} className="border-none shadow-none flex flex-col h-full p-0 gap-2 group">
      <Link href={`/books/${isbn13}`} className="flex flex-col h-full">
        <CardHeader className="relative aspect-[4/5] sm:aspect-[3/4] max-h-[300px] sm:max-h-[200px] overflow-hidden rounded-md p-0 mb-4 ">
          <BookImage
            src={image}
            alt={title}
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
            className="bg-gray-100 dark:bg-gray-800 scale-110 group-hover:scale-115 transition-transform duration-200"
            heartSize={25}
          />
        </CardHeader>

        <CardContent className="flex-grow mb-2">
          <CardTitle className="mb-2 line-clamp-1 sm:line-clamp-2 sm:h-[2rem] h-[2rem]">
            {title}
          </CardTitle>
          <CardDescription className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 font-inter mb-2">
            By {data?.authors}, {data?.year}
          </CardDescription>
          <BookRating rating={rating} />
        </CardContent>

        <CardFooter className="mt-auto flex flex-col items-stretch gap-1 mb-2">
          <p className="text-sm font-semibold text-primary ">{price}</p>
        </CardFooter>
      </Link>

      {!hideBuyButton && (
        <div className="px-6 pb-6">
          <Button
            variant="outline"
            className={`group w-full h-10 px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all duration-200
              ${
                isInCart
                  ? 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100 dark:border-green-400 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30'
                  : 'border-gray-400 text-gray-700 hover:bg-gray-50 hover:border-gray-500 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800/50 dark:hover:border-gray-500'
              }
            `}
            onClick={handleClickAddToCart}
          >
            {isInCart ? (
              <>
                <Check size={16} className="mr-2" />
                {t('inCart')}
              </>
            ) : (
              <>
                <ShoppingCart size={16} className="mr-2" />
                {t('buy')}
              </>
            )}
          </Button>
        </div>
      )}
    </Card>
  )
}
