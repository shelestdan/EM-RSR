export type MarkerShape =
  | 'square'
  | 'circleInCircle'
  | 'diamond'
  | 'document'
  | 'squareInSquare'
  | 'logo'

export type MarkerTypeConfig = {
  label: string
  color: string | null
  shape: MarkerShape
  publicFilter: boolean
}

export type MapFilterOption = {
  value: string
  label: string
}

export type MapWorkTypeOption = MapFilterOption & MarkerTypeConfig

export const defaultMapYears = Array.from({ length: 2026 - 2017 + 1 }, (_, i) => 2026 - i)

export const defaultMapRegions: MapFilterOption[] = [
  { value: 'krasnodar', label: 'Краснодарский край' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'lenobl', label: 'Ленинградская область' },
  { value: 'rostov', label: 'Ростовская область' },
  { value: 'stavropol', label: 'Ставропольский край' },
  { value: 'other', label: 'Другой регион' },
]

export const defaultMarkerTypes: Record<string, MarkerTypeConfig> = {
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

export const defaultMapWorkTypes: MapWorkTypeOption[] = Object.entries(defaultMarkerTypes)
  .filter(([, type]) => type.publicFilter)
  .map(([value, type]) => ({
    value,
    label: type.label,
    color: type.color,
    shape: type.shape,
    publicFilter: type.publicFilter,
  }))
