import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import AnimatedCounter from '@/components/AnimatedCounter'
import { principles } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'О компании — ЕМ-ПСП',
  description:
    'ООО «ЕМ-ПолиСпецПроект»: СРО, ISO 9001/14001/45001, инженерное проектирование и строительство объектов.',
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M3 7h8M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const heroStats = [
  { value: 150, suffix: '+', label: 'Объектов', sub: 'В портфеле' },
  { value: 524, suffix: '+', label: 'Газификаций', sub: 'Домовладений' },
  { value: 5, suffix: '', label: 'Регионов', sub: 'СЗФО · ЮФО' },
  { value: 3, suffix: '', label: 'Стандарта ISO', sub: '9001 · 14001 · 45001' },
]

const timeline = [
  {
    year: '2023',
    title: 'Регистрация компании',
    body: 'ООО «ЕМ-ПолиСпецПроект» основано 21 июня 2023 г. в Санкт-Петербурге. Формирование инженерной команды и базы подрядчиков.',
  },
  {
    year: '2024',
    title: 'Вход в СРО и ISO',
    body: 'Получение допусков СРО по проектированию и изысканиям. Сертификация по ISO 9001, 14001 и 45001 (действительны до 05.12.2026).',
  },
  {
    year: '2024–2025',
    title: 'Масштабирование на Юг',
    body: 'Открытие фактического офиса в Краснодаре. Работа по газификации домовладений в ЮФО — 524+ проектов.',
  },
  {
    year: '2026',
    title: 'Текущая деятельность',
    body: 'Параллельное ведение объектов кап-строительства, сетей и авторского надзора в пяти регионах России.',
  },
]

const certDocs = [
  {
    code: '01',
    code_full: 'ГОСТ ISO 9001-2015',
    domain: 'Качество',
    sublabel: 'Система менеджмента качества',
    regNumber: 'FORTIS.RU.0001.F0020441',
    valid: '06.12.2023 — 05.12.2026',
  },
  {
    code: '02',
    code_full: 'ГОСТ Р ИСО 14001-2016',
    domain: 'Экология',
    sublabel: 'Экологический менеджмент',
    regNumber: 'FORTIS.RU.0001.F0003653',
    valid: '06.12.2023 — 05.12.2026',
  },
  {
    code: '03',
    code_full: 'ГОСТ Р ИСО 45001-2020',
    domain: 'Безопасность',
    sublabel: 'Охрана труда и безопасность',
    regNumber: 'FORTIS.RU.0001.F0002766',
    valid: '06.12.2023 — 05.12.2026',
  },
]

const sroDocs = [
  {
    tag: 'СРО · Проектирование',
    number: 'П-174-007801724375-3773',
    body: 'Допуск к проектированию: жилые, общественные и промышленные объекты.',
  },
  {
    tag: 'СРО · Изыскания',
    number: 'И-037-007801724375-1897',
    body: 'Допуск к инженерным изысканиям: геология, геодезия, экология.',
  },
]

const requisites: Array<[string, string, string]> = [
  ['01', 'Полное наименование', 'ООО «ЕМ-ПолиСпецПроект»'],
  ['02', 'ИНН', '7801724375'],
  ['03', 'КПП', '780101001'],
  ['04', 'ОГРН', '1237800071948'],
  ['05', 'ИФНС', 'Межрайонная инспекция ФНС №16 по Санкт-Петербургу'],
  ['06', 'Дата регистрации', '21 июня 2023 г.'],
  ['07', 'Генеральный директор', 'Чехов Евгений Александрович'],
  ['08', 'Юридический адрес', '199178, г. Санкт-Петербург, линия 9-Я В.О., д. 66 лит. А, пом. 1-н, оф. 8'],
  ['09', 'Фактический адрес', '350000, Краснодар, ул. Коммунаров 76, оф. 382/9'],
]

export default function AboutPage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="section-dark relative min-h-[82vh] flex flex-col justify-end overflow-hidden pt-32 pb-16 sm:pb-20 lg:pb-24">
        <div className="absolute inset-0 eng-grid-overlay opacity-40" aria-hidden="true" />

        {/* Large watermark "EM" */}
        <div
          className="pointer-events-none absolute right-0 top-0 select-none font-brand font-black leading-none text-white opacity-[0.028]"
          style={{ fontSize: 'clamp(240px, 34vw, 520px)', lineHeight: 0.82, transform: 'translate(6%, -6%)', letterSpacing: '-0.04em' }}
          aria-hidden="true"
        >
          ЕМ-ПСП
        </div>

        {/* Decorative diagonal lines */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
          <svg className="absolute right-[8%] top-[26%]" width="180" height="180" viewBox="0 0 180 180" fill="none" stroke="#5f8b7d" strokeOpacity="0.14" strokeWidth="1">
            <path d="M0 90 L90 0 L180 90 L90 180 Z" />
            <path d="M30 90 L90 30 L150 90 L90 150 Z" />
            <circle cx="90" cy="90" r="4" fill="#5f8b7d" fillOpacity="0.32" strokeWidth="0" />
          </svg>
        </div>

        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/28" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-white/60">Главная</Link>
            <span className="text-white/16">/</span>
            <span className="text-white/50">О компании</span>
          </nav>

          {/* Kicker + h1 */}
          <p className="overline-light mb-8">Организация · ЕМ-ПСП</p>
          <h1
            className="font-brand font-black text-white max-w-[980px]"
            style={{ fontSize: 'clamp(36px, 5.4vw, 82px)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
          >
            Инженерная<br />компания с проверяемой<br />ответственностью
          </h1>
          <p className="mt-10 max-w-[620px] text-[15px] leading-[1.75] text-white/50 sm:text-[17px]">
            ЕМ-ПСП работает на стыке проектирования, строительства, экспертизы и авторского надзора. Доверие — это документы, допуски и объекты, которые можно показать.
          </p>

          {/* Stat strip */}
          <div className="mt-14 grid grid-cols-2 gap-px bg-white/[0.06] sm:grid-cols-4">
            {heroStats.map((s) => (
              <div key={s.label} className="bg-[#07090f]/60 px-5 py-6 sm:px-7 sm:py-7">
                <div
                  className="font-brand font-black leading-none text-white"
                  style={{ fontSize: 'clamp(28px, 3.2vw, 44px)' }}
                >
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/36">{s.label}</div>
                <div className="mt-1 text-[10px] text-white/20">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Anchor nav */}
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              ['#position', 'Позиция'],
              ['#principles', 'Принципы'],
              ['#timeline', 'История'],
              ['#certs', 'СРО и ISO'],
              ['#requisites', 'Реквизиты'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="group inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white/52 transition-all duration-200 hover:border-[#5f8b7d]/50 hover:bg-[#5f8b7d]/12 hover:text-white"
              >
                {label}
                <span className="text-[#5f8b7d] transition-transform duration-200 group-hover:translate-x-0.5"><Arrow /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POSITION ──────────────────────────────────────────── */}
      <section id="position" className="section section-white relative overflow-hidden">
        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">

          {/* Section label */}
          <ScrollReveal>
            <div className="mb-12 flex items-center gap-5 sm:mb-16">
              <span className="text-[11px] font-black tracking-[0.22em] text-[#3E5854]">01 · POSITION</span>
              <span className="h-px flex-1 max-w-[48px] bg-[#3E5854]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626675]/60">Позиция компании</span>
            </div>
          </ScrollReveal>

          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:items-start">
            <ScrollReveal>
              <h2
                className="font-brand font-black text-[#23273F] leading-[1.0]"
                style={{ fontSize: 'clamp(26px, 2.6vw, 40px)', letterSpacing: '-0.015em', wordBreak: 'keep-all', hyphens: 'none' }}
              >
                <span className="block text-[#3E5854] opacity-70" style={{ fontSize: '0.55em', letterSpacing: '0.12em' }}>ООО</span>
                <span className="mt-3 block whitespace-nowrap">«ЕМ-ПолиСпецПроект»</span>
              </h2>
              <div className="mt-10 space-y-6 text-[16px] leading-[1.8] text-[#626675]">
                <p>
                  Проектируем и сопровождаем инженерные объекты там, где важны исходные данные, договорная дисциплина, экспертиза и фактическая реализуемость решений.
                </p>
                <p>
                  Компания аккредитована в СРО по проектированию и изысканиям, сертифицирована по ISO 9001, ISO 14001 и ISO 45001. Работаем с объектами в пяти регионах России.
                </p>
              </div>

              {/* Key-line quote */}
              <div className="mt-10 border-l-[3px] border-[#3E5854] bg-[#f6f5f1] px-6 py-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3E5854] mb-3">Главный принцип</p>
                <p className="text-[15px] font-semibold leading-[1.72] text-[#23273F]">
                  Не разрывать ответственность между проектом, строительством и надзором, если задача требует единого инженерного управления.
                </p>
              </div>
            </ScrollReveal>

            {/* Geography block */}
            <ScrollReveal className="reveal-delay-2">
              <div className="border border-[#d9d6cb] bg-[#f6f5f1] p-7 sm:p-10">
                <p className="mb-6 text-[10px] font-black uppercase tracking-[0.22em] text-[#626675]/60">География работ</p>
                <ul className="space-y-0">
                  {[
                    ['СПб', 'Санкт-Петербург', 'Юридический контур, проектирование'],
                    ['ЛО', 'Ленинградская область', 'Строительство, надзор'],
                    ['КК', 'Краснодарский край', 'Газификация, сети, офис'],
                    ['РО', 'Ростовская область', 'Сети, сопровождение'],
                    ['СК', 'Ставропольский край', 'Газификация, монтаж'],
                  ].map(([code, name, note]) => (
                    <li key={code} className="flex items-start gap-5 border-b border-[#d9d6cb] py-4 last:border-b-0">
                      <span className="mt-0.5 inline-grid h-8 min-w-[40px] shrink-0 place-items-center border border-[#3E5854]/24 bg-white text-[10px] font-black tracking-[0.08em] text-[#3E5854]">
                        {code}
                      </span>
                      <span className="flex-1">
                        <span className="block text-[15px] font-bold leading-tight text-[#23273F]">{name}</span>
                        <span className="mt-1 block text-[12px] leading-tight text-[#626675]">{note}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Offices dual-block */}
              <div className="mt-3 grid gap-px bg-[#d9d6cb] sm:grid-cols-2">
                <div className="bg-white p-6 sm:p-7">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#626675]/52">Юридический адрес</p>
                  <p className="mt-3 font-brand text-[14px] font-black text-[#23273F]">Санкт-Петербург</p>
                  <p className="mt-2 text-[12px] leading-[1.6] text-[#626675]">199178, линия 9-Я В.О., д. 66 лит. А, пом. 1-н, оф. 8</p>
                </div>
                <div className="bg-[#23273F] p-6 text-white sm:p-7">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5f8b7d]">Фактический адрес</p>
                  <p className="mt-3 font-brand text-[14px] font-black text-white">Краснодар</p>
                  <p className="mt-2 text-[12px] leading-[1.6] text-white/56">350000, ул. Коммунаров, 76, оф. 382/9</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── PRINCIPLES ────────────────────────────────────────── */}
      <section id="principles" className="section section-paper eng-grid-paper relative overflow-hidden">
        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">

          <ScrollReveal>
            <div className="mb-12 flex items-center gap-5 sm:mb-16">
              <span className="text-[11px] font-black tracking-[0.22em] text-[#3E5854]">02 · PRINCIPLES</span>
              <span className="h-px flex-1 max-w-[48px] bg-[#3E5854]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626675]/60">Что держит работу</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid gap-8 pb-14 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div>
                <h2 className="section-title leading-[1]">Три принципа<br />инженерной дисциплины</h2>
              </div>
              <p className="body-large max-w-[460px]">
                Не декларации, а правила, по которым решается спор на площадке, в согласовании и в договоре.
              </p>
            </div>
          </ScrollReveal>

          {/* Editorial principle rows */}
          <div className="border-t border-[#d9d6cb]">
            {principles.map((p, i) => (
              <ScrollReveal key={p.code}>
                <article className="group grid grid-cols-[48px_1fr] gap-x-5 border-b border-[#d9d6cb] py-10 transition-colors duration-300 hover:bg-white/60 sm:grid-cols-[120px_1fr_auto] sm:gap-x-10 sm:py-14 lg:grid-cols-[120px_1fr_1.4fr_120px] lg:gap-x-16">

                  <div className="pt-2">
                    <div className="font-brand text-[11px] font-black tracking-[0.22em] text-[#3E5854]">{p.code}</div>
                    <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#626675]/52">Principle</div>
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="font-brand font-black leading-[1.02] text-[#23273F]"
                      style={{ fontSize: 'clamp(22px, 2.4vw, 36px)' }}
                    >
                      {p.title}
                    </h3>
                  </div>

                  <p className="col-span-2 mt-4 max-w-[520px] text-[15px] leading-[1.78] text-[#626675] sm:col-span-2 sm:col-start-2 sm:mt-6 lg:col-span-1 lg:col-start-3 lg:mt-0 lg:pt-2">
                    {p.body}
                  </p>

                  <div className="col-span-2 col-start-2 mt-6 flex items-center justify-end border-t border-[#eeece4] pt-5 sm:col-span-1 sm:col-start-3 sm:mt-0 sm:border-t-0 sm:pt-0 lg:col-start-4 lg:justify-end lg:self-start lg:pt-3">
                    <span className="inline-grid h-10 w-10 shrink-0 place-items-center border border-[#d9d6cb] bg-white text-[#3E5854] transition-all duration-300 group-hover:border-[#3E5854] group-hover:bg-[#3E5854] group-hover:text-white">
                      <Arrow />
                    </span>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ──────────────────────────────────────────── */}
      <section id="timeline" className="section section-dark relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5f8b7d]/36 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 eng-grid-overlay opacity-28" aria-hidden="true" />

        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 flex items-center gap-5">
              <span className="text-[11px] font-black tracking-[0.22em] text-[#5f8b7d]">03 · TIMELINE</span>
              <span className="h-px flex-1 max-w-[48px] bg-[#5f8b7d]/50" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/36">История компании</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid gap-8 pb-14 lg:grid-cols-[1fr_1fr] lg:items-end">
              <h2
                className="section-title section-title-light leading-[1.02]"
                style={{ fontSize: 'clamp(28px, 3.8vw, 56px)' }}
              >
                От регистрации<br />до пяти регионов работы
              </h2>
              <p className="body-large body-large-light max-w-[460px]">
                История компании короткая, но плотная — каждый этап подкреплён документами и реальными объектами.
              </p>
            </div>
          </ScrollReveal>

          {/* Horizontal rail timeline */}
          <div className="relative mt-6">
            <div className="absolute left-0 right-0 top-[80px] hidden h-px bg-gradient-to-r from-white/10 via-white/20 to-white/10 lg:block" aria-hidden="true" />
            <div className="grid gap-px bg-white/[0.08] lg:grid-cols-4">
              {timeline.map((step, i) => (
                <ScrollReveal key={step.year} className={`reveal-delay-${(i % 3) + 1}`}>
                  <div className="group relative flex h-full flex-col bg-[#0d101c]/70 p-7 transition-colors duration-300 hover:bg-[#5f8b7d]/10 sm:p-8">
                    <div
                      className="font-brand font-black leading-none text-white/14 transition-colors duration-300 group-hover:text-[#5f8b7d]/60"
                      style={{ fontSize: 'clamp(46px, 3.8vw, 64px)', letterSpacing: '-0.02em' }}
                    >
                      {step.year}
                    </div>
                    <span className="mt-6 block h-px w-10 bg-[#5f8b7d]" />
                    <h3 className="mt-6 font-brand text-[19px] font-black leading-tight text-white">{step.title}</h3>
                    <p className="mt-4 text-[13px] leading-[1.75] text-white/48">{step.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CERTS + SRO ───────────────────────────────────────── */}
      <section id="certs" className="section section-white relative overflow-hidden">
        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">

          <ScrollReveal>
            <div className="mb-12 flex items-center gap-5 sm:mb-16">
              <span className="text-[11px] font-black tracking-[0.22em] text-[#3E5854]">04 · COMPLIANCE</span>
              <span className="h-px flex-1 max-w-[48px] bg-[#3E5854]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626675]/60">СРО и стандарты качества</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid gap-8 pb-14 lg:grid-cols-[1fr_1fr] lg:items-end">
              <h2 className="section-title leading-[1]">Допуски и сертификаты<br />без декоративной функции</h2>
              <p className="body-large max-w-[460px]">
                Документы нужны для допуска к серьёзным задачам и понятной юридической ответственности — не для витрины.
              </p>
            </div>
          </ScrollReveal>

          {/* SRO row */}
          <div className="grid gap-px bg-[#d9d6cb] lg:grid-cols-2">
            {sroDocs.map((sro) => (
              <ScrollReveal key={sro.number} className="h-full">
                <div className="flex h-full flex-col bg-[#f6f5f1] p-7 sm:p-10">
                  <div className="flex items-center gap-3">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#3E5854" strokeWidth="1.4" aria-hidden="true">
                      <path d="M14 3l9 4v6c0 5.5-3.8 10-9 11-5.2-1-9-5.5-9-11V7l9-4Z" />
                      <path d="M9 14l3.5 3.5L20 10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3E5854]">{sro.tag}</p>
                  </div>
                  <p className="mt-6 font-brand text-[20px] font-black tracking-[-0.01em] text-[#23273F] tabular-nums whitespace-nowrap overflow-hidden text-ellipsis">
                    {sro.number}
                  </p>
                  <p className="mt-4 text-[14px] leading-[1.7] text-[#626675]">{sro.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* ISO cards */}
          <div className="mt-3 grid gap-px bg-[#d9d6cb] md:grid-cols-3">
            {certDocs.map((cert) => (
              <ScrollReveal key={cert.code}>
                <div className="group flex h-full flex-col bg-white p-7 transition-colors duration-300 hover:bg-[#f6f5f1] sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-brand text-[11px] font-black tracking-[0.22em] text-[#626675]/50">
                      ISO {cert.code}
                    </span>
                    <span className="inline-grid h-8 w-8 place-items-center border border-[#3E5854]/24 bg-[#f6f5f1] text-[#3E5854] transition-all duration-300 group-hover:border-[#3E5854] group-hover:bg-[#3E5854] group-hover:text-white">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M3 6l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                  <span className="mt-6 block h-px w-10 bg-[#3E5854]" />
                  <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#3E5854]">{cert.domain}</p>
                  <h3 className="mt-3 font-brand text-[20px] font-black leading-tight text-[#23273F]">
                    {cert.code_full}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.65] text-[#626675]">{cert.sublabel}</p>
                  <div className="mt-auto pt-8 space-y-3">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#626675]/48">Рег. №</p>
                      <p className="mt-1.5 font-mono text-[11px] text-[#23273F] tabular-nums break-all">{cert.regNumber}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#626675]/48">Действителен</p>
                      <p className="mt-1.5 font-mono text-[12px] text-[#23273F] tabular-nums">{cert.valid}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Dark strip */}
          <ScrollReveal>
            <div className="mt-3 bg-[#23273F] px-7 py-7 sm:px-10 sm:py-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <p className="text-[13px] leading-[1.75] text-white/56">
                  Копии допусков и сертификатов предоставляем по запросу — с актуальной датой действия и областью распространения.
                </p>
                <Link
                  href="/#contact"
                  className="group inline-flex items-center gap-3 self-start text-[11px] font-black uppercase tracking-[0.14em] text-white transition-all duration-200 hover:gap-5 lg:self-auto"
                >
                  Запросить документы
                  <span className="text-[#5f8b7d]"><Arrow /></span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── REQUISITES ────────────────────────────────────────── */}
      <section id="requisites" className="section section-paper eng-grid-paper">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">

          <ScrollReveal>
            <div className="mb-12 flex items-center gap-5 sm:mb-16">
              <span className="text-[11px] font-black tracking-[0.22em] text-[#3E5854]">05 · LEGAL</span>
              <span className="h-px flex-1 max-w-[48px] bg-[#3E5854]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626675]/60">Реквизиты для договора</span>
            </div>
          </ScrollReveal>

          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <ScrollReveal>
              <h2 className="section-title leading-[1]">Юридическая<br />информация</h2>
              <p className="body-large mt-7 max-w-[420px]">
                Полные реквизиты, регистрация, руководство и адреса — для проверки контрагента и оформления договора.
              </p>

              <Link
                href="/kontakty"
                className="mt-10 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#3E5854] transition-all duration-200 hover:gap-5 hover:text-[#23273F]"
              >
                Контакты и связь <Arrow />
              </Link>
            </ScrollReveal>

            <ScrollReveal className="reveal-delay-2">
              <dl className="border border-[#d9d6cb] bg-white">
                {requisites.map(([code, label, value]) => (
                  <div
                    key={code}
                    className="group grid grid-cols-[40px_1fr] items-start gap-4 border-b border-[#d9d6cb] px-5 py-4 transition-colors duration-200 last:border-b-0 hover:bg-[#f6f5f1] sm:grid-cols-[56px_220px_1fr] sm:gap-6 sm:px-7 sm:py-5"
                  >
                    <span className="mt-0.5 font-brand text-[10px] font-black tracking-[0.2em] text-[#626675]/50">{code}</span>
                    <dt className="col-span-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#626675] sm:col-span-1 sm:text-[11px]">
                      {label}
                    </dt>
                    <dd className="col-span-2 text-[14px] font-semibold leading-[1.6] text-[#23273F] sm:col-span-1">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Download hint */}
              <div className="mt-3 flex items-center justify-between gap-4 border border-[#d9d6cb] bg-[#f6f5f1] px-6 py-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#626675]/52">Карточка предприятия</p>
                  <p className="mt-1 text-[13px] font-semibold text-[#23273F]">Формат PDF — по запросу по email</p>
                </div>
                <a
                  href="mailto:em-psp@mail.ru?subject=Карточка%20предприятия"
                  className="inline-flex items-center gap-2 border border-[#23273F] bg-[#23273F] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#3E5854] hover:border-[#3E5854]"
                >
                  Запросить <Arrow />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ────────────────────────────────────────── */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5f8b7d]/36 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 eng-grid-overlay opacity-28" aria-hidden="true" />

        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:items-end">
            <ScrollReveal>
              <p className="overline-light mb-8">Сотрудничество</p>
              <h2
                className="section-title section-title-light leading-[1.02]"
                style={{ fontSize: 'clamp(28px, 3.5vw, 52px)' }}
              >
                Обсудим объект,<br />договор или документы
              </h2>
              <p className="body-large body-large-light mt-7 max-w-[440px]">
                Ответим по существу: состав работ, сроки, реквизиты, допуски. Без воды и маркетинговой риторики.
              </p>
              <div className="mt-10 space-y-3">
                <a href="tel:+79892888980" className="block text-[15px] font-semibold text-white transition-colors hover:text-[#8ab0a3]">
                  +7 (989) 288-89-80
                </a>
                <a href="mailto:em-psp@mail.ru" className="block text-[15px] text-white/52 transition-colors hover:text-white">
                  em-psp@mail.ru
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal className="reveal-delay-2">
              <div className="grid gap-px bg-white/[0.08] sm:grid-cols-2">
                {[
                  { href: '/#contact', kicker: 'Заявка', title: 'Описать объект' },
                  { href: '/uslugi', kicker: 'Услуги', title: 'Инженерный цикл' },
                  { href: '/proekty', kicker: 'Портфель', title: 'Проекты' },
                  { href: '/karta-obektov', kicker: 'Карта', title: 'География объектов' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center justify-between gap-6 bg-[#0d101c]/70 px-7 py-7 transition-colors hover:bg-[#5f8b7d]/14"
                  >
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#5f8b7d]">{item.kicker}</p>
                      <p className="mt-3 font-brand text-[18px] font-black leading-tight text-white">{item.title}</p>
                    </div>
                    <span className="text-white/60 transition-transform duration-200 group-hover:translate-x-1"><Arrow /></span>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
