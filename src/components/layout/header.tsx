'use client'

import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Heart, ShoppingCart, User, Search} from 'lucide-react'
import Image from 'next/image'
import SearchInput from '@/components/ui/search-input'
import {usePathname} from 'next/navigation'
import {useAppSelector} from '@/lib/redux/hooks'
import CounterBadge from '@/components/ui/counter-badge'
import {useState} from 'react'
import LocaleSwitcher from '@/components/ui/locale-switcher'

export default function Header(): React.ReactNode {
  const pathname = usePathname()
  const isMainSearchPage = pathname === '/search'
  const favoritesCount = useAppSelector(state => state.favorite.items.length)
  const cartItemsCount = useAppSelector(state => state.cart.items.length)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        <Link href="/">
          <Image src="/bookstoreLogo.svg" alt="Bookstore Logo" width={100} height={100} />
        </Link>

        {!isMainSearchPage && (
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-1 md:gap-3">
          {!isMainSearchPage && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-8 h-8"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-4 h-4" />
            </Button>
          )}

          <Link href="/books/favorites">
            <Button variant="ghost" size="icon" className="relative group w-8 h-8 md:w-10 md:h-10">
              <Heart className="w-4 h-4 md:w-5 md:h-5" />
              <CounterBadge count={favoritesCount} />
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative group w-8 h-8 md:w-10 md:h-10">
              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
              <CounterBadge count={cartItemsCount} />
            </Button>
          </Link>

          <LocaleSwitcher />

          <Link href="/profile">
            <Button variant="ghost" size="icon" className="w-8 h-8 md:w-10 md:h-10">
              <User className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {isSearchOpen && !isMainSearchPage && (
        <div className="md:hidden mt-2 pb-2 px-4">
          <SearchInput />
        </div>
      )}
    </header>
  )
}
