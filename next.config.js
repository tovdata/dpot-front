/** @type {import('next').NextConfig} */

module.exports = {
  // reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/server/:path*',
        destination: 'https://api-dev.plip.kr:8081/api/:path*',
      },
    ];
  },
  trailingSlash: true,
  images: {
    loader: 'akamai',
    path: '/'
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  }
}