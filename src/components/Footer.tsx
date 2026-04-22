import Link from 'next/link'
import { brand } from '@/lib/site-data'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const footerLinks = {
  pages: [
    { href: '/uslugi', label: 'Услуги' },
    { href: '/proekty', label: 'География и объекты' },
    { href: '/o-kompanii', label: 'О компании' },
    { href: '/kontakty', label: 'Контакты' },
  ],
  legal: [
    { href: '/privacy-policy', label: 'Политика конфиденциальности' },
    { href: '/terms', label: 'Пользовательское соглашение' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#0d101c] text-white">
      <div className="container mx-auto px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.7fr_0.7fr_0.9fr]">
          <div>
            <Link href="/" className="flex items-center gap-3" aria-label="ЕМ-ПСП — главная">
              <span className="relative grid h-12 w-12 place-items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${BASE}/brand/logo-icon-white.svg`} alt="" width={42} height={42} className="h-11 w-11 object-contain" />
              </span>
              <span>
                <span className="block font-brand text-[22px] font-black leading-none tracking-[0.03em]">ЕМ-ПСП</span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/56">
                  Инженерные · Проекты · Строительство
                </span>
                <span className="mt-3 block font-brand text-[15px] font-black leading-none tracking-[0.03em] text-white/72">
                  EM-PCP
                </span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                  Engineering · Project · Construction
                </span>
              </span>
            </Link>
            <p className="mt-7 max-w-[420px] text-[14px] leading-[1.8] text-white/56">
              Проектирование, инженерные сети, строительство, экспертиза и авторский надзор для объектов, где важны документы, сроки и ответственность.
            </p>
            <div className="mt-7 grid gap-1 text-[12px] font-semibold text-white/46">
              <span>{brand.legalName}</span>
              <span>ИНН {brand.inn}</span>
              <span>КПП {brand.kpp}</span>
              <span>Генеральный директор {brand.director}</span>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-white/34">Разделы</h3>
            <ul className="mt-5 grid gap-3">
              {footerLinks.pages.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[14px] text-white/62 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-white/34">Документы</h3>
            <ul className="mt-5 grid gap-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[14px] text-white/62 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.14em] text-white/34">Контакты</h3>
            <div className="mt-5 grid gap-3 text-[14px] text-white/62">
              <a href={brand.phoneHref} className="transition-colors hover:text-white">{brand.phone}</a>
              <a href={brand.maxHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                Написать в MAX
              </a>
              <a href={brand.emailHref} className="transition-colors hover:text-white">{brand.email}</a>
              <p className="leading-[1.7] text-white/42">
                {brand.workingHours}
              </p>
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}
