'use client'

import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { mapYears, regions } from '@/lib/site-data'

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

function escapeHtml(value: string | number | undefined | null): string {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function escapeAttr(value: string | undefined | null): string {
  return escapeHtml(value)
}

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
    return `<div class="em-map-office-marker"
      onmouseenter="this.style.transform='scale(1.08)'"
      onmouseleave="this.style.transform='scale(1)'">
      <span class="em-map-office-logo" style="background-image:url('${BASE}/brand/logo-icon.svg')" aria-hidden="true"></span>
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
.leaflet-container img.leaflet-tile {
  max-width: none !important;
  max-height: none !important;
  width: 256px !important;
  height: 256px !important;
}
.leaflet-popup {
  max-width: calc(100vw - 32px) !important;
}
.leaflet-popup-content-wrapper {
  max-width: calc(100vw - 32px) !important;
  border-radius: 4px !important;
  border: 1px solid rgba(35,39,63,.12) !important;
  box-shadow: 0 22px 56px rgba(13,16,28,.18) !important;
  padding: 0 !important;
  background: #fff !important;
}
.leaflet-popup-content {
  width: min(340px, calc(100vw - 32px)) !important;
  margin: 0 !important;
  line-height: 1 !important;
}
.leaflet-popup-tip-container { display: none !important; }
.leaflet-popup-close-button { display: none !important; }
.em-leaflet-office-icon {
  width: 38px !important;
  height: 38px !important;
  margin-left: -19px !important;
  margin-top: -38px !important;
  background: transparent !important;
  border: 0 !important;
  overflow: visible !important;
}
.em-leaflet-marker-icon {
  background: transparent !important;
  border: 0 !important;
}
.em-map-office-marker {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  overflow: hidden;
  border: 2px solid #23273F;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(13,16,28,.45);
  cursor: pointer;
  transform-origin: 50% 100%;
  transition: transform .15s ease;
}
.em-map-office-logo {
  display: block;
  width: 22px;
  height: 22px;
  flex: 0 0 22px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
.em-popup {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 18px;
  padding-right: 44px;
  font-family: Arial, Helvetica, sans-serif;
  color: #23273F;
  background: #fff;
}
.em-popup-close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(35,39,63,.10);
  background: #fff;
  color: #626675;
  font: 22px/1 Arial, Helvetica, sans-serif;
  cursor: pointer;
  transition: color .15s, border-color .15s;
}
.em-popup-close:hover {
  color: #23273F;
  border-color: rgba(35,39,63,.22);
}
.em-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.em-popup-contract {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .08em;
  line-height: 1.15;
  text-transform: uppercase;
}
.em-popup-year {
  font-size: 11px;
  font-weight: 700;
  line-height: 1.15;
  color: #626675;
  white-space: nowrap;
}
.em-popup-title {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.25;
  color: #23273F;
}
.em-popup-desc {
  font-size: 12px;
  line-height: 1.45;
  color: #626675;
}
.em-popup-conclusion {
  padding-top: 10px;
  border-top: 1px solid rgba(217,214,203,.82);
}
.em-popup-conclusion-label {
  margin-bottom: 4px;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.2;
  color: #3E5854;
  text-transform: uppercase;
}
.em-popup-conclusion-text {
  font-size: 12px;
  line-height: 1.35;
  color: #626675;
}
.em-popup-conclusion-link {
  display: inline-flex;
  margin-top: 7px;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: .08em;
  color: #3E5854;
  text-decoration: none;
  text-transform: uppercase;
  border-bottom: 1px solid #3E5854;
  transition: color .15s, border-color .15s;
}
.em-popup-conclusion-link:hover { color: #23273F; border-color: #23273F; }
.em-popup-ymaps {
  display: inline-flex;
  align-self: flex-start;
  margin-top: 2px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .08em;
  line-height: 1.2;
  text-transform: uppercase;
  color: #3E5854;
  text-decoration: none;
  border-bottom: 1px solid #3E5854; padding-bottom: 1px;
  transition: color .15s, border-color .15s;
}
.em-popup-ymaps:hover { color: #23273F; border-color: #23273F; }
@media (max-width: 640px) {
  .em-popup {
    padding: 15px 16px;
    padding-right: 42px;
  }
  .em-popup-contract,
  .em-popup-year,
  .em-popup-conclusion-label,
  .em-popup-conclusion-link,
  .em-popup-ymaps {
    font-size: 10px;
  }
  .em-popup-title {
    font-size: 13px;
  }
}
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
  const year = escapeHtml(marker.year)

  if (isOffice) {
    return `
      <div class="em-popup">
        <button type="button" class="em-popup-close" data-em-popup-close aria-label="Закрыть карточку">×</button>
        <div class="em-popup-header">
          <span class="em-popup-contract" style="color:${color}">ОФИС</span>
          <span class="em-popup-year">${year}</span>
        </div>
        <div class="em-popup-title">${escapeHtml(marker.title)}</div>
        ${descText ? `<div class="em-popup-desc">${escapeHtml(descText)}</div>` : ''}
        <a href="${escapeAttr(ymapsUrl)}" target="_blank" rel="noopener noreferrer"
           class="em-popup-ymaps" aria-label="Открыть офис в Яндекс.Картах">
          ОТКРЫТЬ В ЯНДЕКС.КАРТАХ →
        </a>
      </div>`
  }

  const headerLeft = `<span class="em-popup-contract" style="color:${color}">${escapeHtml(marker.contractType || 'ПО ДОГОВОРУ')}</span>`

  const conclusionBlock = marker.positiveConclusion
    ? `<div class="em-popup-conclusion">
        <div class="em-popup-conclusion-label">Положительное заключение</div>
        <div class="em-popup-conclusion-text">${escapeHtml(marker.positiveConclusion)}</div>
        ${marker.conclusionUrl
          ? `<a href="${escapeAttr(marker.conclusionUrl)}" target="_blank" rel="noopener noreferrer"
               class="em-popup-conclusion-link" aria-label="Открыть заключение">Открыть заключение →</a>`
          : ''}
      </div>`
    : ''

  return `
    <div class="em-popup">
      <button type="button" class="em-popup-close" data-em-popup-close aria-label="Закрыть карточку">×</button>
      <div class="em-popup-header">
        ${headerLeft}
        <span class="em-popup-year">${year}</span>
      </div>
      <div class="em-popup-title">${escapeHtml(marker.title)}</div>
      ${descText ? `<div class="em-popup-desc">${escapeHtml(descText)}</div>` : ''}
      ${conclusionBlock}
      <a href="${escapeAttr(ymapsUrl)}" target="_blank" rel="noopener noreferrer"
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
  const tileLayerRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  // Always-current ref avoids stale closures in Leaflet async callbacks
  const filterFnRef = useRef<(m: MapMarkerData) => boolean>(() => true)

  const [directionFilters, setDirectionFilters] = useState<string[]>([])
  const [yearFilters, setYearFilters] = useState<number[]>([])
  const [regionFilters, setRegionFilters] = useState<string[]>([])
  const [adminMarkers, setAdminMarkers] = useState<MapMarkerData[]>([])
  const [mapReady, setMapReady] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const sourceMarkers = useMemo(
    () => [...initialMarkers, ...adminMarkers],
    [initialMarkers, adminMarkers],
  )
  const allMarkers = useMemo(() => [...sourceMarkers, ...OFFICE_MARKERS], [sourceMarkers])

  const filterFn = useMemo(() => {
    return (marker: MapMarkerData) => {
      const cat = categoryOf(marker)
      if (directionFilters.length > 0 && !directionFilters.includes(cat)) return false
      if (yearFilters.length > 0 && !yearFilters.includes(marker.year)) return false
      if (regionFilters.length > 0 && !regionFilters.includes(marker.region)) return false
      return true
    }
  }, [directionFilters, yearFilters, regionFilters])

  const filteredObjectCount = useMemo(
    () => sourceMarkers.filter(filterFn).length,
    [filterFn, sourceMarkers],
  )

  filterFnRef.current = filterFn

  useEffect(() => {
    let cancelled = false

    fetch(`${BASE}/api/map-markers`, { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : { docs: [] }))
      .then((data) => {
        if (cancelled) return
        setAdminMarkers(Array.isArray(data.docs) ? data.docs : [])
      })
      .catch(() => {
        if (!cancelled) setAdminMarkers([])
      })

    return () => {
      cancelled = true
    }
  }, [])

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

  function toggleRegionFilter(value: string) {
    setRegionFilters((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    )
  }

  function resetFilters() {
    setDirectionFilters([])
    setYearFilters([])
    setRegionFilters([])
  }

  const hasFilters = directionFilters.length > 0 || yearFilters.length > 0 || regionFilters.length > 0

  useEffect(() => {
    if (!isFullscreen) return

    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFullscreen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isFullscreen])

  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return
    const map = mapInstanceRef.current
    const refreshMap = () => {
      if (!mapInstanceRef.current) return
      const center = map.getCenter()
      const zoom = map.getZoom()
      map.invalidateSize({ animate: false, pan: false })
      map.setView(center, zoom, { animate: false })
      tileLayerRef.current?.redraw?.()
    }

    let secondFrame: number | null = null
    const firstFrame = window.requestAnimationFrame(() => {
      refreshMap()
      secondFrame = window.requestAnimationFrame(refreshMap)
    })
    const timers = [80, 240, 520, 900].map((delay) => window.setTimeout(refreshMap, delay))

    return () => {
      window.cancelAnimationFrame(firstFrame)
      if (secondFrame !== null) window.cancelAnimationFrame(secondFrame)
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [isFullscreen, mapReady])

  // ─── Init map (once) ───────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return
    let cancelled = false
    let cleanupMap: (() => void) | null = null

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

      const tileLayer = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20,
        },
      ).addTo(map)
      tileLayerRef.current = tileLayer

      L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map)

      const onPopupCloseClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null
        if (!target?.closest?.('[data-em-popup-close]')) return
        map.closePopup()
      }
      map.getContainer().addEventListener('click', onPopupCloseClick)
      cleanupMap = () => {
        map.getContainer().removeEventListener('click', onPopupCloseClick)
        map.remove()
        mapInstanceRef.current = null
        tileLayerRef.current = null
      }

      mapInstanceRef.current = map
      setMapReady(true)
    })

    return () => {
      cancelled = true
      cleanupMap?.()
    }
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
            maxWidth: 340,
            closeButton: false,
            autoPan: true,
            keepInView: true,
          })

          polyline.addTo(map)
          markersRef.current.push(polyline)
        }

        const icon = L.divIcon({
          html: buildIconHtml(cat),
          className: isOffice ? 'em-leaflet-office-icon' : 'em-leaflet-marker-icon',
          iconSize:   isOffice ? [38, 38]     : [S, S],
          iconAnchor: isOffice ? [19, 38]     : [S / 2, S / 2],
          popupAnchor:isOffice ? [0, -42]     : [0, -(S / 2 + 8)],
        })

        const marker = L.marker([markerData.lat, markerData.lng], { icon })
          .bindPopup(buildPopupHtml(markerData), {
            maxWidth: 340,
            closeButton: false,
            autoPan: true,
            keepInView: true,
          })

        marker.addTo(map)
        markersRef.current.push(marker)
      })
    })
  }, [mapReady, filterFn, allMarkers])

  return (
    <section
      className={
        isFullscreen
          ? 'fixed inset-0 z-[120] overflow-y-auto bg-[#f6f5f1] pb-[calc(24px+env(safe-area-inset-bottom))]'
          : 'relative z-0 bg-[#f6f5f1] pb-20'
      }
    >
      {isFullscreen && (
        <button
          type="button"
          onClick={() => setIsFullscreen(false)}
          className="fixed right-4 top-4 z-[140] grid h-11 w-11 place-items-center border border-[#d9d6cb] bg-white text-[30px] leading-none text-[#23273F] shadow-[0_12px_32px_rgba(13,16,28,0.18)] transition-colors hover:border-[#3E5854] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3E5854]"
          aria-label="Закрыть полноэкранную карту"
        >
          ×
        </button>
      )}

      {/* ─── FILTER BAR ──────────────────────────────────────── */}
      {showFilters && (
        <div className={isFullscreen ? 'max-h-[34svh] overflow-y-auto bg-white' : 'bg-white'}>
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-7 sm:py-9">

            <div className="mb-5 flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#626675]/60">
                Объектов
              </span>
              <span className="inline-flex min-w-[54px] items-center justify-center bg-[#3E5854] px-3 py-2 font-brand text-[16px] font-black leading-none text-white tabular-nums">
                {filteredObjectCount}
              </span>
            </div>

            {/* Region filter */}
            <div className="mb-5">
              <div className="flex flex-wrap gap-1.5">
                {regions.map((region) => {
                  const active = region.value === 'all'
                    ? regionFilters.length === 0
                    : regionFilters.includes(region.value)
                  return (
                    <button
                      key={region.value}
                      type="button"
                      onClick={() => {
                        if (region.value === 'all') {
                          setRegionFilters([])
                          return
                        }
                        toggleRegionFilter(region.value)
                      }}
                      aria-pressed={active}
                      className={`border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3E5854] ${
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
      <div className={`container-wide mx-auto px-5 sm:px-6 lg:px-8 ${isFullscreen ? 'pt-4 sm:pt-5' : 'pt-10'}`}>
        <div className="relative overflow-hidden border border-[#d9d6cb] bg-white shadow-[0_40px_120px_rgba(13,16,28,0.14)]">
          <div className={isFullscreen ? 'h-[72svh] min-h-[420px] w-full sm:h-[76svh]' : 'h-[62vh] min-h-[420px] w-full sm:h-[72vh] sm:min-h-[560px]'}>
            <div ref={mapRef} className="h-full w-full" />
          </div>
          <button
            type="button"
            onClick={() => setIsFullscreen((value) => !value)}
            className={`absolute right-4 z-[500] border border-[#d9d6cb] bg-white px-4 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-[#23273F] shadow-[0_12px_32px_rgba(13,16,28,0.16)] transition-colors hover:border-[#3E5854] hover:text-[#3E5854] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3E5854] sm:text-[11px] ${isFullscreen ? 'top-[68px]' : 'top-4'}`}
            aria-pressed={isFullscreen}
          >
            {isFullscreen ? 'Свернуть карту' : 'Развернуть на весь экран'}
          </button>
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
