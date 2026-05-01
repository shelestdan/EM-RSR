'use client'

import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'

interface CertificatePreviewCardProps {
  title: string
  sublabel: string
  pdfUrl: string
  previewUrl: string
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M3 7h8M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function CertificatePreviewCard({
  title,
  sublabel,
  pdfUrl,
  previewUrl,
}: CertificatePreviewCardProps) {
  const [open, setOpen] = useState(false)
  const titleId = useId()

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <article className="group flex h-full flex-col bg-white p-7 transition-colors duration-300 hover:bg-[#f6f5f1] sm:p-8">
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-brand text-[18px] font-black leading-tight text-[#23273F]">
              {title}
            </h3>
            <p className="mt-2 text-[13px] leading-[1.65] text-[#626675]">{sublabel}</p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="shrink-0 w-[72px] overflow-hidden border border-[#d9d6cb] bg-white shadow-sm transition-shadow duration-300 group-hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3E5854]"
            aria-label={`Посмотреть сертификат ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt={`Сертификат ${title}, первая страница`}
              width={144}
              height={204}
              className="block h-auto w-full"
              loading="lazy"
            />
          </button>
        </div>

        <div className="mt-auto flex flex-nowrap items-center justify-between gap-3 pt-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group/open flex min-w-0 items-center gap-2 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.12em] text-[#3E5854] transition-colors hover:text-[#23273F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3E5854]"
          >
            <span className="min-w-0">Открыть сертификат</span>
            <span className="shrink-0 transition-transform duration-200 group-hover/open:translate-x-1">
              <Arrow />
            </span>
          </button>
          <a
            href={pdfUrl}
            download
            className="inline-flex shrink-0 items-center justify-center border border-[#d9d6cb] px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#23273F] transition-colors hover:border-[#3E5854] hover:text-[#3E5854] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3E5854]"
          >
            Скачать
          </a>
        </div>
      </article>

      {open && createPortal(
        <div
          className="fixed inset-0 z-[220] overflow-y-auto bg-[#0d101c]/78 px-4 py-5 sm:px-6 sm:py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false)
          }}
        >
          <div className="relative mx-auto flex min-h-[calc(100svh-40px)] w-full flex-col items-center justify-center gap-4">
            <div className="flex min-h-[calc(100svh-40px)] w-full max-w-[760px] items-center justify-center bg-[#f6f5f1] p-3 sm:p-5 lg:fixed lg:left-1/2 lg:top-1/2 lg:h-[calc(100svh-64px)] lg:min-h-0 lg:-translate-x-1/2 lg:-translate-y-1/2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt={`Увеличенный сертификат ${title}`}
                width={1191}
                height={1684}
                className="block max-h-[calc(100svh-80px)] w-auto max-w-full border border-[#d9d6cb] bg-white shadow-[0_22px_70px_rgba(0,0,0,0.28)]"
              />
            </div>

            <aside className="w-full bg-white p-5 shadow-[0_22px_70px_rgba(0,0,0,0.24)] sm:w-[300px] lg:fixed lg:right-8 lg:top-8 lg:w-[260px]">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="ml-auto grid h-10 w-10 place-items-center border border-[#d9d6cb] text-[24px] leading-none text-[#23273F] transition-colors hover:border-[#3E5854] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3E5854]"
                aria-label="Закрыть просмотр сертификата"
              >
                ×
              </button>

              <h2 id={titleId} className="mt-5 font-brand text-[20px] font-black leading-tight text-[#23273F]">
                {title}
              </h2>
              <p className="mt-2 text-[13px] leading-[1.65] text-[#626675]">{sublabel}</p>

              <div className="mt-8 grid gap-3">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#3E5854] px-5 py-4 text-[10px] font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#23273F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3E5854]"
                >
                  Открыть PDF <Arrow />
                </a>
                <a
                  href={pdfUrl}
                  download
                  className="inline-flex items-center justify-center border border-[#d9d6cb] px-5 py-4 text-[10px] font-black uppercase tracking-[0.14em] text-[#23273F] transition-colors hover:border-[#3E5854] hover:text-[#3E5854] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3E5854]"
                >
                  Скачать
                </a>
              </div>
            </aside>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
