import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from '@/components/ui/pagination'
import {buildSchemePagination} from '@/utils/buildPagination'
import type {PaginationBlockProps} from '@/types/book'
import {BOOKS_LIMIT} from '@/config/constants'

export function PaginationBlock({
  query,
  currentPage,
  totalItems,
  pageSize = BOOKS_LIMIT,
  basePath = 'category',
}: PaginationBlockProps): React.ReactNode {
  const totalPages = Math.ceil(totalItems / pageSize)
  const currentPageNumber = parseInt(currentPage, 10) || 1
  const pagination = buildSchemePagination(currentPageNumber, totalPages)

  if (totalPages <= 1 || !pagination) return null

  return (
    <Pagination className="font-inter">
      <PaginationContent>
        {currentPageNumber > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`/${basePath}/${query}/${currentPageNumber - 1}`} />
          </PaginationItem>
        )}

        {pagination.map((item, index) =>
          typeof item === 'string' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={`page-${item}`}>
              <PaginationLink
                isActive={item === currentPageNumber}
                href={`/${basePath}/${query}/${item}`}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {currentPageNumber < totalPages && (
          <PaginationItem>
            <PaginationNext href={`/${basePath}/${query}/${currentPageNumber + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
