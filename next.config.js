/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        unoptimized: true,
        domains: ['members.mlsvallarta.com'],
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig