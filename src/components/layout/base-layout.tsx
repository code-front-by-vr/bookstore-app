interface BaseLayoutProps {
  children: React.ReactNode
  className?: string
  gradient?: boolean
}

export default function BaseLayout({children, className = ''}: BaseLayoutProps) {
  return <div className={`container mx-auto px-4 py-8 ${className}`}>{children}</div>
}
