import SearchHeader from '@/components/search/search-header'
import SearchSection from '@/components/search/search-section'
import HomeLink from '@/components/layout/home-link'

export default function SearchPage() {
  return (
    <div className="min-h-[75vh] flex flex-col justify-center items-center">
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <SearchHeader />

        <SearchSection />

        <div className="text-center">
          <HomeLink />
        </div>
      </div>
    </div>
  )
}
