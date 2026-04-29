import type { Metadata } from 'next'
import EngineeringDisciplineSection from '@/components/EngineeringDisciplineSection'
import LeadForm from '@/components/LeadForm'
import ScrollReveal from '@/components/ScrollReveal'
import { brand, servicePillars } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Услуги — ЕМ-ПСП',
  description:
    'Изыскания, проектирование, инженерные сети, экспертиза и авторский надзор для объектов капитального строительства.',
}

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const COORDINATOR_NOTE =
  'Задача затрагивает несколько разделов? Назначаем единого координатора и фиксируем зоны ответственности в договоре.'

export default function ServicesPage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="section-dark relative min-h-[60vh] overflow-hidden pt-32 flex flex-col justify-end pb-16 sm:pb-20 lg:pb-24">
        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          <h1
            className="font-brand font-black text-white max-w-[900px]"
            style={{ fontSize: 'clamp(36px, 5.5vw, 80px)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
          >
            Не набор услуг —<br />управляемая<br />система работ
          </h1>
          <p className="mt-10 max-w-[600px] text-[15px] leading-[1.75] text-white/50 sm:text-[17px]">
            ЕМ-ПСП закрывает ключевые этапы инженерного объекта: от исходных данных до строительства, экспертизы и авторского надзора.
          </p>

          {/* Service quick-links — only active pillars */}
          <div className="mt-14 flex flex-col gap-px sm:flex-row">
            {servicePillars.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group flex items-center justify-between gap-4 border border-white/8 bg-white/[0.03] px-5 py-4 text-[11px] font-black uppercase tracking-[0.1em] text-white/42 transition-all duration-200 hover:border-[#5f8b7d]/50 hover:bg-[#5f8b7d]/10 hover:text-white sm:flex-1 sm:flex-col sm:items-start sm:justify-start sm:gap-3"
              >
                <span className="leading-tight">{s.title}</span>
                <Arrow />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICE SECTIONS ──────────────────────────────────── */}
      {servicePillars.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`relative overflow-hidden border-b border-[#d9d6cb] ${index % 2 === 0 ? 'bg-white' : 'bg-[#f6f5f1]'}`}
        >
          <div className="container relative mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:items-start">

              {/* LEFT */}
              <ScrollReveal>
                <h2
                  className="font-brand font-black text-[#23273F] leading-[1.0]"
                  style={{ fontSize: 'clamp(26px, 3.2vw, 46px)' }}
                >
                  {service.title}
                </h2>
                <p className="mt-7 text-[16px] leading-[1.78] text-[#626675]">
                  {service.description}
                </p>

                {/* Result block */}
                <div className="mt-10 border-l-[3px] border-[#3E5854] bg-[#f6f5f1] px-6 py-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3E5854] mb-3">Результат</p>
                  <p className="text-[15px] font-semibold leading-[1.72] text-[#23273F]">
                    {service.result.replace('Результат: ', '')}
                  </p>
                </div>

                {/* CTA → form anchor on this page */}
                <a
                  href="#contact"
                  className="mt-10 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#3E5854] transition-all duration-200 hover:gap-5 hover:text-[#23273F]"
                >
                  Оставить заявку <Arrow />
                </a>
              </ScrollReveal>

              {/* RIGHT — scope */}
              <ScrollReveal className="reveal-delay-2">
                <div className={`${index % 2 === 0 ? 'bg-[#f6f5f1]' : 'bg-white'} border border-[#d9d6cb] p-7 sm:p-10`}>
                  <p className="mb-7 text-[10px] font-black uppercase tracking-[0.22em] text-[#626675]/60">
                    Состав работ
                  </p>
                  <ul className="space-y-0">
                    {service.scope.map((item) => (
                      <li
                        key={item}
                        className="border-b border-[#d9d6cb] py-5 last:border-b-0"
                      >
                        <span className="text-[15px] leading-[1.65] text-[#23273F]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dark coordinator note — unified across all service blocks */}
                <div className="mt-3 bg-[#23273F] px-7 py-6 sm:px-10 sm:py-7">
                  <p className="text-[14px] leading-[1.72] text-white/60">
                    {COORDINATOR_NOTE}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      {/* ─── WORKFLOW ──────────────────────────────────────────── */}
      <EngineeringDisciplineSection />

      {/* ─── CONTACT (copied from homepage) ──────────────────────── */}
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
                <LeadForm source="services" dark />
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </>
  )
}
