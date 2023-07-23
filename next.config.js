/** @type {import('next').NextConfig} */

const nextConfig = {
    async headers() {
        return [
          {
            source: '/(.*).jpg',
            headers: [
              {
                key: 'Cache-Control',
                value:
                  'public, max-age=2419200, s-maxage=2419200, stale-while-revalidate=2419200',
              },
            ],
          },
          {
            source: '/_next/image(.*)',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=2419200, s-maxage=2419200, stale-while-revalidate=2419200',
              },
            ],
          },
        ]
      },
    compiler: {
        removeConsole: process.env.NODE_ENV === "production"
      },
    images: {
        formats: ['image/avif', 'image/webp'],
        unoptimized: false,
        domains: ['members.mlsvallarta.com'],
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig