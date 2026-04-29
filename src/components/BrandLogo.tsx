'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

interface BrandLogoProps {
  className?: string
}

export default function BrandLogo({ className = '' }: BrandLogoProps) {
  const [flip, setFlip] = useState(false)

  // Same 4s interval as Header
  useEffect(() => {
    const id = setInterval(() => setFlip((v) => !v), 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <Link
      href="/"
      className={`group relative flex shrink-0 items-center gap-3 ${className}`}
      aria-label="ЕМ-ПСП — главная"
    >
      <span className="relative grid h-[50px] w-[50px] shrink-0 place-items-center">
        {/* Pulse ring on hover — same as header */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border border-[#5f8b7d]/0 transition-all duration-500 group-hover:inset-[-4px] group-hover:border-[#5f8b7d]/60"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE}/brand/logo-icon-white.svg`}
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 object-contain"
        />
      </span>

      <span className="flex flex-col overflow-hidden">
        {/* Brand name — ЕМ-ПСП ↔ EM-PCP */}
        <span className="relative h-[20px] w-24 font-brand text-[20px] font-black leading-none tracking-[-0.01em] text-white">
          <span
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              flip ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
            }`}
          >
            ЕМ-ПСП
          </span>
          <span
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              flip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            EM-PCP
          </span>
        </span>

        {/* Descriptor — RU ↔ EN */}
        <span className="relative mt-1.5 h-[10px] whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.28em] text-[#8ab0a3]/72">
          <span
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              flip ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'
            }`}
          >
            Инженерные · Проекты · Строительство
          </span>
          <span
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              flip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            }`}
          >
            Engineering · Project · Construction
          </span>
        </span>
      </span>
    </Link>
  )
}
