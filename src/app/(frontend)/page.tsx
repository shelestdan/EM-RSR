import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedCounter from '@/components/AnimatedCounter'
import LeadForm from '@/components/LeadForm'
import ScrollReveal from '@/components/ScrollReveal'
import SilentVideo from '@/components/SilentVideo'
import YandexMap from './karta-obektov/YandexMap'
import { staticMarkers } from './proekty/markers-data'
import { brand, metrics, principles, servicePillars, workflow } from '@/lib/site-data'
import HeroAcronym from '@/components/HeroAcronym'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

// KPI card — easily editable (CMS-friendly)
const portfolioKpi = {
  headline: { value: 150, suffix: '+', label: 'объектов в портфеле' },
  grid: [
    { value: 524, suffix: '+', label: 'газификация' },
    { value: 80, suffix: '+', label: 'инженерные сети' },
    { value: 40, suffix: '+', label: 'авторский надзор' },
    { value: 9, suffix: '', label: 'регионов' },
  ],
}

const homeServiceCards = [
  {
    id: 'izyskaniya-kadastr',
    title: 'Проектная база',
    body: 'Изыскания, исходные данные, проектная и рабочая документация в одной связке.',
  },
  {
    id: 'proektirovanie',
    title: 'Инженерные сети',
    body: 'Наружные и внутренние системы водоснабжения, канализации, газоснабжения и сопутствующей инфраструктуры.',
  },
  {
    id: 'stroitelstvo',
    title: 'Строительство и монтаж',
    body: 'СМР по проекту, контроль сроков, исполнительная документация и координация на объекте.',
  },
  {
    id: 'avtorskij-nadzor',
    title: 'Экспертиза и надзор',
    body: 'Сопровождение замечаний, авторский надзор, контроль соответствия документации и фактических работ.',
  },
]

export const metadata: Metadata = {
  title: 'EM-PCP — инженерное проектирование, строительство, экспертиза',
  description:
    'EM-PCP ведёт инженерные объекты от изысканий и проектирования до строительства, экспертизы и авторского надзора. СРО, ISO, 150+ объектов.',
  openGraph: {
    title: 'EM-PCP — инженерные объекты под полную ответственность',
    description: 'Проектирование, сети, строительство, экспертиза и авторский надзор.',
    images: [{ url: `${BASE}/brand/logo.png`, width: 1200, height: 630 }],
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
      <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-white">

        {/* ─── SPLIT BODY 60/40 ───────────────────────────── */}
        <div className="relative z-10 grid flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">

          {/* LEFT — CONTENT */}
          <div className="relative flex flex-col bg-white">
            <div className="relative flex flex-1 flex-col justify-center px-5 pb-10 pt-12 sm:px-8 sm:pb-12 sm:pt-14 lg:px-10 lg:pb-16 lg:pt-16 xl:px-14">
              <HeroAcronym />
            </div>
          </div>

          {/* RIGHT — VIDEO (40%)
               ─ Белый фон, нет паддингов, видео на всю колонку
               ─ fit="contain" + bg-white = нет чёрных полей даже при несоответствии пропорций
               ─ После получения кадрированного ассета заменить src ниже:
                   src={`${BASE}/brand/hero-ref.mp4`}  →  src={`${BASE}/brand/<NEW_VIDEO>.mp4`}
          */}
          <div className="relative order-first min-h-[45vh] overflow-hidden border-b border-[#ebe8e3] bg-white lg:order-none lg:min-h-0 lg:border-b-0">
            <div className="absolute inset-0 bg-white">
              <SilentVideo
                src={`${BASE}/brand/logo-video.mov`}
                fallbackSrc={`${BASE}/brand/EM-PCP%20gif.gif`}
                className="absolute inset-0 h-full w-full"
                xOffset={0.5}
                playbackRate={1}
                fit="cover"
                zoom={0.8}
              />
            </div>
          </div>
        </div>

        {/* ─── METRICS BAND ───────────────────────────────── */}
        <div className="relative z-10 border-t border-[#d9d6cb] bg-[#f6f5f1]">
          <div className="container mx-auto grid grid-cols-2 px-5 sm:px-6 lg:grid-cols-4 lg:px-8">
            {metrics.map((metric, i) => (
              <div
                key={metric.label}
                className={`py-7 sm:py-8 lg:px-6 ${i % 2 === 0 ? 'pr-4 lg:pr-0' : 'pl-4 lg:pl-0'}`}
              >
                <div
                  className="font-brand font-black leading-none text-[#23273F] tabular-nums"
                  style={{ fontSize: 'clamp(30px, 3.6vw, 52px)', letterSpacing: '-0.02em' }}
                >
                  <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                </div>
                <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#626675]">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────────── */}
      <section className="section section-paper" id="services">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
            <ScrollReveal>
              <h2 className="section-title leading-[1.08]">Услуги собраны по логике объекта</h2>
            </ScrollReveal>
            <ScrollReveal className="reveal-delay-1">
              <p className="body-large max-w-[560px]">
                Направления сгруппированы по этапам жизненного цикла объекта. Заказчику важен итог, а не внутренние названия процессов
              </p>
              <Link
                href="/uslugi"
                className="mt-8 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#3E5854] transition-colors hover:text-[#23273F]"
              >
                Все услуги <Arrow />
              </Link>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid gap-px bg-[#d9d6cb] sm:grid-cols-2 lg:grid-cols-4">
            {homeServiceCards.map((service, index) => (
              <ScrollReveal key={service.id} className={`reveal-delay-${(index % 4) + 1}`}>
                <Link
                  href={`/uslugi#${service.id}`}
                  className="group relative flex h-full flex-col overflow-hidden bg-white p-8 transition-all duration-400 hover:bg-[#191c2d] sm:min-h-[360px] sm:p-10"
                >
                  <h3 className="font-brand text-[24px] font-black leading-[1.1] text-[#23273F] transition-colors duration-300 group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-5 text-[14px] leading-[1.78] text-[#626675] transition-colors duration-300 group-hover:text-white/58">
                    {service.body}
                  </p>
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
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
            <ScrollReveal>
              <h2 className="section-title leading-[1]">Инженерная дисциплина вместо подрядного шума</h2>
            </ScrollReveal>
            <ScrollReveal className="reveal-delay-1">
              <p className="body-large max-w-[560px]">
                Мы не продаём «от». Стоимость, сроки и состав работ определяются после анализа объекта, исходных данных и требуемого результата.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid gap-px bg-[#d9d6cb] lg:grid-cols-3">
            {workflow.map((step, index) => (
              <ScrollReveal key={step.title} className={`reveal-delay-${index + 1}`}>
                <div className="group flex h-full flex-col bg-white p-8 transition-colors duration-300 hover:bg-[#f6f5f1] sm:p-10">
                  <h3 className="font-brand text-[26px] font-black leading-tight text-[#23273F]">
                    {step.title}
                  </h3>
                  <p className="mt-5 text-[15px] leading-[1.78] text-[#626675]">
                    {step.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRESENTATION + KPI ───────────────────────────────── */}
      <section className="section section-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(340px,380px)_minmax(0,760px)] lg:items-start lg:justify-between lg:gap-16 xl:grid-cols-[minmax(360px,420px)_minmax(0,720px)]">

            {/* LEFT — A4 cover + CTA */}
            <ScrollReveal>
              <div className="flex flex-col items-center gap-6 lg:items-start">
                {/* A4 portrait placeholder (empty white — to be replaced by real cover) */}
                <div
                  className="w-full max-w-[340px] border border-[#d9d6cb] bg-white shadow-[0_30px_80px_rgba(13,16,28,0.12)] xl:max-w-[380px]"
                  style={{ aspectRatio: '210 / 297' }}
                  aria-label="Обложка презентации EM-PCP, формат A4"
                >
                  <div className="flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${BASE}/brand/logo-icon.svg`}
                      alt=""
                      width={56}
                      height={56}
                      className="h-14 w-14 object-contain opacity-40"
                    />
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#626675]/50">
                      Обложка · A4
                    </div>
                  </div>
                </div>
                <a
                  href={brand.presentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary min-h-[52px] w-full max-w-[340px] px-7 text-[12px] xl:max-w-[380px]"
                >
                  Смотреть презентацию
                </a>
              </div>
            </ScrollReveal>

            {/* RIGHT — KPI card (150+ headline + 2×2 grid) */}
            <ScrollReveal className="reveal-delay-1">
              <div className="w-full border border-white/[0.08] bg-[#0d101c] text-white lg:ml-auto lg:max-w-[760px]">
                {/* Headline */}
                <div className="border-b border-white/[0.08] p-8 sm:p-10">
                  <div
                    className="font-brand font-black leading-none tabular-nums"
                    style={{ fontSize: 'clamp(72px, 8vw, 120px)', letterSpacing: '-0.03em' }}
                  >
                    {portfolioKpi.headline.value.toLocaleString('ru-RU')}
                    {portfolioKpi.headline.suffix}
                  </div>
                  <div className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white/48">
                    {portfolioKpi.headline.label}
                  </div>
                </div>

                {/* 2×2 grid */}
                <div className="grid grid-cols-2">
                  {portfolioKpi.grid.map((kpi, i) => (
                    <div
                      key={kpi.label}
                      className={`p-7 sm:p-9 ${i % 2 === 0 ? 'border-r border-white/[0.08]' : ''} ${i < 2 ? 'border-b border-white/[0.08]' : ''}`}
                    >
                      <div
                        className="font-brand font-black leading-none tabular-nums"
                        style={{ fontSize: 'clamp(34px, 3.6vw, 52px)', letterSpacing: '-0.02em' }}
                      >
                        {kpi.value.toLocaleString('ru-RU')}
                        {kpi.suffix}
                      </div>
                      <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/52">
                        {kpi.label}
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
          <ScrollReveal>
            <div className="grid gap-8 border-b border-[#d9d6cb] pb-12 sm:pb-16 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div>
                <h2 className="section-title leading-[1]">Три рабочих принципа</h2>
              </div>
              <p className="body-large max-w-[480px]">
                Работаем по процессу, а не по настроению. Каждый этап регламентирован, коммуникация прозрачна, все изменения фиксируются.
              </p>
            </div>
          </ScrollReveal>

          {principles.map((principle, index) => (
            <ScrollReveal key={principle.code} className={`reveal-delay-${index + 1}`}>
              <div className="grid grid-cols-[52px_1fr] gap-x-6 items-start border-b border-[#d9d6cb] py-10 sm:grid-cols-[72px_1fr] sm:gap-x-10 sm:py-14 lg:grid-cols-[72px_1fr_1fr] lg:gap-x-16">
                <div
                  className="font-brand font-black leading-none text-[#d9d6cb] pt-1"
                  style={{ fontSize: 'clamp(40px, 4vw, 56px)' }}
                >
                  {principle.code}
                </div>
                <div className="border-l-2 border-[#3E5854] pl-5 sm:pl-7">
                  <h3
                    className="font-brand font-black leading-[1.08] text-[#23273F]"
                    style={{ fontSize: 'clamp(20px, 2vw, 26px)' }}
                  >
                    {principle.title}
                  </h3>
                  <p className="mt-5 text-[15px] leading-[1.78] text-[#626675] lg:hidden">
                    {principle.body}
                  </p>
                </div>
                <p className="hidden text-[15px] leading-[1.78] text-[#626675] lg:block lg:pt-1">
                  {principle.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ─── MAP PORTAL ───────────────────────────────────────── */}
      <div id="map-section">
        {/* Button row */}
        <div className="border-b border-[#d9d6cb] bg-white">
          <div className="container mx-auto flex items-center px-5 py-5 sm:px-6 lg:px-8">
            <Link
              href="/proekty"
              className="btn btn-primary min-h-[44px] px-6 text-[11px]"
            >
              Полный список объектов с фильтрами
            </Link>
          </div>
        </div>
        {/* Same map as Geography & Objects page */}
        <YandexMap initialMarkers={staticMarkers} showFilters={false} />
      </div>

      {/* ─── CONTACT ──────────────────────────────────────────── */}
      <section className="section section-dark relative overflow-hidden" id="contact">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5f8b7d]/36 to-transparent" aria-hidden="true" />

        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24 lg:items-start">

            <ScrollReveal>
              <h2
                className="section-title section-title-light leading-[1.02]"
                style={{ fontSize: 'clamp(30px, 3.8vw, 50px)' }}
              >
                Расскажите, какой результат нужен — и мы найдём решение
              </h2>
              <p className="body-large body-large-light mt-7 max-w-[460px]">
                На основе исчерпывающих исходных данных мы точно определяем состав работ, оцениваем риски и находим решения — в том числе в нестандартных случаях, где другие видят тупик.
              </p>

              <div className="mt-12">
                {([
                  { label: 'Телефон', value: brand.phone, href: brand.phoneHref },
                  { label: 'MAX', value: 'Написать в MAX', href: brand.maxHref, external: true },
                  { label: 'Email', value: brand.email, href: brand.emailHref },
                  { label: 'Режим работы', value: brand.workingHours, href: null },
                ] as { label: string; value: string; href: string | null; external?: boolean }[]).map(({ label, value, href, external }) => (
                  <div key={label} className="flex items-start gap-4 border-t border-white/[0.08] py-5">
                    <div>
                      <div className="mb-1 text-[9px] font-black uppercase tracking-[0.2em] text-white/24">
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          target={external ? '_blank' : undefined}
                          rel={external ? 'noopener noreferrer' : undefined}
                          className="text-[15px] font-medium text-white/72 transition-colors hover:text-white"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-[15px] text-white/56">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </ScrollReveal>

            <ScrollReveal className="reveal-delay-2">
              <div className="border border-white/10 bg-[#0d101c]/70 p-7 sm:p-10">
                <h3 className="mb-8 font-brand text-[20px] font-black text-white">
                  Получить коммерческое предложение
                </h3>
                <LeadForm source="homepage" dark />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
