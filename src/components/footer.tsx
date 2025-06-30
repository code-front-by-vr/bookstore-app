import Container from './container'

export default function Footer(): React.ReactNode {
  return (
    <footer className="py-6 border-t">
      <Container>
        <div className="flex justify-between">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} BookStore
          </p>
          <p className="text-center text-sm uppercase text-gray-500">Все права защищены</p>
        </div>
      </Container>
    </footer>
  )
}
