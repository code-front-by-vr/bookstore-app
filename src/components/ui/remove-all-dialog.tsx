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
        <button className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors font-inter">
          {t('title')}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">{t('areYouSure')}</AlertDialogTitle>
          <AlertDialogDescription className="font-inter text-lg">{children}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-inter text-sm">{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-400 hover:bg-red-500 font-inter text-sm"
          >
            {t('removeAll')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
