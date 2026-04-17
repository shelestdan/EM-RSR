'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/uslugi', label: 'Услуги', code: '01' },
  { href: '/proekty', label: 'Проекты', code: '02' },
  { href: '/karta-obektov', label: 'Карта', code: '03' },
  { href: '/o-kompanii', label: 'О компании', code: '04' },
  { href: '/kontakty', label: 'Контакты', code: '05' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [time, setTime] = useState('')
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  })
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)

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

  // MSK clock (top rail)
  useEffect(() => {
    const update = () => {
      const now = new Date()
      const msk = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Moscow' }))
      const hh = String(msk.getHours()).padStart(2, '0')
      const mm = String(msk.getMinutes()).padStart(2, '0')
      setTime(`${hh}:${mm}`)
    }
    update()
    const id = setInterval(update, 30_000)
    return () => clearInterval(id)
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
    const href = target.getAttribute('href')
    setHoveredHref(href)
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
      {/* ─── TOP META RAIL ────────────────────────────────────── */}
      <div
        className={`overflow-hidden border-b border-white/[0.06] transition-all duration-500 ease-out ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-[44px] opacity-100'
        }`}
        aria-hidden={scrolled}
      >
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex h-[34px] items-center justify-between gap-6 text-[9px] font-black uppercase tracking-[0.22em] text-white/40">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-2">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#5f8b7d]/80" />
                  <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[#5f8b7d]" />
                </span>
                <span className="text-white/52">N°001 · EM-PSP</span>
              </span>
              <span className="hidden h-3 w-px bg-white/10 sm:inline-block" />
              <span className="hidden sm:inline">СРО · ISO · 150+ объектов</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline-flex items-center gap-2">
                <span className="text-white/32">MSK</span>
                <span className="tabular-nums text-white/62">{time || '—'}</span>
              </span>
              <span className="hidden h-3 w-px bg-white/10 md:inline-block" />
              <a
                href="mailto:em-psp@mail.ru"
                className="hidden transition-colors hover:text-white sm:inline"
              >
                em-psp@mail.ru
              </a>
              <span className="hidden h-3 w-px bg-white/10 sm:inline-block" />
              <a
                href="tel:+79892888980"
                className="transition-colors hover:text-white"
              >
                +7 (989) 288-89-80
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN BAR ─────────────────────────────────────────── */}
      <div
        className={`container mx-auto px-5 transition-all duration-500 ease-out sm:px-6 lg:px-8 ${
          scrolled || mobileOpen ? 'py-3' : 'py-5'
        }`}
      >
        <div className="relative flex items-center gap-4 lg:gap-6">

          {/* ── LOGO ─────────────────────────────────────────── */}
          <Link
            href="/"
            className="group relative flex shrink-0 items-center gap-3"
            aria-label="ЕМ-ПСП — главная"
          >
            <span
              className={`relative grid shrink-0 place-items-center border bg-white transition-all duration-500 ease-out group-hover:border-[#8ab0a3] ${
                scrolled
                  ? 'h-10 w-10 border-white/22 shadow-[0_6px_20px_rgba(0,0,0,0.3)]'
                  : 'h-[50px] w-[50px] border-white/32 shadow-[0_10px_32px_rgba(0,0,0,0.3)]'
              }`}
            >
              {/* Pulse ring on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 border border-[#5f8b7d]/0 transition-all duration-500 group-hover:inset-[-4px] group-hover:border-[#5f8b7d]/60"
              />
              <Image
                src="/brand/logo-icon.png"
                alt=""
                width={36}
                height={36}
                priority
                className={`object-contain transition-all duration-500 ${
                  scrolled ? 'h-7 w-7' : 'h-9 w-9'
                }`}
              />
            </span>
            <span className="flex flex-col">
              <span
                className={`font-brand font-black leading-none text-white transition-all duration-500 ease-out tracking-[-0.01em] ${
                  scrolled ? 'text-[17px]' : 'text-[20px]'
                }`}
              >
                ЕМ-ПСП
              </span>
              <span
                className={`hidden whitespace-nowrap font-bold uppercase text-[#8ab0a3]/72 transition-all duration-500 ease-out sm:block lg:hidden xl:block ${
                  scrolled
                    ? 'mt-0.5 text-[8px] tracking-[0.26em]'
                    : 'mt-1.5 text-[9px] tracking-[0.28em]'
                }`}
              >
                Engineering · Project · Construction
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
                const active = pathname === link.href
                const hovered = hoveredHref === link.href
                // Text is dark when: this item is hovered (pill under it) OR item is active AND nothing else hovered
                const inverted = hovered || (active && !hoveredHref)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-nav-item
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
          <div className="flex shrink-0 items-center gap-3 lg:ml-auto lg:pl-0">
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
                Краснодар · СПб
              </span>
            </a>

            <Link
              href="/#contact"
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
                Обсудить проект
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
              className="relative grid h-10 w-10 place-items-center border border-white/14 bg-white/[0.04] transition-all duration-300 hover:border-[#5f8b7d]/50 hover:bg-[#5f8b7d]/10 lg:hidden"
            >
              <span className="relative h-[14px] w-5">
                <span
                  className={`absolute left-0 top-0 h-px w-5 bg-white transition-all duration-300 ${
                    mobileOpen ? 'translate-y-[7px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-px bg-white transition-all duration-300 ${
                    mobileOpen ? 'w-0 opacity-0' : 'w-5 opacity-100'
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-5 bg-white transition-all duration-300 ${
                    mobileOpen ? '-translate-y-[7px] -rotate-45' : ''
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
          mobileOpen ? 'max-h-[720px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="relative border-t border-white/8 bg-[#07090f]">
          {/* Decorative grid */}
          <div className="pointer-events-none absolute inset-0 eng-grid-overlay opacity-[0.1]" aria-hidden="true" />

          <div className="relative px-5 pb-8 pt-6 sm:px-6">
            {/* Label */}
            <div className="mb-6 flex items-center gap-4">
              <span className="text-[10px] font-black tracking-[0.22em] text-[#5f8b7d]">MENU</span>
              <span className="h-px flex-1 bg-white/[0.08]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/32">
                {navLinks.length} разделов
              </span>
            </div>

            <nav className="flex flex-col" aria-label="Мобильная навигация">
              {navLinks.map((link, i) => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ transitionDelay: mobileOpen ? `${80 + i * 55}ms` : '0ms' }}
                    className={`group flex items-center justify-between border-b border-white/[0.08] py-5 transition-all duration-500 ease-out ${
                      mobileOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className={`font-brand text-[10px] font-black tracking-[0.22em] transition-colors ${
                          active ? 'text-[#8ab0a3]' : 'text-white/28 group-hover:text-[#5f8b7d]'
                        }`}
                      >
                        {link.code}
                      </span>
                      <span
                        className={`font-brand text-[20px] font-black leading-none tracking-[-0.01em] transition-colors ${
                          active ? 'text-white' : 'text-white/72 group-hover:text-white'
                        }`}
                      >
                        {link.label}
                      </span>
                    </div>
                    <span
                      className={`inline-grid h-8 w-8 place-items-center transition-all duration-300 ${
                        active
                          ? 'bg-[#5f8b7d] text-white'
                          : 'border border-white/12 text-white/48 group-hover:border-[#5f8b7d] group-hover:bg-[#5f8b7d]/10 group-hover:text-white'
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
                href="/#contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden border border-[#3E5854] bg-[#3E5854] py-4 text-[11px] font-black uppercase tracking-[0.14em] text-white"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-[40%] w-[40%] -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/22 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[340%]"
                />
                <span className="relative z-10">Обсудить проект</span>
                <svg className="relative z-10" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M2.5 6h7M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href="tel:+79892888980"
                className="flex items-center justify-between gap-2 border border-white/10 px-5 py-3.5 text-[13px] font-semibold text-white/78 transition-colors hover:border-white/24 hover:text-white"
              >
                <span className="flex items-center gap-3">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M2 2h3l1.5 3.5-1.5 1a8 8 0 0 0 3 3l1-1.5L12.5 9V12a1 1 0 0 1-1 1C4.3 13 1 9.7 1 3a1 1 0 0 1 1-1Z" />
                  </svg>
                  <span className="tabular-nums">+7 (989) 288-89-80</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                  Звонок
                </span>
              </a>
              <a
                href="mailto:em-psp@mail.ru"
                className="flex items-center justify-between gap-2 border border-white/10 px-5 py-3.5 text-[13px] font-semibold text-white/78 transition-colors hover:border-white/24 hover:text-white"
              >
                <span className="flex items-center gap-3">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect x="1.5" y="2.5" width="11" height="9" rx="0.5" />
                    <path d="m2 3 5 4 5-4" />
                  </svg>
                  <span>em-psp@mail.ru</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                  Письмо
                </span>
              </a>
            </div>

            {/* Bottom meta */}
            <div className="mt-8 flex items-center justify-between border-t border-white/[0.08] pt-5 text-[9px] font-bold uppercase tracking-[0.22em] text-white/32">
              <span>СРО · ISO · 150+</span>
              <span>СПб · Краснодар</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
