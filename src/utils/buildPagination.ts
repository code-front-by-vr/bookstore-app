export const buildSchemePagination = (currentPage: number, pageCount: number) => {
  const prevPageNumber = +currentPage - 1
  const nextPageNumber = +currentPage + 1

  if (pageCount === 1) return null

  const scheme: number[] = [1, prevPageNumber, +currentPage, nextPageNumber, pageCount]
  const filteredScheme = scheme.filter(item => item > 0 && item <= pageCount)
  const set = new Set(filteredScheme)
  const result = Array.from(set)

  if (result[0] + 1 !== result[1]) result.splice(1, 0, '...')
  if (result.at(-2) + 1 !== result.at(-1)) result.splice(result.length - 1, 0, '...')
  return result
}
