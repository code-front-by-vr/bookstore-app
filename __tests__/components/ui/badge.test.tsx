import {render, screen} from '@testing-library/react'
import {Badge} from '@/components/ui/badge'

describe('Badge Component', () => {
  test('отображает бейдж с текстом', () => {
    render(<Badge>Тестовый бейдж</Badge>)

    const badge = screen.getByText('Тестовый бейдж')
    expect(badge).toBeInTheDocument()
  })

  test('имеет дефолтные стили', () => {
    render(<Badge>Дефолтный</Badge>)

    const badge = screen.getByText('Дефолтный')
    expect(badge).toHaveClass('bg-primary')
    expect(badge).toHaveClass('text-primary-foreground')
  })

  test('применяет стили для secondary варианта', () => {
    render(<Badge variant="secondary">Вторичный</Badge>)

    const badge = screen.getByText('Вторичный')
    expect(badge).toHaveClass('bg-secondary')
    expect(badge).toHaveClass('text-secondary-foreground')
  })

  test('применяет стили для destructive варианта', () => {
    render(<Badge variant="destructive">Опасный</Badge>)

    const badge = screen.getByText('Опасный')
    expect(badge).toHaveClass('bg-destructive')
    expect(badge).toHaveClass('text-white')
  })

  test('применяет стили для outline варианта', () => {
    render(<Badge variant="outline">Контурный</Badge>)

    const badge = screen.getByText('Контурный')
    expect(badge).toHaveClass('text-foreground')
  })

  test('добавляет кастомные классы', () => {
    render(<Badge className="мой-класс">Кастомный</Badge>)

    const badge = screen.getByText('Кастомный')
    expect(badge).toHaveClass('мой-класс')
  })
})
