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
