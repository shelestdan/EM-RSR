'use client'

import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { mapYears } from '@/lib/site-data'

// ─────────────────────────────────────────────────────────────
// DATA SCHEMA — exported so markers-data.ts stays in sync
// ─────────────────────────────────────────────────────────────
export interface MapMarkerData {
  id: string
  title: string
  lat: number
  lng: number
  /** @deprecated Use `category` for new markers. Kept for backward compat. */
  type: string
  /** New field: key of MARKER_TYPES (e.g. 'gas', 'water', 'surveys') */
  category?: string
  region: string
  year: number
  /** @deprecated Use `workDescription` for new markers */
  description?: string
  // ── New popup fields ─────────────────────────────────────
  contractType?: 'ГЕНПОДРЯД' | 'СУБПОДРЯД' | 'ПО ДОГОВОРУ' | 'В СОСТАВЕ КОМАНДЫ'
  workDescription?: string
  positiveConclusion?: string
  conclusionUrl?: string
  /** If empty, auto-generated from lat/lng */
  yandexMapsUrl?: string
  geometry?: {
    type: 'LineString'
    /** Source order from Yandex constructor: [lng, lat] */
    coordinates: [number, number][]
  }
}

// ─────────────────────────────────────────────────────────────
// MARKER TYPE CONFIG — single source of truth for:
//   categories · filter labels · legend · icon shapes · colors
// ─────────────────────────────────────────────────────────────
export const MARKER_TYPES: Record<string, {
  label: string
  color: string | null
  /** Geometric shape rendered as marker icon */
  shape: 'square' | 'circleInCircle' | 'diamond' | 'document' | 'squareInSquare' | 'logo'
  /** Whether this type appears as a public filter button */
  publicFilter: boolean
}> = {
  combined: {
    label: 'Проектные работы и изыскательские работы',
    color: '#1565C0',
    shape: 'squareInSquare',
    publicFilter: true,
  },
  surveys: {
    label: 'Инженерные изыскания и кадастр',
    color: '#2E7D32',
    shape: 'circleInCircle',
    publicFilter: true,
  },
  water: {
    label: 'Водоснабжение',
    color: '#00ACC1',
    shape: 'square',
    publicFilter: true,
  },
  sewer: {
    label: 'Канализация',
    color: '#8D6E63',
    shape: 'square',
    publicFilter: true,
  },
  gas: {
    label: 'Газоснабжение',
    color: '#FBC02D',
    shape: 'square',
    publicFilter: true,
  },
  electricity: {
    label: 'Электроснабжение',
    color: '#7E57C2',
    shape: 'square',
    publicFilter: true,
  },
  heating: {
    label: 'Теплотрасса',
    color: '#E53935',
    shape: 'square',
    publicFilter: true,
  },
  boiler: {
    label: 'Котельные',
    color: '#C62828',
    shape: 'square',
    publicFilter: true,
  },
  other: {
    label: 'Иные объекты',
    color: '#546E7A',
    shape: 'square',
    publicFilter: true,
  },
  authorSupervision: {
    label: 'Авторский надзор',
    color: '#00897B',
    shape: 'diamond',
    publicFilter: true,
  },
  support: {
    label: 'Сопровождение',
    color: '#37474F',
    shape: 'document',
    publicFilter: true,
  },
  office: {
    label: 'Офисы',
    color: null,
    shape: 'logo',
    publicFilter: true,
  },
}

// Backward-compat: map old `type` values to new category keys
const LEGACY_TYPE_TO_CATEGORY: Record<string, string> = {
  izyskaniya:            'surveys',
  nadzor:                'authorSupervision',
  stroitelstvo:          'other',
  office:                'office',
  water_supply:          'water',
  gas_supply:            'gas',
  author_supervision:    'authorSupervision',
  gasification:          'gas',
  surveys:               'surveys',
  cadastre:              'surveys',
}

const CATEGORY_INFERENCE_RULES: { category: string; patterns: RegExp[] }[] = [
  { category: 'boiler', patterns: [/котельн/i, /мку/i, /блочно-модульн/i] },
  { category: 'gas', patterns: [/газ/i, /гсн/i, /гсв/i, /ууг/i] },
  { category: 'water', patterns: [/водоснаб/i, /водоподготов/i, /водоочист/i, /насосн/i, /нв\b/i] },
  { category: 'sewer', patterns: [/канализ/i, /очистн/i, /кнс/i, /сточн/i] },
  { category: 'electricity', patterns: [/электр/i, /электроснаб/i, /эом/i, /кл\s*6/i, /кабель/i] },
  { category: 'heating', patterns: [/отоплен/i, /теплотрас/i, /овик/i, /вентиляц/i, /тепл/i] },
  { category: 'surveys', patterns: [/изыскан/i, /геолог/i, /геодез/i, /кадастр/i, /межеван/i, /планировк/i] },
  { category: 'authorSupervision', patterns: [/авторск/i, /надзор/i] },
  { category: 'support', patterns: [/сопровожд/i, /экспертиз/i, /доработк/i, /заключени/i, /согласован/i] },
]

function inferCategory(marker: MapMarkerData): string | null {
  const source = `${marker.title} ${marker.workDescription || marker.description || ''}`
  return CATEGORY_INFERENCE_RULES.find((rule) =>
    rule.patterns.some((pattern) => pattern.test(source)),
  )?.category || null
}

function categoryOf(marker: MapMarkerData): string {
  return marker.category || LEGACY_TYPE_TO_CATEGORY[marker.type] || inferCategory(marker) || 'other'
}

// ─────────────────────────────────────────────────────────────
// OFFICE MARKERS
// ─────────────────────────────────────────────────────────────
export const OFFICE_MARKERS: MapMarkerData[] = [
  {
    id: 'office-spb',
    title: 'Офис ЕМ-ПСП — Санкт-Петербург',
    lat: 59.9393,
    lng: 30.2663,
    type: 'office',
    category: 'office',
    region: 'spb',
    year: 2023,
    workDescription: '199178, линия 9-Я В.О., д. 66 лит. А, пом. 1-н, оф. 8. Основной офис.',
  },
  {
    id: 'office-krd',
    title: 'Офис ЕМ-ПСП — Краснодар',
    lat: 45.035500,
    lng: 38.975300,
    type: 'office',
    category: 'office',
    region: 'krasnodar',
    year: 2023,
    workDescription: '350000, ул. Коммунаров, 76, офис 382/9. Дополнительный офис.',
  },
]

// ─────────────────────────────────────────────────────────────
// FILTER CONFIG — built from MARKER_TYPES automatically
// ─────────────────────────────────────────────────────────────
const DIRECTION_FILTERS = [
  { value: 'all', label: 'Все направления' },
  ...Object.entries(MARKER_TYPES)
    .filter(([, t]) => t.publicFilter)
    .map(([key, t]) => ({ value: key, label: t.label })),
]

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

// ─────────────────────────────────────────────────────────────
// ICON HTML BUILDER
// ─────────────────────────────────────────────────────────────
const ICON_SIZE = 20

function buildIconHtml(cat: string): string {
  const t = MARKER_TYPES[cat] || MARKER_TYPES.other
  const color = t.color || '#546E7A'
  const S = ICON_SIZE
  const hover = `onmouseenter="this.style.transform='scale(1.25)'" onmouseleave="this.style.transform='scale(1)'"`

  if (cat === 'office') {
    return `<div style="
        display:inline-flex;align-items:center;justify-content:center;
        background:#fff;width:38px;height:38px;border-radius:3px;
        border:2px solid #23273F;
        box-shadow:0 4px 16px rgba(13,16,28,.45);
        cursor:pointer;transition:transform .15s ease;transform-origin:bottom center;
        position:relative;transform:translate(-50%,-100%);"
      onmouseenter="this.style.transform='translate(-50%,-100%) scale(1.1)'"
      onmouseleave="this.style.transform='translate(-50%,-100%) scale(1)'">
      <img src="${BASE}/brand/logo-icon.svg" width="22" height="22" style="display:block;" alt="ЕМ-ПСП" />
    </div>`
  }

  if (t.shape === 'circleInCircle') {
    return `<div style="
        width:${S}px;height:${S}px;border-radius:50%;background:${color};
        box-shadow:0 2px 8px rgba(0,0,0,.35);
        display:flex;align-items:center;justify-content:center;
        transition:transform .15s;cursor:pointer;" ${hover}>
      <div style="width:7px;height:7px;border-radius:50%;background:#fff;"></div>
    </div>`
  }

  if (t.shape === 'diamond') {
    return `<div style="
        width:${S}px;height:${S}px;display:flex;align-items:center;justify-content:center;
        cursor:pointer;transition:transform .15s;" ${hover}>
      <div style="width:13px;height:13px;background:${color};transform:rotate(45deg);
        box-shadow:0 2px 8px rgba(0,0,0,.35);"></div>
    </div>`
  }

  if (t.shape === 'document') {
    return `<div style="
        width:${S}px;height:${S}px;display:flex;align-items:center;justify-content:center;
        cursor:pointer;transition:transform .15s;" ${hover}>
      <div style="width:11px;height:15px;background:${color};border-radius:1px;
        box-shadow:0 2px 8px rgba(0,0,0,.35);"></div>
    </div>`
  }

  if (t.shape === 'squareInSquare') {
    return `<div style="
        width:${S}px;height:${S}px;display:flex;align-items:center;justify-content:center;
        cursor:pointer;transition:transform .15s;" ${hover}>
      <div style="width:16px;height:16px;border:2.5px solid ${color};
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 2px 8px rgba(0,0,0,.25);">
        <div style="width:6px;height:6px;background:${color};"></div>
      </div>
    </div>`
  }

  // Default: square
  return `<div style="
      width:${S}px;height:${S}px;background:${color};
      border-radius:2px;box-shadow:0 2px 8px rgba(0,0,0,.35);
      cursor:pointer;transition:transform .15s;" ${hover}></div>`
}

// ─────────────────────────────────────────────────────────────
// POPUP CSS
// ─────────────────────────────────────────────────────────────
const POPUP_STYLES = `
.leaflet-popup-content-wrapper {
  border-radius: 0 !important;
  border: 1px solid #d9d6cb !important;
  box-shadow: 0 24px 50px rgba(13,16,28,.18) !important;
  padding: 0 !important;
}
.leaflet-popup-content { margin: 0 !important; line-height: 1 !important; }
.leaflet-popup-tip-container { display: none !important; }
.em-popup { padding: 16px 18px; font-family: inherit; min-width: 240px; max-width: 300px; }
.em-popup-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; gap: 8px; }
.em-popup-contract { font-size: 10px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.em-popup-year { font-size: 11px; font-weight: 700; color: #626675; white-space: nowrap; }
.em-popup-title { font-size: 13px; font-weight: 800; line-height: 1.38; color: #23273F; margin-bottom: 7px; }
.em-popup-desc { font-size: 11px; line-height: 1.55; color: #626675; margin-bottom: 7px; }
.em-popup-conclusion { display: flex; align-items: flex-start; gap: 6px; margin-bottom: 7px; }
.em-popup-conclusion-text { font-size: 11px; line-height: 1.5; color: #626675; flex: 1; }
.em-popup-conclusion-link {
  font-size: 11px; font-weight: 800; color: #3E5854; text-decoration: none;
  flex-shrink: 0; padding: 2px 0; border-bottom: 1px solid #3E5854;
  transition: color .15s;
}
.em-popup-conclusion-link:hover { color: #23273F; border-color: #23273F; }
.em-popup-ymaps {
  display: inline-block; margin-top: 10px;
  font-size: 10px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase;
  color: #3E5854; text-decoration: none;
  border-bottom: 1px solid #3E5854; padding-bottom: 1px;
  transition: color .15s;
}
.em-popup-ymaps:hover { color: #23273F; border-color: #23273F; }
`

// ─────────────────────────────────────────────────────────────
// POPUP HTML BUILDER
// ─────────────────────────────────────────────────────────────
function buildPopupHtml(marker: MapMarkerData): string {
  const cat = categoryOf(marker)
  const t = MARKER_TYPES[cat] || MARKER_TYPES.other
  const color = t.color || '#546E7A'
  const isOffice = cat === 'office'

  const ymapsUrl = marker.yandexMapsUrl ||
    `https://yandex.ru/maps/?ll=${marker.lng},${marker.lat}&z=16&pt=${marker.lng},${marker.lat},pm2rdm`

  const descText = marker.workDescription || marker.description || ''

  if (isOffice) {
    return `
      <div class="em-popup">
        <div class="em-popup-title">${marker.title}</div>
        ${descText ? `<div class="em-popup-desc">${descText}</div>` : ''}
        <a href="${ymapsUrl}" target="_blank" rel="noopener noreferrer"
           class="em-popup-ymaps" aria-label="Открыть офис в Яндекс.Картах">
          ОТКРЫТЬ В ЯНДЕКС.КАРТАХ →
        </a>
      </div>`
  }

  const headerLeft = marker.contractType
    ? `<span class="em-popup-contract" style="color:${color}">${marker.contractType}</span>`
    : `<span class="em-popup-contract" style="color:${color}">${t.label}</span>`

  const conclusionBlock = marker.positiveConclusion
    ? `<div class="em-popup-conclusion">
        <span class="em-popup-conclusion-text">${marker.positiveConclusion}</span>
        ${marker.conclusionUrl
          ? `<a href="${marker.conclusionUrl}" target="_blank" rel="noopener noreferrer"
               class="em-popup-conclusion-link" aria-label="Открыть заключение">↗</a>`
          : ''}
      </div>`
    : ''

  return `
    <div class="em-popup">
      <div class="em-popup-header">
        ${headerLeft}
        <span class="em-popup-year">${marker.year}</span>
      </div>
      <div class="em-popup-title">${marker.title}</div>
      ${descText ? `<div class="em-popup-desc">${descText}</div>` : ''}
      ${conclusionBlock}
      <a href="${ymapsUrl}" target="_blank" rel="noopener noreferrer"
         class="em-popup-ymaps" aria-label="Открыть объект в Яндекс.Картах">
        ОТКРЫТЬ В ЯНДЕКС.КАРТАХ →
      </a>
    </div>`
}

// ─────────────────────────────────────────────────────────────
// LEGEND SHAPE (React JSX)
// ─────────────────────────────────────────────────────────────
function LegendShape({ cat }: { cat: string }) {
  const t = MARKER_TYPES[cat]
  if (!t) return null
  const color = t.color || '#546E7A'

  if (cat === 'office') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`${BASE}/brand/logo-icon.svg`}
        width={14} height={14}
        className="block shrink-0 opacity-80"
        alt=""
        aria-hidden="true"
      />
    )
  }
  if (t.shape === 'circleInCircle') {
    return (
      <div
        className="shrink-0 flex items-center justify-center rounded-full"
        style={{ width: 14, height: 14, background: color }}
        aria-hidden="true"
      >
        <div className="rounded-full bg-white" style={{ width: 5, height: 5 }} />
      </div>
    )
  }
  if (t.shape === 'diamond') {
    return (
      <div className="shrink-0 flex items-center justify-center" style={{ width: 14, height: 14 }} aria-hidden="true">
        <div style={{ width: 9, height: 9, background: color, transform: 'rotate(45deg)' }} />
      </div>
    )
  }
  if (t.shape === 'document') {
    return (
      <div className="shrink-0 flex items-center justify-center" style={{ width: 14, height: 14 }} aria-hidden="true">
        <div style={{ width: 8, height: 12, background: color, borderRadius: 1 }} />
      </div>
    )
  }
  if (t.shape === 'squareInSquare') {
    return (
      <div
        className="shrink-0 flex items-center justify-center"
        style={{ width: 14, height: 14, border: `2px solid ${color}` }}
        aria-hidden="true"
      >
        <div style={{ width: 4, height: 4, background: color }} />
      </div>
    )
  }
  // Default square
  return (
    <div
      className="shrink-0 rounded-[2px]"
      style={{ width: 12, height: 12, background: color }}
      aria-hidden="true"
    />
  )
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────
interface YandexMapProps {
  initialMarkers: MapMarkerData[]
  showFilters?: boolean
}

export default function YandexMap({ initialMarkers, showFilters = true }: YandexMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  // Always-current ref avoids stale closures in Leaflet async callbacks
  const filterFnRef = useRef<(m: MapMarkerData) => boolean>(() => true)

  const [directionFilters, setDirectionFilters] = useState<string[]>([])
  const [yearFilters, setYearFilters] = useState<number[]>([])
  const [mapReady, setMapReady] = useState(false)

  const allMarkers = useMemo(() => [...initialMarkers, ...OFFICE_MARKERS], [initialMarkers])

  const filterFn = useMemo(() => {
    return (marker: MapMarkerData) => {
      const cat = categoryOf(marker)
      if (directionFilters.length > 0 && !directionFilters.includes(cat)) return false
      if (yearFilters.length > 0 && !yearFilters.includes(marker.year)) return false
      return true
    }
  }, [directionFilters, yearFilters])

  const filteredObjectCount = useMemo(
    () => initialMarkers.filter(filterFn).length,
    [filterFn, initialMarkers],
  )

  filterFnRef.current = filterFn

  function toggleDirectionFilter(value: string) {
    setDirectionFilters((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    )
  }

  function toggleYearFilter(year: number) {
    setYearFilters((current) =>
      current.includes(year)
        ? current.filter((item) => item !== year)
        : [...current, year],
    )
  }

  function resetFilters() {
    setDirectionFilters([])
    setYearFilters([])
  }

  const hasFilters = directionFilters.length > 0 || yearFilters.length > 0

  // ─── Init map (once) ───────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return
    let cancelled = false

    if (!document.getElementById('em-leaflet-styles')) {
      const style = document.createElement('style')
      style.id = 'em-leaflet-styles'
      style.textContent = POPUP_STYLES
      document.head.appendChild(style)
    }

    import('leaflet').then((Lmod) => {
      const L = (Lmod as any).default ?? Lmod
      if (cancelled || mapInstanceRef.current || !mapRef.current) return

      delete (L.Icon.Default.prototype as any)._getIconUrl

      const map = L.map(mapRef.current, {
        center: [46.5, 39.7],
        zoom: 6,
        zoomControl: true,
        attributionControl: false,
      })

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20,
        },
      ).addTo(map)

      L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map)

      mapInstanceRef.current = map
      setMapReady(true)
    })

    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ─── Re-render markers on filter change ────────────────────
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return

    import('leaflet').then((Lmod) => {
      const L = (Lmod as any).default ?? Lmod
      const map = mapInstanceRef.current
      if (!map) return

      markersRef.current.forEach((m) => map.removeLayer(m))
      markersRef.current = []

      const filtered = allMarkers.filter(filterFnRef.current)

      filtered.forEach((markerData) => {
        const cat = categoryOf(markerData)
        const type = MARKER_TYPES[cat] || MARKER_TYPES.other
        const isOffice = cat === 'office'
        const S = ICON_SIZE

        if (markerData.geometry?.type === 'LineString' && markerData.geometry.coordinates.length > 1) {
          const polyline = L.polyline(
            markerData.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
            {
              color: type.color || '#546E7A',
              weight: 4,
              opacity: 0.72,
              lineCap: 'round',
              lineJoin: 'round',
            },
          ).bindPopup(buildPopupHtml(markerData), {
            maxWidth: 320,
            minWidth: 240,
            closeButton: true,
          })

          polyline.addTo(map)
          markersRef.current.push(polyline)
        }

        const icon = L.divIcon({
          html: buildIconHtml(cat),
          className: '',
          iconSize:   isOffice ? [0, 0]       : [S, S],
          iconAnchor: isOffice ? [0, 0]       : [S / 2, S / 2],
          popupAnchor:isOffice ? [0, -42]     : [0, -(S / 2 + 8)],
        })

        const marker = L.marker([markerData.lat, markerData.lng], { icon })
          .bindPopup(buildPopupHtml(markerData), {
            maxWidth: 320,
            minWidth: 240,
            closeButton: true,
          })

        marker.addTo(map)
        markersRef.current.push(marker)
      })
    })
  }, [mapReady, filterFn, allMarkers])

  return (
    <section className="relative z-0 bg-[#f6f5f1] pb-20">
      {/* ─── FILTER BAR ──────────────────────────────────────── */}
      {showFilters && (
        <div className="border-b border-[#d9d6cb] bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-7 sm:py-9">

            <div className="mb-5 flex items-center gap-2">
              <span className="h-px w-5 bg-[#d14232]" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#626675]/60">
                Объектов
              </span>
              <span className="inline-flex min-w-[54px] items-center justify-center bg-[#3E5854] px-3 py-2 font-brand text-[16px] font-black leading-none text-white tabular-nums">
                {filteredObjectCount}
              </span>
            </div>

            {/* Year filter */}
            <div className="mb-5">
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setYearFilters([])}
                  aria-pressed={yearFilters.length === 0}
                  className={`border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3E5854] ${
                    yearFilters.length === 0
                      ? 'border-[#23273F] bg-[#23273F] text-white'
                      : 'border-[#d9d6cb] bg-white text-[#626675] hover:border-[#3E5854] hover:text-[#23273F]'
                  }`}
                >
                  Все
                </button>
                {mapYears.map((year) => {
                  const active = yearFilters.includes(year)
                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => toggleYearFilter(year)}
                      aria-pressed={active}
                      className={`border px-3 py-1.5 text-[11px] font-bold tabular-nums transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3E5854] ${
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

            {/* Direction filter */}
            <div className="flex flex-wrap gap-1.5">
              {DIRECTION_FILTERS.map((d) => {
                const active = d.value === 'all'
                  ? directionFilters.length === 0
                  : directionFilters.includes(d.value)
                return (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => {
                      if (d.value === 'all') {
                        setDirectionFilters([])
                        return
                      }
                      toggleDirectionFilter(d.value)
                    }}
                    aria-pressed={active}
                    className={`border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3E5854] ${
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

            {hasFilters && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[10px] font-black uppercase tracking-[0.18em] text-[#626675] transition-colors hover:text-[#23273F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3E5854]"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── MAP CANVAS ──────────────────────────────────────── */}
      <div className="container-wide mx-auto px-5 pt-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden border border-[#d9d6cb] bg-white shadow-[0_40px_120px_rgba(13,16,28,0.14)]">
          <div ref={mapRef} className="h-[72vh] min-h-[560px] w-full" />
        </div>

        {/* ─── LEGEND ──────────────────────────────────────── */}
        <div className="mt-3 grid gap-px bg-[#d9d6cb] grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {Object.entries(MARKER_TYPES).map(([key, t]) => (
            <div key={key} className="flex items-center gap-2.5 bg-white px-4 py-3.5">
              <LegendShape cat={key} />
              <span className="text-[11px] font-semibold leading-[1.3] text-[#23273F]">
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
