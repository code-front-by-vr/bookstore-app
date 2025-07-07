import type {CartItemType} from '@/types/book'
import CartItem from './cart-item'

export default function CartList({cartItems}: {cartItems: CartItemType[]}): React.ReactNode {
  return (
    <div className="space-y-3 sm:space-y-4 w-full max-w-4xl xl:max-w-none mx-auto xl:mx-0 px-0 sm:px-4 xl:px-0">
      {cartItems.map((item: CartItemType) => (
        <CartItem key={item.book.isbn13} book={item.book} quantity={item.quantity} />
      ))}
    </div>
  )
}
