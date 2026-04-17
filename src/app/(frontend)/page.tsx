import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedCounter from '@/components/AnimatedCounter'
import LeadForm from '@/components/LeadForm'
import ScrollReveal from '@/components/ScrollReveal'
import SilentVideo from '@/components/SilentVideo'
import { metrics, principles, servicePillars, trustBadges, workflow } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'ЕМ-ПСП — инженерное проектирование, строительство, экспертиза',
  description:
    'ЕМ-ПСП ведёт инженерные объекты от изысканий и проектирования до строительства, экспертизы и авторского надзора. СРО, ISO, 150+ объектов.',
  openGraph: {
    title: 'ЕМ-ПСП — инженерные объекты под полную ответственность',
    description: 'Проектирование, сети, строительство, экспертиза и авторский надзор.',
    images: [{ url: '/brand/logo.png', width: 1200, height: 630 }],
  },
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M2.5 7h9M8.5 3 12 7l-3.5 4" />
  </svg>
)

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[#07090f] text-white">

        {/* ─── TOP META RAIL (above everything) ──────────────── */}
        <div className="relative z-20 border-b border-white/[0.06] bg-[#07090f]/70 backdrop-blur-sm">
          <div className="container mx-auto flex items-center justify-between gap-6 px-5 pt-28 pb-3 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-white/52">
              <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#5f8b7d]/80" />
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[#5f8b7d]" />
              </span>
              <span>N°001 · EM-PSP</span>
            </div>
            <div className="hidden items-center gap-6 text-[9px] font-bold uppercase tracking-[0.22em] text-white/32 md:flex">
              <span>STATUS · ACTIVE</span>
              <span className="h-px w-4 bg-white/20" />
              <span>SPB · KRASNODAR</span>
              <span className="h-px w-4 bg-white/20" />
              <span>2023 — 2026</span>
            </div>
          </div>
        </div>

        {/* ─── SPLIT BODY — dedicated text/video panels ──────── */}
        <div className="relative z-10 grid flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">

          {/* ═══ LEFT — SOLID CONTENT PANEL ═══════════════════ */}
          <div className="relative flex flex-col bg-[#07090f]">

            {/* Subtle grid texture (only inside text panel) */}
            <div className="pointer-events-none absolute inset-0 eng-grid-overlay opacity-[0.14]" aria-hidden="true" />

            {/* Giant watermark number, lives inside text panel */}
            <div
              className="pointer-events-none absolute -left-2 bottom-8 select-none font-brand font-black leading-none text-white opacity-[0.03] lg:bottom-16"
              style={{ fontSize: 'clamp(200px, 22vw, 340px)', letterSpacing: '-0.06em' }}
              aria-hidden="true"
            >
              150
            </div>

            {/* Content */}
            <div className="relative flex flex-1 flex-col justify-end px-5 pb-12 pt-14 sm:px-6 sm:pb-14 sm:pt-16 lg:px-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pb-20 lg:pt-20">

              {/* Overline */}
              <div className="mb-10 flex items-center gap-5 sm:mb-12">
                <span className="h-px w-14 shrink-0 bg-[#5f8b7d]" aria-hidden="true" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8ab0a3]">
                  Инженерный контур
                </span>
              </div>

              {/* H1 — fluid, max 2 lines on desktop, balanced wrap on mobile */}
              <h1
                className="font-brand font-black leading-[0.95] text-white [text-wrap:balance]"
                style={{ fontSize: 'clamp(36px, 4.6vw, 72px)', letterSpacing: '-0.02em' }}
              >
                Инженерные объекты под{' '}
                <span className="relative inline-block text-[#8ab0a3] whitespace-nowrap">
                  один контур
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-[0.08em] left-0 right-0 h-[0.055em] bg-[#5f8b7d]/70"
                  />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-10 max-w-[520px] text-[15px] leading-[1.72] text-white/62 sm:mt-12 sm:text-[17px]">
                Изыскания, проект, экспертиза, строительство и надзор — один контрагент, управляемые сроки, точная цена.
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Link href="/#contact" className="btn btn-primary min-h-[54px] px-8 text-[12px]">
                  Обсудить объект
                </Link>
                <Link href="/proekty" className="btn btn-outline-white min-h-[54px] px-8 text-[12px]">
                  Смотреть портфель
                </Link>
              </div>

              {/* Trust strip */}
              <div className="mt-14 border-t border-white/[0.08] pt-7">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-7">
                  {trustBadges.map((badge, i) => (
                    <span
                      key={badge}
                      className={`flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/48 ${i > 0 ? 'md:pl-6 md:border-l md:border-white/[0.1] md:gap-3 md:pl-7' : ''}`}
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-[#5f8b7d]" aria-hidden="true" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ═══ RIGHT — VIDEO PANEL ════════════════════════════ */}
          <div className="relative order-first min-h-[42vh] overflow-hidden border-b border-white/[0.08] bg-[#0a0d15] lg:order-none lg:min-h-0 lg:border-b-0 lg:border-l">

            {/* Video canvas fills panel */}
            <SilentVideo
              src="/brand/EM-PCP%20mp4.mp4"
              className="absolute inset-0 h-full w-full"
              xOffset={0.5}
            />

            {/* Feather edge blend into left panel (desktop only) */}
            <div
              className="pointer-events-none absolute inset-y-0 -left-1 hidden w-24 bg-[linear-gradient(90deg,rgba(7,9,15,1)_0%,rgba(7,9,15,0.7)_40%,rgba(7,9,15,0)_100%)] lg:block"
              aria-hidden="true"
            />
            {/* Slight overall darken for contrast */}
            <div className="pointer-events-none absolute inset-0 bg-[#07090f]/22" aria-hidden="true" />
            {/* Bottom fade */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,rgba(7,9,15,0.9)_0%,transparent_100%)]"
              aria-hidden="true"
            />
            {/* Top fade (mobile only) */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(7,9,15,0.7)_0%,transparent_100%)] lg:hidden"
              aria-hidden="true"
            />

            {/* Corner tag — top right */}
            <div className="pointer-events-none absolute right-5 top-5 z-10 flex items-center gap-2 border border-white/14 bg-[#07090f]/70 px-3 py-1.5 backdrop-blur-sm sm:right-8 sm:top-8">
              <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#5f8b7d]/80" />
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[#5f8b7d]" />
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.22em] text-white/70">LIVE · BRAND REEL</span>
            </div>

            {/* Bottom-right crosshair marker */}
            <div className="pointer-events-none absolute bottom-6 right-6 z-10 hidden items-center gap-3 text-white/40 sm:flex">
              <span className="text-[9px] font-bold uppercase tracking-[0.26em]">EM · PSP</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                <circle cx="10" cy="10" r="8" />
                <path d="M10 2v4M10 14v4M2 10h4M14 10h4" strokeLinecap="round" />
                <circle cx="10" cy="10" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </div>

            {/* Scroll cue bottom-left inside video panel */}
            <div className="pointer-events-none absolute bottom-8 left-6 z-10 hidden items-end gap-3 text-white/48 lg:flex">
              <span
                className="font-brand text-[9px] font-black uppercase tracking-[0.3em]"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                SCROLL
              </span>
              <span className="block h-16 w-px bg-gradient-to-b from-transparent via-[#5f8b7d]/60 to-[#5f8b7d]" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* ─── METRICS BAND ───────────────────────────────────── */}
        <div className="relative z-10 border-t border-white/[0.08] bg-[#07090f]">
          <div className="container mx-auto grid grid-cols-2 px-5 sm:px-6 lg:grid-cols-4 lg:px-8">
            {metrics.map((metric, i) => (
              <div
                key={metric.label}
                className={`group py-6 transition-colors duration-300 hover:bg-white/[0.02] sm:py-7 ${i % 2 === 0 ? 'pr-4' : 'pl-4'} lg:px-6 ${
                  i < 3 ? 'lg:border-r lg:border-white/[0.08]' : ''
                } ${i < 2 ? 'border-r border-white/[0.08] lg:border-r-0' : ''}`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-brand text-[9px] font-black tracking-[0.22em] text-[#5f8b7d]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px w-6 bg-[#5f8b7d]/50 transition-all duration-300 group-hover:w-10" />
                </div>
                <div
                  className="font-brand font-black leading-none text-white tabular-nums"
                  style={{ fontSize: 'clamp(30px, 3.6vw, 52px)', letterSpacing: '-0.02em' }}
                >
                  <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                </div>
                <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white/38">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────────── */}
      <section className="section section-paper eng-grid-paper" id="services">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">

          {/* Header row */}
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
            <ScrollReveal>
              <p className="section-kicker mb-5">Услуги</p>
              <h2 className="section-title leading-[1]">Услуги собраны по логике объекта</h2>
            </ScrollReveal>
            <ScrollReveal className="reveal-delay-1">
              <p className="body-large max-w-[560px]">
                Заказчику важно не название услуги, а управляемый результат. Показываем работу как инженерный цикл: база, сети, строительство, экспертиза, надзор.
              </p>
              <Link
                href="/uslugi"
                className="mt-8 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#3E5854] transition-colors hover:text-[#23273F]"
              >
                Все услуги <Arrow />
              </Link>
            </ScrollReveal>
          </div>

          {/* Service cards */}
          <div className="mt-16 grid gap-px bg-[#d9d6cb] sm:grid-cols-2 lg:grid-cols-4">
            {servicePillars.map((service, index) => (
              <ScrollReveal key={service.id} className={`reveal-delay-${(index % 4) + 1}`}>
                <Link
                  href={`/uslugi#${service.id}`}
                  className="group relative flex h-full flex-col overflow-hidden bg-white p-8 transition-all duration-400 hover:bg-[#191c2d] sm:min-h-[360px] sm:p-10"
                >
                  {/* Number */}
                  <span className="text-[11px] font-black tracking-[0.2em] text-[#3E5854] transition-colors duration-300 group-hover:text-[#8ab0a3]">
                    {service.code}
                  </span>

                  {/* Divider — slides right on hover */}
                  <span className="mt-6 block h-px w-8 bg-[#d9d6cb] transition-all duration-500 group-hover:w-16 group-hover:bg-[#5f8b7d]" />

                  {/* Title */}
                  <h3 className="mt-8 font-brand text-[28px] font-black leading-[1.05] text-[#23273F] transition-colors duration-300 group-hover:text-white">
                    {service.title}
                  </h3>

                  {/* Summary */}
                  <p className="mt-5 text-[14px] leading-[1.78] text-[#626675] transition-colors duration-300 group-hover:text-white/58">
                    {service.summary}
                  </p>

                  {/* CTA row */}
                  <div className="mt-auto flex items-center gap-2 pt-10 text-[11px] font-black uppercase tracking-[0.14em] text-[#3E5854] transition-colors duration-300 group-hover:text-white">
                    Подробнее <Arrow />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── METHOD ───────────────────────────────────────────── */}
      <section className="section section-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
            <ScrollReveal>
              <p className="section-kicker mb-5">Метод</p>
              <h2 className="section-title leading-[1]">Инженерная дисциплина вместо подрядного шума</h2>
            </ScrollReveal>
            <ScrollReveal className="reveal-delay-1">
              <p className="body-large max-w-[560px]">
                Мы не продаём «от». Стоимость, сроки и состав работ определяются после анализа объекта, исходных данных и требуемого результата.
              </p>
            </ScrollReveal>
          </div>

          {/* Steps */}
          <div className="mt-16 grid gap-px bg-[#d9d6cb] lg:grid-cols-3">
            {workflow.map((step, index) => (
              <ScrollReveal key={step.title} className={`reveal-delay-${index + 1}`}>
                <div className="group flex h-full flex-col bg-white p-8 transition-colors duration-300 hover:bg-[#f6f5f1] sm:p-10">
                  {/* Large number */}
                  <div
                    className="font-brand font-black leading-none text-[#eeece4] transition-colors duration-300 group-hover:text-[#d9d6cb]"
                    style={{ fontSize: 'clamp(72px, 6vw, 96px)' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Divider */}
                  <span className="mt-8 block h-px w-10 bg-[#3E5854]" />

                  {/* Title */}
                  <h3 className="mt-7 font-brand text-[26px] font-black leading-tight text-[#23273F]">
                    {step.title}
                  </h3>

                  {/* Body */}
                  <p className="mt-5 text-[15px] leading-[1.78] text-[#626675]">
                    {step.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO MAP ────────────────────────────────────── */}
      <section className="section section-dark relative overflow-hidden">
        {/* Top accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5f8b7d]/40 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 eng-grid-overlay opacity-35" aria-hidden="true" />

        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24 lg:items-center">

            {/* LEFT — copy */}
            <ScrollReveal>
              <p className="overline-light mb-8">Портфель</p>
              <h2 className="section-title section-title-light leading-[1.02] max-w-[440px]">
                Объекты, которые можно проверить
              </h2>
              <p className="body-large body-large-light mt-7 max-w-[420px]">
                Карта с фильтрами по типу, региону и году. Заключения экспертизы, свидетельства СРО и сертификаты ISO по запросу.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href="/karta-obektov" className="btn btn-primary">Открыть карту</Link>
                <Link href="/o-kompanii#certs" className="btn btn-outline-white">Документы</Link>
              </div>
            </ScrollReveal>

            {/* RIGHT — data panel */}
            <ScrollReveal className="reveal-delay-2">
              {/* Hero stat */}
              <div className="border border-white/10">
                <div className="border-b border-white/10 bg-[#0d101c]/70 px-6 py-7 sm:px-8 sm:py-9">
                  <div className="flex items-end gap-2">
                    <span
                      className="font-brand font-black leading-none text-white"
                      style={{ fontSize: 'clamp(80px, 8vw, 120px)' }}
                    >
                      150
                    </span>
                    <span
                      className="mb-1 font-brand font-black leading-none text-[#5f8b7d]"
                      style={{ fontSize: 'clamp(52px, 5.5vw, 80px)' }}
                    >
                      +
                    </span>
                  </div>
                  <p className="mt-3 text-[11px] font-black uppercase tracking-[0.22em] text-white/32">
                    объектов в портфеле
                  </p>
                </div>

                {/* 2×2 secondary stats */}
                <div className="grid grid-cols-2 gap-px bg-white/[0.07]">
                  {([
                    ['524+', 'Газификация'],
                    ['80+', 'Инженерные сети'],
                    ['40+', 'Авторский надзор'],
                    ['5', 'Регионов'],
                  ] as [string, string][]).map(([val, label]) => (
                    <div key={label} className="bg-[#0d101c]/60 px-5 py-5 sm:px-7 sm:py-6">
                      <div className="font-brand text-[28px] sm:text-[34px] font-black leading-none text-white">{val}</div>
                      <div className="mt-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/36">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Region bars */}
              <div className="mt-3 border border-white/8 px-6 py-5 sm:px-7 sm:py-6">
                <p className="mb-5 text-[9px] font-black uppercase tracking-[0.24em] text-white/24">
                  Распределение по регионам
                </p>
                <div className="space-y-3.5">
                  {([
                    ['СПб и Ленинградская обл.', 85],
                    ['Краснодарский край', 64],
                    ['Ростовская область', 36],
                    ['Ставропольский край', 24],
                  ] as [string, number][]).map(([region, pct]) => (
                    <div key={region} className="flex items-center gap-4">
                      <span className="w-[160px] shrink-0 text-[11px] text-white/40 sm:w-[190px]">{region}</span>
                      <div className="relative h-px flex-1 bg-white/[0.08]">
                        <div
                          className="absolute top-[-0.5px] left-0 h-[1px] bg-gradient-to-r from-[#5f8b7d] to-[#3E5854]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── PRINCIPLES ───────────────────────────────────────── */}
      <section className="section section-paper">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">

          {/* Header row */}
          <ScrollReveal>
            <div className="grid gap-8 border-b border-[#d9d6cb] pb-12 sm:pb-16 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div>
                <p className="section-kicker mb-5">Принципы работы</p>
                <h2 className="section-title leading-[1]">Три правила, по которым строится работа</h2>
              </div>
              <p className="body-large max-w-[480px]">
                Не декларации — рабочие установки, которые определяют, как устроена работа с заказчиком на каждом этапе.
              </p>
            </div>
          </ScrollReveal>

          {/* Principle rows — editorial layout */}
          {principles.map((principle, index) => (
            <ScrollReveal key={principle.code} className={`reveal-delay-${index + 1}`}>
              <div className="grid grid-cols-[52px_1fr] gap-x-6 items-start border-b border-[#d9d6cb] py-10 sm:grid-cols-[72px_1fr] sm:gap-x-10 sm:py-14 lg:grid-cols-[72px_1fr_1fr] lg:gap-x-16">

                {/* Index number */}
                <div
                  className="font-brand font-black leading-none text-[#d9d6cb] pt-1"
                  style={{ fontSize: 'clamp(40px, 4vw, 56px)' }}
                >
                  {principle.code}
                </div>

                {/* Title — with green left border accent */}
                <div className="border-l-2 border-[#3E5854] pl-5 sm:pl-7">
                  <h3
                    className="font-brand font-black leading-[1.08] text-[#23273F]"
                    style={{ fontSize: 'clamp(20px, 2vw, 26px)' }}
                  >
                    {principle.title}
                  </h3>
                  {/* Body — visible below title on mobile/tablet */}
                  <p className="mt-5 text-[15px] leading-[1.78] text-[#626675] lg:hidden">
                    {principle.body}
                  </p>
                </div>

                {/* Body — desktop only, third column */}
                <p className="hidden text-[15px] leading-[1.78] text-[#626675] lg:block lg:pt-1">
                  {principle.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ─── VIDEO SHOWCASE ───────────────────────────────────── */}
      <section className="overflow-hidden bg-[#07090f] pb-0 pt-16 sm:pt-20 lg:pt-28">
        {/* Header row */}
        <div className="container mx-auto px-5 pb-12 sm:px-6 sm:pb-16 lg:px-8">
          <ScrollReveal>
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="overline-light mb-5">О компании</p>
                <h2
                  className="section-title section-title-light leading-[1]"
                >
                  Живой масштаб,<br className="hidden sm:block" /> а не стоковая графика
                </h2>
              </div>
              <p className="hidden max-w-[280px] text-[14px] leading-[1.7] text-white/36 lg:block lg:pb-1">
                Видео снято на наших объектах. Инженерия, площадка, команда — без рекламной обработки.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Full-bleed cinematic video */}
        <ScrollReveal className="reveal-delay-1">
          <div className="relative bg-[#0d101c]">
            {/* Video container — 16:9, bleeds full width */}
            <div className="relative w-full select-none" style={{ aspectRatio: '16/9' }}>
              <SilentVideo
                src="/brand/EM-PCP%20mp4.mp4"
                className="h-full w-full opacity-[0.92]"
                xOffset={0.75}
              />
              {/* Subtle inner shadow vignette */}
              <div
                className="pointer-events-none absolute inset-0 z-20"
                style={{ boxShadow: 'inset 0 0 120px rgba(7,9,15,0.5)' }}
                aria-hidden="true"
              />
              {/* Top fade */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-[#07090f]/60 to-transparent" aria-hidden="true" />
            </div>

            {/* Caption bar */}
            <div className="container mx-auto flex items-center justify-between gap-4 border-t border-white/[0.07] px-5 py-4 sm:px-6 lg:px-8">
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-white/24">
                ЕМ-ПСП · Инженерный контур
              </span>
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/16 hidden sm:block">
                  Краснодар · Санкт-Петербург
                </span>
                <span className="h-1.5 w-1.5 bg-[#5f8b7d]" aria-hidden="true" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── CONTACT ──────────────────────────────────────────── */}
      <section className="section section-dark relative overflow-hidden" id="contact">
        {/* Top gradient accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5f8b7d]/36 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 eng-grid-overlay opacity-28" aria-hidden="true" />

        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24 lg:items-start">

            {/* LEFT — copy + contact details */}
            <ScrollReveal>
              <p className="overline-light mb-8">Контакт</p>
              <h2
                className="section-title section-title-light leading-[1.02]"
                style={{ fontSize: 'clamp(30px, 3.8vw, 50px)' }}
              >
                Начнём с точной оценки задачи
              </h2>
              <p className="body-large body-large-light mt-7 max-w-[400px]">
                Опишите объект, стадию и ожидаемый результат — зададим уточняющие вопросы и предложим инженерный шаг.
              </p>

              {/* Contact details */}
              <div className="mt-12">
                {(
                  [
                    {
                      label: 'Телефон',
                      value: '+7 (989) 288-89-80',
                      href: 'tel:+79892888980',
                      icon: (
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                          <path d="M2.5 2.5h3.25l1.25 3-1.5 1a8 8 0 0 0 3 3l1-1.5 3 1.25V12a1 1 0 0 1-1 1C4.5 13 1.5 10 1.5 4a1 1 0 0 1 1-1.5Z"/>
                        </svg>
                      ),
                    },
                    {
                      label: 'Email',
                      value: 'em-psp@mail.ru',
                      href: 'mailto:em-psp@mail.ru',
                      icon: (
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                          <rect x="1.5" y="3.5" width="12" height="8" rx="1"/>
                          <path d="m1.5 4 6 4.5 6-4.5"/>
                        </svg>
                      ),
                    },
                    {
                      label: 'Адрес',
                      value: 'Краснодар, ул. Коммунаров 76, офис 382/9',
                      href: null,
                      icon: (
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                          <path d="M7.5 1.5a4.5 4.5 0 0 1 4.5 4.5c0 3-4.5 7.5-4.5 7.5S3 9 3 6a4.5 4.5 0 0 1 4.5-4.5Z"/>
                          <circle cx="7.5" cy="6" r="1.5"/>
                        </svg>
                      ),
                    },
                  ] as { label: string; value: string; href: string | null; icon: React.ReactNode }[]
                ).map(({ label, value, href, icon }) => (
                  <div key={label} className="flex items-start gap-4 border-t border-white/[0.08] py-5">
                    <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center border border-white/10 bg-white/[0.04] text-white/40">
                      {icon}
                    </div>
                    <div>
                      <div className="mb-1 text-[9px] font-black uppercase tracking-[0.2em] text-white/24">
                        {label}
                      </div>
                      {href ? (
                        <a href={href} className="text-[14px] font-medium text-white/64 transition-colors hover:text-white">
                          {value}
                        </a>
                      ) : (
                        <p className="text-[14px] text-white/38">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Badges */}
              <div className="mt-8 border-t border-white/[0.08] pt-8">
                <p className="mb-4 text-[9px] font-black uppercase tracking-[0.26em] text-white/20">
                  Допуски и сертификаты
                </p>
                <div className="space-y-2.5">
                  {[
                    'СРО проектирование П-174',
                    'СРО изыскания И-037',
                    'ISO 9001 · 14001 · 45001',
                  ].map((b) => (
                    <div key={b} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 shrink-0 bg-[#5f8b7d]" />
                      <span className="text-[11px] text-white/32">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* RIGHT — form panel */}
            <ScrollReveal className="reveal-delay-2">
              <div className="border border-white/10 bg-[#0d101c]/70 p-7 sm:p-10">
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="font-brand text-[20px] font-black text-white">
                    Оставить заявку
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/24">
                    Бесплатно
                  </span>
                </div>
                <LeadForm source="homepage" dark />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
