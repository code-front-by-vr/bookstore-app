import SectionHeader from '@/components/layout/section-header'
import type {CartHeaderProps} from '@/types/book'
import {useTranslations} from 'next-intl'

export default function CartHeader({cartItems, handleClearAll}: CartHeaderProps): React.ReactNode {
  const t = useTranslations('cartHeader')

  return (
    <SectionHeader
      title={t('title')}
      description={t('description', {count: cartItems.length})}
      count={cartItems.length}
      removeMessage={t('removeMessage')}
      onClearAll={handleClearAll}
    />
  )
}
