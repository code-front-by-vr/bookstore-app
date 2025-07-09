import {render, screen} from '@testing-library/react'
import CounterBadge from '@/components/ui/counter-badge'

describe('CounterBadge Component', () => {
  test('показывает счетчик когда count больше 0', () => {
    render(<CounterBadge count={5} />)

    const badge = screen.getByText('5')
    expect(badge).toBeInTheDocument()
  })

  test('показывает правильное число', () => {
    render(<CounterBadge count={99} />)

    const badge = screen.getByText('99')
    expect(badge).toBeInTheDocument()
  })

  test('не показывается когда count равен 0', () => {
    const {container} = render(<CounterBadge count={0} />)

    expect(container.firstChild).toBeNull()
  })
  test('не показывается когда count отрицательный', () => {
    const {container} = render(<CounterBadge count={-5} />)

    expect(container.firstChild).toBeNull()
  })

  test('работает с большими числами', () => {
    render(<CounterBadge count={1000} />)

    const badge = screen.getByText('1000')
    expect(badge).toBeInTheDocument()
  })
})
