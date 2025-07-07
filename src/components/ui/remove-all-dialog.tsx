import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {RemoveAllDialogProps} from '@/types/book'
import {useTranslations} from 'next-intl'

export default function RemoveAllDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  children,
}: RemoveAllDialogProps) {
  const t = useTranslations('removeAll')

  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/30 transition-colors font-inter whitespace-nowrap">
          {t('title')}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90vw] max-w-md mx-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl sm:text-2xl text-gray-900 dark:text-gray-100">
            {t('areYouSure')}
          </AlertDialogTitle>
          <AlertDialogDescription className="font-inter text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {children}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          <AlertDialogCancel className="font-inter text-sm w-full sm:w-auto order-2 sm:order-1">
            {t('cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 font-inter text-sm w-full sm:w-auto order-1 sm:order-2"
          >
            {t('removeAll')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
