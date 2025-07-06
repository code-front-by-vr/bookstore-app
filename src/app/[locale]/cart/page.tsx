'use client'

import {clearCart} from '@/lib/redux/features/cart-slice'
import CartSummary from '@/components/cart/cart-summary'
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks'
import CartHeader from '@/components/cart/cart-header'
import CartEmpty from '@/components/cart/cart-empty'
import CartList from '@/components/cart/cart-list'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(state => state.cart.items)
  const totalPrice = useAppSelector(state => state.cart.totalPrice)

  function handleClearAll() {
    dispatch(clearCart())
  }

  function handleCheckout() {
    alert('Checkout functionality will be implemented soon!')
  }

  return (
    <>
      <CartHeader cartItems={cartItems} handleClearAll={handleClearAll} />

      {cartItems.length === 0 ? <CartEmpty /> : <CartList cartItems={cartItems} />}

      {cartItems.length > 0 && (
        <CartSummary totalPrice={totalPrice} handleCheckout={handleCheckout} />
      )}
    </>
  )
}
