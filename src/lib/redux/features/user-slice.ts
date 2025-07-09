import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User, UserStateType} from '@/types/profile'

const USER_KEY = 'user'

const mockUser = {
  name: 'Александр Иванов',
  email: 'alexander.ivanov@example.com',
  phone: '+7 (999) 123-45-67',
  address: 'ул. Пушкина, дом 15, кв. 42',
  city: 'Минск',
  country: 'Беларусь',
  postalCode: '101000',
  memberSince: 'июль 2025',
  totalOrders: 15,
  totalSpent: '$2,450',
  notifications: true,
  newsletter: true,
  promotions: true,
}

const initialState: UserStateType = {
  userData: mockUser,
  loading: false,
  error: null,
  isHydrated: false,
}

export const fetchUser = createAsyncThunk<User, void>('user/fetchUser', async () => {
  const user = localStorage.getItem(USER_KEY)
  return user ? JSON.parse(user) : mockUser
})

export const userLocalStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action)
  if (action.type === 'user/updateUser') {
    const state = store.getState()
    localStorage.setItem(USER_KEY, JSON.stringify(state.user.userData))
  }
  return result
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.userData = {...state.userData, ...action.payload}
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userData = action.payload
      state.loading = false
      state.isHydrated = true
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.error = action.error.message || null
      state.loading = false
      state.isHydrated = true
    })
  },
})

export const userReducer = userSlice.reducer
export const {updateUser} = userSlice.actions
