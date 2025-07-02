import {Button} from '@/components/ui/button'
import {ArrowLeft} from 'lucide-react'
import Link from 'next/link'

export default function HomeButton() {
  return (
    <Link href="/">
      <Button
        variant="outline"
        size="lg"
        className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white transition-all duration-300 font-inter text-lg"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to home
      </Button>
    </Link>
  )
}
