import type {BookType} from '@/types/book'
import {Button} from '../ui/button'
import {Minus, Plus, Trash} from 'lucide-react'
import BookImage from '../book/book-image'
import {useDispatch} from 'react-redux'
import {incrementQuantity, decrementQuantity, removeFromCart} from '@/lib/redux/features/cart-slice'
import {toggleFavorite} from '@/lib/redux/features/favorites-slice'
import {useAppSelector} from '@/lib/redux/hooks'
import {Link} from '@/i18n/navigation'
import {useTranslations} from 'next-intl'

export default function CartItem({book, quantity}: {book: BookType; quantity: number}) {
  const dispatch = useDispatch()
  const t = useTranslations('cartSummary')

  const isFavorite = useAppSelector(state =>
    state.favorite.items.some(favBook => favBook.isbn13 === book.isbn13)
  )

  function handleClickIncrement(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    dispatch(incrementQuantity(book.isbn13))
  }

  function handleClickDecrement(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (quantity > 1) {
      dispatch(decrementQuantity(book.isbn13))
    }
  }

  function handleClickRemove(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    dispatch(removeFromCart(book.isbn13))
  }

  const unitPrice = Number(book.price.replace('$', ''))
  const totalPrice = unitPrice * quantity

  function handleClickToggleFavorite(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleFavorite(book))
  }

  return (
    <Link href={`/books/${book.isbn13}`} className="block">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white dark:bg-gray-800 transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700 rounded-lg">
        {/* Mobile layout - vertical */}
        <div className="sm:hidden w-full">
          <div className="flex gap-3">
            <div className="w-16 h-20 flex-shrink-0 relative">
              <BookImage
                src={book.image}
                alt={book.title}
                isFavorite={isFavorite}
                onToggleFavorite={handleClickToggleFavorite}
                className=""
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight mb-1">
                {book.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate font-inter mb-2">
                {book.authors}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide font-inter">
                {book.price} {t('perItem')}
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleClickRemove}
              className="w-8 h-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:text-gray-500 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors flex-shrink-0"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClickDecrement}
                className={`w-8 h-8 p-0 ${quantity <= 1 ? 'opacity-30' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="px-3 py-1.5 min-w-[3rem] text-center text-sm font-medium bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100 rounded-md">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClickIncrement}
                className="w-8 h-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Desktop layout - horizontal */}
        <div className="hidden sm:flex items-center gap-4 w-full">
          <div className="w-20 h-28 flex-shrink-0 relative">
            <BookImage
              src={book.image}
              alt={book.title}
              isFavorite={isFavorite}
              onToggleFavorite={handleClickToggleFavorite}
              className=""
            />
          </div>

          <div className="flex-1 min-w-0 mr-2">
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight mb-2">
              {book.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate font-inter mb-6">
              {book.authors}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide font-inter">
              {book.price} {t('perItem')}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClickDecrement}
                className={`w-7 h-7 p-0 ${quantity <= 1 ? 'opacity-30' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="px-3 py-1 min-w-[2.5rem] text-center text-sm font-medium bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100 rounded-md">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClickIncrement}
                className="w-7 h-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2">
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate max-w-24">
                ${totalPrice.toFixed(2)}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClickRemove}
                className="w-7 h-7 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:text-gray-500 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors"
              >
                <Trash className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
