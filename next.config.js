/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  //以下の記述は、安定してstyled-componentsのstyleを充てるのに必要なもの
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
