import {useState} from 'react'
import RemoveAllDialog from '@/components/ui/remove-all-dialog'
import HomeLink from '@/components/layout/home-link'
import type {SectionHeaderProps} from '@/types/book'

export default function SectionHeader({
  title,
  description,
  count,
  removeMessage,
  onClearAll,
  showClearButton = true,
}: SectionHeaderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <HomeLink />
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-3xl font-bold">{title}</h4>

        {count > 0 && showClearButton && (
          <RemoveAllDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onConfirm={onClearAll}
          >
            {removeMessage}
          </RemoveAllDialog>
        )}
      </div>
      {count > 0 && <p className="text-gray-600 font-inter text-sm mb-6">{description}</p>}
    </>
  )
}
