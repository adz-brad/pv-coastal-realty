/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        unoptimized: false,
        domains: ['members.mlsvallarta.com'],
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig