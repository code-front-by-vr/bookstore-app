import {useState} from 'react'
import RemoveAllDialog from '@/components/ui/remove-all-dialog'
import {FavoritesHeaderProps} from '@/types/book'
import HomeLink from '@/components/layout/home-link'

export default function FavoritesHeader({count, onClearAll}: FavoritesHeaderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <HomeLink />
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-3xl font-bold">My Favorite Books</h4>
        {count > 0 && (
          <RemoveAllDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onConfirm={onClearAll}
          >
            This will permanently remove all books from your favorites. This action cannot be
            undone.
          </RemoveAllDialog>
        )}
      </div>
      {count > 0 && (
        <p className="text-gray-600 font-inter text-sm mb-6">
          {count} {count === 1 ? 'book' : 'books'} in your favorites
        </p>
      )}
    </>
  )
}
