import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — ЕМ-ПСП',
  description: 'Политика обработки персональных данных ООО «ЕМ-ПолиСпецПроект» в соответствии с ФЗ-152.',
  robots: { index: false },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="section-dark relative overflow-hidden pt-32">
        <div className="absolute inset-0 eng-grid-overlay opacity-70" aria-hidden="true" />
        <div className="container relative mx-auto px-5 pb-14 pt-10 sm:px-6 lg:px-8">
          <nav className="mb-10 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/36" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/70">Главная</Link>
            <span>/</span>
            <span className="text-white/62">Политика конфиденциальности</span>
          </nav>
          <p className="overline-light mb-5">152-ФЗ</p>
          <h1 className="page-title max-w-[900px]">
            Политика конфиденциальности
          </h1>
          <p className="body-large body-large-light mt-7 max-w-[720px]">
            Порядок обработки персональных данных пользователей сайта ООО «ЕМ-ПолиСпецПроект».
          </p>
        </div>
      </section>

      <section className="section section-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[820px]">
            <p className="mb-10 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#626675]">
              Редакция от 2025 года
            </p>

            <article className="legal-prose">
              <h2>1. Общие положения</h2>
              <p>
                Настоящая Политика конфиденциальности определяет порядок обработки персональных данных
                пользователей сайта ООО «ЕМ-ПолиСпецПроект» (далее — Оператор) в соответствии с
                требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных».
              </p>

              <h2>2. Оператор персональных данных</h2>
              <ul>
                <li>Наименование: ООО «ЕМ-ПолиСпецПроект»</li>
                <li>ИНН: 7801724375 / ОГРН: 1237800071948</li>
                <li>Адрес: 350000, г. Краснодар, ул. Коммунаров 76, оф. 382/9</li>
                <li>Email: em-psp@mail.ru</li>
                <li>Телефон: +7 (989) 288-89-80</li>
              </ul>

              <h2>3. Категории персональных данных</h2>
              <p>Оператор обрабатывает следующие персональные данные:</p>
              <ul>
                <li>Фамилия, имя, отчество</li>
                <li>Номер телефона</li>
                <li>Адрес электронной почты</li>
                <li>Наименование организации</li>
                <li>IP-адрес и данные об устройстве (технические данные)</li>
              </ul>

              <h2>4. Цели обработки</h2>
              <ul>
                <li>Обработка входящих заявок и обращений</li>
                <li>Ответы на запросы пользователей</li>
                <li>Выполнение договорных обязательств</li>
                <li>Соблюдение требований законодательства РФ</li>
              </ul>

              <h2>5. Правовые основания</h2>
              <p>
                Обработка персональных данных осуществляется на основании согласия субъекта персональных
                данных (ст. 6 ч. 1 п. 1 ФЗ-152) и в целях исполнения договора.
              </p>

              <h2>6. Хранение и защита данных</h2>
              <p>
                Персональные данные хранятся на серверах, расположенных на территории Российской Федерации.
                Применяются технические и организационные меры защиты данных от несанкционированного доступа.
              </p>

              <h2>7. Передача третьим лицам</h2>
              <p>
                Персональные данные не передаются третьим лицам без согласия субъекта, за исключением
                случаев, предусмотренных законодательством РФ.
              </p>

              <h2>8. Права субъектов</h2>
              <p>Вы имеете право:</p>
              <ul>
                <li>Получить информацию об обработке ваших данных</li>
                <li>Потребовать уточнения, блокирования или уничтожения данных</li>
                <li>Отозвать согласие на обработку персональных данных</li>
              </ul>
              <p>
                Запросы направляйте на email:{' '}
                <a href="mailto:em-psp@mail.ru" className="text-[#3E5854] underline underline-offset-4 hover:text-[#23273F]">
                  em-psp@mail.ru
                </a>
              </p>

              <h2>9. Cookies и аналитика</h2>
              <p>
                Сайт использует Яндекс.Метрику для анализа статистики посещений. Данный сервис соответствует
                требованиям законодательства РФ об обработке персональных данных.
              </p>

              <h2>10. Изменения политики</h2>
              <p>
                Оператор оставляет за собой право вносить изменения в настоящую Политику. Актуальная версия
                всегда доступна по адресу{' '}
                <Link href="/privacy-policy" className="text-[#3E5854] underline underline-offset-4 hover:text-[#23273F]">
                  em-psp.ru/privacy-policy
                </Link>.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
