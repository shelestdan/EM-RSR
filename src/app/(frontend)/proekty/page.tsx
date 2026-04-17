import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import AnimatedCounter from '@/components/AnimatedCounter'

export const metadata: Metadata = {
  title: 'Проекты — ЕМ-ПСП',
  description:
    'Портфель объектов ЕМ-ПСП: капитальное строительство, инженерные сети, газоснабжение, авторский надзор и газификация.',
}

const stats = [
  { value: 150, suffix: '+', label: 'объектов в портфеле', sub: 'Все типы работ' },
  { value: 524, suffix: '+', label: 'проектов газификации', sub: 'Жилые дома' },
  { value: 40, suffix: '+', label: 'авторский надзор', sub: 'Объектов сопровождено' },
  { value: 5, suffix: '', label: 'регионов', sub: 'СПб, Краснодар, ЮФО' },
]

const directions = [
  {
    code: '01',
    title: 'Капитальное строительство',
    body: 'Объекты с проектной документацией, прошедшей экспертизу. Строительно-монтажные работы, исполнительная документация, координация смежных подрядчиков.',
    tags: ['С экспертизой', 'Без экспертизы'],
    count: '40+',
  },
  {
    code: '02',
    title: 'Инженерные сети',
    body: 'Наружные и внутренние системы водо- и газоснабжения, канализации. Проектирование с учётом трассировки, ограничений площадки и требований эксплуатации.',
    tags: ['Водоснабжение', 'Газоснабжение'],
    count: '80+',
  },
  {
    code: '03',
    title: 'Газификация домовладений',
    body: '524+ проекта в Краснодарском крае и ЮФО. Полный цикл: ТУ, ПД, монтаж, сдача ресурсоснабжающей организации.',
    tags: ['Краснодарский край', 'ЮФО'],
    count: '524+',
  },
  {
    code: '04',
    title: 'Авторский надзор',
    body: 'Сопровождение строительства по проекту: соответствие принятых решений документации, участие в приёмке скрытых работ, журнал надзора.',
    tags: ['Капстроительство', 'Сети'],
    count: '40+',
  },
]

const regions = [
  { name: 'Санкт-Петербург', sub: 'Проектирование, изыскания', pct: 90 },
  { name: 'Ленинградская обл.', sub: 'Строительство, надзор', pct: 72 },
  { name: 'Краснодарский край', sub: 'Газификация, сети', pct: 64 },
  { name: 'Ростовская область', sub: 'Сети, строительство', pct: 38 },
  { name: 'Ставропольский край', sub: 'Газификация', pct: 24 },
]

export default function ProjectsPage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="section-dark relative min-h-[82vh] flex flex-col justify-end overflow-hidden pt-32 pb-16 sm:pb-20 lg:pb-28">
        <div className="absolute inset-0 eng-grid-overlay opacity-36" aria-hidden="true" />

        {/* Large decorative number */}
        <div
          className="pointer-events-none absolute right-0 top-0 select-none font-brand font-black leading-none text-white opacity-[0.03]"
          style={{ fontSize: 'clamp(220px, 32vw, 480px)', lineHeight: 0.8, transform: 'translate(5%, -5%)' }}
          aria-hidden="true"
        >
          150
        </div>

        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          <nav className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/28" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-white/60">Главная</Link>
            <span className="text-white/16">/</span>
            <span className="text-white/50">Проекты</span>
          </nav>

          <p className="overline-light mb-8">Портфель · ЕМ-ПСП</p>
          <h1
            className="font-brand font-black text-white max-w-[860px]"
            style={{ fontSize: 'clamp(36px, 5.5vw, 80px)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
          >
            Объекты,<br />которые подтверждают<br />компетенцию
          </h1>
          <p className="mt-10 max-w-[560px] text-[15px] leading-[1.78] text-white/50 sm:text-[17px]">
            Капстроительство, инженерные сети, экспертиза, надзор и газификация — 150+ объектов, которые можно проверить.
          </p>

          {/* Stat strip */}
          <div className="mt-14 grid grid-cols-2 gap-px bg-white/[0.06] sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#07090f]/60 px-5 py-6 sm:px-7 sm:py-7">
                <div
                  className="font-brand font-black leading-none text-white"
                  style={{ fontSize: 'clamp(28px, 3.2vw, 42px)' }}
                >
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/36">{s.label}</div>
                <div className="mt-1 text-[10px] text-white/20">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DIRECTIONS — editorial list ───────────────────────── */}
      <section className="section section-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid gap-8 pb-14 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div>
                <p className="section-kicker mb-5">Направления</p>
                <h2 className="section-title leading-[1]">Четыре направления работы</h2>
              </div>
              <p className="body-large max-w-[460px]">
                Каждое направление подкреплено реальными объектами — СРО, ISO, документация по запросу.
              </p>
            </div>
          </ScrollReveal>

          {/* Editorial rows */}
          <div className="border-t border-[#d9d6cb]">
            {directions.map((dir, index) => (
              <ScrollReveal key={dir.code} className={`reveal-delay-${(index % 3) + 1}`}>
                <article
                  className="group relative grid grid-cols-[48px_1fr] gap-x-5 border-b border-[#d9d6cb] py-10 transition-colors duration-300 hover:bg-[#f9f8f3] sm:grid-cols-[80px_1fr_auto] sm:gap-x-10 sm:py-14 lg:grid-cols-[80px_1.2fr_1.8fr_220px] lg:gap-x-16"
                >
                  {/* Column 1 — Code */}
                  <div className="pt-2 font-brand text-[13px] font-black tracking-[0.2em] text-[#3E5854] sm:text-[14px]">
                    {dir.code}
                  </div>

                  {/* Column 2 — Title */}
                  <div className="min-w-0">
                    <h3
                      className="font-brand font-black leading-[1.02] text-[#23273F]"
                      style={{ fontSize: 'clamp(22px, 2.4vw, 34px)' }}
                    >
                      {dir.title}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {dir.tags.map(tag => (
                        <span
                          key={tag}
                          className="border border-[#d9d6cb] bg-white px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[#626675] transition-colors duration-300 group-hover:border-[#3E5854]/36 group-hover:text-[#3E5854]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Column 3 — Description (desktop) */}
                  <p className="col-span-2 mt-4 max-w-[520px] text-[15px] leading-[1.78] text-[#626675] sm:col-span-2 sm:col-start-2 sm:mt-6 lg:col-span-1 lg:col-start-3 lg:mt-0 lg:pt-2">
                    {dir.body}
                  </p>

                  {/* Column 4 — Count + arrow (desktop), separate block on mobile */}
                  <div className="col-span-2 col-start-2 mt-6 flex items-end justify-between gap-4 border-t border-[#eeece4] pt-5 sm:col-span-1 sm:col-start-3 sm:mt-0 sm:flex-col sm:items-end sm:justify-end sm:border-t-0 sm:pt-0 lg:col-start-4 lg:self-start lg:pt-1">
                    <div className="text-right">
                      <div
                        className="font-brand font-black leading-none text-[#23273F] transition-colors duration-300 group-hover:text-[#3E5854]"
                        style={{ fontSize: 'clamp(40px, 4.2vw, 60px)', letterSpacing: '-0.02em' }}
                      >
                        {dir.count}
                      </div>
                      <div className="mt-2 text-[9px] font-black uppercase tracking-[0.18em] text-[#626675]/52">
                        объектов
                      </div>
                    </div>
                    <span className="inline-grid h-10 w-10 shrink-0 place-items-center border border-[#d9d6cb] text-[#3E5854] transition-all duration-300 group-hover:border-[#3E5854] group-hover:bg-[#3E5854] group-hover:text-white sm:mt-5">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                        <path d="M3 7h8M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GEOGRAPHY ─────────────────────────────────────────── */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5f8b7d]/36 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 eng-grid-overlay opacity-28" aria-hidden="true" />

        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24 lg:items-start">

            <ScrollReveal>
              <p className="overline-light mb-8">География</p>
              <h2
                className="section-title section-title-light leading-[1.02]"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                Работаем в пяти регионах России
              </h2>
              <p className="body-large body-large-light mt-7 max-w-[400px]">
                Основная активность — Северо-Запад и Юг. Документация и выезд возможны в другие регионы по согласованию.
              </p>

              <div className="mt-12 border border-white/10 bg-[#0d101c]/60 p-6 sm:p-8">
                <p className="mb-6 text-[9px] font-black uppercase tracking-[0.26em] text-white/24">
                  Объектов по регионам (относительно)
                </p>
                <div className="space-y-5">
                  {regions.map((r) => (
                    <div key={r.name}>
                      <div className="mb-2 flex items-baseline justify-between gap-4">
                        <span className="text-[13px] font-semibold text-white/70">{r.name}</span>
                        <span className="shrink-0 text-[10px] text-white/30">{r.sub}</span>
                      </div>
                      <div className="h-px bg-white/[0.08]">
                        <div
                          className="h-[1px] bg-gradient-to-r from-[#5f8b7d] to-[#3E5854]"
                          style={{ width: `${r.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="reveal-delay-2">
              {/* Map CTA block */}
              <div className="border border-white/10">
                <div className="bg-[#0d101c]/70 p-8 sm:p-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center border border-[#5f8b7d]/30 bg-[#5f8b7d]/10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f8b7d" strokeWidth="1.5" aria-hidden="true">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z"/>
                      <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                  </div>
                  <h3 className="font-brand text-[22px] font-black text-white leading-tight">
                    Все объекты — на интерактивной карте
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.75] text-white/46">
                    Фильтры по типу работ, региону и году. Маркеры с краткими данными по объекту. Честнее статичной галереи без контекста.
                  </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-px bg-white/[0.07]">
                  {[
                    ['150+', 'Маркеров'],
                    ['5', 'Регионов'],
                    ['3', 'Типа объектов'],
                  ].map(([val, label]) => (
                    <div key={label} className="bg-[#0d101c]/60 px-4 py-5 sm:px-6">
                      <div className="font-brand text-[24px] font-black leading-none text-white">{val}</div>
                      <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.14em] text-white/28">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#0d101c]/50 p-6 sm:p-8">
                  <Link href="/karta-obektov" className="btn btn-primary w-full justify-center">
                    Открыть карту объектов
                  </Link>
                  <Link href="/o-kompanii#certs" className="btn btn-outline-white mt-3 w-full justify-center">
                    Сертификаты и допуски
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP ───────────────────────────────────────── */}
      <section className="border-b border-[#d9d6cb] bg-white py-10 sm:py-12">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid gap-8 sm:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-[#d9d6cb]">
              {[
                { label: 'СРО проектирование', value: 'П-174-007801724375-3773' },
                { label: 'СРО изыскания', value: 'И-037-007801724375-1897' },
                { label: 'ISO сертификаты', value: '9001 · 14001 · 45001' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-2 lg:px-10 lg:first:pl-0 lg:last:pr-0">
                  <span className="text-[9px] font-black uppercase tracking-[0.22em] text-[#626675]/50">{item.label}</span>
                  <span className="font-brand text-[17px] font-black text-[#23273F]">{item.value}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── BOTTOM CTA ────────────────────────────────────────── */}
      <section className="section section-paper eng-grid-paper">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-kicker mb-5">Следующий шаг</p>
                <h2 className="section-title max-w-[620px] leading-[1]">
                  Хотите обсудить похожую задачу?
                </h2>
                <p className="body-large mt-6 max-w-[540px]">
                  Покажем релевантные объекты из портфеля, документацию по запросу и предложим инженерный подход к вашей задаче.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:min-w-[220px]">
                <Link href="/#contact" className="btn btn-primary min-h-[52px] px-8">
                  Обсудить задачу
                </Link>
                <Link href="/karta-obektov" className="btn btn-outline-dark min-h-[52px] px-8">
                  Карта объектов
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
