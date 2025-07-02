import {BookType} from '@/types/book'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {FAVORITES_KEY} from '@/config/constants'

type FavoriteStateType = {
  items: BookType[]
  loading: boolean
  error: string | null
}

const initialState: FavoriteStateType = {
  items: [],
  loading: false,
  error: null,
}

export const fetchFavorites = createAsyncThunk<BookType[], void>(
  'favorites/fetchFavorites',
  async () => {
    const favoritesId: string[] = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')

    const fetchBookByIsbn = async (isbn: string): Promise<BookType | null> => {
      try {
        const res = await fetch(`https://api.itbook.store/1.0/books/${isbn}`)
        if (!res.ok) throw new Error('Failed to fetch book')
        return await res.json()
      } catch (e) {
        console.error(`Error fetching book ${isbn}:`, e)
        return null
      }
    }

    const results = await Promise.all(favoritesId.map(fetchBookByIsbn))
    return results.filter(book => book !== null)
  }
)

export const favoritesLocalStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action)
  if (action.type === 'favorites/toggleFavorite' || action.type === 'favorites/clearAllFavorites') {
    const state = store.getState()
    const favoritesId = state.favorite.items.map((book: BookType) => book.isbn13)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesId))
  }
  return result
}

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<BookType>) => {
      const book = action.payload
      const index = state.items.findIndex(item => item.isbn13 === book.isbn13)
      if (index !== -1) {
        state.items = state.items.filter(item => item.isbn13 !== book.isbn13)
      } else {
        state.items.push(book)
      }
    },
    clearAllFavorites: state => {
      state.items = []
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchFavorites.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    })
    builder.addCase(fetchFavorites.rejected, (state, action) => {
      state.error = action.error.message || 'Error loading favorites'
      state.loading = false
    })
  },
})

export const {toggleFavorite, clearAllFavorites} = favoriteSlice.actions
export default favoriteSlice.reducer
