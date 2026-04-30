import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { brand } from '@/lib/site-data'
import { assetUrl, defaultDescription, siteAssetUrl, siteName, siteUrl } from '@/lib/seo'

const evolventa = localFont({
  src: [
    { path: '../../public/fonts/Evolventa-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Evolventa-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-evolventa',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    template: '%s | ЕМ-ПСП',
    default: 'ЕМ-ПСП — Инженерные системы. Проектирование и строительство',
  },
  description: defaultDescription,
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  authors: [{ name: 'ООО «ЕМ-ПолиСпецПроект»', url: siteUrl }],
  creator: 'ООО «ЕМ-ПолиСпецПроект»',
  publisher: 'ООО «ЕМ-ПолиСпецПроект»',
  category: 'engineering',
  keywords: [
    'ЕМ-ПСП',
    'EM-PCP',
    'ЕМ-ПолиСпецПроект',
    'проектирование инженерных сетей',
    'строительство инженерных систем',
    'газоснабжение',
    'водоснабжение',
    'канализация',
    'авторский надзор',
    'инженерные изыскания',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: '/',
    siteName,
    title: 'ЕМ-ПСП — инженерные системы',
    description: defaultDescription,
    images: [
      {
        url: siteAssetUrl('/og-image.png'),
        width: 1200,
        height: 630,
        alt: 'ЕМ-ПСП — инженерные системы',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ЕМ-ПСП — инженерные системы',
    description: defaultDescription,
    images: [siteAssetUrl('/og-image.png')],
  },
  icons: {
    icon: [
      { url: assetUrl('/favicon.ico') },
      { url: assetUrl('/favicon.svg'), type: 'image/svg+xml' },
      { url: assetUrl('/favicon-32x32.png'), sizes: '32x32', type: 'image/png' },
      { url: assetUrl('/favicon-16x16.png'), sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: assetUrl('/apple-touch-icon.png'), sizes: '180x180', type: 'image/png' }],
  },
  manifest: assetUrl('/manifest.webmanifest'),
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'ООО «ЕМ-ПолиСпецПроект»',
      alternateName: ['ЕМ-ПСП', 'EM-PCP'],
      url: siteUrl,
      logo: `${siteUrl}/brand/logo.png`,
      email: brand.email,
      telephone: brand.phone,
      taxID: brand.inn,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'RU',
        addressLocality: 'Краснодар',
        streetAddress: 'ул. Коммунаров 76, оф. 382/9',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: brand.phone,
        email: brand.email,
        contactType: 'customer service',
        areaServed: 'RU',
        availableLanguage: ['ru'],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
      inLanguage: 'ru-RU',
    },
  ]

  return (
    <html lang="ru" className={evolventa.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
