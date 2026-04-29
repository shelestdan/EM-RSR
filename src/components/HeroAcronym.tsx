'use client'

import { useEffect, useState } from 'react'

// ─── Data ────────────────────────────────────────────────────
const heroRows = [
  {
    ru: {
      letter: 'Е',
      title: 'Инженерное',
      text: 'Команда узкоспециализированных проектировщиков и изыскателей, которые не замыкаются в своём разделе: свободно ориентируются в смежных дисциплинах, проверяют их и находят ошибки на стыке. Каждый работает с ответственностью ГИПа.',
    },
    en: {
      letter: 'E',
      title: 'Engineering',
      text: 'A team of highly specialized designers and surveyors who do not stay confined to their own discipline: they navigate adjacent fields, check interfaces, and find errors at the junctions. Each person works with the responsibility of a chief project engineer.',
    },
  },
  {
    ru: {
      letter: 'М',
      title: 'Искусство',
      text: 'Точность расчётов и выверенность решений, где каждый чертёж оптимизирован до миллиметра.',
    },
    en: {
      letter: 'M',
      title: 'Mechanisms',
      text: 'Streamlined workflows and systematic control: from site surveys to final handover documentation.',
    },
  },
  {
    ru: {
      letter: 'П',
      title: 'Проектирование',
      text: 'Документация, готовая к экспертизе с первого раза, без доработок на площадке и реализацией строго по проекту, с жёстким контролем сроков, бюджета и качества.',
    },
    en: {
      letter: 'P',
      title: 'Project',
      text: 'Documentation ready for expert review on the first submission, without on-site rework, and implemented strictly according to the project with tight control over timelines, budget, and quality.',
    },
  },
  {
    ru: {
      letter: 'С',
      title: 'Строительство',
      text: 'Точная реализация строго по чертежам, с жёстким контролем сроков, бюджета и качества.',
    },
    en: {
      letter: 'C',
      title: 'Construction',
      text: 'Precise execution strictly per drawings, with rigid control over timelines, budget, and quality.',
    },
  },
  {
    ru: {
      letter: 'П',
      title: 'Плюс',
      text: 'Результат выше нормативов: запас надёжности, оптимизация затрат и долгосрочная гарантия.',
    },
    en: {
      letter: 'P',
      title: 'Plus',
      text: 'Performance beyond code requirements: built-in reliability margins, cost efficiency without compromise, and long-term warranty.',
    },
  },
]

type Lang = 'ru' | 'en'

// ─── Single language table ────────────────────────────────────
function LangTable({ lang }: { lang: Lang }) {
  return (
    <div className="divide-y divide-[#e8e5e0] w-full">
      {heroRows.map((row, i) => {
        const d = row[lang]
        return (
          <div
            key={i}
            /*
             * Mobile  (< sm):  2-col [letter | title], description spans both below
             * sm–lg:           3-col [letter | title | description]
             * lg+:             3-col, larger sizes
             *
             * Letter col  — fixed narrow
             * Title col   — fixed comfortable width for longest word ("Проектирование")
             * Desc col    — fills all remaining space
             */
            className="grid grid-cols-[2.5rem_1fr] items-start gap-x-4 py-4
                       sm:grid-cols-[3rem_minmax(180px,240px)_1fr] sm:gap-x-6 sm:py-5
                       lg:grid-cols-[3.5rem_minmax(220px,280px)_1fr] lg:gap-x-8 lg:py-6"
          >
            {/* Col 1: letter — BLUE */}
            <span
              className="shrink-0 font-brand font-black leading-[1] text-[#1a3a72]
                         text-[28px] sm:text-[34px] lg:text-[44px]"
            >
              {d.letter}
            </span>

            {/* Col 2: title — GREEN */}
            <span
              className="font-brand font-black leading-[1.1] text-[#3E5854]
                         text-[20px] sm:text-[22px] lg:text-[28px]"
            >
              {d.title}
            </span>

            {/* Col 3: description — dark. col-span-2 on mobile (under letter+title) */}
            <p
              className="col-span-2 mt-1 pl-10 leading-[1.5] text-[#2a2d40]/80
                         text-[15px]
                         sm:col-span-1 sm:mt-0 sm:pl-0 sm:text-[15px] sm:leading-[1.55]
                         lg:text-[17px] lg:leading-[1.55]"
            >
              {d.text}
            </p>
          </div>
        )
      })}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────
export default function HeroAcronym() {
  const [lang, setLang] = useState<Lang>('ru')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Respect reduced-motion preference
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return

    let active = true

    const interval = setInterval(() => {
      // Fade out
      setVisible(false)
      setTimeout(() => {
        if (!active) return
        // Swap lang, then fade in
        setLang(l => (l === 'ru' ? 'en' : 'ru'))
        setVisible(true)
      }, 650)
    }, 60_000)

    return () => {
      active = false
      clearInterval(interval)
    }
  }, []) // runs once — no timer recreation on re-renders

  return (
    /*
     * CSS grid stacking trick:
     * Both lang versions placed in the same grid cell (row 1, col 1).
     * Grid cell height = max(RU height, EN height).
     * Only opacity changes on switch → zero layout shift.
     */
    <div className="w-full" style={{ display: 'grid' }}>
      {(['ru', 'en'] as Lang[]).map((l) => (
        <div
          key={l}
          aria-hidden={lang !== l}
          style={{
            gridRow: 1,
            gridColumn: 1,
            opacity: lang === l ? (visible ? 1 : 0) : 0,
            transition: 'opacity 650ms ease',
            pointerEvents: lang === l ? 'auto' : 'none',
          }}
        >
          <LangTable lang={l} />
        </div>
      ))}
    </div>
  )
}
