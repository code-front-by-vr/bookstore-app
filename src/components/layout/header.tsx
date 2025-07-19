'use client'

import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Heart, ShoppingCart, User, Search, Menu} from 'lucide-react'
import Image from 'next/image'
import SearchInput from '@/components/ui/search-input'
import {usePathname} from 'next/navigation'
import {useAppSelector} from '@/lib/redux/hooks'
import CounterBadge from '@/components/ui/counter-badge'
import {useState} from 'react'
import LocaleSwitcher from '@/components/ui/locale-switcher'
import {ThemeSwitcher} from '@/components/ui/theme-switcher'
import {useTranslations} from 'next-intl'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Header(): React.ReactNode {
  const pathname = usePathname()
  const isMainSearchPage = pathname.endsWith('/search')
  const favoritesCount = useAppSelector(state => state.favorite.items.length)
  const cartItemsCount = useAppSelector(state => state.cart.items.length)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const t = useTranslations()

  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border/60 shadow-sm">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/bookstoreLogo.svg"
            alt="Bookstore Logo"
            width={100}
            height={100}
            className="transition-all duration-300 dark:brightness-0 dark:invert dark:contrast-125 dark:saturate-0 hover:scale-105"
          />
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

          {/* Desktop navigation - hidden on width screen less than 375px */}
          <div className="hidden min-[375px]:flex items-center gap-1 md:gap-3">
            <Link href="/books/favorites">
              <Button
                variant="ghost"
                size="icon"
                className="relative group w-8 h-8 md:w-10 md:h-10"
              >
                <Heart className="w-4 h-4 md:w-5 md:h-5" />
                <CounterBadge count={favoritesCount} />
              </Button>
            </Link>

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative group w-8 h-8 md:w-10 md:h-10"
              >
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                <CounterBadge count={cartItemsCount} />
              </Button>
            </Link>

            <ThemeSwitcher />

            <LocaleSwitcher />

            <Link href="/profile">
              <Button variant="ghost" size="icon" className="w-8 h-8 md:w-10 md:h-10">
                <User className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger menu - width screen less than 375px */}
          <div className="min-[375px]:hidden">
            <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Menu className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/books/favorites" className="flex items-center gap-2 w-full">
                    <Heart className="w-4 h-4" />
                    {t('navigation.favorites')}
                    {favoritesCount > 0 && (
                      <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                        {favoritesCount}
                      </span>
                    )}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/cart" className="flex items-center gap-2 w-full">
                    <ShoppingCart className="w-4 h-4" />
                    {t('navigation.cart')}
                    {cartItemsCount > 0 && (
                      <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2 w-full">
                    <User className="w-4 h-4" />
                    {t('navigation.profile')}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <div className="p-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t('navigation.theme')}</span>
                    <div className="flex">
                      <ThemeSwitcher />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t('navigation.language')}</span>
                    <div className="flex">
                      <LocaleSwitcher />
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
