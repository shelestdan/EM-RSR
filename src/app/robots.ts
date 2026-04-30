import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'

export const dynamic = 'force-static'

const baseUrl = siteUrl

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/portal/', '/api/', '/privacy-policy', '/terms'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
