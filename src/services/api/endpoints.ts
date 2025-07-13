const BASE_URL = 'https://api.itbook.store/1.0'

export const ENDPOINTS = {
  new: `${BASE_URL}/new`,
  book: (isbn: string) => `${BASE_URL}/books/${isbn}`,
  search: (query: string, page = '1') => `${BASE_URL}/search/${query}/${page}`,
  all: (page = '1') => `${BASE_URL}/search/programming/${page}`,
}
