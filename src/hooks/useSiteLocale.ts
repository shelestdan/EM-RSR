'use client'

import { useEffect, useState } from 'react'
import { getBrowserSiteLocale, getSiteLocaleFromPath, type SiteLocale } from '@/lib/site-locale'

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
