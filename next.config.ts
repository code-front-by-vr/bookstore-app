import type {NextConfig} from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://itbook.store/img/books/**')],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  trailingSlash: false,
  headers: async () => [
    {
      source: '/favicon.ico',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=86400, stale-while-revalidate=604800',
        },
      ],
    },
  ],
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
