'use client'

import {useState, use} from 'react'
import {getBook} from '@/config/api/book'
import {ArrowLeft} from 'lucide-react'
import Link from 'next/link'
import BookImage from '@/components/book-image'
import SubscribeSection from '@/components/subscribe-section'
import BookInfo from '@/components/book-info'
import Loading from '@/components/loading'
import ErrorMessage from '@/components/error-message'
import NoDataMessage from '@/components/no-data-message'

export default function BookPage({params}: {params: Promise<{isbn13: string}>}) {
  const resolvedParams = use(params)
  const {data, isLoading, error} = getBook(resolvedParams.isbn13)
  const [isFavorite, setIsFavorite] = useState(false)

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage error={error.message || 'Unknown error'} />
  }

  if (!data) {
    return <NoDataMessage />
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors font-inter text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to catalog
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 mb-12">
        <div className="lg:w-80 flex-shrink-0">
          <div className="relative aspect-[3/4] w-full max-w-80 mx-auto overflow-hidden rounded-lg bg-gray-50">
            <BookImage
              src={data.image}
              alt={data.title}
              isFavorite={isFavorite}
              onToggleFavorite={() => setIsFavorite(!isFavorite)}
              heartSize={18}
            />
          </div>
        </div>

        <BookInfo data={data} />
      </div>

      {data.desc && (
        <div className="mb-12 border-t pt-8">
          <h4 className="text-2xl font-semibold text-gray-900 mb-4">Description</h4>
          <div className="font-inter text-base leading-relaxed whitespace-pre-line text-gray-700">
            {data.desc}
          </div>
        </div>
      )}

      <SubscribeSection />
    </div>
  )
}
