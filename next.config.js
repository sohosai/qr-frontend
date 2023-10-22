/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: '/spot/list', // リダイレクト元のURL
        destination: '/', // リダイレクト先のURL
        permanent: true, // 永続的なリダイレクトかのフラグ
      },
    ]
  },
}

module.exports = nextConfig
