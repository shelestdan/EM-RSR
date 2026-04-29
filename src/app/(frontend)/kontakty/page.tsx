import type { Metadata } from 'next'
import LeadForm from '@/components/LeadForm'
import OfficeMapTabs from '@/components/OfficeMapTabs'
import ScrollReveal from '@/components/ScrollReveal'
import CopyNumber from '@/components/CopyNumber'
import { brand } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Контакты — EM-PCP',
  description:
    'Контакты EM-PCP: телефон, MAX, email, офисы Санкт-Петербург и Краснодар, форма заявки.',
}

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
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="inline-grid h-12 w-12 place-items-center border border-[#d9d6cb] bg-[#f6f5f1] text-[#3E5854]">
                      <PhoneIcon />
                    </span>
                    <p className="text-[15px] font-black uppercase tracking-[0.14em] text-[#23273F]">Телефон</p>
                  </div>
                  <a
                    href={brand.maxHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-colors hover:text-[#23273F]"
                  >
                    <span className="inline-grid h-12 w-12 place-items-center border border-[#d9d6cb] bg-[#f6f5f1] text-[#3E5854]">
                      <MaxIcon />
                    </span>
                    <p className="text-[15px] font-black uppercase tracking-[0.14em] text-[#23273F]">MAX</p>
                  </a>
                </div>
                <div>
                  <a
                    href={brand.phoneHref}
                    className="block font-brand font-black text-[#23273F] tabular-nums transition-colors hover:text-[#3E5854]"
                    style={{ fontSize: 'clamp(28px, 3.4vw, 42px)', letterSpacing: '-0.01em' }}
                  >
                    {brand.phone}
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
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="inline-grid h-12 w-12 place-items-center border border-[#d9d6cb] bg-[#f6f5f1] text-[#3E5854]">
                      <MailIcon />
                    </span>
                    <p className="text-[15px] font-black uppercase tracking-[0.14em] text-[#23273F]">Почта</p>
                  </div>
                  <div className="flex items-center gap-4 opacity-0" aria-hidden="true">
                    <span className="inline-grid h-12 w-12 place-items-center border border-[#d9d6cb] bg-[#f6f5f1] text-[#3E5854]">
                      <MaxIcon />
                    </span>
                    <p className="text-[15px] font-black uppercase tracking-[0.14em] text-[#23273F]">MAX</p>
                  </div>
                </div>
                <div>
                  <a
                    href={brand.emailHref}
                    className="block font-brand font-black text-[#23273F] transition-colors hover:text-[#3E5854]"
                    style={{ fontSize: 'clamp(28px, 3.4vw, 42px)', letterSpacing: '-0.01em' }}
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
      <section id="form" className="section section-dark relative overflow-hidden">
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
                <LeadForm source="contacts" dark />
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

          <OfficeMapTabs />
        </div>
      </section>

      {/* ─── LEGAL ─────────────────────────────────────────────── */}
      <section id="legal" className="border-y border-[#d9d6cb] bg-[#f6f5f1] py-12 sm:py-14">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid gap-px bg-[#d9d6cb] md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white px-6 py-5">
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#626675]/50">Наименование</p>
              <p className="mt-2 font-brand text-[15px] font-black tracking-[-0.01em] text-[#23273F]">{brand.legalName}</p>
            </div>
            <div className="bg-white px-6 py-5">
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#626675]/50">ИНН</p>
              <CopyNumber
                value={brand.inn}
                className="mt-2 font-brand text-[15px] font-black tracking-[-0.01em] text-[#23273F] tabular-nums"
              />
            </div>
            <div className="bg-white px-6 py-5">
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#626675]/50">КПП</p>
              <CopyNumber
                value={brand.kpp}
                className="mt-2 font-brand text-[15px] font-black tracking-[-0.01em] text-[#23273F] tabular-nums"
              />
            </div>
            <div className="bg-white px-6 py-5">
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#626675]/50">Генеральный директор</p>
              <p className="mt-2 font-brand text-[15px] font-black tracking-[-0.01em] text-[#23273F]">{brand.director}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
