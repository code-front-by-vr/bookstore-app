import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://itbook.store/img/books/**')],
  },
}

export default nextConfig
