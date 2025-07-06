import SectionHeader from '@/components/layout/section-header'
import {FavoritesHeaderProps} from '@/types/book'
import {useTranslations} from 'next-intl'

export default function FavoritesHeader({count, onClearAll}: FavoritesHeaderProps) {
  const t = useTranslations('favoritesHeader')

  return (
    <SectionHeader
      title={t('title')}
      description={t('description', {count: count})}
      count={count}
      removeMessage={t('removeMessage')}
      onClearAll={onClearAll}
    />
  )
}
