import {render, screen} from '@testing-library/react'
import CardBook from '@/components/book/card-book'

// Тестовые данные
const mockBook = {
  isbn13: '9781234567890',
  title: 'JavaScript: The Good Parts',
  subtitle: 'The Definitive Guide',
  authors: 'Douglas Crockford',
  publisher: "O'Reilly Media",
  isbn10: '1234567890',
  pages: '176',
  year: '2008',
  rating: 4.2,
  desc: 'A book about JavaScript best practices',
  price: '$29.99',
  image: 'https://example.com/book-cover.jpg',
  url: 'https://example.com/book-details',
}

describe('CardBook Component', () => {
  test('отображает заголовок книги', () => {
    render(<CardBook {...mockBook} />)

    expect(screen.getByText('JavaScript: The Good Parts')).toBeInTheDocument()
  })

  test('отображает цену книги', () => {
    render(<CardBook {...mockBook} />)

    expect(screen.getByText('$29.99')).toBeInTheDocument()
  })

  test('отображает обложку книги', () => {
    render(<CardBook {...mockBook} />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', mockBook.image)
    expect(image).toHaveAttribute('alt', mockBook.title)
  })

  test('содержит ссылку на страницу книги', () => {
    render(<CardBook {...mockBook} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/books/9781234567890')
  })

  test('показывает год публикации', () => {
    render(<CardBook {...mockBook} />)

    expect(screen.getByText('2008')).toBeInTheDocument()
  })

  test('показывает издателя', () => {
    render(<CardBook {...mockBook} />)

    expect(screen.getByText("O'Reilly Media")).toBeInTheDocument()
  })

  test('имеет структуру карточки', () => {
    const {container} = render(<CardBook {...mockBook} />)

    const card = container.querySelector('.group')
    expect(card).toBeTruthy()
  })

  test('работает с минимальным набором данных', () => {
    const minimalBook = {
      isbn13: '9781234567890',
      title: 'Test Book',
      subtitle: 'Test Subtitle',
      authors: 'Test Author',
      price: '$10.00',
      image: '/test-image.jpg',
      url: '/test-url',
    }

    render(<CardBook {...minimalBook} />)

    expect(screen.getByText('Test Book')).toBeInTheDocument()
    expect(screen.getByText('Test Author')).toBeInTheDocument()
    expect(screen.getByText('$10.00')).toBeInTheDocument()
  })

  test('корректно отображает длинный заголовок', () => {
    const longTitleBook = {
      ...mockBook,
      title: 'Very Long Book Title That Should Be Displayed Properly',
    }

    render(<CardBook {...longTitleBook} />)

    expect(
      screen.getByText('Very Long Book Title That Should Be Displayed Properly')
    ).toBeInTheDocument()
  })

  test('отображает нескольких авторов', () => {
    const multiAuthorBook = {
      ...mockBook,
      authors: 'John Doe, Jane Smith, Bob Johnson',
    }

    render(<CardBook {...multiAuthorBook} />)

    expect(screen.getByText('John Doe, Jane Smith, Bob Johnson')).toBeInTheDocument()
  })
})
