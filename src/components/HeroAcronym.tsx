'use client'

import { useSiteLocale } from '@/hooks/useSiteLocale'
import type { SiteLocale } from '@/lib/site-locale'

type AcronymRow = {
  letter: string
  rest: string[]
  first?: boolean
}

const rowsByLocale: Record<SiteLocale, AcronymRow[]> = {
  ru: [
    { letter: 'Е', rest: ['инженерное', 'искусство'], first: true },
    { letter: 'М', rest: ['еханизмов'] },
    { letter: 'П', rest: ['роектирование'] },
    { letter: 'С', rest: ['троительство'] },
    { letter: 'П', rest: ['люс'] },
  ],
  en: [
    { letter: 'E', rest: ['ngineering'] },
    { letter: 'M', rest: ['echanisms'] },
    { letter: 'P', rest: ['roject'] },
    { letter: 'C', rest: ['onstruction'] },
    { letter: 'P', rest: ['lus'] },
  ],
}

const labelsByLocale: Record<SiteLocale, string> = {
  ru: 'ЕМ-ПСП: инженерное искусство, механизмов, проектирование, строительство, плюс',
  en: 'EM-PCP: Engineering, Mechanisms, Project, Construction, Plus',
}

export default function HeroAcronym({ locale: forcedLocale }: { locale?: SiteLocale }) {
  const detectedLocale = useSiteLocale(undefined, forcedLocale || 'ru')
  const locale = forcedLocale || detectedLocale
  const rows = rowsByLocale[locale]

  return (
    <h1
      className="w-full max-w-[900px] text-left"
      aria-label={labelsByLocale[locale]}
    >
      <span className="sr-only">
        {labelsByLocale[locale]}
      </span>

      <span className="grid gap-[clamp(12px,2.2vw,28px)]" aria-hidden="true">
        {rows.map((row) => (
          <span
            key={`${row.letter}-${row.rest.join('-')}`}
            className={`flex min-w-0 ${
              row.first
                ? 'items-start gap-[clamp(3px,0.55vw,8px)]'
                : 'items-baseline gap-[clamp(0px,0.24vw,4px)]'
            }`}
          >
            <span
              className="font-brand font-black leading-[0.82] text-[#1a3a72]"
              style={{
                fontSize: 'clamp(46px, 8vw, 108px)',
                letterSpacing: '-0.055em',
              }}
            >
              {row.letter}
            </span>
            <span
              className={`min-w-0 font-extrabold leading-[0.98] text-[#3E5854] ${
                row.first ? 'pt-[0.08em]' : 'whitespace-nowrap'
              }`}
              style={{
                fontSize: 'clamp(29px, 5.2vw, 68px)',
                letterSpacing: '-0.035em',
              }}
            >
              {row.rest.map((part) => (
                <span key={part} className="block">
                  {part}
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </h1>
  )
}
