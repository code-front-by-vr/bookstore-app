import {BookType} from '@/types/book'
import CardBook from '@/components/book/card-book'
import {notFound} from 'next/navigation'

export default function BooksLists({books}: {books: BookType[]}): React.ReactNode {
  if (!books || books.length === 0) return notFound()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {books.map(book => (
        <CardBook key={book.isbn13} {...book} />
      ))}
    </div>
  )
}
