import type { MetadataRoute } from 'next'
import { assetUrl, defaultDescription, siteName } from '@/lib/seo'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ЕМ-ПСП — инженерные системы',
    short_name: siteName,
    description: defaultDescription,
    start_url: assetUrl('/'),
    scope: assetUrl('/'),
    display: 'standalone',
    background_color: '#0d101c',
    theme_color: '#0d101c',
    icons: [
      {
        src: assetUrl('/android-chrome-192x192.png'),
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: assetUrl('/android-chrome-512x512.png'),
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
