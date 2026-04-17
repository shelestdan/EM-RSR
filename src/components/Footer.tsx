import Image from 'next/image'
import Link from 'next/link'

const footerLinks = {
  pages: [
    { href: '/uslugi', label: 'Услуги' },
    { href: '/proekty', label: 'Проекты' },
    { href: '/karta-obektov', label: 'Карта объектов' },
    { href: '/o-kompanii', label: 'О компании' },
    { href: '/kontakty', label: 'Контакты' },
  ],
  legal: [
    { href: '/privacy-policy', label: 'Политика конфиденциальности' },
    { href: '/terms', label: 'Пользовательское соглашение' },
    { href: '/portal', label: 'Портал исполнителей' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0d101c] text-white">
      <div className="container mx-auto px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.7fr_0.7fr_0.9fr]">
          <div>
            <Link href="/" className="flex items-center gap-3" aria-label="ЕМ-ПСП — главная">
              <span className="relative grid h-12 w-12 place-items-center border border-white/14 bg-white/[0.04]">
                <Image src="/brand/logo-icon-white.svg" alt="" width={34} height={34} className="h-8 w-8 object-contain" />
              </span>
              <span>
                <span className="block font-brand text-[22px] font-black leading-none tracking-[0.03em]">ЕМ-ПСП</span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Engineering · Project · Construction
                </span>
              </span>
            </Link>
            <p className="mt-7 max-w-[420px] text-[14px] leading-[1.8] text-white/56">
              Проектирование, инженерные сети, строительство, экспертиза и авторский надзор для объектов, где важны документы, сроки и ответственность.
            </p>
            <div className="mt-7 grid gap-2 text-[12px] font-semibold text-white/46">
              <span>СРО П-174-007801724375-3773</span>
              <span>СРО И-037-007801724375-1897</span>
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
              <a href="tel:+79892888980" className="transition-colors hover:text-white">+7 (989) 288-89-80</a>
              <a href="mailto:em-psp@mail.ru" className="transition-colors hover:text-white">em-psp@mail.ru</a>
              <p className="leading-[1.7] text-white/42">
                Краснодар, ул. Коммунаров 76, офис 382/9
              </p>
            </div>
            <Link href="/#contact" className="btn btn-primary mt-7">
              Обсудить проект
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col gap-3 px-5 py-5 text-[12px] text-white/34 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>© {currentYear} ООО «ЕМ-ПолиСпецПроект». ИНН 7801724375</div>
          <div>ISO 9001 · ISO 14001 · ISO 45001</div>
        </div>
      </div>
    </footer>
  )
}
