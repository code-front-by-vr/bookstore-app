import BookImage from './book-image'
import BookInfo from './book-info'
import type {BookMainSectionProps} from '@/types/book'

export default function BookMainSection({
  data,
  isFavorite,
  onToggleFavorite,
}: BookMainSectionProps): React.ReactNode {
  return (
    <div className="flex flex-col lg:flex-row gap-12 mb-12">
      <div className="lg:w-80 flex-shrink-0">
        <div className="relative aspect-[3/4] w-full max-w-80 mx-auto overflow-hidden rounded-lg bg-gray-50">
          <BookImage
            src={data.image}
            alt={data.title}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
            heartSize={25}
          />
        </div>
      </div>

      <BookInfo data={data} />
    </div>
  )
}
