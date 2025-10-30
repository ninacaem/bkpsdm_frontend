/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-bkpsdm.bonebolangokab.go.id',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '36.93.34.196',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

// ✅ gunakan export default (bukan module.exports)
export default nextConfig
