import {ArrowLeft} from 'lucide-react'
import Link from 'next/link'
import {useTranslations} from 'next-intl'

export default function HomeLink() {
  const t = useTranslations()

  return (
    <div className="mb-4">
      <Link
        href="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors font-inter text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t('backToCatalog')}
      </Link>
    </div>
  )
}
