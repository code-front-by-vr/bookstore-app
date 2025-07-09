import {configureStore} from '@reduxjs/toolkit'
import favoriteReducer from './features/favorites-slice'
import {favoritesLocalStorageMiddleware} from './features/favorites-slice'
import cartReducer, {cartLocalStorageMiddleware} from './features/cart-slice'
import {userLocalStorageMiddleware, userReducer} from './features/user-slice'

const middleware = [
  favoritesLocalStorageMiddleware,
  cartLocalStorageMiddleware,
  userLocalStorageMiddleware,
]

export const makeStore = () => {
  return configureStore({
    reducer: {
      favorite: favoriteReducer,
      cart: cartReducer,
      user: userReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
