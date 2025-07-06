import Container from './container'
import {getTranslations} from 'next-intl/server'

export default async function Footer(): Promise<React.ReactNode> {
  const t = await getTranslations('footer')
  return (
    <footer className="py-6 border-t">
      <Container>
        <div className="flex justify-between">
          <p className="text-center text-sm text-gray-500">&copy; 2025 BookStore</p>
          <p className="text-center text-sm uppercase text-gray-500">{t('copyright')}</p>
        </div>
      </Container>
    </footer>
  )
}
