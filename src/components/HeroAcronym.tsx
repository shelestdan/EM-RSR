'use client'

import { useAnimatedSiteLocale } from '@/hooks/useSiteLocale'
import type { SiteLocale } from '@/lib/site-locale'

type AcronymRow = {
  letter: string
  title: string
  text: string
}

const heroRows: Record<SiteLocale, AcronymRow[]> = {
  ru: [
    {
      letter: 'Е',
      title: 'динство',
      text: 'Команда узкоспециализированных проектировщиков и изыскателей, которые не замыкаются в своём разделе: свободно ориентируются в смежных дисциплинах, проверяют их и находят ошибки на стыке. Каждый работает с ответственностью ГИПа.',
    },
    {
      letter: 'М',
      title: 'еханизмов',
      text: 'Точность расчётов и выверенность решений, где каждый чертёж оптимизирован до миллиметра.',
    },
    {
      letter: 'П',
      title: 'роектирование',
      text: 'Документация, готовая к экспертизе с первого раза, без доработок на площадке и реализацией строго по проекту, с жёстким контролем сроков, бюджета и качества.',
    },
    {
      letter: 'С',
      title: 'троительство',
      text: 'Точная реализация строго по чертежам, с жёстким контролем сроков, бюджета и качества.',
    },
    {
      letter: 'П',
      title: 'люс',
      text: 'Результат выше нормативов: запас надёжности, оптимизация затрат и долгосрочная гарантия.',
    },
  ],
  en: [
    {
      letter: 'E',
      title: 'ngineering',
      text: 'A team of highly specialized designers and surveyors who do not stay confined to their own discipline: they navigate adjacent fields, check interfaces, and find errors at the junctions. Each person works with the responsibility of a chief project engineer.',
    },
    {
      letter: 'M',
      title: 'echanisms',
      text: 'Streamlined workflows and systematic control: from site surveys to final handover documentation.',
    },
    {
      letter: 'P',
      title: 'roject',
      text: 'Documentation ready for expert review on the first submission, without on-site rework, and implemented strictly according to the project with tight control over timelines, budget, and quality.',
    },
    {
      letter: 'C',
      title: 'onstruction',
      text: 'Precise execution strictly per drawings, with rigid control over timelines, budget, and quality.',
    },
    {
      letter: 'P',
      title: 'lus',
      text: 'Performance beyond code requirements: built-in reliability margins, cost efficiency without compromise, and long-term warranty.',
    },
  ],
}

const labelsByLocale: Record<SiteLocale, string> = {
  ru: 'ЕМ-ПСП: Единство, Механизмов, Проектирование, Строительство, Плюс',
  en: 'EM-PCP: Engineering, Mechanisms, Project, Construction, Plus',
}

function AcronymTable({ locale }: { locale: SiteLocale }) {
  return (
    <div className="divide-y divide-[#e8e5e0] w-full">
      {heroRows[locale].map((row, index) => (
        <div
          key={`${locale}-${row.letter}-${row.title}`}
          className="grid grid-cols-[2.5rem_1fr] items-start gap-x-4 py-4 sm:grid-cols-[3rem_minmax(180px,240px)_1fr] sm:gap-x-6 sm:py-5 lg:grid-cols-[3.5rem_minmax(220px,280px)_1fr] lg:gap-x-8 lg:py-6"
          style={{ transitionDelay: `${index * 45}ms` }}
        >
          <span className="col-span-2 flex min-w-0 items-baseline whitespace-nowrap font-brand font-black leading-none">
            <span className="text-[36px] text-[#1a3a72] sm:text-[46px] lg:text-[64px]">
              {row.letter}
            </span>
            <span className="text-[23px] text-[#3E5854] sm:text-[28px] lg:text-[38px]">
              {row.title}
            </span>
          </span>
          <p className="col-span-2 mt-1 pl-10 text-[15px] leading-[1.5] text-[#2a2d40]/80 sm:col-span-1 sm:mt-0 sm:pl-0 sm:text-[15px] sm:leading-[1.55] lg:text-[17px] lg:leading-[1.55]">
            {row.text}
          </p>
        </div>
      ))}
    </div>
  )
}

export default function HeroAcronym({ locale: forcedLocale }: { locale?: SiteLocale }) {
  const animatedLocale = useAnimatedSiteLocale({
    fallback: forcedLocale || 'ru',
    autoCycleMs: forcedLocale ? 0 : 60_000,
  })
  const locale = forcedLocale || animatedLocale

  return (
    <h1 className="w-full" aria-label={labelsByLocale[locale]}>
      <span className="sr-only">{labelsByLocale[locale]}</span>
      <span className="grid" aria-hidden="true">
        {(['ru', 'en'] as const).map((entry) => (
          <span
            key={entry}
            className={`col-start-1 row-start-1 transition-all duration-[650ms] ease-out ${
              locale === entry
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none -translate-y-2 opacity-0'
            }`}
          >
            <AcronymTable locale={entry} />
          </span>
        ))}
      </span>
    </h1>
  )
}
