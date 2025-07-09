export const buildSchemePagination = (currentPage: number, pageCount: number) => {
  const prevPageNumber = +currentPage - 1
  const nextPageNumber = +currentPage + 1

  if (pageCount === 1) return null

  const scheme: number[] = [1, prevPageNumber, +currentPage, nextPageNumber, pageCount]
  const filteredScheme = scheme.filter(item => item > 0 && item <= pageCount)
  const set = new Set(filteredScheme)
  const result: (number | string)[] = Array.from(set)

  if (
    typeof result[0] === 'number' &&
    typeof result[1] === 'number' &&
    result[0] + 1 !== result[1]
  ) {
    result.splice(1, 0, '...')
  }

  const secondLast = result.at(-2)
  const last = result.at(-1)
  if (typeof secondLast === 'number' && typeof last === 'number' && secondLast + 1 !== last) {
    result.splice(result.length - 1, 0, '...')
  }

  return result
}
