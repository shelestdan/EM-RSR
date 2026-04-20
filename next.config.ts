import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const isGithubPages = process.env.GITHUB_PAGES === 'true'

const nextConfig: NextConfig = {
  output: isGithubPages ? 'export' : undefined,
  basePath: isGithubPages ? '/EM-RSR' : undefined,
  assetPrefix: isGithubPages ? '/EM-RSR' : undefined,
  trailingSlash: isGithubPages ? true : undefined,
  devIndicators: false,
  experimental: {
    reactCompiler: false,
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default withPayload(nextConfig)
