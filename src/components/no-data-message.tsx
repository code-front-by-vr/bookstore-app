import HomeButton from '@/components/home-button'

export default function NoDataMessage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold mb-4">Nothing found</h3>
        <p className="text-gray-600 font-inter text-lg">No books found</p>
        <div className="mt-4">
          <HomeButton />
        </div>
      </div>
    </div>
  )
}
