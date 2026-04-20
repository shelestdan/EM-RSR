import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedCounter from '@/components/AnimatedCounter'
import LeadForm from '@/components/LeadForm'
import ScrollReveal from '@/components/ScrollReveal'
import SilentVideo from '@/components/SilentVideo'
import { brand, metrics, principles, servicePillars, trustBadges, workflow } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'EM-PCP — инженерное проектирование, строительство, экспертиза',
  description:
    'EM-PCP ведёт инженерные объекты от изысканий и проектирования до строительства, экспертизы и авторского надзора. СРО, ISO, 150+ объектов.',
  openGraph: {
    title: 'EM-PCP — инженерные объекты под полную ответственность',
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

        {/* ─── TOP META RAIL ──────────────────────────────── */}
        <div className="relative z-20 border-b border-white/[0.06] bg-[#07090f]/70 backdrop-blur-sm">
          <div className="container mx-auto flex items-center justify-between gap-6 px-5 pt-28 pb-3 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-white/52">
              <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#5f8b7d]/80" />
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[#5f8b7d]" />
              </span>
              <span>{brand.short}</span>
            </div>
            <div className="hidden items-center gap-6 text-[9px] font-bold uppercase tracking-[0.22em] text-white/32 md:flex">
              <span>КРАСНОДАР · СПБ</span>
              <span className="h-px w-4 bg-white/20" />
              <span>2023 — 2026</span>
            </div>
          </div>
        </div>

        {/* ─── SPLIT BODY 60/40 ───────────────────────────── */}
        <div className="relative z-10 grid flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">

          {/* LEFT — CONTENT */}
          <div className="relative flex flex-col bg-[#07090f]">
            <div className="relative flex flex-1 flex-col justify-end px-5 pb-12 pt-14 sm:px-6 sm:pb-14 sm:pt-16 lg:px-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pb-20 lg:pt-20">

              {/* Overline */}
              <div className="mb-10 flex items-center gap-5 sm:mb-12">
                <span className="h-px w-14 shrink-0 bg-[#5f8b7d]" aria-hidden="true" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8ab0a3]">
                  Инженерный контур
                </span>
              </div>

              {/* H1 */}
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
                <Link href="/portal" className="btn btn-primary min-h-[54px] px-8 text-[12px]">
                  Портал исполнителей
                </Link>
                <Link href="/proekty" className="btn btn-outline-white min-h-[54px] px-8 text-[12px]">
                  Смотреть проекты
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

          {/* RIGHT — VIDEO (40%) */}
          <div className="relative order-first min-h-[42vh] overflow-hidden border-b border-white/[0.08] bg-[#0a0d15] lg:order-none lg:min-h-0 lg:border-b-0 lg:border-l">
            <SilentVideo
              src="/brand/EM-PCP%20mp4.mp4"
              className="absolute inset-0 h-full w-full"
              xOffset={0.5}
            />
            <div
              className="pointer-events-none absolute inset-y-0 -left-1 hidden w-24 bg-[linear-gradient(90deg,rgba(7,9,15,1)_0%,rgba(7,9,15,0.7)_40%,rgba(7,9,15,0)_100%)] lg:block"
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-0 bg-[#07090f]/22" aria-hidden="true" />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,rgba(7,9,15,0.9)_0%,transparent_100%)]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(7,9,15,0.7)_0%,transparent_100%)] lg:hidden"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* ─── METRICS BAND ───────────────────────────────── */}
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
      <section className="section section-paper" id="services">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
            <ScrollReveal>
              <p className="section-kicker mb-5">Услуги</p>
              <h2 className="section-title leading-[1]">Четыре направления работы</h2>
            </ScrollReveal>
            <ScrollReveal className="reveal-delay-1">
              <p className="body-large max-w-[560px]">
                Заказчику важен управляемый результат. Показываем работу как инженерный цикл: изыскания и кадастр, проектирование, строительство, авторский надзор.
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
            {servicePillars.map((service, index) => (
              <ScrollReveal key={service.id} className={`reveal-delay-${(index % 4) + 1}`}>
                <Link
                  href={`/uslugi#${service.id}`}
                  className="group relative flex h-full flex-col overflow-hidden bg-white p-8 transition-all duration-400 hover:bg-[#191c2d] sm:min-h-[360px] sm:p-10"
                >
                  <span className="text-[11px] font-black tracking-[0.2em] text-[#3E5854] transition-colors duration-300 group-hover:text-[#8ab0a3]">
                    {service.code}
                  </span>
                  <span className="mt-6 block h-px w-8 bg-[#d9d6cb] transition-all duration-500 group-hover:w-16 group-hover:bg-[#5f8b7d]" />
                  <h3 className="mt-8 font-brand text-[24px] font-black leading-[1.1] text-[#23273F] transition-colors duration-300 group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-5 text-[14px] leading-[1.78] text-[#626675] transition-colors duration-300 group-hover:text-white/58">
                    {service.summary}
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
              <p className="section-kicker mb-5">Метод</p>
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
                  <div
                    className="font-brand font-black leading-none text-[#eeece4] transition-colors duration-300 group-hover:text-[#d9d6cb]"
                    style={{ fontSize: 'clamp(72px, 6vw, 96px)' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <span className="mt-8 block h-px w-10 bg-[#3E5854]" />
                  <h3 className="mt-7 font-brand text-[26px] font-black leading-tight text-[#23273F]">
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

      {/* ─── MAP PORTAL ───────────────────────────────────────── */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5f8b7d]/40 to-transparent" aria-hidden="true" />

        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="overline-light mb-5">География и объекты</p>
                <h2 className="section-title section-title-light leading-[1.02]">
                  150+ объектов на карте
                </h2>
                <p className="body-large body-large-light mt-6 max-w-[560px]">
                  Клик по метке — описание объекта: тип работ, регион, год. Фильтры и полный реестр — на отдельной странице.
                </p>
              </div>
              <Link href="/karta-obektov" className="btn btn-outline-white min-h-[52px] px-7 text-[12px]">
                Открыть полную карту
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal className="reveal-delay-1">
            <div className="mt-12 overflow-hidden border border-white/10 bg-white">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A89c572294069038bc2c5953ed69f6107017552366d8afa5c058e5fff345ca25d&source=constructor"
                title="Карта объектов EM-PCP"
                className="block h-[560px] w-full border-0"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── PRINCIPLES ───────────────────────────────────────── */}
      <section className="section section-paper">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
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

      {/* ─── PRESENTATION ─────────────────────────────────────── */}
      <section className="section section-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
            <ScrollReveal>
              {/* A4 portrait placeholder */}
              <div
                className="mx-auto border border-[#d9d6cb] bg-white shadow-[0_30px_80px_rgba(13,16,28,0.12)]"
                style={{ width: 280, aspectRatio: '210 / 297' }}
              >
                <div className="flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
                  <Image
                    src="/brand/logo-icon.svg"
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14 object-contain"
                  />
                  <div className="font-brand text-[28px] font-black leading-none text-[#23273F]">
                    {brand.short}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#626675]/60">
                    Presentation · A4
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="reveal-delay-1">
              <p className="section-kicker mb-5">Презентация</p>
              <h2 className="section-title leading-[1.05]">Материалы о компании одним файлом</h2>
              <p className="body-large mt-6 max-w-[520px]">
                Состав работ, примеры объектов, СРО и ISO, реквизиты — в одном PDF. Откроется в браузере.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={brand.presentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary min-h-[52px] px-7 text-[12px]"
                >
                  Смотреть презентацию
                </a>
                <a
                  href={brand.presentationUrl}
                  download
                  className="btn btn-outline-dark min-h-[52px] px-7 text-[12px]"
                >
                  Скачать PDF
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ──────────────────────────────────────────── */}
      <section className="section section-dark relative overflow-hidden" id="contact">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5f8b7d]/36 to-transparent" aria-hidden="true" />

        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24 lg:items-start">

            <ScrollReveal>
              <p className="overline-light mb-8">Контакт</p>
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

            <ScrollReveal className="reveal-delay-2">
              <div className="border border-white/10 bg-[#0d101c]/70 p-7 sm:p-10">
                <h3 className="mb-8 font-brand text-[20px] font-black text-white">
                  Оставить заявку
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
