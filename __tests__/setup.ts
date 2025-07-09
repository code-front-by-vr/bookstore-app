import '@testing-library/jest-dom'

// Мокаем next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}))

// Мокаем next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/',
}))

// Мокаем Redux
jest.mock('@/lib/redux/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: () => ({}),
}))

// Мокаем API
jest.mock('@/config/api/book', () => ({
  getBook: () => ({data: null}),
}))
