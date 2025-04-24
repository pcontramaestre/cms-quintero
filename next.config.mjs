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
    ],
  },
}

export default nextConfig
