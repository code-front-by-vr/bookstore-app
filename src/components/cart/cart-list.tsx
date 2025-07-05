import type {CartItemType} from '@/types/book'
import CartItem from './cart-item'

export default function CartList({cartItems}: {cartItems: CartItemType[]}): React.ReactNode {
  return (
    <div className="space-y-4 max-w-4xl mx-start">
      {cartItems.map((item: CartItemType) => (
        <CartItem key={item.book.isbn13} book={item.book} quantity={item.quantity} />
      ))}
    </div>
  )
}
