import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {CartStateType, CartItemType} from '@/types/book'
import {CART_KEY} from '@/config/constants'

const initialState: CartStateType = {
  items: [],
  totalPrice: 0,
  loading: false,
  error: null,
}

export const fetchCart = createAsyncThunk<CartItemType[], void>('cart/fetchCart', async () => {
  const cartItems = localStorage.getItem(CART_KEY)
  return cartItems ? JSON.parse(cartItems) : []
})

export const cartLocalStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action)
  if (
    action.type === 'cart/addToCart' ||
    action.type === 'cart/removeFromCart' ||
    action.type === 'cart/clearCart' ||
    action.type === 'cart/incrementQuantity' ||
    action.type === 'cart/decrementQuantity'
  ) {
    const state = store.getState()
    const cartItems = (state as any).cart.items.map((item: CartItemType) => ({
      book: item.book,
      quantity: item.quantity,
    }))
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems))
  }
  return result
}

export const calculateTotalPrice = (items: CartItemType[]) => {
  return items.reduce(
    (acc, item) => acc + Number(item.book.price.replace('$', '')) * item.quantity,
    0
  )
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      const itemInCart = state.items.find(item => item.book.isbn13 === action.payload.book.isbn13)
      if (itemInCart) {
        itemInCart.quantity++
      } else {
        state.items.push({...action.payload, quantity: 1})
      }
      state.totalPrice = calculateTotalPrice(state.items)
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const itemInCart = state.items.find(item => item.book.isbn13 === action.payload)
      if (itemInCart) {
        itemInCart.quantity++
      }
      state.totalPrice = calculateTotalPrice(state.items)
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const itemInCart = state.items.find(item => item.book.isbn13 === action.payload)
      if (itemInCart && itemInCart.quantity > 1) {
        itemInCart.quantity--
      }
      state.totalPrice = calculateTotalPrice(state.items)
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.book.isbn13 !== action.payload)
      state.totalPrice = calculateTotalPrice(state.items)
    },
    clearCart: state => {
      state.items = []
      state.totalPrice = 0
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCart.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload
      state.totalPrice = calculateTotalPrice(action.payload)
      state.loading = false
    })
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to fetch cart'
    })
  },
})

export const {addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity} =
  cartSlice.actions

export default cartSlice.reducer
