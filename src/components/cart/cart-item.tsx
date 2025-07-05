import type {BookType} from '@/types/book'
import {Button} from '../ui/button'
import {Minus, Plus, Trash} from 'lucide-react'
import BookImage from '../book/book-image'
import {useDispatch} from 'react-redux'
import {incrementQuantity, decrementQuantity, removeFromCart} from '@/lib/redux/features/cart-slice'
import {toggleFavorite} from '@/lib/redux/features/favorites-slice'
import {useAppSelector} from '@/lib/redux/hooks'

export default function CartItem({book, quantity}: {book: BookType; quantity: number}) {
  const dispatch = useDispatch()

  const isFavorite = useAppSelector(state =>
    state.favorite.items.some(favBook => favBook.isbn13 === book.isbn13)
  )

  const handleClickIncrement = () => {
    dispatch(incrementQuantity(book.isbn13))
  }

  const handleClickDecrement = () => {
    dispatch(decrementQuantity(book.isbn13))
  }

  const handleClickRemove = () => {
    dispatch(removeFromCart(book.isbn13))
  }

  const unitPrice = Number(book.price.replace('$', ''))
  const totalPrice = unitPrice * quantity

  function handleClickToggleFavorite() {
    dispatch(toggleFavorite(book))
  }

  return (
    <div className="flex items-center gap-4 py-4 px-4 bg-white shadow-sm shadow-black/5 hover:shadow-md hover:shadow-black/10 transition-all duration-200">
      <div className="w-24 h-32 flex-shrink-0 relative">
        <BookImage
          src={book.image}
          alt={book.title}
          isFavorite={isFavorite}
          onToggleFavorite={handleClickToggleFavorite}
          className=""
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium text-gray-900 truncate leading-tight">{book.title}</h3>
        <p className="text-sm text-gray-500 truncate mt-1 font-inter">{book.authors}</p>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide font-inter">
          {book.price} per item
        </p>
      </div>

      <div className="flex flex-col items-end gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClickDecrement}
            disabled={quantity <= 1}
            className="w-7 h-7 p-0 hover:bg-gray-100 disabled:opacity-30"
          >
            <Minus className="w-3 h-3" />
          </Button>
          <span className="px-3 py-1 min-w-[2.5rem] text-center text-sm font-medium bg-gray-50 text-gray-900">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClickIncrement}
            className="w-7 h-7 p-0 hover:bg-gray-100"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2">
          <p className="text-lg font-bold text-gray-900">${totalPrice.toFixed(2)}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClickRemove}
            className="w-7 h-7 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}
