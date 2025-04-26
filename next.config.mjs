/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // experimental: {
  //   viewTransition: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_IMAGE_DOMAIN,
      },
      {
        protocol: "https",
        hostname: "quinteroandassociates.com",
      },
    ],
  },
  allowedDevOrigins: ['quintero.localdev:8080', '*.localdev', '192.168.31.63'],
}

export default nextConfig
