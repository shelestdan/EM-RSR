import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

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
  description:
    'ООО «ЕМ-ПолиСпецПроект» — комплексное проектирование и строительство инженерных систем. СРО, ISO 9001, 14001, 45001.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://em-psp.ru'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={evolventa.variable}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
