import type { Metadata } from 'next'
import LeadForm from '@/components/LeadForm'
import ScrollReveal from '@/components/ScrollReveal'
import { brand } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Контакты — EM-PCP',
  description:
    'Контакты EM-PCP: телефон, MAX, email, офисы Санкт-Петербург и Краснодар, форма заявки.',
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

const MaxIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-3.5-7.1L21 3v6h-6" />
  </svg>
)

export default function ContactsPage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="section-dark relative overflow-hidden pt-32 pb-14 sm:pb-20 lg:pb-24">
        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          <h1
            className="font-brand font-black text-white max-w-[1040px] [text-wrap:balance]"
            style={{ fontSize: 'clamp(32px, 4.6vw, 68px)', lineHeight: 1.02, letterSpacing: '-0.02em' }}
          >
            Расскажите, какой результат нужен — и мы найдём решение
          </h1>
          <p className="mt-10 max-w-[760px] text-[15px] leading-[1.75] text-white/58 sm:text-[17px]">
            На основе исчерпывающих исходных данных мы точно определяем состав работ, оцениваем риски и находим решения — в том числе в нестандартных случаях, где другие видят тупик.
          </p>
        </div>
      </section>

      {/* ─── CHANNELS ──────────────────────────────────────────── */}
      <section id="channels" className="section section-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">

          <ScrollReveal>
            <div className="mb-12 grid gap-8 border-b border-[#d9d6cb] pb-12 sm:mb-14 sm:pb-14 lg:grid-cols-[1fr_1fr] lg:items-end">
              <h2 className="section-title leading-[1.02]">Прямые каналы связи</h2>
              <p className="body-large max-w-[460px]">
                Один номер телефона и один email — без отделов, фильтрации и переадресаций.
              </p>
            </div>
          </ScrollReveal>

          {/* Phone card — big */}
          <div className="grid gap-px bg-[#d9d6cb] lg:grid-cols-2">

            {/* Phone + MAX */}
            <ScrollReveal className="h-full">
              <div className="flex h-full flex-col justify-between gap-10 bg-white p-8 sm:p-10">
                <div className="flex items-center gap-4">
                  <span className="inline-grid h-12 w-12 place-items-center border border-[#d9d6cb] bg-[#f6f5f1] text-[#3E5854]">
                    <PhoneIcon />
                  </span>
                  <p className="text-[15px] font-black uppercase tracking-[0.14em] text-[#23273F]">Телефон</p>
                </div>
                <div>
                  <a
                    href={brand.phoneHref}
                    className="block font-brand font-black text-[#23273F] tabular-nums transition-colors hover:text-[#3E5854]"
                    style={{ fontSize: 'clamp(28px, 3.4vw, 42px)', letterSpacing: '-0.01em' }}
                  >
                    {brand.phone}
                  </a>
                  <a
                    href={brand.maxHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-[13px] font-black uppercase tracking-[0.14em] text-[#3E5854] transition-colors hover:text-[#23273F]"
                  >
                    <MaxIcon />
                    Написать в MAX
                  </a>
                  <p className="mt-2 text-[14px] leading-[1.65] text-[#626675]">
                    По всем вопросам
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Email */}
            <ScrollReveal className="h-full">
              <div className="flex h-full flex-col justify-between gap-10 bg-white p-8 sm:p-10">
                <div className="flex items-center gap-4">
                  <span className="inline-grid h-12 w-12 place-items-center border border-[#d9d6cb] bg-[#f6f5f1] text-[#3E5854]">
                    <MailIcon />
                  </span>
                  <p className="text-[15px] font-black uppercase tracking-[0.14em] text-[#23273F]">Почта</p>
                </div>
                <div>
                  <a
                    href={brand.emailHref}
                    className="block font-brand font-black text-[#23273F] transition-colors hover:text-[#3E5854]"
                    style={{ fontSize: 'clamp(24px, 2.8vw, 34px)', letterSpacing: '-0.01em' }}
                  >
                    {brand.email}
                  </a>
                  <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#626675]/60">Срок</p>
                  <p className="mt-1 text-[15px] font-semibold leading-[1.5] text-[#23273F]">{brand.sla}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Work hours strip */}
          <div className="mt-3 border border-[#d9d6cb] bg-white px-7 py-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#626675]/60">Режим работы</p>
                <p className="mt-1.5 font-brand text-[18px] font-black text-[#23273F]">{brand.workingHours}</p>
              </div>
              <p className="text-[12px] leading-[1.65] text-[#626675]">Время московское · Без авто-ответов</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FORM ──────────────────────────────────────────────── */}
      <section id="form" className="section section-paper">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:items-start">

            <ScrollReveal>
              <h2
                className="font-brand font-black text-[#23273F] leading-[1.02]"
                style={{ fontSize: 'clamp(28px, 3.4vw, 46px)' }}
              >
                Коротко опишите объект — соберём следующий шаг
              </h2>
              <p className="mt-7 max-w-[460px] text-[15px] leading-[1.78] text-[#626675]">
                Форма не заменяет ТЗ. Она помогает быстро понять контекст и подготовить предметный разговор.
              </p>

              <div className="mt-8 divide-y divide-[#d9d6cb]">
                {[
                  { title: 'Заявка', body: 'Заполняете форму или пишете на email. Честный минимум полей.' },
                  { title: 'Разбор', body: 'Смотрим контекст, задаём 2–3 уточняющих вопроса по сути.' },
                  { title: 'Предложение', body: 'Возвращаемся с составом работ, сроками и стоимостью.' },
                ].map(({ title, body }) => (
                  <div key={title} className="py-5">
                    <p className="font-brand text-[16px] font-black text-[#23273F]">{title}</p>
                    <p className="mt-1.5 text-[14px] leading-[1.65] text-[#626675]">{body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-l-[3px] border-[#3E5854] bg-white px-6 py-5">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#3E5854]">Не любите формы?</p>
                <p className="text-[14px] leading-[1.7] text-[#23273F]">
                  Напишите на <a href={brand.emailHref} className="font-bold underline decoration-[#3E5854]/40 underline-offset-2 hover:text-[#3E5854]">{brand.email}</a> или позвоните <a href={brand.phoneHref} className="font-bold underline decoration-[#3E5854]/40 underline-offset-2 hover:text-[#3E5854]">{brand.phone}</a>.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal className="reveal-delay-2">
              <div className="border border-[#d9d6cb] bg-white shadow-[0_30px_90px_rgba(13,16,28,0.08)]">
                <div className="p-7 sm:p-10">
                  <h3 className="font-brand text-[22px] font-black leading-tight text-[#23273F]">
                    Получить инженерную оценку
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#626675]">
                    Ответим по существу и без скриптов.
                  </p>
                  <LeadForm source="contacts" className="mt-8" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── OFFICE + MAP ──────────────────────────────────────── */}
      <section id="office" className="section section-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">

          <ScrollReveal>
            <div className="mb-12 grid gap-8 border-b border-[#d9d6cb] pb-12 sm:mb-14 sm:pb-14 lg:grid-cols-[1fr_1fr] lg:items-end">
              <h2 className="section-title leading-[1.02]">Где нас найти</h2>
              <p className="body-large max-w-[460px]">
                Юридически зарегистрированы в Санкт-Петербурге, оперативно работаем из Краснодара. Приём по предварительной записи.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-px bg-[#d9d6cb] lg:grid-cols-[1fr_1.2fr]">
            <ScrollReveal className="h-full">
              <div className="flex h-full flex-col gap-px bg-[#d9d6cb]">
                {/* SPB */}
                <div className="flex-1 bg-[#f6f5f1] p-7 sm:p-9">
                  <div className="flex items-center gap-3">
                    <span className="inline-grid h-10 w-10 place-items-center border border-[#d9d6cb] bg-white text-[#3E5854]">
                      <MapPinIcon />
                    </span>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#626675]/60">Основной офис</p>
                      <p className="mt-1 font-brand text-[13px] font-black tracking-[0.14em] text-[#23273F]">САНКТ-ПЕТЕРБУРГ</p>
                    </div>
                  </div>
                  <p className="mt-6 text-[15px] font-semibold leading-[1.7] text-[#23273F]">
                    199178, линия 9-Я В.О., д. 66 лит. А,<br />пом. 1-н, оф. 8
                  </p>
                </div>

                {/* Krasnodar — Дополнительный офис */}
                <div className="flex-1 bg-[#23273F] p-7 text-white sm:p-9">
                  <div className="flex items-center gap-3">
                    <span className="inline-grid h-10 w-10 place-items-center border border-white/14 bg-white/5 text-[#8ab0a3]">
                      <MapPinIcon />
                    </span>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#5f8b7d]">Дополнительный офис</p>
                      <p className="mt-1 font-brand text-[13px] font-black tracking-[0.14em] text-white">КРАСНОДАР</p>
                    </div>
                  </div>
                  <p className="mt-6 text-[15px] font-semibold leading-[1.7] text-white">
                    350000, ул. Коммунаров, 76,<br />офис 382/9
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
                <iframe
                  title="Офис EM-PCP в Краснодаре"
                  src="https://yandex.ru/map-widget/v1/?ll=38.975300%2C45.035500&z=15&pt=38.975300,45.035500,pm2rdm"
                  style={{ minHeight: 440, border: 0, width: '100%', height: '100%' }}
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── LEGAL ─────────────────────────────────────────────── */}
      <section id="legal" className="border-y border-[#d9d6cb] bg-[#f6f5f1] py-12 sm:py-14">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid gap-px bg-[#d9d6cb] md:grid-cols-2 lg:grid-cols-4">
            {[
              ['Наименование', brand.legalName],
              ['ИНН', brand.inn],
              ['КПП', brand.kpp],
              ['Генеральный директор', brand.director],
            ].map(([label, value]) => (
              <div key={label} className="bg-white px-6 py-5">
                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#626675]/50">{label}</p>
                <p className="mt-2 font-brand text-[15px] font-black tracking-[-0.01em] text-[#23273F]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
