import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import AnimatedCounter from '@/components/AnimatedCounter'
import YandexMap from './YandexMap'

export const metadata: Metadata = {
  title: 'Карта объектов — ЕМ-ПСП',
  description:
    'Интерактивная карта выполненных объектов ЕМ-ПСП. 150+ объектов: капитальное строительство, водо- и газоснабжение, авторский надзор, газификация домовладений.',
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M3 7h8M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default async function MapPage() {
  // Fetch markers from Payload CMS
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
  } catch {
    // Return empty markers if DB not available
  }

  const count = markers.length || 150
  const regionsCount = markers.length
    ? new Set(markers.map((m) => m.region)).size
    : 5
  const typesCount = markers.length
    ? new Set(markers.map((m) => m.type)).size
    : 6
  const years = markers.map((m) => m.year).filter(Boolean)
  const yearsSpan = years.length
    ? `${Math.min(...years)}–${Math.max(...years)}`
    : '2019–2026'

  const heroStats: Array<{
    value: number
    suffix: string
    label: string
    sub: string
    displayOverride?: string
  }> = [
    { value: count, suffix: markers.length ? '' : '+', label: 'объектов', sub: 'На карте' },
    { value: regionsCount, suffix: '', label: 'регионов', sub: 'Северо-Запад + Юг' },
    { value: typesCount, suffix: '', label: 'типов работ', sub: 'Кап · сети · надзор' },
    { value: 0, suffix: '', label: 'период', sub: 'Активно на карте', displayOverride: yearsSpan },
  ]

  const legendTypes = [
    { code: '01', color: '#23273F', label: 'Капстроительство с экспертизой' },
    { code: '02', color: '#3E5854', label: 'Капстроительство' },
    { code: '03', color: '#5f8b7d', label: 'Водоснабжение' },
    { code: '04', color: '#a37f5c', label: 'Газоснабжение' },
    { code: '05', color: '#6f778f', label: 'Авторский надзор' },
    { code: '06', color: '#8b4f4a', label: 'Газификация' },
  ]

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="section-dark relative min-h-[78vh] flex flex-col justify-end overflow-hidden pt-32 pb-16 sm:pb-20 lg:pb-24">
        <div className="absolute inset-0 eng-grid-overlay opacity-40" aria-hidden="true" />

        {/* Large decorative number */}
        <div
          className="pointer-events-none absolute right-0 top-0 select-none font-brand font-black leading-none text-white opacity-[0.03]"
          style={{ fontSize: 'clamp(220px, 30vw, 460px)', lineHeight: 0.8, transform: 'translate(4%, -6%)' }}
          aria-hidden="true"
        >
          {count}
        </div>

        {/* Decorative crosshair */}
        <div className="pointer-events-none absolute right-[12%] top-[32%] hidden lg:block" aria-hidden="true">
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none" stroke="#5f8b7d" strokeOpacity="0.18">
            <circle cx="70" cy="70" r="60" strokeWidth="1" />
            <circle cx="70" cy="70" r="38" strokeWidth="1" />
            <circle cx="70" cy="70" r="4" fill="#5f8b7d" fillOpacity="0.35" strokeWidth="0" />
            <path d="M70 10v28M70 102v28M10 70h28M102 70h28" strokeWidth="1" />
          </svg>
        </div>

        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/28" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-white/60">Главная</Link>
            <span className="text-white/16">/</span>
            <span className="text-white/50">Карта объектов</span>
          </nav>

          {/* Kicker + h1 */}
          <p className="overline-light mb-8">География работ · ЕМ-ПСП</p>
          <h1
            className="font-brand font-black text-white max-w-[960px]"
            style={{ fontSize: 'clamp(36px, 5.5vw, 82px)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
          >
            Карта объектов.<br />География<br />подтверждает опыт
          </h1>
          <p className="mt-10 max-w-[600px] text-[15px] leading-[1.75] text-white/50 sm:text-[17px]">
            Каждый маркер — реальный объект с документацией. Фильтры по типу работ, региону и году. Картой управляем сами — новые объекты появляются из админ-панели.
          </p>

          {/* Stat strip */}
          <div className="mt-14 grid grid-cols-2 gap-px bg-white/[0.06] sm:grid-cols-4">
            {heroStats.map((s) => (
              <div key={s.label} className="bg-[#07090f]/60 px-5 py-6 sm:px-7 sm:py-7">
                <div
                  className="font-brand font-black leading-none text-white"
                  style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
                >
                  {s.displayOverride ? s.displayOverride : <AnimatedCounter target={s.value} suffix={s.suffix} />}
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/36">{s.label}</div>
                <div className="mt-1 text-[10px] text-white/20">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Jump to map */}
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#map"
              className="group inline-flex items-center gap-3 border border-white/14 bg-white/[0.04] px-6 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-white/72 transition-all duration-200 hover:border-[#5f8b7d]/60 hover:bg-[#5f8b7d]/14 hover:text-white"
            >
              Открыть карту
              <span className="transition-transform duration-200 group-hover:translate-x-1"><Arrow /></span>
            </a>
            <Link
              href="/proekty"
              className="text-[11px] font-black uppercase tracking-[0.14em] text-white/40 transition-colors hover:text-white"
            >
              Портфель проектов →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── LEGEND STRIP ──────────────────────────────────────── */}
      <section className="border-b border-[#d9d6cb] bg-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
          <ScrollReveal>
            <div className="mb-10 flex items-center gap-5">
              <span className="text-[11px] font-black tracking-[0.22em] text-[#3E5854]">LEGEND</span>
              <span className="h-px flex-1 max-w-[48px] bg-[#3E5854]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626675]/60">Шесть типов объектов</span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-px bg-[#d9d6cb] md:grid-cols-3 lg:grid-cols-6">
            {legendTypes.map((type) => (
              <ScrollReveal key={type.code}>
                <div className="group relative flex h-full flex-col gap-4 bg-white p-5 transition-colors duration-300 hover:bg-[#f6f5f1]">
                  <div className="flex items-center justify-between">
                    <span className="font-brand text-[11px] font-black tracking-[0.2em] text-[#626675]/50">{type.code}</span>
                    <span
                      className="h-3 w-3 rounded-[2px] shadow-[0_2px_8px_rgba(13,16,28,0.12)]"
                      style={{ background: type.color }}
                    />
                  </div>
                  <p className="mt-auto text-[13px] font-semibold leading-[1.35] text-[#23273F]">{type.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OFFICIAL YANDEX COLLECTIONS ───────────────────────── */}
      <section className="section section-paper eng-grid-paper">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 flex items-center gap-5 sm:mb-16">
              <span className="text-[11px] font-black tracking-[0.22em] text-[#3E5854]">02 · COLLECTIONS</span>
              <span className="h-px flex-1 max-w-[48px] bg-[#3E5854]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626675]/60">Три официальные коллекции</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="font-brand font-black text-[#23273F] leading-[1.04] max-w-[780px]"
                style={{ fontSize: 'clamp(26px, 3vw, 44px)', letterSpacing: '-0.02em' }}>
              Подборки в Яндекс.Картах
              <span className="block text-[#626675] font-medium mt-3 text-[15px] sm:text-[17px] leading-[1.55] max-w-[640px]">
                Открываются в новой вкладке — каждую можно сохранить себе и пользоваться навигацией прямо из приложения Яндекс.
              </span>
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-px bg-[#d9d6cb] md:grid-cols-3">
            {[
              {
                code: '01',
                tag: 'Завершённые объекты',
                body: 'Объекты по договорам субподряда: проектирование и/или строительство.',
                href: 'https://yandex.ru/maps/?um=constructor%3A89c572294069038bc2c5953ed69f6107017552366d8afa5c058e5fff345ca25d&source=constructorLink',
              },
              {
                code: '02',
                tag: 'Авторский надзор',
                body: 'Ведение авторского надзора на объектах капитального строительства.',
                href: 'https://yandex.ru/maps/?um=constructor%3A2180de31a79390a50b76384a457fb55ba898d4dc42615985d27aeb8723b10ad2&source=constructorLink',
              },
              {
                code: '03',
                tag: 'Газификация домовладений',
                body: '524 индивидуальных проекта внутридомовой газификации с адресным подходом к каждому владельцу.',
                href: 'https://yandex.ru/maps/?um=constructor%3A3bcb4cfe572177476e340f79a6e383bc37f3b534480b412d4b85313c0baab0df&source=constructorLink',
              },
            ].map((c) => (
              <ScrollReveal key={c.code}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col bg-white p-7 transition-colors duration-300 hover:bg-[#f6f5f1] sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-brand text-[11px] font-black tracking-[0.22em] text-[#626675]/50">{c.code}</span>
                    <span className="inline-grid h-8 w-8 place-items-center border border-[#3E5854]/24 bg-[#f6f5f1] text-[#3E5854] transition-all duration-300 group-hover:border-[#3E5854] group-hover:bg-[#3E5854] group-hover:text-white">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M3 3h6v6M3 9l6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                  <span className="mt-6 block h-px w-10 bg-[#3E5854]" />
                  <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#3E5854]">Yandex Maps</p>
                  <h3 className="mt-3 font-brand text-[20px] font-black leading-tight text-[#23273F]">
                    {c.tag}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.65] text-[#626675]">{c.body}</p>
                  <span className="mt-auto pt-8 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#3E5854] transition-all duration-200 group-hover:gap-4">
                    Открыть коллекцию <Arrow />
                  </span>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MAP + FILTERS ─────────────────────────────────────── */}
      <div id="map">
        <YandexMap initialMarkers={markers} />
      </div>

      {/* ─── BOTTOM CTA ────────────────────────────────────────── */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5f8b7d]/36 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 eng-grid-overlay opacity-28" aria-hidden="true" />

        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:items-end">
            <ScrollReveal>
              <p className="overline-light mb-8">Следующий шаг</p>
              <h2
                className="section-title section-title-light leading-[1.02]"
                style={{ fontSize: 'clamp(28px, 3.5vw, 50px)' }}
              >
                Видите объект, похожий на ваш? Покажем документацию
              </h2>
              <p className="body-large body-large-light mt-7 max-w-[460px]">
                ТУ, ПД, исполнительная, акты приёмки — по запросу и с согласованиями. Без общих слов и копий из интернета.
              </p>
            </ScrollReveal>

            <ScrollReveal className="reveal-delay-2">
              <div className="grid gap-px bg-white/[0.08] sm:grid-cols-2">
                <Link
                  href="/#contact"
                  className="group flex items-center justify-between gap-6 bg-[#0d101c]/70 px-7 py-7 transition-colors hover:bg-[#5f8b7d]/14"
                >
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#5f8b7d]">Заявка</p>
                    <p className="mt-3 font-brand text-[18px] font-black leading-tight text-white">Обсудить объект</p>
                  </div>
                  <span className="text-white/60 transition-transform duration-200 group-hover:translate-x-1"><Arrow /></span>
                </Link>
                <Link
                  href="/proekty"
                  className="group flex items-center justify-between gap-6 bg-[#0d101c]/70 px-7 py-7 transition-colors hover:bg-[#5f8b7d]/14"
                >
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#5f8b7d]">Портфель</p>
                    <p className="mt-3 font-brand text-[18px] font-black leading-tight text-white">Перейти к проектам</p>
                  </div>
                  <span className="text-white/60 transition-transform duration-200 group-hover:translate-x-1"><Arrow /></span>
                </Link>
                <Link
                  href="/uslugi"
                  className="group flex items-center justify-between gap-6 bg-[#0d101c]/70 px-7 py-7 transition-colors hover:bg-[#5f8b7d]/14"
                >
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#5f8b7d]">Услуги</p>
                    <p className="mt-3 font-brand text-[18px] font-black leading-tight text-white">Состав работ</p>
                  </div>
                  <span className="text-white/60 transition-transform duration-200 group-hover:translate-x-1"><Arrow /></span>
                </Link>
                <Link
                  href="/o-kompanii"
                  className="group flex items-center justify-between gap-6 bg-[#0d101c]/70 px-7 py-7 transition-colors hover:bg-[#5f8b7d]/14"
                >
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#5f8b7d]">Компания</p>
                    <p className="mt-3 font-brand text-[18px] font-black leading-tight text-white">СРО, ISO, команда</p>
                  </div>
                  <span className="text-white/60 transition-transform duration-200 group-hover:translate-x-1"><Arrow /></span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
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
