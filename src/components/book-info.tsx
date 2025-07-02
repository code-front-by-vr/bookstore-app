'use client'

import {Button} from './ui/button'
import PdfPreview from './pdf-preview'
import {Calendar, Building, BookOpen, User, ShoppingCart} from 'lucide-react'
import BookDetailField from './book-detail-field'
import BookRating from './book-rating'
import {BookType} from '@/types/book'
import {useState} from 'react'

export default function BookInfo({data}: {data: BookType}) {
  const [isInCart, setIsInCart] = useState(false)
  const hasPdfChapters = data.pdf && Object.keys(data.pdf).length > 0

  return (
    <div className="flex-1 space-y-8">
      <div>
        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
          {data.title}
        </h3>
        {data.subtitle && (
          <p className="font-inter font-medium text-lg text-gray-600 mb-4">{data.subtitle}</p>
        )}
        {data.rating !== undefined && <BookRating rating={data.rating} />}
      </div>

      <div>
        <div className="space-y-3">
          {data.authors && (
            <BookDetailField label="Author" value={data.authors} icon={<User size={16} />} />
          )}
          {data.publisher && (
            <BookDetailField
              label="Publisher"
              value={data.publisher}
              icon={<Building size={16} />}
            />
          )}
          {data.year && (
            <BookDetailField label="Year" value={data.year} icon={<Calendar size={16} />} />
          )}
          {data.pages && (
            <BookDetailField label="Pages" value={data.pages} icon={<BookOpen size={16} />} />
          )}
          {data.isbn13 && <BookDetailField label="ISBN-13" value={data.isbn13} isMono />}
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-3xl font-bold text-gray-900">{data.price}</div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            className={`min-w-[200px] ${
              isInCart ? 'bg-green-600 hover:bg-green-700' : 'bg-black hover:bg-gray-800'
            }`}
            onClick={() => setIsInCart(!isInCart)}
          >
            <ShoppingCart size={18} className="mr-2" />
            {isInCart ? 'In cart' : 'Add to cart'}
          </Button>

          {hasPdfChapters && <PdfPreview pdf={data.pdf!} />}
        </div>
      </div>
    </div>
  )
}
