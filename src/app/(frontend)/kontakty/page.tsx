import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Контакты — ЕМ-ПСП',
  description:
    'Контакты ЕМ-ПСП: телефон, email, офис в Краснодаре и форма заявки на инженерный проект.',
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M3 7h8M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.06 4.18 2 2 0 0 1 5.05 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L9.1 9.85a16 16 0 0 0 6 6l1.21-1.21a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7a2 2 0 0 1 1.72 2Z" />
  </svg>
)

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
)

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

const quickChannels = [
  {
    code: '01',
    label: 'Телефон',
    value: '+7 (989) 288-89-80',
    href: 'tel:+79892888980',
    hint: 'Инженер-менеджер',
    Icon: PhoneIcon,
  },
  {
    code: '02',
    label: 'Почта',
    value: 'em-psp@mail.ru',
    href: 'mailto:em-psp@mail.ru',
    hint: 'Ответ до 1 рабочего дня',
    Icon: MailIcon,
  },
]

const meta = [
  { label: 'Режим работы', value: 'Пн–Пт · 09:00 – 19:00', sub: 'Время московское' },
  { label: 'Языки переписки', value: 'Русский · English', sub: 'Инженерная документация — RU' },
  { label: 'SLA по первичному ответу', value: '≤ 4 часов в рабочее время', sub: 'Без авто-ответов' },
]

export default function ContactsPage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="section-dark relative min-h-[78vh] flex flex-col justify-end overflow-hidden pt-32 pb-16 sm:pb-20 lg:pb-24">
        <div className="absolute inset-0 eng-grid-overlay opacity-40" aria-hidden="true" />

        {/* Large watermark word */}
        <div
          className="pointer-events-none absolute right-0 top-0 select-none font-brand font-black leading-none text-white opacity-[0.03]"
          style={{ fontSize: 'clamp(200px, 28vw, 440px)', lineHeight: 0.82, transform: 'translate(4%, -8%)', letterSpacing: '-0.04em' }}
          aria-hidden="true"
        >
          CONTACT
        </div>

        {/* Decorative dots */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
          <svg className="absolute right-[14%] top-[24%]" width="140" height="140" viewBox="0 0 140 140" fill="none" stroke="#5f8b7d" strokeOpacity="0.18">
            <rect x="30" y="30" width="80" height="80" strokeWidth="1" />
            <rect x="48" y="48" width="44" height="44" strokeWidth="1" />
            <circle cx="70" cy="70" r="3" fill="#5f8b7d" fillOpacity="0.36" strokeWidth="0" />
            <path d="M70 10v20M70 110v20M10 70h20M110 70h20" strokeWidth="1" />
          </svg>
        </div>

        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/28" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-white/60">Главная</Link>
            <span className="text-white/16">/</span>
            <span className="text-white/50">Контакты</span>
          </nav>

          {/* Kicker + h1 */}
          <p className="overline-light mb-8">Связь · ЕМ-ПСП</p>
          <h1
            className="font-brand font-black text-white max-w-[920px]"
            style={{ fontSize: 'clamp(36px, 5.4vw, 82px)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
          >
            Расскажите,<br />какой результат<br />нужен
          </h1>
          <p className="mt-10 max-w-[600px] text-[15px] leading-[1.75] text-white/50 sm:text-[17px]">
            Чем точнее вводные, тем быстрее мы поймём состав работ, ограничения и следующий шаг. Без авто-ответов и шаблонных рассылок.
          </p>

          {/* Quick stat strip */}
          <div className="mt-14 grid grid-cols-2 gap-px bg-white/[0.06] sm:grid-cols-4">
            {[
              { v: '≤ 4ч', l: 'SLA ответ', s: 'Рабочее время' },
              { v: '2', l: 'Офиса', s: 'СПб + Краснодар' },
              { v: '5', l: 'Регионов', s: 'География работ' },
              { v: '152-ФЗ', l: 'Обработка PD', s: 'По закону РФ' },
            ].map((s) => (
              <div key={s.l} className="bg-[#07090f]/60 px-5 py-6 sm:px-7 sm:py-7">
                <div
                  className="font-brand font-black leading-none text-white whitespace-nowrap"
                  style={{ fontSize: 'clamp(22px, 2.6vw, 34px)' }}
                >
                  {s.v}
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/36">{s.l}</div>
                <div className="mt-1 text-[10px] text-white/20">{s.s}</div>
              </div>
            ))}
          </div>

          {/* Anchor nav */}
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              ['#channels', 'Каналы связи'],
              ['#form', 'Заявка'],
              ['#office', 'Офис'],
              ['#legal', 'Реквизиты'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="group inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white/52 transition-all duration-200 hover:border-[#5f8b7d]/50 hover:bg-[#5f8b7d]/12 hover:text-white"
              >
                {label}
                <span className="text-[#5f8b7d]"><Arrow /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CHANNELS ──────────────────────────────────────────── */}
      <section id="channels" className="section section-white relative overflow-hidden">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">

          <ScrollReveal>
            <div className="mb-12 flex items-center gap-5 sm:mb-16">
              <span className="text-[11px] font-black tracking-[0.22em] text-[#3E5854]">01 · CHANNELS</span>
              <span className="h-px flex-1 max-w-[48px] bg-[#3E5854]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626675]/60">Прямые каналы связи</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid gap-8 pb-12 lg:grid-cols-[1fr_1fr] lg:items-end">
              <h2 className="section-title leading-[1]">Позвоните,<br />напишите или приезжайте</h2>
              <p className="body-large max-w-[460px]">
                Один номер телефона и один email — без отделов, фильтрации и переадресаций. Отвечает инженер-менеджер.
              </p>
            </div>
          </ScrollReveal>

          {/* Channel cards */}
          <div className="grid gap-px bg-[#d9d6cb] lg:grid-cols-2">
            {quickChannels.map(({ code, label, value, href, hint, Icon }) => (
              <ScrollReveal key={code} className="h-full">
                <a
                  href={href}
                  className="group relative flex h-full flex-col justify-between gap-10 bg-white p-8 transition-colors duration-300 hover:bg-[#f6f5f1] sm:p-10"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <span className="inline-grid h-11 w-11 place-items-center border border-[#d9d6cb] bg-[#f6f5f1] text-[#3E5854] transition-colors duration-300 group-hover:border-[#3E5854] group-hover:bg-[#3E5854] group-hover:text-white">
                        <Icon />
                      </span>
                      <div>
                        <p className="font-brand text-[10px] font-black tracking-[0.22em] text-[#626675]/50">{code}</p>
                        <p className="mt-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#23273F]">{label}</p>
                      </div>
                    </div>
                    <span className="inline-grid h-10 w-10 shrink-0 place-items-center border border-[#d9d6cb] text-[#3E5854] transition-all duration-300 group-hover:border-[#3E5854] group-hover:bg-[#3E5854] group-hover:text-white">
                      <Arrow />
                    </span>
                  </div>

                  <div>
                    <p
                      className="font-brand font-black text-[#23273F] tabular-nums"
                      style={{ fontSize: 'clamp(24px, 2.8vw, 34px)', letterSpacing: '-0.01em' }}
                    >
                      {value}
                    </p>
                    <p className="mt-3 text-[13px] leading-[1.65] text-[#626675]">{hint}</p>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>

          {/* Meta strip */}
          <ScrollReveal>
            <div className="mt-3 grid gap-px bg-[#d9d6cb] md:grid-cols-3">
              {meta.map((m, i) => (
                <div key={m.label} className="flex items-start gap-4 bg-white p-6">
                  <span className="mt-0.5 inline-grid h-9 w-9 place-items-center border border-[#d9d6cb] bg-[#f6f5f1] text-[#3E5854]">
                    <ClockIcon />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#626675]/50">{m.label}</p>
                    <p className="mt-2 font-brand text-[15px] font-black leading-tight text-[#23273F]">{m.value}</p>
                    <p className="mt-1 text-[12px] leading-[1.5] text-[#626675]">{m.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FORM + OFFICE ─────────────────────────────────────── */}
      <section id="form" className="section section-paper eng-grid-paper relative overflow-hidden">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">

          <ScrollReveal>
            <div className="mb-12 flex items-center gap-5 sm:mb-16">
              <span className="text-[11px] font-black tracking-[0.22em] text-[#3E5854]">02 · REQUEST</span>
              <span className="h-px flex-1 max-w-[48px] bg-[#3E5854]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626675]/60">Заявка на инженерную оценку</span>
            </div>
          </ScrollReveal>

          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:items-start">

            {/* LEFT — process + office */}
            <ScrollReveal>
              <h2
                className="font-brand font-black text-[#23273F] leading-[1.0]"
                style={{ fontSize: 'clamp(28px, 3.4vw, 48px)' }}
              >
                Коротко опишите<br />объект — соберём<br />следующий шаг
              </h2>
              <p className="mt-7 max-w-[460px] text-[15px] leading-[1.78] text-[#626675]">
                Форма не заменяет ТЗ. Она помогает быстро понять контекст и подготовить предметный разговор. Без спама и скриптовых звонков.
              </p>

              {/* Process steps */}
              <div className="mt-10 space-y-0 border-t border-[#d9d6cb]">
                {[
                  ['01', 'Заявка', 'Заполняете форму или пишете на email. Честный минимум полей.'],
                  ['02', 'Разбор', 'Смотрим контекст, задаём 2–3 уточняющих вопроса по сути.'],
                  ['03', 'Предложение', 'Возвращаемся с составом работ, сроками и стоимостью.'],
                ].map(([num, title, body]) => (
                  <div key={num} className="grid grid-cols-[48px_1fr] gap-4 border-b border-[#d9d6cb] py-5">
                    <span className="mt-0.5 font-brand text-[11px] font-black tracking-[0.22em] text-[#3E5854]">{num}</span>
                    <div>
                      <p className="text-[14px] font-bold text-[#23273F]">{title}</p>
                      <p className="mt-1.5 text-[13px] leading-[1.65] text-[#626675]">{body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contacts quickline */}
              <div className="mt-10 border-l-[3px] border-[#3E5854] bg-white px-6 py-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3E5854] mb-3">Не любите формы?</p>
                <p className="text-[14px] leading-[1.7] text-[#23273F]">
                  Напишите на <a href="mailto:em-psp@mail.ru" className="font-bold underline decoration-[#3E5854]/40 underline-offset-2 hover:text-[#3E5854]">em-psp@mail.ru</a> или позвоните <a href="tel:+79892888980" className="font-bold underline decoration-[#3E5854]/40 underline-offset-2 hover:text-[#3E5854]">+7 (989) 288-89-80</a> — ответим по существу.
                </p>
              </div>
            </ScrollReveal>

            {/* RIGHT — form panel */}
            <ScrollReveal className="reveal-delay-2">
              <div className="border border-[#d9d6cb] bg-white shadow-[0_30px_90px_rgba(13,16,28,0.08)]">
                <div className="flex items-center justify-between border-b border-[#d9d6cb] px-7 py-5 sm:px-10">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#5f8b7d]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#3E5854]">FORM · LIVE</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#626675]/50">Бесплатно</span>
                </div>
                <div className="p-7 sm:p-10">
                  <h3 className="font-brand text-[22px] font-black leading-tight text-[#23273F]">
                    Получить инженерную оценку
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#626675]">
                    Заполните поля — мы ответим по существу и без скриптов.
                  </p>
                  <LeadForm source="contacts" className="mt-8" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── OFFICE + MAP ──────────────────────────────────────── */}
      <section id="office" className="section section-white relative overflow-hidden">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">

          <ScrollReveal>
            <div className="mb-12 flex items-center gap-5 sm:mb-16">
              <span className="text-[11px] font-black tracking-[0.22em] text-[#3E5854]">03 · OFFICE</span>
              <span className="h-px flex-1 max-w-[48px] bg-[#3E5854]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626675]/60">Где нас найти</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid gap-8 pb-14 lg:grid-cols-[1fr_1fr] lg:items-end">
              <h2 className="section-title leading-[1]">Два контура —<br />регистрация и работа</h2>
              <p className="body-large max-w-[460px]">
                Юридически зарегистрированы в Санкт-Петербурге, оперативно работаем из Краснодара. Приём по предварительной записи.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-px bg-[#d9d6cb] lg:grid-cols-[1fr_1.2fr]">

            {/* Offices list */}
            <ScrollReveal className="h-full">
              <div className="flex h-full flex-col gap-px bg-[#d9d6cb]">
                {/* SPB */}
                <div className="flex-1 bg-[#f6f5f1] p-7 sm:p-9">
                  <div className="flex items-center gap-3">
                    <span className="inline-grid h-10 w-10 place-items-center border border-[#d9d6cb] bg-white text-[#3E5854]">
                      <MapPinIcon />
                    </span>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#626675]/60">Юридический</p>
                      <p className="mt-1 font-brand text-[11px] font-black tracking-[0.16em] text-[#23273F]">САНКТ-ПЕТЕРБУРГ</p>
                    </div>
                  </div>
                  <p className="mt-6 text-[15px] font-semibold leading-[1.7] text-[#23273F]">
                    199178, линия 9-Я В.О., д. 66 лит. А,<br />пом. 1-н, оф. 8
                  </p>
                  <p className="mt-4 text-[12px] leading-[1.65] text-[#626675]">
                    Регистрационный офис. Приём документов — по согласованию.
                  </p>
                </div>

                {/* Krasnodar */}
                <div className="flex-1 bg-[#23273F] p-7 text-white sm:p-9">
                  <div className="flex items-center gap-3">
                    <span className="inline-grid h-10 w-10 place-items-center border border-white/14 bg-white/5 text-[#8ab0a3]">
                      <MapPinIcon />
                    </span>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#5f8b7d]">Фактический</p>
                      <p className="mt-1 font-brand text-[11px] font-black tracking-[0.16em] text-white">КРАСНОДАР</p>
                    </div>
                  </div>
                  <p className="mt-6 text-[15px] font-semibold leading-[1.7] text-white">
                    350000, ул. Коммунаров, 76,<br />офис 382/9
                  </p>
                  <p className="mt-4 text-[12px] leading-[1.65] text-white/52">
                    Основной рабочий офис. Встречи — по предварительной записи.
                  </p>
                  <a
                    href="https://yandex.ru/maps/?ll=38.975300%2C45.035500&z=16&pt=38.975300,45.035500"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-6 inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#8ab0a3] transition-all hover:gap-5 hover:text-white"
                  >
                    Открыть в Яндекс.Картах <Arrow />
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Map */}
            <ScrollReveal className="h-full">
              <div className="relative h-full min-h-[440px] overflow-hidden bg-white">
                <div className="pointer-events-none absolute left-0 top-0 z-20 flex items-center gap-3 border-b border-r border-[#d9d6cb] bg-white/95 px-4 py-2 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-[#5f8b7d]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#3E5854]">MAP · KRASNODAR</span>
                </div>
                <iframe
                  title="Офис ЕМ-ПСП в Краснодаре"
                  src="https://yandex.ru/map-widget/v1/?ll=38.975300%2C45.035500&z=15&pt=38.975300,45.035500,pm2rdm"
                  width="100%"
                  height="100%"
                  style={{ minHeight: 440, border: 0 }}
                  frameBorder="0"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── LEGAL STRIP ───────────────────────────────────────── */}
      <section id="legal" className="border-y border-[#d9d6cb] bg-[#f6f5f1] py-12 sm:py-14">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-10 flex items-center gap-5">
              <span className="text-[11px] font-black tracking-[0.22em] text-[#3E5854]">04 · LEGAL</span>
              <span className="h-px flex-1 max-w-[48px] bg-[#3E5854]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626675]/60">Реквизиты для договора</span>
            </div>
          </ScrollReveal>

          <div className="grid gap-px bg-[#d9d6cb] md:grid-cols-2 lg:grid-cols-4">
            {[
              ['Наименование', 'ООО «ЕМ-ПСП»'],
              ['ИНН', '7801724375'],
              ['ОГРН', '1237800071948'],
              ['Дата регистрации', '21.06.2023'],
            ].map(([label, value]) => (
              <div key={label} className="bg-white px-6 py-5">
                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#626675]/50">{label}</p>
                <p className="mt-2 font-brand text-[15px] font-black tracking-[-0.01em] text-[#23273F] tabular-nums">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[12px] leading-[1.65] text-[#626675]">
              Полные реквизиты и карточка предприятия — на странице «О компании».
            </p>
            <Link
              href="/o-kompanii#requisites"
              className="group inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#3E5854] transition-all hover:gap-5 hover:text-[#23273F]"
            >
              Открыть реквизиты <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
