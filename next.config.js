/** @type {import('next').NextConfig} */
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });
// module.exports = withBundleAnalyzer({});

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
  // i18n: {
  //   locales: ["ko"],
  //   defaultLocale: "ko"
  // },
  images: {
    loader: 'akamai',
    path: 'https://dev.plip.kr'
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  }
};