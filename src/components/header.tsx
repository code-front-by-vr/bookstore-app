'use client'

import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {Heart, ShoppingCart, User} from 'lucide-react'
import Image from 'next/image'
import SearchInput from './search-input'
import {usePathname} from 'next/navigation'
import {useAppSelector} from '@/lib/hooks'

export default function Header(): React.ReactNode {
  const pathname = usePathname()
  const isMainSearchPage = pathname === '/search'
  const favoritesCount = useAppSelector(state => state.favorite.items.length)

  return (
    <header className=" bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        <Link href="/">
          <Image src="/bookstoreLogo.svg" alt="Bookstore Logo" width={100} height={100} />
        </Link>

        {!isMainSearchPage && <SearchInput />}

        <div className="flex items-center gap-3">
          <Link href="/books/favorites">
            <Button variant="ghost" size="icon" className="relative group">
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-400 group-hover:bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center font-medium border-0 px-0 py-0 transition-colors">
                  {favoritesCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </Link>

          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
