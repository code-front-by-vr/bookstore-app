interface BaseLayoutProps {
  children: React.ReactNode
  className?: string
  gradient?: boolean
}

export default function BaseLayout({children, className = '', gradient = false}: BaseLayoutProps) {
  if (gradient) {
    return (
      <div className="bg-gradient-to-b from-white via-blue-50/30 to-purple-50/20 font-inter">
        <div className={`container mx-auto my-10 px-4 pt-8 pb-8 ${className}`}>{children}</div>
      </div>
    )
  }

  return <div className={`container mx-auto px-4 py-8 ${className}`}>{children}</div>
}
