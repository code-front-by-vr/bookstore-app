import {ArrowLeft} from 'lucide-react'
import Link from 'next/link'

export default function HomeLink() {
  return (
    <div className="mb-4">
      <Link
        href="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors font-inter text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to catalog
      </Link>
    </div>
  )
}
