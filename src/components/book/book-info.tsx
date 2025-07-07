'use client'

import PdfPreview from './pdf-preview'
import {Calendar, Building, BookOpen, User} from 'lucide-react'
import BookDetailField from './book-detail-field'
import BookRating from './book-rating'
import {AddToCartButton} from '../cart/add-to-cart-button'
import {BookType} from '@/types/book'
import {useTranslations} from 'next-intl'

export default function BookInfo({data}: {data: BookType}) {
  const t = useTranslations('bookInfo')
  const hasPdfChapters = data.pdf && Object.keys(data.pdf).length > 0

  return (
    <div className="flex-1 space-y-8">
      <div>
        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight">
          {data.title}
        </h3>
        {data.subtitle && (
          <p className="font-inter font-medium text-lg text-gray-600 dark:text-gray-300 mb-4">
            {data.subtitle}
          </p>
        )}
        {data.rating !== undefined && <BookRating rating={data.rating} />}
      </div>

      <div>
        <div className="space-y-3">
          {data.authors && (
            <BookDetailField label={t('author')} value={data.authors} icon={<User size={16} />} />
          )}
          {data.publisher && (
            <BookDetailField
              label={t('publisher')}
              value={data.publisher}
              icon={<Building size={16} />}
            />
          )}
          {data.year && (
            <BookDetailField label={t('year')} value={data.year} icon={<Calendar size={16} />} />
          )}
          {data.pages && (
            <BookDetailField label={t('pages')} value={data.pages} icon={<BookOpen size={16} />} />
          )}
          {data.isbn13 && <BookDetailField label="ISBN-13" value={data.isbn13} isMono />}
        </div>
      </div>

      <div className="border-t dark:border-gray-700 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{data.price}</div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <AddToCartButton book={data} className="min-w-[200px]" size="lg" />

          {hasPdfChapters && <PdfPreview pdf={data.pdf!} />}
        </div>
      </div>
    </div>
  )
}
