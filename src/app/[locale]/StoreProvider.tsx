'use client'

import {useRef, useEffect} from 'react'
import {Provider} from 'react-redux'
import {makeStore, AppStore} from '@/lib/redux/store'
import {fetchFavorites} from '@/lib/redux/features/favorites-slice'
import {fetchCart} from '@/lib/redux/features/cart-slice'

export default function StoreProvider({children}: {children: React.ReactNode}) {
  const storeRef = useRef<AppStore | undefined>(undefined)

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  useEffect(() => {
    if (storeRef.current) {
      storeRef.current.dispatch(fetchFavorites())
      storeRef.current.dispatch(fetchCart())
    }
  }, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}
