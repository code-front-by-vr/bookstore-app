import {useState} from 'react'
import RemoveAllDialog from '@/components/ui/remove-all-dialog'
import {FavoritesHeaderProps} from '@/types/book'
import HomeLink from '@/components/layout/home-link'
import {useTranslations} from 'next-intl'

export default function FavoritesHeader({count, onClearAll}: FavoritesHeaderProps) {
  const t = useTranslations('favoritesHeader')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <HomeLink />
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-3xl font-bold">{t('title')}</h4>
        {count > 0 && (
          <RemoveAllDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onConfirm={onClearAll}
          >
            {t('removeMessage')}
          </RemoveAllDialog>
        )}
      </div>
      {count > 0 && (
        <p className="text-gray-600 font-inter text-sm mb-6">{t('description', {count: count})}</p>
      )}
    </>
  )
}
