/** @type {import('next').NextConfig} */

const nextConfig = {
    async headers() {
        return [
          {
            source: '/_next/image(.*)',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=86399, s-maxage=86399, stale-while-revalidate=86399',
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
        domains: ['members.mlsvallarta.com', 'cdn.mlsvallarta.com'],
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig