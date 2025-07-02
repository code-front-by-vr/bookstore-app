import {Button} from '@/components/ui/button'
import {ArrowLeft} from 'lucide-react'
import Link from 'next/link'

export default function NoDataMessage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">No books found</h3>
        <p className="text-gray-600">No books found</p>
        <Link href="/">
          <Button className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  )
}
