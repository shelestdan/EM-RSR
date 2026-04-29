'use client'

import { useState } from 'react'

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
)

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M3 7h8M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const OFFICES = {
  spb: {
    label: 'САНКТ-ПЕТЕРБУРГ',
    badge: 'Основной офис',
    address: '199178, линия 9-я В.О., д. 66 лит. А,\nпом. 1-н, оф. 8',
    mapsUrl: 'https://yandex.ru/maps/?ll=30.269946%2C59.946563&z=17&pt=30.269946,59.946563',
    iframeSrc: 'https://yandex.ru/map-widget/v1/?ll=30.269946%2C59.946563&z=16&pt=30.269946,59.946563,pm2rdm',
    iframeTitle: 'Офис EM-PCP в Санкт-Петербурге',
    dark: false,
  },
  krasnodar: {
    label: 'КРАСНОДАР',
    badge: 'Дополнительный офис',
    address: '350000, ул. Коммунаров, 76,\nофис 382/9',
    mapsUrl: 'https://yandex.ru/maps/?ll=38.975295%2C45.024852&z=17&pt=38.975295,45.024852',
    iframeSrc: 'https://yandex.ru/map-widget/v1/?ll=38.975295%2C45.024852&z=16&pt=38.975295,45.024852,pm2rdm',
    iframeTitle: 'Офис EM-PCP в Краснодаре',
    dark: true,
  },
} as const

type OfficeKey = keyof typeof OFFICES

export default function OfficeMapTabs() {
  const [active, setActive] = useState<OfficeKey>('krasnodar')
  const office = OFFICES[active]

  return (
    <div className="grid gap-px bg-[#d9d6cb] lg:grid-cols-[1fr_1.2fr]">
      {/* ── Office cards (clickable) ─────────────────────────── */}
      <div className="flex h-full flex-col gap-px bg-[#d9d6cb]">
        {(Object.keys(OFFICES) as OfficeKey[]).map((key) => {
          const o = OFFICES[key]
          const isActive = active === key
          const isDark = o.dark

          return (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              aria-pressed={isActive}
              className={[
                'flex-1 p-7 sm:p-9 text-left w-full transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#3E5854]',
                isDark ? 'bg-[#23273F] text-white' : 'bg-[#f6f5f1] text-[#23273F]',
                isActive && !isDark ? 'ring-2 ring-inset ring-[#3E5854]' : '',
                isActive && isDark ? 'ring-2 ring-inset ring-[#5f8b7d]' : '',
                !isActive ? 'opacity-80 hover:opacity-100' : '',
              ].join(' ')}
            >
              <div className="flex items-center gap-3">
                <span className={[
                  'inline-grid h-10 w-10 place-items-center border',
                  isDark
                    ? isActive ? 'border-[#5f8b7d] bg-white/8 text-[#8ab0a3]' : 'border-white/14 bg-white/5 text-[#8ab0a3]'
                    : isActive ? 'border-[#3E5854] bg-white text-[#3E5854]' : 'border-[#d9d6cb] bg-white text-[#3E5854]',
                ].join(' ')}>
                  <MapPinIcon />
                </span>
                <div>
                  <p className={[
                    'text-[9px] font-black uppercase tracking-[0.22em]',
                    isDark ? 'text-[#5f8b7d]' : 'text-[#626675]/60',
                  ].join(' ')}>
                    {o.badge}
                    {isActive && <span className="ml-2 text-[8px] opacity-70">● активно</span>}
                  </p>
                  <p className={[
                    'mt-1 font-brand text-[13px] font-black tracking-[0.14em]',
                    isDark ? 'text-white' : 'text-[#23273F]',
                  ].join(' ')}>
                    {o.label}
                  </p>
                </div>
              </div>

              <p className={[
                'mt-6 text-[15px] font-semibold leading-[1.7] whitespace-pre-line',
                isDark ? 'text-white' : 'text-[#23273F]',
              ].join(' ')}>
                {o.address}
              </p>

              <a
                href={o.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={[
                  'group mt-6 inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.18em] transition-all hover:gap-5',
                  isDark ? 'text-[#8ab0a3] hover:text-white' : 'text-[#3E5854] hover:text-[#23273F]',
                ].join(' ')}
              >
                Открыть в Яндекс.Картах <Arrow />
              </a>
            </button>
          )
        })}
      </div>

      {/* ── Map iframe (switches on tab click) ───────────────── */}
      <div className="relative h-full min-h-[440px] overflow-hidden bg-white">
        {(Object.keys(OFFICES) as OfficeKey[]).map((key) => (
          <iframe
            key={key}
            title={OFFICES[key].iframeTitle}
            src={OFFICES[key].iframeSrc}
            style={{ border: 0, width: '100%', height: '100%', minHeight: 440 }}
            allowFullScreen
            loading="lazy"
            className={[
              'absolute inset-0 transition-opacity duration-300',
              active === key ? 'opacity-100' : 'opacity-0 pointer-events-none',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  )
}
