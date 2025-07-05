export default function SearchLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="bg-gradient-to-b from-white via-blue-50/30 to-purple-50/20 font-inter">
      <div className="container mx-auto my-10 px-4 pt-8 pb-24">{children}</div>
    </div>
  )
}
