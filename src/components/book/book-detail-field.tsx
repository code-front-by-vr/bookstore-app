import type {BookDetailFieldProps} from '@/types/book'

export default function BookDetailField({
  label,
  icon,
  value,
  isMono = false,
  className = '',
}: BookDetailFieldProps): React.ReactNode {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="w-24 flex-shrink-0 flex items-center gap-2 text-sm text-gray-500 font-medium font-inter">
        {icon}
        {label}:
      </div>
      <span
        className={`text-sm text-gray-900 font-inter font-semibold ${isMono ? 'font-mono' : ''}`}
      >
        {value}
      </span>
    </div>
  )
}
