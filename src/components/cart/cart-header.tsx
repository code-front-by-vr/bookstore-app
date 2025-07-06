import BackLink from '@/components/layout/home-link'
import RemoveAllDialog from '@/components/ui/remove-all-dialog'
import type {CartHeaderProps} from '@/types/book'
import {useState} from 'react'
import {useTranslations} from 'next-intl'

export default function CartHeader({cartItems, handleClearAll}: CartHeaderProps): React.ReactNode {
  const t = useTranslations('cartHeader')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <BackLink />
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-3xl font-bold">{t('title')}</h4>

        {cartItems.length > 0 && (
          <RemoveAllDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onConfirm={handleClearAll}
          >
            {t('removeMessage')}
          </RemoveAllDialog>
        )}
      </div>
      {cartItems.length > 0 && (
        <p className="text-gray-600 font-inter text-sm mb-6">
          {t('description', {count: cartItems.length})}
        </p>
      )}
    </>
  )
}
