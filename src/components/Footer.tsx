import Link from 'next/link'
import BrandLogo from '@/components/BrandLogo'
import { brand } from '@/lib/site-data'

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

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M2 2h3l1.5 3.5-1.5 1a8 8 0 0 0 3 3l1-1.5L12.5 9V12a1 1 0 0 1-1 1C4.3 13 1 9.7 1 3a1 1 0 0 1 1-1Z" />
  </svg>
)

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="1.5" y="2.5" width="11" height="9" rx="0.5" />
    <path d="m2 3 5 4 5-4" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-[#0d101c] text-white">
      <div className="container mx-auto px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.7fr_0.7fr_0.9fr]">
          <div>
            <BrandLogo />
            <div className="mt-7 grid gap-1 text-[12px] font-semibold text-white/46">
              <span>{brand.legalName}</span>
              <span>ИНН {brand.inn}</span>
              <span>КПП {brand.kpp}</span>
              <span>Генеральный директор {brand.director}</span>
            </div>
          </div>

          <div>
            <ul className="grid gap-3">
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
            <ul className="grid gap-3">
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
            <div className="grid gap-3 text-[14px] text-white/62">
              <a
                href={brand.phoneHref}
                className="flex min-h-[54px] items-center justify-between gap-3 border border-white/10 px-4 py-3 transition-colors hover:border-white/24 hover:text-white"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center border border-white/10 text-[#8ab0a3]">
                    <PhoneIcon />
                  </span>
                  <span className="tabular-nums">{brand.phone}</span>
                </span>
                <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.16em] text-white/36">ЗВОНОК</span>
              </a>
              <a
                href={brand.emailHref}
                className="flex min-h-[54px] items-center justify-between gap-3 border border-white/10 px-4 py-3 transition-colors hover:border-white/24 hover:text-white"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center border border-white/10 text-[#8ab0a3]">
                    <MailIcon />
                  </span>
                  <span className="min-w-0 break-all">{brand.email}</span>
                </span>
                <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.16em] text-white/36">ПИСЬМО</span>
              </a>
              <a href={brand.maxHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                Написать в MAX
              </a>
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
