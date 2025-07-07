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

      {/* Desktop layout */}
      <div className="hidden sm:flex justify-between items-center mb-2">
        <h4 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h4>
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

      {/* Mobile layout */}
      <div className="sm:hidden mb-4">
        <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">{title}</h4>
        {count > 0 && (
          <>
            <p className="text-gray-600 dark:text-gray-300 font-inter text-sm leading-relaxed mb-3">
              {description}
            </p>
            {showClearButton && (
              <div className="flex justify-start">
                <RemoveAllDialog
                  isOpen={isDialogOpen}
                  onOpenChange={setIsDialogOpen}
                  onConfirm={onClearAll}
                >
                  {removeMessage}
                </RemoveAllDialog>
              </div>
            )}
          </>
        )}
      </div>

      {/* Desktop description */}
      {count > 0 && (
        <p className="hidden sm:block text-gray-600 dark:text-gray-300 font-inter text-base mb-6 leading-relaxed">
          {description}
        </p>
      )}
    </>
  )
}
