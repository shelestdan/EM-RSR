'use client'

import { useEffect, useState } from 'react'
import {
  getBrowserSiteLocale,
  getExplicitBrowserSiteLocale,
  getSiteLocaleFromPath,
  type SiteLocale,
} from '@/lib/site-locale'

export function useSiteLocale(pathname?: string | null, fallback: SiteLocale = 'ru') {
  const [locale, setLocale] = useState<SiteLocale>(() => getSiteLocaleFromPath(pathname) || fallback)

  useEffect(() => {
    const update = () => setLocale(getBrowserSiteLocale())

    update()
    window.addEventListener('popstate', update)
    window.addEventListener('languagechange', update)
    window.addEventListener('empcp:language-change', update)

    return () => {
      window.removeEventListener('popstate', update)
      window.removeEventListener('languagechange', update)
      window.removeEventListener('empcp:language-change', update)
    }
  }, [pathname])

  return locale
}

type AnimatedLocaleOptions = {
  pathname?: string | null
  fallback?: SiteLocale
  autoCycleMs?: number
}

export function useAnimatedSiteLocale({
  pathname,
  fallback = 'ru',
  autoCycleMs = 0,
}: AnimatedLocaleOptions = {}) {
  const detectedLocale = useSiteLocale(pathname, fallback)
  const [locale, setLocale] = useState<SiteLocale>(detectedLocale)
  const [explicitLocale, setExplicitLocale] = useState(false)

  useEffect(() => {
    const explicit = getExplicitBrowserSiteLocale()
    setExplicitLocale(Boolean(explicit))
    setLocale(explicit || detectedLocale)
  }, [detectedLocale, pathname])

  useEffect(() => {
    if (!autoCycleMs || explicitLocale) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = window.setInterval(() => {
      setLocale((current) => (current === 'ru' ? 'en' : 'ru'))
    }, autoCycleMs)

    return () => window.clearInterval(id)
  }, [autoCycleMs, explicitLocale])

  return locale
}
