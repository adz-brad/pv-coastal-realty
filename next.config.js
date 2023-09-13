/** @type {import('next').NextConfig} */

const nextConfig = {
    compiler: {
        removeConsole: process.env.NODE_ENV === "production"
      },
    images: {
        formats: ['image/avif', 'image/webp'],
        unoptimized: process.env.NODE_ENV === 'development',
        domains: ['members.mlsvallarta.com', 'images.unsplash.com','plus.unsplash.com'],
    },
    experimental: {
        serverActions: true
    },
}

module.exports = nextConfig