import {configureStore} from '@reduxjs/toolkit'
import favoriteReducer from './features/favorites-slice'
import {favoritesLocalStorageMiddleware} from './features/favorites-slice'

const middleware = [favoritesLocalStorageMiddleware]

export const makeStore = () => {
  return configureStore({
    reducer: {
      favorite: favoriteReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
