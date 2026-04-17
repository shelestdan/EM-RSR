'use client'

import { useEffect, useRef, useState } from 'react'
import { projectTypes, regions } from '@/lib/site-data'
import type { MapMarkerData } from './page'

const TYPE_LABELS: Record<string, string> = {
  capital_with_expertise: 'Капстроительство с экспертизой',
  capital_no_expertise: 'Капстроительство',
  water_supply: 'Водоснабжение',
  gas_supply: 'Газоснабжение',
  author_supervision: 'Авторский надзор',
  gasification: 'Газификация',
}

const TYPE_COLORS: Record<string, string> = {
  capital_with_expertise: '#23273F',
  capital_no_expertise: '#3E5854',
  water_supply: '#5f8b7d',
  gas_supply: '#a37f5c',
  author_supervision: '#6f778f',
  gasification: '#8b4f4a',
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

export default function YandexMap({ initialMarkers }: YandexMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  const [typeFilter, setTypeFilter] = useState('all')
  const [regionFilter, setRegionFilter] = useState('all')
  const [yearFilter, setYearFilter] = useState('all')
  const [mapLoaded, setMapLoaded] = useState(false)
  const [filteredCount, setFilteredCount] = useState(initialMarkers.length)

  const availableYears = Array.from(new Set(initialMarkers.map((marker) => marker.year)))
    .filter(Boolean)
    .sort((a, b) => b - a)

  const hasFilters = typeFilter !== 'all' || regionFilter !== 'all' || yearFilter !== 'all'

  function getFilteredMarkers() {
    return initialMarkers.filter((marker) => {
      if (typeFilter !== 'all' && marker.type !== typeFilter) return false
      if (regionFilter !== 'all' && marker.region !== regionFilter) return false
      if (yearFilter !== 'all' && marker.year !== Number(yearFilter)) return false
      return true
    })
  }

  function resetFilters() {
    setTypeFilter('all')
    setRegionFilter('all')
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
      document.head.removeChild(script)
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
  }, [mapLoaded])

  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) {
      setFilteredCount(getFilteredMarkers().length)
      return
    }
    renderMarkers()
  }, [typeFilter, regionFilter, yearFilter, mapLoaded])

  function renderMarkers() {
    if (!window.ymaps3 || !mapInstanceRef.current) return
    const { YMapMarker } = window.ymaps3

    markersRef.current.forEach((marker) => {
      try {
        mapInstanceRef.current.removeChild(marker)
      } catch {}
    })
    markersRef.current = []

    const filtered = getFilteredMarkers()
    setFilteredCount(filtered.length)

    filtered.forEach((markerData) => {
      const color = TYPE_COLORS[markerData.type] || '#23273F'
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
          min-width: 250px;
          max-width: 300px;
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
        meta.textContent = `${TYPE_LABELS[markerData.type] || markerData.type} · ${REGION_LABELS[markerData.region] || markerData.region} · ${markerData.year}`
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
        close.textContent = 'x'
        close.style.cssText = 'position:absolute;top:7px;right:9px;border:0;background:transparent;color:#626675;cursor:pointer;font-size:14px;'
        close.onclick = () => popup.remove()
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

  const Arrow = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M2.5 6h7M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  return (
    <section className="relative bg-[#f6f5f1] pb-20">
      {/* ─── FILTER BAR — editorial ─────────────────────────── */}
      <div className="border-b border-[#d9d6cb] bg-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10">

          {/* Top label row */}
          <div className="mb-8 flex items-center gap-5">
            <span className="text-[11px] font-black tracking-[0.22em] text-[#3E5854]">FILTERS</span>
            <span className="h-px flex-1 max-w-[48px] bg-[#3E5854]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626675]/60">Отбор объектов</span>
            <div className="ml-auto flex items-center gap-2 text-[11px]">
              <span className="font-bold uppercase tracking-[0.14em] text-[#626675]/60">Показано</span>
              <span className="inline-flex min-w-[48px] items-center justify-center border border-[#3E5854] bg-[#3E5854] px-3 py-1 font-brand text-[13px] font-black text-white tabular-nums">
                {filteredCount}
              </span>
              <span className="font-bold uppercase tracking-[0.14em] text-[#626675]/40 hidden sm:inline">
                из {initialMarkers.length || 0}
              </span>
            </div>
          </div>

          {/* Filter triad */}
          <div className="grid gap-px bg-[#d9d6cb] lg:grid-cols-3">

            {/* Type */}
            <div className="bg-white p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-brand text-[10px] font-black tracking-[0.2em] text-[#626675]/50">01</span>
                <span className="text-[11px] font-black uppercase tracking-[0.16em] text-[#23273F]">Тип объекта</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {projectTypes.map((type) => {
                  const active = typeFilter === type.value
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setTypeFilter(type.value)}
                      className={`border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] transition-all duration-200 ${
                        active
                          ? 'border-[#23273F] bg-[#23273F] text-white'
                          : 'border-[#d9d6cb] bg-white text-[#626675] hover:border-[#3E5854] hover:text-[#23273F]'
                      }`}
                    >
                      {type.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Region */}
            <div className="bg-white p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-brand text-[10px] font-black tracking-[0.2em] text-[#626675]/50">02</span>
                <span className="text-[11px] font-black uppercase tracking-[0.16em] text-[#23273F]">Регион</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {regions.map((region) => {
                  const active = regionFilter === region.value
                  return (
                    <button
                      key={region.value}
                      type="button"
                      onClick={() => setRegionFilter(region.value)}
                      className={`border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] transition-all duration-200 ${
                        active
                          ? 'border-[#23273F] bg-[#23273F] text-white'
                          : 'border-[#d9d6cb] bg-white text-[#626675] hover:border-[#3E5854] hover:text-[#23273F]'
                      }`}
                    >
                      {region.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Year */}
            <div className="bg-white p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-brand text-[10px] font-black tracking-[0.2em] text-[#626675]/50">03</span>
                <span className="text-[11px] font-black uppercase tracking-[0.16em] text-[#23273F]">Год</span>
              </div>
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
                  Все годы
                </button>
                {availableYears.map((year) => {
                  const active = yearFilter === String(year)
                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => setYearFilter(String(year))}
                      className={`border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] tabular-nums transition-all duration-200 ${
                        active
                          ? 'border-[#23273F] bg-[#23273F] text-white'
                          : 'border-[#d9d6cb] bg-white text-[#626675] hover:border-[#3E5854] hover:text-[#23273F]'
                      }`}
                    >
                      {year}
                    </button>
                  )
                })}
                {availableYears.length === 0 && (
                  <span className="px-3 py-1.5 text-[11px] text-[#626675]/50">—</span>
                )}
              </div>
            </div>
          </div>

          {/* Reset row */}
          {hasFilters && (
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={resetFilters}
                className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#626675] transition-colors hover:text-[#23273F]"
              >
                Сбросить фильтры
                <span className="transition-transform duration-200 group-hover:translate-x-1"><Arrow /></span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ─── MAP CONTAINER ─────────────────────────────────── */}
      <div className="container-wide mx-auto px-5 pt-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden border border-[#d9d6cb] bg-white shadow-[0_40px_120px_rgba(13,16,28,0.14)]">

          {/* Corner code label */}
          <div className="pointer-events-none absolute left-0 top-0 z-20 flex items-center gap-3 border-b border-r border-[#d9d6cb] bg-white/95 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#5f8b7d]" />
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#3E5854]">
              MAP · LIVE
            </span>
          </div>

          {/* Corner meta */}
          <div className="pointer-events-none absolute right-0 top-0 z-20 hidden items-center gap-3 border-b border-l border-[#d9d6cb] bg-white/95 px-4 py-2 backdrop-blur-sm sm:flex">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#626675]/60">Зум · панорама</span>
          </div>

          {/* Empty states */}
          {!process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY && (
            <div className="absolute inset-0 z-10 grid place-items-center bg-[#f6f5f1] p-6">
              <div className="max-w-[540px] text-center">
                <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center border border-[#d9d6cb] bg-white">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3E5854" strokeWidth="1.6">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <p className="section-kicker mb-4">Локальное окружение</p>
                <h2 className="font-brand text-[28px] font-black leading-tight text-[#23273F]">
                  Ключ Яндекс.Карт не настроен
                </h2>
                <p className="mt-4 text-[15px] leading-[1.75] text-[#626675]">
                  Добавьте <code className="rounded bg-white px-1.5 py-0.5 text-[13px] text-[#3E5854] border border-[#d9d6cb]">NEXT_PUBLIC_YANDEX_MAPS_API_KEY</code> в переменные окружения. Фильтры, структура, легенда и состав уже готовы к реальным данным.
                </p>
              </div>
            </div>
          )}
          {process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY && initialMarkers.length === 0 && (
            <div className="absolute inset-0 z-10 grid place-items-center bg-[#f6f5f1] p-6">
              <div className="max-w-[520px] text-center">
                <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center border border-[#d9d6cb] bg-white">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3E5854" strokeWidth="1.6">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="section-kicker mb-4">Нет маркеров</p>
                <h2 className="font-brand text-[28px] font-black leading-tight text-[#23273F]">
                  Объекты пока не загружены
                </h2>
                <p className="mt-4 text-[15px] leading-[1.75] text-[#626675]">
                  Добавьте маркеры в админ-панели: название, координаты, тип, регион, год и описание.
                </p>
              </div>
            </div>
          )}

          {/* Map canvas */}
          <div ref={mapRef} className="h-[72vh] min-h-[600px] w-full" />
        </div>

        {/* Below-map hint strip */}
        <div className="mt-3 grid gap-px bg-[#d9d6cb] sm:grid-cols-3">
          <div className="bg-white px-5 py-4">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#626675]/50">Клик по маркеру</p>
            <p className="mt-1.5 text-[13px] font-semibold text-[#23273F]">Карточка объекта: тип, регион, год, описание</p>
          </div>
          <div className="bg-white px-5 py-4">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#626675]/50">Фильтр</p>
            <p className="mt-1.5 text-[13px] font-semibold text-[#23273F]">Комбинируются — тип + регион + год одновременно</p>
          </div>
          <div className="bg-white px-5 py-4">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#626675]/50">Данные</p>
            <p className="mt-1.5 text-[13px] font-semibold text-[#23273F]">Живые из CMS — обновляются без перезапуска</p>
          </div>
        </div>
      </div>
    </section>
  )
}
