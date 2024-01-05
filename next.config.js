/** @type {import('next').NextConfig} */

const nextConfig = {
    compiler: {
        removeConsole: process.env.NODE_ENV === "production"
      },
    images: {
        unoptimized: process.env.NODE_ENV === "development",
        remotePatterns: [
            { hostname: 'cdn.sanity.io' },
            { hostname: 'images.unsplash.com' },
            { hostname: 'plus.unsplash.com' }
        ],
    },
}

module.exports = nextConfig