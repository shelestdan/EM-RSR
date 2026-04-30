import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'

export const dynamic = 'force-static'

const baseUrl = siteUrl

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${baseUrl}/`, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/uslugi`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/proekty`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/o-kompanii`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/kontakty`, priority: 0.7, changeFrequency: 'monthly' as const },
  ]

  return staticPages.map((page) => ({
    ...page,
    lastModified: new Date(),
  }))
}
