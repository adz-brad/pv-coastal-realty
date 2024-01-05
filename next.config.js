/** @type {import('next').NextConfig} */

const nextConfig = {
    compiler: {
        removeConsole: process.env.NODE_ENV === "production"
      },
    images: {
        unoptimized: true,
        remotePatterns: [
            { hostname: 'cdn.sanity.io' },
            { hostname: 'images.unsplash.com' },
            { hostname: 'plus.unsplash.com' }
        ],
    },
}

module.exports = nextConfig