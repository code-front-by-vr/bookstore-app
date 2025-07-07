import BooksCarousel from '@/components/catalog/books-carousel'
import NewReleasesCarousel from '@/components/catalog/new-releases-carousel'
import SubscribeSection from '@/components/sections/subscribe-section'

export default async function MainPage(): Promise<React.ReactNode> {
  return (
    <div className="py-10 space-y-10">
      <NewReleasesCarousel />
      <BooksCarousel category="JavaScript" />
      <BooksCarousel category="Python" />
      <BooksCarousel category="React" />
      <BooksCarousel category="NodeJS" />
      <BooksCarousel category="Java" />
      <BooksCarousel category="PHP" />
      <BooksCarousel category="Programming" title="allBooks" />
      <SubscribeSection />
    </div>
  )
}
