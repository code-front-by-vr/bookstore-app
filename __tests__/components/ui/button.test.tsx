import {render, screen, fireEvent} from '@testing-library/react'
import {Button} from '@/components/ui/button'

describe('Button Component', () => {
  test('отображает кнопку с переданным текстом', () => {
    render(<Button>Нажми меня</Button>)

    const button = screen.getByText('Нажми меня')
    expect(button).toBeInTheDocument()
  })

  test('вызывает функцию при клике', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Кликабельная кнопка</Button>)

    const button = screen.getByText('Кликабельная кнопка')
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('не кликается когда disabled', () => {
    const handleClick = jest.fn()
    render(
      <Button disabled onClick={handleClick}>
        Заблокированная кнопка
      </Button>
    )

    const button = screen.getByText('Заблокированная кнопка')
    fireEvent.click(button)

    expect(handleClick).not.toHaveBeenCalled()
    expect(button).toBeDisabled()
  })

  test('применяет правильные классы для вариантов', () => {
    const {rerender} = render(<Button variant="default">Обычная кнопка</Button>)
    let button = screen.getByText('Обычная кнопка')
    expect(button).toHaveClass('bg-primary')

    rerender(<Button variant="destructive">Опасная кнопка</Button>)
    button = screen.getByText('Опасная кнопка')
    expect(button).toHaveClass('bg-destructive')

    rerender(<Button variant="outline">Контурная кнопка</Button>)
    button = screen.getByText('Контурная кнопка')
    expect(button).toHaveClass('border')
  })
})
