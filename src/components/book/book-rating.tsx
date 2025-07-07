'use client'

import {Star} from 'lucide-react'

export default function BookRating({rating}: {rating: number}) {
  const stars = [...Array(5)].map((_, i) => (
    <Star
      key={i}
      size={18}
      className={
        i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'
      }
    />
  ))

  return <div className="flex items-center gap-1">{stars}</div>
}
