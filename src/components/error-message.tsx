import HomeButton from '@/components/home-button'

export default function ErrorMessage({error}: {error: string}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Error</h3>
        <p className="text-red-600">An error occurred while loading books. {error}</p>
        <div className="mt-4">
          <HomeButton />
        </div>
      </div>
    </div>
  )
}
