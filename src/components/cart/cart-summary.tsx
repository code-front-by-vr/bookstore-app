import {Button} from '@/components/ui/button'
import type {CartSummaryProps} from '@/types/book'

export default function CartSummary({totalPrice, handleCheckout}: CartSummaryProps) {
  return (
    <div className="fixed bottom-6 right-6 bg-white shadow-2xl shadow-black/10 p-8 w-80 z-50">
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 uppercase tracking-wide">Subtotal</span>
            <span className="text-sm text-gray-900">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 uppercase tracking-wide">Shipping</span>
            <span className="text-sm text-gray-900">Free</span>
          </div>
          <div className="h-px bg-gray-200 my-3"></div>
          <div className="flex justify-between items-center">
            <span className="text-base font-medium text-gray-900 uppercase tracking-wide">
              Total
            </span>
            <span className="text-xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        <Button
          onClick={handleCheckout}
          className="w-full bg-black hover:bg-gray-800 text-white py-4 text-sm font-medium uppercase tracking-wider transition-colors duration-200"
        >
          Checkout
        </Button>
      </div>
    </div>
  )
}
