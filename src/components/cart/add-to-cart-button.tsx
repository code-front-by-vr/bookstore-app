'use client'

import {Button} from '@/components/ui/button'
import {ShoppingCart, Check} from 'lucide-react'
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks'
import {addToCart} from '@/lib/redux/features/cart-slice'
import type {AddToCartButtonProps} from '@/types/book'
import {useTranslations} from 'next-intl'

export const AddToCartButton = ({book, className, size = 'default'}: AddToCartButtonProps) => {
  const t = useTranslations('addToCartButton')
  const dispatch = useAppDispatch()

  const cartItems = useAppSelector(state => state.cart.items)
  const isInCart = cartItems.some(item => item.book.isbn13 === book.isbn13)

  const handleClickAddToCart = () => {
    dispatch(addToCart({book: book, quantity: 1}))
  }

  return (
    <Button
      onClick={handleClickAddToCart}
      variant="outline"
      size={size}
      className={`group px-4 py-2 font-medium border-2 transition-all duration-200 ${
        isInCart
          ? 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100 dark:border-green-400 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30'
          : 'border-gray-400 text-gray-700 hover:bg-gray-50 hover:border-gray-500 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800/50 dark:hover:border-gray-500'
      } ${className || ''}`}
    >
      {isInCart ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          {t('inCart')}
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          {t('addToCart')}
        </>
      )}
    </Button>
  )
}
