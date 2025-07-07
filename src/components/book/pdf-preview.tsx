'use client'

import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {Button} from '@/components/ui/button'
import {ChevronDown, Download, ExternalLink} from 'lucide-react'
import type {PdfPreviewProps} from '@/types/book'
import {useTranslations} from 'next-intl'

export default function PdfPreview({pdf}: PdfPreviewProps): React.ReactNode {
  if (!pdf || Object.keys(pdf).length === 0) return null
  const t = useTranslations('bookInfo')
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Download size={18} className="mr-2" />
          {t('pdfChapters')}
          <ChevronDown size={16} className="ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <div className="p-2">
          <h4 className="px-2 py-1.5 text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
            {t('pdfChaptersAvailable')}
          </h4>
          <div className="space-y-1">
            {Object.entries(pdf).map(([chapter, url]: [string, string]) => (
              <a
                key={chapter}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              >
                <Download size={14} className="text-gray-400 dark:text-gray-500 flex-shrink-0" />
                <span className="line-clamp-2 flex-1 font-inter font-medium">{chapter}</span>
                <ExternalLink
                  size={12}
                  className="text-gray-400 dark:text-gray-500 flex-shrink-0"
                />
              </a>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
