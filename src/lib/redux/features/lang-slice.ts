import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {LangStateType, LangType} from '@/types/book'

export const initialState: LangStateType = {
  lang: 'en',
}

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<LangType>) => {
      state.lang = action.payload
    },
  },
})

export const {setLang} = langSlice.actions
export const langReducer = langSlice.reducer
