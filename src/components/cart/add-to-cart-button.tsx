'use client'

import {Button} from '@/components/ui/button'
import {ShoppingCart} from 'lucide-react'
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks'
import {addToCart} from '@/lib/redux/features/cart-slice'
import type {AddToCartButtonProps} from '@/types/book'

export const AddToCartButton = ({book, className, size = 'default'}: AddToCartButtonProps) => {
  const dispatch = useAppDispatch()

  const cartItems = useAppSelector(state => state.cart.items)
  const isInCart = cartItems.some(item => item.book.isbn13 === book.isbn13)

  const handleClickAddToCart = () => {
    dispatch(addToCart({book: book, quantity: 1}))
  }

  return (
    <Button
      onClick={handleClickAddToCart}
      className={className}
      size={size}
      variant={isInCart ? 'secondary' : 'default'}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      {isInCart ? `В корзине` : 'В корзину'}
    </Button>
  )
}
