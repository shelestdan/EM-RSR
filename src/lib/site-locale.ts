export type SiteLocale = 'ru' | 'en'

const LOCALES = new Set<SiteLocale>(['ru', 'en'])

export function normalizeSiteLocale(value: unknown): SiteLocale {
  if (Array.isArray(value)) return normalizeSiteLocale(value[0])
  if (typeof value !== 'string') return 'ru'

  const normalized = value.trim().toLowerCase()
  if (LOCALES.has(normalized as SiteLocale)) return normalized as SiteLocale
  if (normalized.startsWith('en')) return 'en'
  return 'ru'
}

export function getSiteLocaleFromPath(pathname: string | null | undefined): SiteLocale | null {
  if (!pathname) return null
  const firstSegment = pathname.split('/').filter(Boolean)[0]
  if (!firstSegment) return null
  if (firstSegment === 'en') return 'en'
  if (firstSegment === 'ru') return 'ru'
  return null
}

export function getSiteLocaleFromSearch(search: string): SiteLocale | null {
  if (!search) return null
  const params = new URLSearchParams(search)
  const value = params.get('lang') || params.get('locale')
  return value ? normalizeSiteLocale(value) : null
}

export function getBrowserSiteLocale(): SiteLocale {
  if (typeof window === 'undefined') return 'ru'

  return (
    getSiteLocaleFromSearch(window.location.search) ||
    getSiteLocaleFromPath(window.location.pathname) ||
    normalizeSiteLocale(document.documentElement.lang)
  )
}
