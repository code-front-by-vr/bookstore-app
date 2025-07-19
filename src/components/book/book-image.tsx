'use client'

import Image from 'next/image'
import {Heart} from 'lucide-react'
import type {BookImageProps} from '@/types/book'

export default function BookImage({
  src,
  alt,
  isFavorite,
  onToggleFavorite,
  className = '',
  heartSize = 16,
}: BookImageProps): React.ReactNode {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className={`object-contain ${className}`}
        sizes="(max-width: 768px) 90vw, 220px"
      />
      <button
        onClick={onToggleFavorite}
        className="absolute top-1.5 right-1.5 z-10 p-1 rounded-full bg-white/70 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 transition-all duration-200 backdrop-blur-sm"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          size={heartSize}
          className={`transition-colors duration-200 ${
            isFavorite ? 'text-pink-500 fill-pink-500' : 'text-gray-300 dark:text-gray-400'
          }`}
        />
      </button>
    </>
  )
}
