import {useState} from 'react'
import RemoveAllDialog from './remove-all-dialog'
import {FavoritesHeaderProps} from '@/types/book'

export default function FavoritesHeader({count, onClearAll}: FavoritesHeaderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold">My Favorite Books</h1>
        <RemoveAllDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onConfirm={onClearAll}
        >
          This will permanently remove all books from your favorites. This action cannot be undone.
        </RemoveAllDialog>
      </div>
      <p className="text-gray-600 font-inter text-sm">
        {count} {count === 1 ? 'book' : 'books'} in your favorites
      </p>
    </div>
  )
}
