/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        unoptimized: true,
        domains: ['members.mlsvallarta.com'],
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig