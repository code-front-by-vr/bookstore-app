import {Card, CardContent} from '../ui/card'
import SearchInput from '../ui/search-input'
import SearchPopularQueries from './search-popular-queries'

export default function SearchSection() {
  return (
    <Card className="max-w-2xl mx-auto mb-12 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="mb-6 flex justify-center">
          <SearchInput />
        </div>

        <SearchPopularQueries />
      </CardContent>
    </Card>
  )
}
