/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your other configurations might be here...
  reactStrictMode: true,

  // Add this 'images' configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;