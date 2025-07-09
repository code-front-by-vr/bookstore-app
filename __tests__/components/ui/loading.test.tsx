import {render, screen} from '@testing-library/react'
import Loading from '@/components/ui/loading'

describe('Loading Component', () => {
  test('отображает загрузочный компонент', () => {
    render(<Loading />)

    const spinner = screen.getByTestId('loading-spinner') || document.querySelector('.animate-spin')
    expect(spinner).toBeTruthy()
  })

  test('показывает текст загрузки', () => {
    render(<Loading />)

    const loadingText = screen.getByText('loading.title')
    expect(loadingText).toBeInTheDocument()
  })

  test('имеет правильную структуру контейнера', () => {
    const {container} = render(<Loading />)

    const mainContainer = container.querySelector('.container')
    expect(mainContainer).toBeTruthy()

    const flexContainer = container.querySelector('.flex.items-center.justify-center')
    expect(flexContainer).toBeTruthy()
  })

  test('содержит иконку Loader2', () => {
    const {container} = render(<Loading />)

    const icon = container.querySelector('svg.animate-spin')
    expect(icon).toBeTruthy()
  })
})
