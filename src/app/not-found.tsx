import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { brand } from '@/lib/site-data'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Страница не найдена',
  description:
    'Страница не найдена. Перейдите на главную, к услугам, объектам, информации о компании или контактам ЕМ-ПСП.',
  path: '/404',
  noIndex: true,
})

const links = [
  { href: '/', label: 'Главная', note: 'Обзор компании' },
  { href: '/uslugi', label: 'Услуги', note: 'Состав работ' },
  { href: '/proekty', label: 'География и объекты', note: 'Карта объектов' },
  { href: '/o-kompanii', label: 'О компании', note: 'СРО и ISO' },
  { href: '/kontakty', label: 'Контакты', note: 'Связаться' },
]

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M2.5 7h9M8.5 3 12 7l-3.5 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="section-dark relative min-h-svh overflow-hidden pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
          <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#8ab0a3]">
                  Ошибка 404
                </p>
                <h1
                  className="mt-7 max-w-[720px] font-brand font-black text-white"
                  style={{ fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 0.95 }}
                >
                  Страница не найдена
                </h1>
                <p className="mt-8 max-w-[620px] text-[15px] leading-[1.8] text-white/58 sm:text-[17px]">
                  Адрес мог измениться или быть введён с ошибкой. Верхнее меню работает — можно сразу перейти в нужный раздел.
                </p>
              </div>

              <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex min-h-[126px] flex-col justify-between bg-white/[0.035] p-6 transition-colors hover:bg-[#3E5854]/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8ab0a3]"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/36">
                      {link.note}
                    </span>
                    <span className="mt-7 flex items-center justify-between gap-4">
                      <span className="font-brand text-[20px] font-black leading-[1.12] text-white">
                        {link.label}
                      </span>
                      <span className="text-[#8ab0a3] transition-transform group-hover:translate-x-1">
                        <Arrow />
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-[13px] font-semibold text-white/50 sm:flex-row sm:items-center sm:justify-between">
              <a href={brand.phoneHref} className="transition-colors hover:text-white">
                {brand.phone}
              </a>
              <a href={brand.emailHref} className="transition-colors hover:text-white">
                {brand.email}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
