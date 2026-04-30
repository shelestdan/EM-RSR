'use client'

import Link from 'next/link'
import { useSiteLocale } from '@/hooks/useSiteLocale'
import { brand } from '@/lib/site-data'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

interface BrandLogoProps {
  className?: string
}

export default function BrandLogo({ className = '' }: BrandLogoProps) {
  const locale = useSiteLocale()
  const descriptorLines = brand.descriptorLines[locale]

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

      <span className="flex min-w-0 flex-col">
        <span className="font-brand text-[20px] font-black leading-none tracking-[-0.01em] text-white">
          {brand.short}
        </span>
        <span className="mt-1.5 grid max-w-[260px] grid-cols-1 text-[9px] font-bold uppercase leading-[1.25] tracking-[0.15em] text-[#8ab0a3]/72">
          {descriptorLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </span>
      </span>
    </Link>
  )
}
