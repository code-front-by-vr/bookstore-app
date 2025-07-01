'use client'

import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Heart, ShoppingCart, User} from 'lucide-react'
import Image from 'next/image'
import SearchInput from './search-input'
import {usePathname} from 'next/navigation'

export default function Header(): React.ReactNode {
  const pathname = usePathname()
  const isMainSearchPage = pathname === '/search'

  return (
    <header className=" bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        <Link href="/">
          <Image src="/bookstoreLogo.svg" alt="Bookstore Logo" width={100} height={100} />
        </Link>

        {!isMainSearchPage && <SearchInput />}

        <div className="flex items-center gap-3">
          <Link href="/favorites">
            <Button variant="ghost" size="icon">
              <Heart className="w-5 h-5" />
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
