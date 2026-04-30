'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAnimatedSiteLocale } from '@/hooks/useSiteLocale'
import { brand } from '@/lib/site-data'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const navLinks = [
  { href: '/uslugi', label: 'Услуги', code: '01' },
  { href: '/proekty', label: 'География и объекты', code: '02' },
  { href: '/o-kompanii', label: 'О компании', code: '03' },
  { href: '/kontakty', label: 'Контакты', code: '04' },
]

function normalizeNavPath(value: string | null | undefined) {
  if (!value) return '/'
  let path = value

  if (path.startsWith('http')) {
    try {
      path = new URL(path).pathname
    } catch {
      return value
    }
  }

  if (path === '/EM-RSR') return '/'
  if (path.startsWith('/EM-RSR/')) path = path.slice('/EM-RSR'.length)
  return path.length > 1 ? path.replace(/\/$/, '') : path
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  })
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)
  const currentPath = normalizeNavPath(pathname)
  const locale = useAnimatedSiteLocale({ pathname: currentPath, autoCycleMs: 4000 })

  // Scroll handler — scrolled state + progress bar
  useEffect(() => {
    let rafId = 0
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > 24)
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? Math.min(1, y / max) : 0)
        rafId = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close on Esc
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  // Compute sliding indicator position under active/hover nav item
  useEffect(() => {
    if (!navRef.current) return
    const active = navRef.current.querySelector<HTMLAnchorElement>('[data-active="true"]')
    if (active) {
      const parentRect = navRef.current.getBoundingClientRect()
      const rect = active.getBoundingClientRect()
      setIndicator({
        left: rect.left - parentRect.left,
        width: rect.width,
        opacity: 1,
      })
    } else {
      setIndicator((p) => ({ ...p, opacity: 0 }))
    }
  }, [pathname, scrolled])

  function handleNavHover(e: React.MouseEvent<HTMLDivElement>) {
    const target = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-nav-item]')
    if (!target || !navRef.current) return
    const href = target.dataset.href || target.getAttribute('href')
    setHoveredHref(normalizeNavPath(href))
    const parentRect = navRef.current.getBoundingClientRect()
    const rect = target.getBoundingClientRect()
    setIndicator({
      left: rect.left - parentRect.left,
      width: rect.width,
      opacity: 1,
    })
  }

  function handleNavLeave() {
    setHoveredHref(null)
    if (!navRef.current) return
    const active = navRef.current.querySelector<HTMLAnchorElement>('[data-active="true"]')
    if (active) {
      const parentRect = navRef.current.getBoundingClientRect()
      const rect = active.getBoundingClientRect()
      setIndicator({
        left: rect.left - parentRect.left,
        width: rect.width,
        opacity: 1,
      })
    } else {
      setIndicator((p) => ({ ...p, opacity: 0 }))
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        scrolled || mobileOpen
          ? 'bg-[#07090f]/92 shadow-[0_1px_0_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl'
          : 'bg-gradient-to-b from-[#07090f]/80 via-[#07090f]/48 to-transparent backdrop-blur-md'
      }`}
    >
      {/* ─── MAIN BAR ─────────────────────────────────────────── */}
      <div
        className={`container mx-auto px-5 transition-all duration-500 ease-out sm:px-6 lg:px-8 ${
          scrolled ? 'py-5 lg:py-3' : 'py-5'
        }`}
      >
        <div className="relative flex items-center gap-4 lg:gap-6">

          {/* ── LOGO ─────────────────────────────────────────── */}
          <Link
            href="/"
            className="group relative flex min-w-0 shrink-0 items-center gap-3"
            aria-label="ЕМ-ПСП — главная"
          >
            <span
              className={`relative grid shrink-0 place-items-center transition-all duration-500 ease-out ${
                scrolled ? 'h-[50px] w-[50px] lg:h-10 lg:w-10' : 'h-[50px] w-[50px]'
              }`}
            >
              {/* Pulse ring on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 border border-[#5f8b7d]/0 transition-all duration-500 group-hover:inset-[-4px] group-hover:border-[#5f8b7d]/60"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}/brand/logo-icon-white.svg`}
                alt=""
                width={40}
                height={40}
                className={`object-contain transition-all duration-500 ${
                  scrolled ? 'h-11 w-11 lg:h-9 lg:w-9' : 'h-11 w-11'
                }`}
              />
            </span>
            <span className="flex min-w-0 flex-col">
              <span
                className={`font-brand font-black leading-none text-white transition-all duration-500 ease-out tracking-[-0.01em] ${
                  scrolled ? 'text-[20px] lg:text-[17px]' : 'text-[20px]'
                }`}
              >
                {brand.short}
              </span>
              <span
                className={`relative hidden max-w-[260px] overflow-hidden font-bold uppercase leading-[1.25] text-[#8ab0a3]/72 transition-all duration-500 ease-out xl:block ${
                  scrolled
                    ? 'mt-0.5 h-[21px] text-[8px] tracking-[0.14em]'
                    : 'mt-1.5 h-[24px] text-[9px] tracking-[0.15em]'
                }`}
              >
                {(['ru', 'en'] as const).map((entry) => (
                  <span
                    key={entry}
                    aria-hidden={locale !== entry}
                    className={`absolute inset-0 grid grid-cols-1 transition-all duration-500 ease-out ${
                      locale === entry
                        ? 'translate-y-0 opacity-100'
                        : entry === 'ru'
                          ? '-translate-y-1 opacity-0'
                          : 'translate-y-1 opacity-0'
                    }`}
                  >
                    {brand.descriptorLines[entry].map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                ))}
              </span>
            </span>
          </Link>

          {/* ── DESKTOP NAV — flex-centered pill with sliding indicator ── */}
          <nav
            className="hidden flex-1 items-center justify-center lg:flex"
            aria-label="Основная навигация"
          >
            <div
              ref={navRef}
              onMouseMove={handleNavHover}
              onMouseLeave={handleNavLeave}
              className={`relative flex items-center gap-0.5 rounded-full border transition-all duration-500 ease-out ${
                scrolled
                  ? 'border-white/8 bg-white/[0.035] px-1.5 py-1.5'
                  : 'border-white/12 bg-[#0d101c]/55 px-2 py-2'
              }`}
            >
              {/* Sliding indicator (background pill) */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-white transition-all duration-[450ms] ease-[cubic-bezier(.2,.8,.2,1)]"
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  height: 'calc(100% - 8px)',
                  opacity: indicator.opacity,
                }}
              />

              {navLinks.map((link) => {
                const active = currentPath === link.href
                const hovered = hoveredHref === link.href
                // Text is dark when: this item is hovered (pill under it) OR item is active AND nothing else hovered
                const inverted = hovered || (active && !hoveredHref)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-nav-item
                    data-href={link.href}
                    data-active={active}
                    className={`relative z-10 whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-black uppercase tracking-[0.1em] transition-colors duration-200 xl:px-4 xl:tracking-[0.12em] ${
                      inverted
                        ? 'text-[#121625]'
                        : 'text-white/72 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* ── RIGHT SIDE ───────────────────────────────────── */}
          <div className="flex flex-1 shrink-0 items-center justify-end gap-3 lg:flex-none lg:pl-0">
            <a
              href="tel:+79892888980"
              className="group hidden text-right leading-tight xl:block"
            >
              <span className="flex items-center justify-end gap-2">
                <span className="h-1 w-1 rounded-full bg-[#5f8b7d] transition-transform duration-300 group-hover:scale-150" />
                <span className="text-[13px] font-bold text-white tabular-nums">
                  +7 (989) 288-89-80
                </span>
              </span>
              <span className="mt-0.5 block whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.18em] text-white/40 transition-colors group-hover:text-white/60">
                Санкт-Петербург · Краснодар
              </span>
            </a>

            <Link
              href="/portal"
              className={`group relative hidden overflow-hidden border border-[#3E5854] bg-[#3E5854] text-white transition-all duration-500 ease-out sm:inline-flex sm:items-center sm:gap-2 ${
                scrolled
                  ? 'px-5 py-2.5 text-[10px]'
                  : 'px-6 py-3 text-[11px]'
              }`}
            >
              {/* Shimmer sweep */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-[40%] w-[40%] -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/22 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[340%]"
              />
              <span className="relative z-10 font-black uppercase tracking-[0.14em]">
                Портал исполнителей
              </span>
              <svg
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M2.5 6h7M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={mobileOpen}
              className="relative grid h-11 w-11 shrink-0 place-items-center border border-white/14 bg-white/[0.04] transition-all duration-300 hover:border-[#5f8b7d]/50 hover:bg-[#5f8b7d]/10 lg:hidden"
            >
              <span className="relative block h-[18px] w-[22px]">
                <span
                  className={`absolute left-0 top-[3px] h-px w-[22px] bg-white transition-all duration-300 ${
                    mobileOpen ? 'translate-y-[6px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[9px] h-px bg-white transition-all duration-300 ${
                    mobileOpen ? 'w-0 opacity-0' : 'w-[22px] opacity-100'
                  }`}
                />
                <span
                  className={`absolute bottom-[3px] left-0 h-px w-[22px] bg-white transition-all duration-300 ${
                    mobileOpen ? '-translate-y-[6px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── SCROLL PROGRESS BAR ──────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-white/[0.05]"
        aria-hidden="true"
      >
        <div
          className="h-full origin-left bg-gradient-to-r from-[#5f8b7d] via-[#8ab0a3] to-[#5f8b7d] transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* ─── MOBILE MENU ──────────────────────────────────────── */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-out lg:hidden ${
          mobileOpen ? 'h-[calc(100svh-90px)] max-h-[calc(100svh-90px)] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="relative h-full border-t border-white/8 bg-[#07090f]">

          <div className="relative h-full overflow-y-auto px-5 pb-[calc(24px+env(safe-area-inset-bottom))] pt-4 sm:px-6">
            <nav className="flex flex-col" aria-label="Мобильная навигация">
              {navLinks.map((link, i) => {
                const active = currentPath === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{ transitionDelay: mobileOpen ? `${80 + i * 55}ms` : '0ms' }}
                    className={`group flex min-h-[58px] items-center justify-between gap-4 border-b border-white/[0.07] py-4 transition-all duration-500 ease-out ${
                      mobileOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                    }`}
                  >
                    <span
                      className={`font-brand text-[21px] font-black leading-none tracking-[-0.01em] transition-colors ${
                        active ? 'text-[#8ab0a3]' : 'text-white/78 group-hover:text-white'
                      }`}
                    >
                      {link.label}
                    </span>
                    <span
                      className={`inline-grid h-9 w-9 shrink-0 place-items-center transition-all duration-300 ${
                        active
                          ? 'text-[#8ab0a3]'
                          : 'text-white/46 group-hover:text-white'
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                        <path d="M2.5 6h7M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                )
              })}
            </nav>

            <div
              className="mt-7 grid gap-3 transition-all duration-500 ease-out"
              style={{
                transitionDelay: mobileOpen ? `${80 + navLinks.length * 55}ms` : '0ms',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(8px)',
              }}
            >
              <Link
                href="/portal"
                onClick={() => setMobileOpen(false)}
                className="group relative inline-flex min-h-[54px] items-center justify-center gap-2 overflow-hidden border border-[#3E5854] bg-[#3E5854] px-4 py-4 text-center text-[11px] font-black uppercase tracking-[0.14em] text-white"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-[40%] w-[40%] -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/22 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[340%]"
                />
                <span className="relative z-10">Портал исполнителей</span>
                <svg className="relative z-10" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M2.5 6h7M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href="tel:+79892888980"
                className="flex min-h-[54px] items-center justify-between gap-3 border border-white/10 px-4 py-3 text-[13px] font-semibold text-white/78 transition-colors hover:border-white/24 hover:text-white"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M2 2h3l1.5 3.5-1.5 1a8 8 0 0 0 3 3l1-1.5L12.5 9V12a1 1 0 0 1-1 1C4.3 13 1 9.7 1 3a1 1 0 0 1 1-1Z" />
                  </svg>
                  <span className="tabular-nums">+7 (989) 288-89-80</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                  ЗВОНОК
                </span>
              </a>
              <a
                href="mailto:em-psp@mail.ru"
                className="flex min-h-[54px] items-center justify-between gap-3 border border-white/10 px-4 py-3 text-[13px] font-semibold text-white/78 transition-colors hover:border-white/24 hover:text-white"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect x="1.5" y="2.5" width="11" height="9" rx="0.5" />
                    <path d="m2 3 5 4 5-4" />
                  </svg>
                  <span className="min-w-0 break-all">em-psp@mail.ru</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                  ПИСЬМО
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
