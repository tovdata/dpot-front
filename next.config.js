/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  async rewrites() {
    if (process.env.NODE_ENV !== 'production') {
      return [
        {
          source: '/server/:path*',
          destination: 'https://dpot-dev.tovdata.com:8081/api/:path*',
        },
      ];
    }
  },
  images: {
    loader: 'akamai',
    path: '/',
  }
}