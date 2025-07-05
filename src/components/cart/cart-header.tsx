import BackLink from '@/components/layout/home-link'
import RemoveAllDialog from '@/components/ui/remove-all-dialog'
import type {CartHeaderProps} from '@/types/book'
import {useState} from 'react'

export default function CartHeader({cartItems, handleClearAll}: CartHeaderProps): React.ReactNode {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  return (
    <>
      <BackLink />
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-3xl font-bold">Cart</h4>

        {cartItems.length > 0 && (
          <RemoveAllDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onConfirm={handleClearAll}
          >
            This will permanently remove all books from your cart. This action cannot be undone.
          </RemoveAllDialog>
        )}
      </div>
      {cartItems.length > 0 && (
        <p className="text-gray-600 font-inter text-sm mb-6">
          {cartItems.length} {cartItems.length === 1 ? 'book' : 'books'} in your cart
        </p>
      )}
    </>
  )
}
