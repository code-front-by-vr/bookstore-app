import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {ArrowLeft} from 'lucide-react'
import Link from 'next/link'
import SearchInput from '@/components/search-input'

export default function SearchPage() {
  return (
    <div className="bg-gradient-to-b from-white via-blue-50/30 to-purple-50/20 font-inter">
      <div className="container mx-auto my-10 px-4 pt-8 pb-24">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl font-bold  mb-4">Search Books</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Find books by title, author or genre
          </p>
        </div>

        <Card className="max-w-2xl mx-auto mb-12 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="mb-6 flex justify-center">
              <SearchInput />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-gray-500">Popular queries:</span>
              <Link
                href="/search/javascript/1"
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                javascript
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                href="/search/react/1"
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                react
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                href="/search/python/1"
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                python
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
