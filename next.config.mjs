/** @type {import('next').NextConfig} */
// we authorized send images from the local host
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
        pathname: '**',
        port: '3000',
        protocol: 'http',
      },
    ],
  },
}

export default nextConfig
