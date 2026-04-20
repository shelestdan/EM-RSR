'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { mapYears, projectTypes } from '@/lib/site-data'
import type { MapMarkerData } from './page'

// ─── TYPE GROUPING ──────────────────────────────────────────
// Marker `type` values may be legacy keys. Group them into 4 PDF directions.
const TYPE_TO_DIRECTION: Record<string, string> = {
  // Direct direction values
  izyskaniya: 'izyskaniya',
  proektirovanie: 'proektirovanie',
  stroitelstvo: 'stroitelstvo',
  nadzor: 'nadzor',
  // Legacy mapping
  capital_with_expertise: 'stroitelstvo',
  capital_no_expertise: 'stroitelstvo',
  water_supply: 'proektirovanie',
  gas_supply: 'proektirovanie',
  author_supervision: 'nadzor',
  gasification: 'proektirovanie',
  surveys: 'izyskaniya',
  cadastre: 'izyskaniya',
}

const DIRECTION_LABELS: Record<string, string> = {
  izyskaniya: 'Инженерные изыскания и кадастр',
  proektirovanie: 'Проектирование',
  stroitelstvo: 'Промышленное строительство',
  nadzor: 'Авторский надзор и сопровождение',
}

const DIRECTION_COLORS: Record<string, string> = {
  izyskaniya: '#5f8b7d',
  proektirovanie: '#23273F',
  stroitelstvo: '#3E5854',
  nadzor: '#a37f5c',
}

const REGION_LABELS: Record<string, string> = {
  krasnodar: 'Краснодарский край',
  spb: 'Санкт-Петербург',
  lenobl: 'Ленинградская область',
  rostov: 'Ростовская область',
  stavropol: 'Ставропольский край',
  other: 'Другой регион',
}

interface YandexMapProps {
  initialMarkers: MapMarkerData[]
}

declare global {
  interface Window {
    ymaps3: any
  }
}

function directionOf(markerType: string): string {
  return TYPE_TO_DIRECTION[markerType] || 'proektirovanie'
}

export default function YandexMap({ initialMarkers }: YandexMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  const [directionFilter, setDirectionFilter] = useState('all')
  const [yearFilter, setYearFilter] = useState<'all' | number>('all')
  const [mapLoaded, setMapLoaded] = useState(false)
  const [filteredCount, setFilteredCount] = useState(initialMarkers.length)

  const hasFilters = directionFilter !== 'all' || yearFilter !== 'all'

  const filterFn = useMemo(() => {
    return (marker: MapMarkerData) => {
      if (directionFilter !== 'all' && directionOf(marker.type) !== directionFilter) return false
      if (yearFilter !== 'all' && marker.year !== yearFilter) return false
      return true
    }
  }, [directionFilter, yearFilter])

  function resetFilters() {
    setDirectionFilter('all')
    setYearFilter('all')
  }

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY
    if (!apiKey) return

    if (window.ymaps3) {
      setMapLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.src = `https://api-maps.yandex.ru/3.0/?apikey=${apiKey}&lang=ru_RU`
    script.async = true
    script.onload = () => {
      window.ymaps3.ready.then(() => setMapLoaded(true))
    }
    document.head.appendChild(script)

    return () => {
      try { document.head.removeChild(script) } catch {}
    }
  }, [])

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return

    const { YMap, YMapDefaultFeaturesLayer, YMapDefaultSchemeLayer } = window.ymaps3
    const map = new YMap(mapRef.current, {
      location: {
        center: [39.7, 46.5],
        zoom: 6,
      },
    })

    map.addChild(new YMapDefaultSchemeLayer())
    map.addChild(new YMapDefaultFeaturesLayer())
    mapInstanceRef.current = map
    renderMarkers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapLoaded])

  useEffect(() => {
    const filtered = initialMarkers.filter(filterFn)
    setFilteredCount(filtered.length)
    if (!mapLoaded || !mapInstanceRef.current) return
    renderMarkers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directionFilter, yearFilter, mapLoaded])

  function renderMarkers() {
    if (!window.ymaps3 || !mapInstanceRef.current) return
    const { YMapMarker } = window.ymaps3

    markersRef.current.forEach((marker) => {
      try { mapInstanceRef.current.removeChild(marker) } catch {}
    })
    markersRef.current = []

    const filtered = initialMarkers.filter(filterFn)

    filtered.forEach((markerData) => {
      const dir = directionOf(markerData.type)
      const color = DIRECTION_COLORS[dir] || '#23273F'
      const markerEl = document.createElement('button')
      markerEl.type = 'button'
      markerEl.title = markerData.title
      markerEl.style.cssText = `
        width: 22px;
        height: 22px;
        border-radius: 4px;
        background: ${color};
        border: 2px solid #ffffff;
        box-shadow: 0 10px 24px rgba(13,16,28,0.28);
        cursor: pointer;
        transition: transform .16s ease, box-shadow .16s ease;
      `
      markerEl.addEventListener('mouseenter', () => {
        markerEl.style.transform = 'scale(1.22)'
        markerEl.style.boxShadow = '0 14px 30px rgba(13,16,28,0.34)'
      })
      markerEl.addEventListener('mouseleave', () => {
        markerEl.style.transform = 'scale(1)'
        markerEl.style.boxShadow = '0 10px 24px rgba(13,16,28,0.28)'
      })
      markerEl.addEventListener('click', () => {
        markerEl.querySelector('[data-popup="true"]')?.remove()

        const popup = document.createElement('div')
        popup.dataset.popup = 'true'
        popup.style.cssText = `
          position: absolute;
          bottom: 34px;
          left: 50%;
          z-index: 1000;
          min-width: 260px;
          max-width: 320px;
          transform: translateX(-50%);
          border: 1px solid #d9d6cb;
          background: #ffffff;
          padding: 14px 16px;
          box-shadow: 0 24px 50px rgba(13,16,28,.22);
          text-align: left;
          color: #23273F;
          font-family: Inter, system-ui, sans-serif;
        `

        const title = document.createElement('div')
        title.textContent = markerData.title
        title.style.cssText = 'font-size:14px;font-weight:800;line-height:1.35;margin-right:20px;'
        popup.appendChild(title)

        const meta = document.createElement('div')
        meta.textContent = `${DIRECTION_LABELS[dir]} · ${REGION_LABELS[markerData.region] || markerData.region} · ${markerData.year}`
        meta.style.cssText = 'margin-top:8px;font-size:12px;line-height:1.45;color:#626675;'
        popup.appendChild(meta)

        if (markerData.description) {
          const desc = document.createElement('div')
          desc.textContent = markerData.description
          desc.style.cssText = 'margin-top:8px;font-size:12px;line-height:1.5;color:#626675;'
          popup.appendChild(desc)
        }

        const close = document.createElement('button')
        close.type = 'button'
        close.textContent = '×'
        close.style.cssText = 'position:absolute;top:5px;right:9px;border:0;background:transparent;color:#626675;cursor:pointer;font-size:18px;line-height:1;'
        close.onclick = (ev) => { ev.stopPropagation(); popup.remove() }
        popup.appendChild(close)

        markerEl.style.position = 'relative'
        markerEl.appendChild(popup)
      })

      const marker = new YMapMarker(
        { coordinates: [markerData.lng, markerData.lat] },
        markerEl
      )
      mapInstanceRef.current.addChild(marker)
      markersRef.current.push(marker)
    })
  }

  const directions = projectTypes // [all + 4 directions]

  return (
    <section className="relative bg-[#f6f5f1] pb-20">
      {/* ─── FILTER BAR ─────────────────────────────────────── */}
      <div className="border-b border-[#d9d6cb] bg-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10">

          {/* Label row */}
          <div className="mb-7 flex flex-wrap items-center gap-4">
            <span className="text-[11px] font-black tracking-[0.22em] text-[#3E5854]">ФИЛЬТРЫ</span>
            <span className="h-px flex-1 max-w-[48px] bg-[#3E5854]" />
            <div className="ml-auto flex items-center gap-2 text-[11px]">
              <span className="font-bold uppercase tracking-[0.14em] text-[#626675]/60">Показано</span>
              <span className="inline-flex min-w-[44px] items-center justify-center border border-[#3E5854] bg-[#3E5854] px-3 py-1 font-brand text-[13px] font-black text-white tabular-nums">
                {filteredCount}
              </span>
              <span className="font-bold uppercase tracking-[0.14em] text-[#626675]/40 hidden sm:inline">
                из {initialMarkers.length || 0}
              </span>
            </div>
          </div>

          {/* Year row */}
          <div className="mb-5">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#626675]/60">Год</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setYearFilter('all')}
                className={`border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] transition-all duration-200 ${
                  yearFilter === 'all'
                    ? 'border-[#23273F] bg-[#23273F] text-white'
                    : 'border-[#d9d6cb] bg-white text-[#626675] hover:border-[#3E5854] hover:text-[#23273F]'
                }`}
              >
                Все
              </button>
              {mapYears.map((year) => {
                const active = yearFilter === year
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setYearFilter(year)}
                    className={`border px-3 py-1.5 text-[11px] font-bold tabular-nums transition-all duration-200 ${
                      active
                        ? 'border-[#23273F] bg-[#23273F] text-white'
                        : 'border-[#d9d6cb] bg-white text-[#626675] hover:border-[#3E5854] hover:text-[#23273F]'
                    }`}
                  >
                    {year}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Direction row */}
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#626675]/60">Направление</p>
            <div className="flex flex-wrap gap-1.5">
              {directions.map((d) => {
                const active = directionFilter === d.value
                return (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => setDirectionFilter(d.value)}
                    className={`border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] transition-all duration-200 ${
                      active
                        ? 'border-[#23273F] bg-[#23273F] text-white'
                        : 'border-[#d9d6cb] bg-white text-[#626675] hover:border-[#3E5854] hover:text-[#23273F]'
                    }`}
                  >
                    {d.label}
                  </button>
                )
              })}
            </div>
          </div>

          {hasFilters && (
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={resetFilters}
                className="text-[10px] font-black uppercase tracking-[0.18em] text-[#626675] transition-colors hover:text-[#23273F]"
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ─── MAP CANVAS ────────────────────────────────────── */}
      <div className="container-wide mx-auto px-5 pt-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden border border-[#d9d6cb] bg-white shadow-[0_40px_120px_rgba(13,16,28,0.14)]">

          {/* Empty states */}
          {!process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY && (
            <div className="absolute inset-0 z-10 grid place-items-center bg-[#f6f5f1] p-6">
              <div className="max-w-[540px] text-center">
                <p className="section-kicker mb-4">Локальное окружение</p>
                <h2 className="font-brand text-[24px] font-black leading-tight text-[#23273F]">
                  Ключ Яндекс.Карт не настроен
                </h2>
                <p className="mt-4 text-[14px] leading-[1.75] text-[#626675]">
                  Добавьте <code className="rounded bg-white px-1.5 py-0.5 text-[13px] text-[#3E5854] border border-[#d9d6cb]">NEXT_PUBLIC_YANDEX_MAPS_API_KEY</code> в переменные окружения.
                </p>
              </div>
            </div>
          )}
          {process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY && initialMarkers.length === 0 && (
            <div className="absolute inset-0 z-10 grid place-items-center bg-[#f6f5f1] p-6">
              <div className="max-w-[520px] text-center">
                <p className="section-kicker mb-4">Нет маркеров</p>
                <h2 className="font-brand text-[24px] font-black leading-tight text-[#23273F]">
                  Объекты пока не загружены
                </h2>
                <p className="mt-4 text-[14px] leading-[1.75] text-[#626675]">
                  Добавьте маркеры в админ-панели: название, координаты, направление, год, описание.
                </p>
              </div>
            </div>
          )}

          <div ref={mapRef} className="h-[72vh] min-h-[560px] w-full" />
        </div>

        {/* Legend strip */}
        <div className="mt-3 grid gap-px bg-[#d9d6cb] sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(DIRECTION_LABELS).map(([key, label]) => (
            <div key={key} className="flex items-center gap-3 bg-white px-5 py-4">
              <span
                className="h-3 w-3 shrink-0 rounded-[2px]"
                style={{ background: DIRECTION_COLORS[key] }}
                aria-hidden="true"
              />
              <span className="text-[12px] font-semibold leading-[1.3] text-[#23273F]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
