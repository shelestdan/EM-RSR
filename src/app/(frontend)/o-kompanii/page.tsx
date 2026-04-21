import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'О компании — EM-PCP',
  description:
    'ООО «ЕМ-ПолиСпецПроект»: инжиниринговая компания полного цикла. СРО проектирование и изыскания, ISO 9001/14001/45001. 150+ объектов, 40+ регионов.',
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M3 7h8M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const principles = [
  {
    title: 'Цена ниже сметы. Без компромиссов в качестве',
    body: 'Берём за основу нормативы Минстроя только для расчёта верхней планки. Реальная стоимость наших услуг всегда ниже. Вы не переплачиваете за "воздух" и административный ресурс',
  },
  {
    title: 'Качество выше требований',
    body: 'Мы выполняем работы с запасом надёжности: наши решения не просто соответствуют, а превосходят требования действующих СП, ГОСТ и СНиП',
  },
  {
    title: 'Гарантия без сложностей',
    body: 'Мы делаем работу качественно с первого раза. Поэтому к нам возвращаются за новыми проектами и рекомендациями партнёрам, а не с просьбами переделать или вернуть деньги',
  },
]

// Swapped: Изыскания first, Проектирование second
const sroDocs = [
  {
    tag: 'СРО · Изыскания',
    number: 'И-037-007801724375-1897',
    inn: '7801724375',
    body: 'Допуск на выполнение инженерных изысканий',
  },
  {
    tag: 'СРО · Проектирование',
    number: 'П-174-007801724375-3773',
    inn: '7801724375',
    body: 'Допуск на выполнение проектной документации',
  },
]

const certDocs = [
  {
    code_full: 'ГОСТ ISO 9001-2015',
    sublabel: 'Система менеджмента качества',
    pdfUrl: '/certs/iso-9001.pdf',
    previewUrl: '/certs/iso-9001-preview.jpg',
  },
  {
    code_full: 'ГОСТ Р ИСО 14001-2016',
    sublabel: 'Экологический менеджмент',
    pdfUrl: '/certs/iso-14001.pdf',
    previewUrl: '/certs/iso-14001-preview.jpg',
  },
  {
    code_full: 'ГОСТ Р ИСО 45001-2020',
    sublabel: 'Охрана труда и безопасность',
    pdfUrl: '/certs/iso-45001.pdf',
    previewUrl: '/certs/iso-45001-preview.jpg',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="section-dark relative overflow-hidden pt-32 pb-14 sm:pb-20 lg:pb-24">
        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          <h1
            className="font-brand font-black text-white max-w-[1040px] [text-wrap:balance]"
            style={{ fontSize: 'clamp(32px, 4.6vw, 68px)', lineHeight: 1.02, letterSpacing: '-0.02em' }}
          >
            Инжиниринговая компания полного цикла
          </h1>
          <p className="mt-10 max-w-[760px] text-[15px] leading-[1.75] text-white/58 sm:text-[17px]">
            Изыскания, проектирование, строительство и надзор — единая управляемая цепочка. Сроки, состав работ и ответственность фиксируются в договоре.
          </p>
        </div>
      </section>

      {/* ─── POSITION ──────────────────────────────────────────── */}
      <section id="position" className="section section-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid gap-12 lg:grid-cols-[0.38fr_1fr] lg:gap-20 lg:items-start">
              <h2
                className="font-brand font-black text-[#23273F] leading-[1.0] lg:sticky lg:top-24"
                style={{ fontSize: 'clamp(22px, 2.2vw, 34px)', letterSpacing: '-0.015em', wordBreak: 'keep-all', hyphens: 'none' }}
              >
                <span className="block text-[#3E5854] opacity-70" style={{ fontSize: '0.6em', letterSpacing: '0.12em' }}>ООО</span>
                <span className="mt-2 block">«ЕМ–ПолиСпецПроект»</span>
              </h2>
              <p className="text-[16px] leading-[1.85] text-[#626675]">
                ООО «ЕМ – ПолиСпецПроект» — инжиниринговая компания полного цикла. Мы объединяем сбор исходных данных, изыскания, проектирование, строительство и надзор в единую управляемую цепочку, обеспечивая техническое сопровождение экспертизы. Работаем по принципу одного подрядчика: фиксируем сроки, состав работ и ответственность в договоре. Наш подход: цена всегда ниже сметных нормативов Минстроя — без накруток и «воздуха»; качество превосходит требования СП, ГОСТ и СНиП — работаем с запасом надёжности; делаем правильно с первого раза — заказчики возвращаются за новыми проектами. Опыт и масштаб: 150+ реализованных объектов, 40+ регионов присутствия, команда работает с 2019 года. Ответственность подтверждена: СРО Проектирование и Изыскания, ISO 9001, 14001, 45001, максимальный электронный документооборот и рациональное использование ресурсов. Мы не предлагаем шаблонные решения «от». Стоимость, сроки и состав работ определяем после анализа объекта, исходных данных и требуемого результата. Без показной сложности: точные исходные данные, понятные решения, регулярная коммуникация и контроль изменений.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── PRINCIPLES ────────────────────────────────────────── */}
      <section id="principles" className="section section-paper relative overflow-hidden">
        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">

          <ScrollReveal>
            <div className="grid gap-8 pb-14 lg:grid-cols-[1fr_1fr] lg:items-end">
              <h2 className="section-title leading-[1]">Три принципа<br />инженерной дисциплины</h2>
              <p className="body-large max-w-[460px]">
                Не декларации, а правила, по которым решается спор на площадке, в согласовании и в договоре.
              </p>
            </div>
          </ScrollReveal>

          <div className="border-t border-[#d9d6cb]">
            {principles.map((p) => (
              <ScrollReveal key={p.title}>
                <article className="grid border-b border-[#d9d6cb] py-10 sm:py-14 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
                  <h3
                    className="font-brand font-black leading-[1.02] text-[#23273F]"
                    style={{ fontSize: 'clamp(22px, 2.4vw, 36px)' }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-[520px] text-[15px] leading-[1.78] text-[#626675] lg:mt-0 lg:pt-2">
                    {p.body}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CERTS + SRO ───────────────────────────────────────── */}
      <section id="certs" className="section section-white relative overflow-hidden">
        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">

          <ScrollReveal>
            <div className="mb-12 grid gap-8 border-b border-[#d9d6cb] pb-12 sm:mb-14 sm:pb-14 lg:grid-cols-[1fr_1fr] lg:items-start">
              <h2 className="section-title leading-[1]">Допуски и сертификаты</h2>
              <div className="space-y-4 text-[15px] leading-[1.78] text-[#626675]">
                <p><strong className="font-bold text-[#23273F]">ISO 45001</strong> — это не просто сертификат. Это система охраны труда и здоровья.</p>
                <p>Мы закладываем безопасность в проект ещё на этапе документации. Это гарантирует, что наши инженерные решения минимизируют риски для строителей на площадке и эксплуатантов в будущем.</p>
                <p>Для нас безопасность людей — приоритет. Мы соблюдаем строгие стандарты, чтобы работа выполнялась без аварий и травм.</p>
              </div>
            </div>
          </ScrollReveal>

          {/* SRO row — each card IS a link to NOPRIZ registry */}
          <div className="grid gap-px bg-[#d9d6cb] lg:grid-cols-2">
            {sroDocs.map((sro) => (
              <ScrollReveal key={sro.number} className="h-full">
                <a
                  href="https://www.nopriz.ru/nreestr/electronnyy-reestr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col bg-[#f6f5f1] p-7 transition-colors hover:bg-[#edecea] sm:p-10"
                >
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
                  <p className="mt-1 font-mono text-[12px] text-[#626675]/70">ИНН {sro.inn}</p>
                  <p className="mt-4 text-[14px] leading-[1.7] text-[#626675]">{sro.body}</p>
                  <div className="mt-auto pt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#3E5854] transition-all group-hover:gap-3">
                    Проверить в реестре НОПРИЗ <Arrow />
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>

          {/* ISO cards — with PDF preview thumbnails */}
          <div className="mt-3 grid gap-px bg-[#d9d6cb] md:grid-cols-3">
            {certDocs.map((cert) => (
              <ScrollReveal key={cert.code_full}>
                <a
                  href={cert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="group flex h-full flex-col bg-white p-7 transition-colors duration-300 hover:bg-[#f6f5f1] sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-brand text-[18px] font-black leading-tight text-[#23273F]">
                        {cert.code_full}
                      </h3>
                      <p className="mt-2 text-[13px] leading-[1.65] text-[#626675]">{cert.sublabel}</p>
                    </div>
                    {/* PDF first-page thumbnail */}
                    <div className="shrink-0 w-[72px] overflow-hidden border border-[#d9d6cb] shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                      <Image
                        src={cert.previewUrl}
                        alt={`Сертификат ${cert.code_full}, первая страница`}
                        width={144}
                        height={204}
                        className="block w-full"
                        unoptimized
                      />
                    </div>
                  </div>
                  <div className="mt-auto pt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#3E5854] transition-all group-hover:gap-3">
                    Открыть сертификат <Arrow />
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>

          {/* ISO 9001 text block */}
          <ScrollReveal>
            <div className="mt-3 border border-[#d9d6cb] bg-[#f6f5f1] p-7 sm:p-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3E5854]">ISO 9001</p>
              <div className="mt-5 space-y-4 text-[15px] leading-[1.78] text-[#626675]">
                <p><strong className="font-bold text-[#23273F]">ISO 9001</strong> — это не просто сертификат. Это задокументированная система контроля качества на каждом этапе проектирования.</p>
                <p>Мы не ограничиваемся формальным соблюдением нормативов. Стандарт подтверждает, что качество закладывается в процессы изначально: многоуровневая проверка решений, чёткая фиксация ответственности и минимизация ошибок ещё на этапе документации.</p>
                <p>Это гарантия того, что наши проекты не просто соответствуют СП, ГОСТ и СНиП, а работают с запасом надёжности — без непредвиденных расходов и доработок при строительстве.</p>
              </div>
            </div>
          </ScrollReveal>

          {/* ISO 14001 text block */}
          <ScrollReveal>
            <div className="mt-3 border border-[#d9d6cb] bg-[#f6f5f1] p-7 sm:p-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3E5854]">ISO 14001</p>
              <div className="mt-5 space-y-4 text-[15px] leading-[1.78] text-[#626675]">
                <p><strong className="font-bold text-[#23273F]">ISO 14001</strong> — это не просто сертификат. Это наша система экологического менеджмента.</p>
                <p>Мы минимизируем воздействие на окружающую среду через:</p>
                <ul className="ml-5 list-disc space-y-2">
                  <li>максимальный электронный документооборот — сокращаем бумажные носители</li>
                  <li>рациональное использование ресурсов — при печати чертежей и документации обеспечиваем максимальное заполнение поля чертежа, что снижает расход бумаги</li>
                  <li>ответственное потребление — каждый сэкономленный лист — это сохранённые деревья и вода</li>
                </ul>
                <p>Экология начинается с ежедневных решений. Мы это понимаем и действуем.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── BOTTOM CTA ────────────────────────────────────────── */}
      <section className="section section-dark relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5f8b7d]/36 to-transparent" aria-hidden="true" />

        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:items-end">
            <ScrollReveal>
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
