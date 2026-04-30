import type { Metadata } from 'next'

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://em-pcp.ru').replace(/\/$/, '')
export const siteName = 'ЕМ-ПСП'
export const defaultDescription =
  'ООО «ЕМ-ПолиСпецПроект» — проектирование, строительство и сопровождение инженерных систем. СРО, ISO 9001, 14001, 45001.'

export function assetUrl(path: string) {
  return `${BASE_PATH}${path}`
}

export function siteAssetUrl(path: string) {
  return `${siteUrl}${path}`
}

export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string
  description: string
  path: string
  noIndex?: boolean
}): Metadata {
  const image = siteAssetUrl('/og-image.png')

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      locale: 'ru_RU',
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteName} — инженерные системы`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : undefined,
  }
}
