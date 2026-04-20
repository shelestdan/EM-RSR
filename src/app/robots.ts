import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://em-psp.ru'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/portal', '/api/', '/privacy-policy', '/terms'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
