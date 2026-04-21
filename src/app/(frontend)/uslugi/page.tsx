import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'
import ScrollReveal from '@/components/ScrollReveal'
import { servicePillars, workflow } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Услуги — ЕМ-ПСП',
  description:
    'Изыскания, проектирование, инженерные сети, строительство, экспертиза и авторский надзор для объектов капитального строительства.',
}

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function ServicesPage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="section-dark relative min-h-[60vh] overflow-hidden pt-32 flex flex-col justify-end pb-16 sm:pb-20 lg:pb-24">
        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/28" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-white/60">Главная</Link>
            <span className="text-white/16">/</span>
            <span className="text-white/50">Услуги</span>
          </nav>

          {/* Kicker + h1 */}
          <p className="overline-light mb-8">Инженерный цикл · EM-PCP</p>
          <h1
            className="font-brand font-black text-white max-w-[900px]"
            style={{ fontSize: 'clamp(36px, 5.5vw, 80px)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
          >
            Не набор услуг —<br />управляемая<br />система работ
          </h1>
          <p className="mt-10 max-w-[600px] text-[15px] leading-[1.75] text-white/50 sm:text-[17px]">
            EM-PCP закрывает ключевые этапы инженерного объекта: от исходных данных до строительства, экспертизы и авторского надзора.
          </p>

          {/* Service quick-links */}
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

            {/* Main grid */}
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

                <Link
                  href="/#contact"
                  className="mt-10 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#3E5854] transition-all duration-200 hover:gap-5 hover:text-[#23273F]"
                >
                  Обсудить задачу <Arrow />
                </Link>
              </ScrollReveal>

              {/* RIGHT — scope */}
              <ScrollReveal className="reveal-delay-2">
                <div className={`${index % 2 === 0 ? 'bg-[#f6f5f1]' : 'bg-white'} border border-[#d9d6cb] p-7 sm:p-10`}>
                  <p className="mb-7 text-[10px] font-black uppercase tracking-[0.22em] text-[#626675]/60">
                    Состав работ
                  </p>
                  <ul className="space-y-0">
                    {service.scope.map((item, i) => (
                      <li
                        key={item}
                        className="flex items-start gap-5 border-b border-[#d9d6cb] py-5 last:border-b-0"
                      >
                        <span className="mt-0.5 shrink-0 text-[10px] font-black tabular-nums text-[#3E5854]">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[15px] leading-[1.65] text-[#23273F]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dark CTA strip */}
                <div className="mt-3 bg-[#23273F] px-7 py-6 sm:px-10 sm:py-7">
                  <p className="text-[13px] leading-[1.75] text-white/52">
                    Задача лежит между разделами? Мы не дробим ответственность — сначала определяем инженерную логику, затем состав договора.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      {/* ─── WORKFLOW ──────────────────────────────────────────── */}
      <section className="section section-paper">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">

          <ScrollReveal>
            <div className="grid gap-8 border-b border-[#d9d6cb] pb-14 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div>
                <p className="section-kicker mb-5">Как работаем</p>
                <h2 className="section-title leading-[1]">Сначала инженерная ясность, потом цена</h2>
              </div>
              <p className="body-large max-w-[440px]">
                Не используем фиктивное «от». Оцениваем по исходным данным, ограничениям площадки и требуемому результату.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-14 grid gap-px bg-[#d9d6cb] lg:grid-cols-3">
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
                  <h3 className="mt-7 font-brand text-[24px] font-black leading-tight text-[#23273F]">
                    {step.title}
                  </h3>
                  <p className="mt-5 text-[15px] leading-[1.78] text-[#626675]">{step.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FORM ──────────────────────────────────────────── */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5f8b7d]/36 to-transparent" aria-hidden="true" />
        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24 lg:items-start">

            <ScrollReveal>
              <p className="overline-light mb-8">Заявка</p>
              <h2
                className="section-title section-title-light leading-[1.02]"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                Опишите объект. Мы соберём следующий шаг.
              </h2>
              <p className="body-large body-large-light mt-7 max-w-[400px]">
                Не даём прайс без анализа. Состав работ и стоимость — после разбора исходных данных.
              </p>
              <div className="mt-12 border-t border-white/[0.08] pt-8">
                <p className="mb-4 text-[9px] font-black uppercase tracking-[0.26em] text-white/20">Контакты</p>
                <div className="space-y-3">
                  <a href="tel:+79892888980" className="block text-[14px] text-white/50 transition-colors hover:text-white">
                    +7 (989) 288-89-80
                  </a>
                  <a href="mailto:em-psp@mail.ru" className="block text-[14px] text-white/50 transition-colors hover:text-white">
                    em-psp@mail.ru
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="reveal-delay-2">
              <div className="border border-white/10 bg-[#0d101c]/70 p-7 sm:p-10">
                <h3 className="mb-8 font-brand text-[18px] font-black text-white">Оставить заявку</h3>
                <LeadForm source="services" dark />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
