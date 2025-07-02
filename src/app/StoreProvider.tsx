'use client'

import {useRef} from 'react'
import {Provider} from 'react-redux'
import {makeStore, AppStore} from '@/lib/store'
import {fetchFavorites} from '@/lib/features/favorites-slice'

export default function StoreProvider({children}: {children: React.ReactNode}) {
  const storeRef = useRef<AppStore | undefined>(undefined)

  if (!storeRef.current) {
    storeRef.current = makeStore()
    storeRef.current.dispatch(fetchFavorites())
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
