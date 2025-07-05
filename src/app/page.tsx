import BooksCarousel from '@/components/catalog/books-carousel'
import NewReleasesCarousel from '@/components/catalog/new-releases-carousel'
import SubscribeSection from '@/components/sections/subscribe-section'

export default function MainPage(): React.ReactNode {
  return (
    <div className="py-10 space-y-10">
      <NewReleasesCarousel />
      <BooksCarousel category="JavaScript" />
      <BooksCarousel category="Python" />
      <BooksCarousel category="React" />
      <BooksCarousel category="Node.js" />
      <BooksCarousel category="Java" />
      <BooksCarousel category="PHP" />
      <BooksCarousel category="Programming" title="Browse all books" />
      <SubscribeSection />
    </div>
  )
}
