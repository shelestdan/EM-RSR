import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Портал исполнителей',
  description: 'Закрытый портал исполнителей ЕМ-ПСП для доступа к документам и материалам.',
  path: '/portal',
  noIndex: true,
})

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return children
}
