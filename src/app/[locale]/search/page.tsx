import SearchHeader from '@/components/search/search-header'
import SearchSection from '@/components/search/search-section'
import HomeLink from '@/components/layout/home-link'

export default function SearchPage() {
  return (
    <>
      <SearchHeader />

      <SearchSection />

      <div className="text-center">
        <HomeLink />
      </div>
    </>
  )
}
