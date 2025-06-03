/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: "out",
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ["placeholder.svg", "v0.dev", "hebbkx1anhila5yf.public.blob.vercel-storage.com"],
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",
  basePath: "",
}

module.exports = nextConfig
