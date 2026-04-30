'use client'

import { useAnimatedSiteLocale } from '@/hooks/useSiteLocale'
import type { SiteLocale } from '@/lib/site-locale'

type AcronymRow = {
  letter: string
  rest: string
  text: string
  looseJoin?: boolean
}

const rowsByLocale: Record<SiteLocale, AcronymRow[]> = {
  ru: [
    {
      letter: 'Е',
      rest: 'динство',
      text: 'Команда узкоспециализированных проектировщиков и изыскателей, которые не замыкаются в своём разделе: свободно ориентируются в смежных дисциплинах, проверяют их и находят ошибки на стыке. Каждый работает с ответственностью ГИПа.',
    },
    {
      letter: 'М',
      rest: 'еханизмов',
      text: 'Точность расчётов и выверенность решений, где каждый чертёж оптимизирован до миллиметра.',
    },
    {
      letter: 'П',
      rest: 'роектирование',
      text: 'Документация, готовая к экспертизе с первого раза, без доработок на площадке и реализацией строго по проекту, с жёстким контролем сроков, бюджета и качества.',
    },
    {
      letter: 'С',
      rest: 'троительство',
      text: 'Точная реализация строго по чертежам, с жёстким контролем сроков, бюджета и качества.',
    },
    {
      letter: 'П',
      rest: 'люс',
      text: 'Результат выше нормативов: запас надёжности, оптимизация затрат и долгосрочная гарантия.',
    },
  ],
  en: [
    {
      letter: 'E',
      rest: 'Unity',
      looseJoin: true,
      text: 'A team of highly specialized designers and surveyors who do not stay confined to their own discipline: they navigate adjacent fields, check interfaces, and find errors at the junctions. Each person works with the responsibility of a chief project engineer.',
    },
    {
      letter: 'M',
      rest: 'echanisms',
      text: 'Streamlined workflows and systematic control: from site surveys to final handover documentation.',
    },
    {
      letter: 'P',
      rest: 'roject',
      text: 'Documentation ready for expert review on the first submission, without on-site rework, and implemented strictly according to the project with tight control over timelines, budget, and quality.',
    },
    {
      letter: 'C',
      rest: 'onstruction',
      text: 'Precise execution strictly per drawings, with rigid control over timelines, budget, and quality.',
    },
    {
      letter: 'P',
      rest: 'lus',
      text: 'Performance beyond code requirements: built-in reliability margins, cost efficiency without compromise, and long-term warranty.',
    },
  ],
}

const labelsByLocale: Record<SiteLocale, string> = {
  ru: 'ЕМ-ПСП: Единство, Механизмов, Проектирование, Строительство, Плюс',
  en: 'EM-PCP: Unity, Mechanisms, Project, Construction, Plus',
}

function AcronymPanel({ locale, active }: { locale: SiteLocale; active: boolean }) {
  return (
    <div
      aria-hidden={!active}
      className={`col-start-1 row-start-1 transition-all duration-[650ms] ease-out ${
        active
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-2 opacity-0'
      }`}
    >
      <div className="grid w-full divide-y divide-[#e8e5e0]">
        {rowsByLocale[locale].map((row, index) => (
          <div
            key={`${locale}-${row.letter}-${row.rest}`}
            className={`grid grid-cols-[auto_minmax(0,1fr)] gap-x-[clamp(0px,0.4vw,7px)] py-[clamp(12px,2vw,22px)] transition-all duration-[520ms] ease-out ${
              active ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
            style={{ transitionDelay: active ? `${index * 45}ms` : '0ms' }}
          >
            <span
              className="font-brand font-black leading-[0.82] text-[#1a3a72]"
              style={{
                fontSize: 'clamp(46px, 7.8vw, 104px)',
                letterSpacing: '-0.055em',
              }}
            >
              {row.letter}
            </span>

            <div className="min-w-0 pt-[0.04em]">
              <span
                className={`block min-w-0 font-extrabold leading-[0.96] text-[#3E5854] ${
                  row.looseJoin ? 'pl-[0.12em]' : ''
                }`}
                style={{
                  fontSize: 'clamp(30px, 5vw, 64px)',
                  letterSpacing: '-0.04em',
                }}
              >
                {row.rest}
              </span>

              <p className="mt-[clamp(10px,1.4vw,18px)] max-w-[680px] text-[13px] font-medium leading-[1.5] text-[#2a2d40]/78 sm:text-[14px] lg:text-[15px]">
                {row.text}
              </p>
            </div>
          </div>
        ))}
      </div>
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
    <h1 className="w-full max-w-[920px] text-left" aria-label={labelsByLocale[locale]}>
      <span className="sr-only">{labelsByLocale[locale]}</span>
      <span className="grid" aria-hidden="true">
        <AcronymPanel locale="ru" active={locale === 'ru'} />
        <AcronymPanel locale="en" active={locale === 'en'} />
      </span>
    </h1>
  )
}
