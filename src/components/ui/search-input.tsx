'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Search} from 'lucide-react'
import {useRouter} from 'next/navigation'
import {useTranslations} from 'next-intl'

export default function SearchInput(): React.ReactNode {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const t = useTranslations()

  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const query = formData.get('query') as string
    if (query.trim()) {
      router.push(`/search/${query}/1`)
    }
    setQuery('')
  }

  function handleSearchButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    if (query.trim()) {
      router.push(`/search/${query}/1`)
      setQuery('')
    } else {
      router.push('/search')
    }
  }

  return (
    <form
      className="flex-1 max-w-lg relative font-inter font-semibold"
      onSubmit={handleSubmitSearch}
    >
      <Input
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full pr-10"
        name="query"
        placeholder={t('search')}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-1 h-8 w-8  top-1/2 -translate-y-1/2"
        onClick={handleSearchButtonClick}
      >
        <Search className="w-4 h-4 text-muted-foreground" />
      </Button>
    </form>
  )
}
