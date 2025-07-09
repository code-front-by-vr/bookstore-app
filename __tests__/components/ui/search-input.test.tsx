import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchInput from '@/components/ui/search-input'

const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('SearchInput Component', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  test('отображает поле поиска с плейсхолдером', () => {
    render(<SearchInput />)

    const input = screen.getByRole('searchbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'search')
  })

  test('позволяет вводить текст', async () => {
    const user = userEvent.setup()
    render(<SearchInput />)

    const input = screen.getByRole('searchbox')
    await user.type(input, 'JavaScript книги')

    expect(input).toHaveValue('JavaScript книги')
  })

  test('отправляет поиск при submit формы', async () => {
    const user = userEvent.setup()
    render(<SearchInput />)

    const input = screen.getByRole('searchbox')
    const form = input.closest('form')

    await user.type(input, 'React')
    await user.click(form!)
    fireEvent.submit(form!)

    expect(mockPush).toHaveBeenCalledWith('/search/React/1')
  })

  test('выполняет поиск при клике на кнопку', async () => {
    const user = userEvent.setup()
    render(<SearchInput />)

    const input = screen.getByRole('searchbox')
    const searchButton = screen.getByRole('button')

    await user.type(input, 'Node.js')
    await user.click(searchButton)

    expect(mockPush).toHaveBeenCalledWith('/search/Node.js/1')
  })

  test('очищает поле после поиска', async () => {
    const user = userEvent.setup()
    render(<SearchInput />)

    const input = screen.getByRole('searchbox')
    const searchButton = screen.getByRole('button')

    await user.type(input, 'TypeScript')
    await user.click(searchButton)

    await waitFor(() => {
      expect(input).toHaveValue('')
    })
  })

  test('переходит на страницу поиска при пустом запросе', async () => {
    const user = userEvent.setup()
    render(<SearchInput />)

    const searchButton = screen.getByRole('button')
    await user.click(searchButton)

    expect(mockPush).toHaveBeenCalledWith('/search')
  })

  test('не выполняет поиск для пустых строк при submit', async () => {
    const user = userEvent.setup()
    render(<SearchInput />)

    const input = screen.getByRole('searchbox')
    const form = input.closest('form')

    await user.type(input, '   ') // Только пробелы
    fireEvent.submit(form!)

    expect(mockPush).not.toHaveBeenCalledWith('/search/   /1')
  })

  test('имеет правильную структуру формы', () => {
    render(<SearchInput />)

    const form = screen.getByRole('searchbox').closest('form')
    expect(form).toHaveClass('flex-1', 'max-w-lg', 'relative', 'font-inter', 'font-semibold')
  })
})
