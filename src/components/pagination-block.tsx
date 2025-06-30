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
  category,
  currentPage,
  totalItems,
  pageSize = BOOKS_LIMIT,
}: PaginationBlockProps): React.ReactNode {
  const totalPages = Math.ceil(totalItems / pageSize)
  const pagination = buildSchemePagination(currentPage, totalPages)

  if (totalPages <= 1 || !pagination) return null

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`/category/${category}/${currentPage - 1}`} />
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
                href={`/category/${category}/${item}`}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={`/category/${category}/${currentPage + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
