import {Loader2} from 'lucide-react'

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading books...</span>
      </div>
    </div>
  )
}
