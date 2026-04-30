import type { Metadata } from 'next'
import Link from 'next/link'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Пользовательское соглашение',
    description: 'Пользовательское соглашение сайта ЕМ-ПСП.',
    path: '/terms',
    noIndex: true,
  }),
  title: 'Пользовательское соглашение',
}

export default function TermsPage() {
  return (
    <>
      <section className="section-dark relative overflow-hidden pt-32">
        <div className="absolute inset-0 eng-grid-overlay opacity-70" aria-hidden="true" />
        <div className="container relative mx-auto px-5 pb-14 pt-10 sm:px-6 lg:px-8">
          <nav className="mb-10 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/36" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/70">Главная</Link>
            <span>/</span>
            <span className="text-white/62">Пользовательское соглашение</span>
          </nav>
          <p className="overline-light mb-5">Документ</p>
          <h1 className="page-title max-w-[900px]">
            Пользовательское соглашение
          </h1>
        </div>
      </section>

      <section className="section section-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[820px]">
            <p className="mb-10 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#626675]">
              Редакция 2025 года
            </p>

            <article className="legal-prose">
              <h2>1. Принятие условий</h2>
              <p>
                Используя данный сайт, вы принимаете условия настоящего соглашения. Если вы не согласны
                с условиями, прекратите использование сайта.
              </p>

              <h2>2. Описание услуг</h2>
              <p>
                Сайт em-pcp.ru предоставляет информацию об услугах ООО «ЕМ-ПолиСпецПроект» и возможность
                оставить заявку на коммерческое предложение.
              </p>

              <h2>3. Интеллектуальная собственность</h2>
              <p>
                Все материалы сайта (тексты, логотипы, изображения, видео) являются собственностью
                ООО «ЕМ-ПолиСпецПроект». Воспроизведение без письменного согласия запрещено.
              </p>

              <h2>4. Ограничение ответственности</h2>
              <p>
                Сайт предоставляется «как есть». Оператор не несёт ответственности за точность
                коммерческой информации — для получения актуальных данных обращайтесь напрямую.
              </p>

              <h2>5. Применимое право</h2>
              <p>
                Настоящее соглашение регулируется законодательством Российской Федерации.
                Споры рассматриваются в судах РФ по месту нахождения Оператора.
              </p>

              <h2>Контакты</h2>
              <p>
                ООО «ЕМ-ПолиСпецПроект» / ИНН 7801724375
              </p>
              <p>
                Email:{' '}
                <a href="mailto:em-psp@mail.ru" className="text-[#3E5854] underline underline-offset-4 hover:text-[#23273F]">
                  em-psp@mail.ru
                </a>
              </p>
              <p>Телефон: +7 (989) 288-89-80</p>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
