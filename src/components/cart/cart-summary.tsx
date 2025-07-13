import {Button} from '@/components/ui/button'
import type {CartSummaryProps} from '@/types/book'
import {useTranslations} from 'next-intl'

export default function CartSummary({totalPrice, handleCheckout}: CartSummaryProps) {
  const t = useTranslations('cartSummary')
  return (
    <>
      {/* Mobile version - full width at the bottom of the screen */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-2xl shadow-black/10 dark:shadow-gray-900/30 p-4 z-50 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-base font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wide">
              {t('total')}
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <Button
            onClick={handleCheckout}
            className="w-full bg-black hover:bg-gray-800 dark:bg-gray-900 dark:hover:bg-gray-700 text-white py-4 text-sm font-medium uppercase tracking-wider transition-colors duration-200"
          >
            {t('checkout')}
          </Button>
        </div>
      </div>

      {/* Desktop version - sidebar for medium screens */}
      <div className="hidden md:block xl:hidden fixed bottom-6 right-6 bg-white dark:bg-gray-800 shadow-2xl shadow-black/10 dark:shadow-gray-900/30 p-8 w-80 z-50 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {t('subtotal')}
              </span>
              <span className="text-sm text-gray-900 dark:text-gray-100">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {t('shipping')}
              </span>
              <span className="text-sm text-gray-900 dark:text-gray-100">{t('shippingFree')}</span>
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-700 my-3"></div>
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                {t('total')}
              </span>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
          <Button
            onClick={handleCheckout}
            className="w-full bg-black hover:bg-gray-800 dark:bg-gray-900 dark:hover:bg-gray-700 text-white py-4 text-sm font-medium uppercase tracking-wider transition-colors duration-200"
          >
            {t('checkout')}
          </Button>
        </div>
      </div>

      {/* Large screens version - inline sidebar */}
      <div className="hidden xl:block bg-white dark:bg-gray-800 shadow-xl shadow-black/5 dark:shadow-gray-900/20 p-8 w-full border border-gray-200 dark:border-gray-700 rounded-lg sticky top-6">
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {t('subtotal')}
              </span>
              <span className="text-sm text-gray-900 dark:text-gray-100">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {t('shipping')}
              </span>
              <span className="text-sm text-gray-900 dark:text-gray-100">{t('shippingFree')}</span>
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-700 my-3"></div>
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                {t('total')}
              </span>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
          <Button
            onClick={handleCheckout}
            className="w-full bg-black hover:bg-gray-800 dark:bg-gray-900 dark:hover:bg-gray-700 text-white py-4 text-sm font-medium uppercase tracking-wider transition-colors duration-200"
          >
            {t('checkout')}
          </Button>
        </div>
      </div>

      {/* Spacer for mobile version - to prevent content from being covered */}
      <div className="md:hidden h-32"></div>
    </>
  )
}
