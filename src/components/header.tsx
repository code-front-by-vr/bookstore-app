import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Heart, ShoppingCart, User, Search} from 'lucide-react'
import Image from 'next/image'

export default function Header(): React.ReactNode {
  return (
    <header className=" bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        <Link href="/">
          <Image src="/bookstoreLogo.svg" alt="Bookstore Logo" width={100} height={100} />
        </Link>

        <div className="flex-1 max-w-lg relative">
          <Input type="search" placeholder="Поиск книг..." className="w-full pr-10" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 h-8 w-8  top-1/2 -translate-y-1/2"
            // onClick={handleSearch}
          >
            <Search className="w-4 h-4 text-gray-500 " />
          </Button>
        </div>

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
