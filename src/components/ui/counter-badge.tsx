import {Badge} from '@/components/ui/badge'

export default function CounterBadge({count}: {count: number}) {
  if (count <= 0) return null

  return (
    <Badge className="absolute -top-1 -right-1 bg-red-400 group-hover:bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center font-medium border-0 px-0 py-0 transition-colors">
      {count}
    </Badge>
  )
}
