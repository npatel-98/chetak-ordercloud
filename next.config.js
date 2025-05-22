/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: ['fastly.picsum.photos', 'dummyimage.com', 'images.unsplash.com', 'cdn.bajajauto.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.bajajauto.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
