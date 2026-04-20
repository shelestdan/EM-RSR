import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import { brand, servicePillars } from '@/lib/site-data'
import YandexMap from './YandexMap'

export const metadata: Metadata = {
  title: 'География и объекты — EM-PCP',
  description:
    'Интерактивная карта выполненных объектов EM-PCP. Фильтры по направлению работ и году. 150+ объектов.',
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M3 7h8M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default async function MapPage() {
  let markers: MapMarkerData[] = []
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/map-markers?limit=1000`, {
      next: { revalidate: 600 },
    })
    if (res.ok) {
      const data = await res.json()
      markers = data.docs || []
    }
  } catch {}

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="section-dark relative overflow-hidden pt-32 pb-14 sm:pb-20 lg:pb-24">
        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          <nav className="mb-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/28" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-white/60">Главная</Link>
            <span className="text-white/16">/</span>
            <span className="text-white/50">География и объекты</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
            <div>
              <p className="overline-light mb-7">География работ · EM-PCP</p>
              <h1
                className="font-brand font-black text-white max-w-[900px]"
                style={{ fontSize: 'clamp(34px, 5vw, 72px)', lineHeight: 0.98, letterSpacing: '-0.02em' }}
              >
                География и объекты
              </h1>
              <p className="mt-8 max-w-[600px] text-[15px] leading-[1.75] text-white/56 sm:text-[17px]">
                Интерактивная карта реальных объектов с фильтрами по направлению работ и году. Клик по метке — описание объекта.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href={brand.presentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary min-h-[52px] px-7 text-[12px]"
              >
                Посмотреть презентацию
              </a>
              <a href="#map" className="btn btn-outline-white min-h-[52px] px-7 text-[12px]">
                К карте
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOUR DIRECTIONS ───────────────────────────────────── */}
      <section className="section section-paper">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 grid gap-8 border-b border-[#d9d6cb] pb-12 sm:mb-14 sm:pb-14 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div>
                <p className="section-kicker mb-5">Направления</p>
                <h2 className="section-title leading-[1.02]">Четыре направления работы</h2>
              </div>
              <p className="body-large max-w-[520px]">
                Работаем по четырём инженерным направлениям. Каждое — свой состав работ, свой результат.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-px bg-[#d9d6cb] sm:grid-cols-2 lg:grid-cols-4">
            {servicePillars.map((pillar, i) => (
              <ScrollReveal key={pillar.id} className={`reveal-delay-${(i % 4) + 1}`}>
                <div className="flex h-full flex-col bg-white p-8 sm:min-h-[320px] sm:p-9">
                  <div className="font-brand text-[13px] font-black tracking-[0.22em] text-[#3E5854]">
                    {pillar.code}
                  </div>
                  <span className="mt-5 block h-px w-10 bg-[#3E5854]" />
                  <h3 className="mt-6 font-brand text-[22px] font-black leading-[1.15] text-[#23273F]">
                    {pillar.title}
                  </h3>
                  <ul className="mt-6 space-y-2.5 text-[14px] leading-[1.55] text-[#626675]">
                    {pillar.scope.map((s) => (
                      <li key={s} className="flex gap-2.5">
                        <span className="mt-[9px] h-1 w-1 shrink-0 bg-[#5f8b7d]" aria-hidden="true" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE MAP ───────────────────────────────────── */}
      <div id="map">
        <YandexMap initialMarkers={markers} />
      </div>
    </>
  )
}

export interface MapMarkerData {
  id: string
  title: string
  lat: number
  lng: number
  type: string
  region: string
  year: number
  description?: string
}
