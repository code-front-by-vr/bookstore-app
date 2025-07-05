export default function BookDescription({description}: {description: string | undefined}) {
  if (!description) return null

  return (
    <div className="mb-12 border-t pt-8">
      <h4 className="text-2xl font-semibold text-gray-900 mb-4">Description</h4>
      <div className="font-inter text-base leading-relaxed whitespace-pre-line text-gray-700">
        {description}
      </div>
    </div>
  )
}
