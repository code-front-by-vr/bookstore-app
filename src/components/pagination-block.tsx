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
  const pagination = buildSchemePagination(currentPage, totalPages)

  if (totalPages <= 1 || !pagination) return null

  return (
    <Pagination className="font-inter">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`/${basePath}/${query}/${currentPage - 1}`} />
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
                isActive={item === currentPage}
                href={`/${basePath}/${query}/${item}`}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={`/${basePath}/${query}/${currentPage + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
