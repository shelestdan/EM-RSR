'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

interface LeadFormProps {
  source?: string
  className?: string
  dark?: boolean
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

// ─── Phone mask ─────────────────────────────────────────────
// Formats to +7 (XXX) XXX-XX-XX as user types
function applyPhoneMask(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  // Strip leading 7 or 8 (Russia)
  const local =
    digits.startsWith('7') ? digits.slice(1)
    : digits.startsWith('8') ? digits.slice(1)
    : digits
  const d = local.slice(0, 10)
  if (!d.length) return ''
  let o = '+7 ('
  o += d.slice(0, 3)
  if (d.length >= 3) o += ') '
  if (d.length > 3) o += d.slice(3, 6)
  if (d.length >= 6) o += '-'
  if (d.length > 6) o += d.slice(6, 8)
  if (d.length >= 8) o += '-'
  if (d.length > 8) o += d.slice(8, 10)
  return o
}

function getPhoneDigits(masked: string): string {
  return masked.replace(/\D/g, '')
}

// ─── Field validators ────────────────────────────────────────
const namePattern = /^[A-Za-zА-Яа-яЁё\s.'-]+$/

function validateField(name: string, value: string | boolean): string {
  if (name === 'name') {
    const v = value as string
    if (v.trim().length < 2) return 'Минимум 2 символа'
    if (v.length > 80) return 'Имя слишком длинное'
    if (!namePattern.test(v)) return 'Только буквы, пробелы и дефис'
    return ''
  }
  if (name === 'company') {
    if ((value as string).length > 120) return 'Максимум 120 символов'
    return ''
  }
  if (name === 'phone') {
    const d = getPhoneDigits(value as string)
    if (!d.length) return 'Укажите номер телефона'
    if (d.length < 11) return 'Номер неполный — нужен формат +7 (XXX) XXX-XX-XX'
    return ''
  }
  if (name === 'email') {
    const v = (value as string).trim()
    if (!v) return '' // optional
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Формат: name@company.ru'
    return ''
  }
  if (name === 'message') {
    const v = (value as string).trim()
    if (v.length < 10) return 'Минимум 10 символов — опишите задачу'
    if (v.length > 1200) return 'Максимум 1200 символов'
    return ''
  }
  if (name === 'consent') {
    if (!value) return 'Необходимо согласие на обработку данных'
    return ''
  }
  return ''
}

function validateAll(payload: {
  name: string; company: string; phone: string
  email: string; message: string; consent: boolean
}): Record<string, string> {
  const out: Record<string, string> = {}
  const fields: [string, string | boolean][] = [
    ['name', payload.name],
    ['company', payload.company],
    ['phone', payload.phone],
    ['email', payload.email],
    ['message', payload.message],
    ['consent', payload.consent],
  ]
  for (const [field, val] of fields) {
    const err = validateField(field, val)
    if (err) out[field] = err
  }
  return out
}

// ─── Sub-components ──────────────────────────────────────────
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M2.5 7l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}

function WarnIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M6.5 1.5 12 11H1L6.5 1.5Z" />
      <path d="M6.5 5v2.5M6.5 9.5v.2" strokeLinecap="round" />
    </svg>
  )
}

// ─── Main component ──────────────────────────────────────────
export default function LeadForm({ source = 'website', className = '', dark = false }: LeadFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [phoneValue, setPhoneValue] = useState('')
  const [messageLen, setMessageLen] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)
  const idP = `lead-${source.replace(/[^a-z0-9_-]/gi, '-')}`

  function clearError(name: string) {
    setErrors(cur => {
      if (!cur[name]) return cur
      const next = { ...cur }
      delete next[name]
      return next
    })
  }

  function touchField(name: string, value: string | boolean) {
    setTouched(t => ({ ...t, [name]: true }))
    const err = validateField(name, value)
    setErrors(e => {
      const next = { ...e }
      if (err) next[name] = err
      else delete next[name]
      return next
    })
  }

  function setPhone(masked: string) {
    setPhoneValue(masked)
    if (touched.phone) {
      const err = validateField('phone', masked)
      setErrors(es => {
        const next = { ...es }
        if (err) next.phone = err
        else delete next.phone
        return next
      })
    } else {
      clearError('phone')
    }
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    // onChange only fires when keyDown didn't preventDefault (printable chars)
    const raw = e.target.value
    if (!raw) { setPhone(''); return }
    setPhone(applyPhoneMask(raw))
  }

  function handlePhoneKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // Ctrl/Cmd+A — let browser handle selection
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') return

    if (e.key === 'Delete') {
      // Delete key → wipe everything
      e.preventDefault()
      setPhone('')
      return
    }

    if (e.key === 'Backspace') {
      e.preventDefault()
      const digits = getPhoneDigits(phoneValue)
      // digits includes leading '7' prefix, e.g. '79892888980'
      if (digits.length <= 1) {
        // Only '7' or empty — clear
        setPhone('')
      } else {
        // Strip last digit, keep leading '7', rebuild mask
        const withoutLast = digits.slice(0, -1)
        setPhone(applyPhoneMask(withoutLast))
      }
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = formRef.current
    if (!form) return

    const fd = new FormData(form)
    const payload = {
      name: String(fd.get('name') || '').trim(),
      company: String(fd.get('company') || '').trim(),
      phone: phoneValue,
      email: String(fd.get('email') || '').trim(),
      message: String(fd.get('message') || '').trim(),
      consent: fd.get('consent') === 'on',
      source,
      website: String(fd.get('website') || ''),
    }

    // Honeypot
    if (payload.website) { setStatus('success'); return }

    const errs = validateAll(payload)
    setErrors(errs)
    // Mark all as touched to show all errors
    setTouched({ name: true, company: true, phone: true, email: true, message: true, consent: true })

    if (Object.keys(errs).length > 0) return

    setStatus('loading')
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) { setStatus('error'); return }
      setStatus('success')
      form.reset()
      setPhoneValue('')
      setMessageLen(0)
      setTouched({})
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  // ── Visual helpers ──────────────────────────────────────────
  const isValid = (field: string, value: string | boolean) =>
    touched[field] && !errors[field] && (typeof value === 'boolean' ? value : (value as string).length > 0)

  // Field wrapper styles
  const fieldClass = (name: string, extra = '') => {
    const base = dark
      ? 'w-full min-h-[50px] border rounded-none px-4 py-3.5 text-[14px] leading-[1.4] bg-[#0d101c]/60 text-white placeholder:text-white/24 outline-none transition-all duration-200'
      : 'w-full min-h-[50px] border rounded-none px-4 py-3.5 text-[14px] leading-[1.4] bg-white text-[#171a27] placeholder:text-[#626675]/50 outline-none transition-all duration-200'
    const errState = errors[name]
      ? dark
        ? 'border-[#e05a52] ring-1 ring-[#e05a52]/20'
        : 'border-[#b94b42] ring-1 ring-[#b94b42]/14'
      : touched[name] && !errors[name]
      ? dark
        ? 'border-[#5f8b7d] ring-1 ring-[#5f8b7d]/18'
        : 'border-[#5f8b7d] ring-1 ring-[#5f8b7d]/14'
      : dark
      ? 'border-white/12 focus:border-[#5f8b7d] focus:ring-1 focus:ring-[#5f8b7d]/18'
      : 'border-[#d9d6cb] focus:border-[#5f8b7d] focus:ring-1 focus:ring-[#5f8b7d]/14'
    return `${base} ${errState} ${extra}`
  }

  const labelClass = `mb-2 block text-[10px] font-black uppercase tracking-[0.16em] ${dark ? 'text-white/42' : 'text-[#626675]'}`

  // ── Success state ───────────────────────────────────────────
  if (status === 'success') {
    return (
      <div
        className={`flex flex-col items-start p-8 sm:p-10 ${dark ? 'border border-white/10 bg-[#0d101c]/60' : 'border border-[#d9d6cb] bg-white'} ${className}`}
        role="status"
      >
        <div className="mb-6 grid h-12 w-12 place-items-center bg-[#3E5854] text-white">
          <CheckIcon />
        </div>
        <h3 className={`font-brand text-[22px] font-black leading-tight ${dark ? 'text-white' : 'text-[#23273F]'}`}>
          Заявка принята
        </h3>
        <p className={`mt-4 text-[15px] leading-[1.75] ${dark ? 'text-white/56' : 'text-[#626675]'}`}>
          Изучим вводные и свяжемся, чтобы уточнить состав работ, сроки и формат оценки.
        </p>
        <button
          className={`mt-8 text-[11px] font-black uppercase tracking-[0.14em] underline underline-offset-4 transition-opacity hover:opacity-70 ${dark ? 'text-white/50' : 'text-[#3E5854]'}`}
          onClick={() => setStatus('idle')}
        >
          Отправить ещё одну
        </button>
      </div>
    )
  }

  // ── Form ────────────────────────────────────────────────────
  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className={className}>
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Row 1: Имя + Компания */}
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {/* Имя */}
        <div>
          <label htmlFor={`${idP}-name`} className={labelClass}>
            Имя <span className={dark ? 'text-[#5f8b7d]' : 'text-[#3E5854]'}>*</span>
          </label>
          <div className="relative">
            <input
              id={`${idP}-name`}
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={80}
              placeholder="Иван Петров"
              className={fieldClass('name', isValid('name', formRef.current?.querySelector<HTMLInputElement>('[name=name]')?.value ?? '') ? 'pr-10' : '')}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${idP}-name-err` : undefined}
              onChange={(e) => { if (touched.name) touchField('name', e.target.value); else clearError('name') }}
              onBlur={(e) => touchField('name', e.target.value)}
            />
          </div>
          {errors.name && touched.name && (
            <p id={`${idP}-name-err`} className={`mt-1.5 flex items-center gap-1.5 text-[11px] leading-tight ${dark ? 'text-[#ffb0a9]' : 'text-[#b94b42]'}`} role="alert">
              <WarnIcon />{errors.name}
            </p>
          )}
        </div>

        {/* Компания */}
        <div>
          <label htmlFor={`${idP}-company`} className={labelClass}>Компания</label>
          <input
            id={`${idP}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={120}
            placeholder="ООО «Название»"
            className={fieldClass('company')}
            aria-invalid={!!errors.company}
            onChange={(e) => { if (touched.company) touchField('company', e.target.value); else clearError('company') }}
            onBlur={(e) => touchField('company', e.target.value)}
          />
          {errors.company && touched.company && (
            <p id={`${idP}-company-err`} className={`mt-1.5 flex items-center gap-1.5 text-[11px] leading-tight ${dark ? 'text-[#ffb0a9]' : 'text-[#b94b42]'}`} role="alert">
              <WarnIcon />{errors.company}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Телефон + Email */}
      <div className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-5">
        {/* Телефон */}
        <div>
          <label htmlFor={`${idP}-phone`} className={labelClass}>
            Телефон <span className={dark ? 'text-[#5f8b7d]' : 'text-[#3E5854]'}>*</span>
          </label>
          <div className="relative">
            <input
              id={`${idP}-phone`}
              name="phone-display"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              value={phoneValue}
              placeholder="+7 (___) ___-__-__"
              className={fieldClass('phone')}
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? `${idP}-phone-err` : `${idP}-phone-hint`}
              onChange={handlePhoneChange}
              onKeyDown={handlePhoneKeyDown}
              onBlur={() => touchField('phone', phoneValue)}
            />
            {/* Show check when phone complete */}
            {getPhoneDigits(phoneValue).length === 11 && !errors.phone && (
              <span className={`pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 ${dark ? 'text-[#5f8b7d]' : 'text-[#3E5854]'}`}>
                <CheckIcon />
              </span>
            )}
          </div>
          {errors.phone && touched.phone ? (
            <p id={`${idP}-phone-err`} className={`mt-1.5 flex items-center gap-1.5 text-[11px] leading-tight ${dark ? 'text-[#ffb0a9]' : 'text-[#b94b42]'}`} role="alert">
              <WarnIcon />{errors.phone}
            </p>
          ) : (
            <p id={`${idP}-phone-hint`} className={`mt-1.5 text-[10px] ${dark ? 'text-white/26' : 'text-[#626675]/70'}`}>
              Формат: +7 (XXX) XXX-XX-XX
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor={`${idP}-email`} className={labelClass}>
            Email <span className={dark ? 'text-white/28' : 'text-[#626675]/60'}>— необязательно</span>
          </label>
          <input
            id={`${idP}-email`}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={120}
            placeholder="name@company.ru"
            className={fieldClass('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${idP}-email-err` : undefined}
            onChange={(e) => { if (touched.email) touchField('email', e.target.value); else clearError('email') }}
            onBlur={(e) => touchField('email', e.target.value)}
          />
          {errors.email && touched.email && (
            <p id={`${idP}-email-err`} className={`mt-1.5 flex items-center gap-1.5 text-[11px] leading-tight ${dark ? 'text-[#ffb0a9]' : 'text-[#b94b42]'}`} role="alert">
              <WarnIcon />{errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Row 3: Сообщение */}
      <div className="mt-4 sm:mt-5">
        <div className="mb-2 flex items-end justify-between">
          <label htmlFor={`${idP}-message`} className={labelClass + ' mb-0'}>
            Задача <span className={dark ? 'text-[#5f8b7d]' : 'text-[#3E5854]'}>*</span>
          </label>
          <span className={`text-[10px] tabular-nums transition-colors ${
            messageLen > 1100
              ? dark ? 'text-[#ffb0a9]' : 'text-[#b94b42]'
              : dark ? 'text-white/24' : 'text-[#626675]/50'
          }`}>
            {messageLen}/1200
          </span>
        </div>
        <textarea
          id={`${idP}-message`}
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={1200}
          placeholder="Коротко опишите объект, стадию работ и что нужно получить в результате"
          className={`${fieldClass('message', 'resize-none')} leading-[1.7]`}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${idP}-message-err` : undefined}
          onChange={(e) => {
            setMessageLen(e.target.value.length)
            if (touched.message) touchField('message', e.target.value)
            else clearError('message')
          }}
          onBlur={(e) => touchField('message', e.target.value)}
        />
        {errors.message && touched.message && (
          <p id={`${idP}-message-err`} className={`mt-1.5 flex items-center gap-1.5 text-[11px] leading-tight ${dark ? 'text-[#ffb0a9]' : 'text-[#b94b42]'}`} role="alert">
            <WarnIcon />{errors.message}
          </p>
        )}
      </div>

      {/* File upload — optional */}
      <div className="mt-4 sm:mt-5">
        <label className={labelClass}>
          Прикрепите ТЗ или исходные данные{' '}
          <span className={dark ? 'text-white/28' : 'text-[#626675]/60'}>— необязательно</span>
        </label>
        <div className={`border p-4 transition-colors ${dark ? 'border-white/12 bg-[#0d101c]/60' : 'border-[#d9d6cb] bg-white'}`}>
          <label className="flex cursor-pointer items-center gap-3 group">
            <span className={`inline-flex items-center gap-2 border px-4 py-2 text-[11px] font-black uppercase tracking-[0.12em] transition-colors ${dark ? 'border-white/20 text-white/60 group-hover:border-white/40 group-hover:text-white' : 'border-[#d9d6cb] text-[#626675] group-hover:border-[#3E5854] group-hover:text-[#23273F]'}`}>
              <UploadIcon /> Загрузить файл
            </span>
            <span
              id={`${idP}-file-label`}
              className={`truncate max-w-[200px] text-[12px] ${dark ? 'text-white/38' : 'text-[#626675]'}`}
            >
              Файл не выбран
            </span>
            <input
              id={`${idP}-file`}
              name="file"
              type="file"
              accept=".pdf,.doc,.docx,.dwg,.xlsx,.xls,.jpg,.jpeg,.png,.zip"
              className="sr-only"
              onChange={(e) => {
                const el = document.getElementById(`${idP}-file-label`)
                if (el) el.textContent = e.target.files?.[0]?.name ?? 'Файл не выбран'
              }}
            />
          </label>
          <p className={`mt-2 text-[10px] ${dark ? 'text-white/26' : 'text-[#626675]/70'}`}>
            PDF, DOC, DWG, XLS, JPG, ZIP — до 20 МБ
          </p>
        </div>
      </div>

      {/* Consent */}
      <div className={`mt-5 border p-4 sm:p-5 transition-colors ${
        errors.consent && touched.consent
          ? dark ? 'border-[#e05a52]/60' : 'border-[#b94b42]'
          : dark ? 'border-white/10 bg-white/[0.03]' : 'border-[#d9d6cb] bg-[#f6f5f1]/60'
      }`}>
        <label className="flex cursor-pointer items-start gap-3.5">
          <input
            type="checkbox"
            name="consent"
            className={`checkbox-custom mt-0.5 shrink-0${dark ? ' checkbox-custom-dark' : ''}${errors.consent && touched.consent ? ' error' : ''}`}
            aria-required="true"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? `${idP}-consent-err` : undefined}
            onChange={(e) => {
              clearError('consent')
              if (touched.consent) touchField('consent', e.target.checked)
            }}
            onBlur={(e) => touchField('consent', e.target.checked)}
          />
          <span className={`text-[12px] leading-[1.65] ${dark ? 'text-white/44' : 'text-[#626675]'}`}>
            Я согласен на{' '}
            <Link
              href="/privacy-policy"
              target="_blank"
              className={`underline underline-offset-4 transition-colors ${dark ? 'hover:text-white' : 'hover:text-[#3E5854]'}`}
            >
              обработку персональных данных
            </Link>{' '}
            и понимаю, что заявка используется только для ответа по проекту.
          </span>
        </label>
        {errors.consent && touched.consent && (
          <p id={`${idP}-consent-err`} className={`mt-2 flex items-center gap-1.5 text-[11px] leading-tight ${dark ? 'text-[#ffb0a9]' : 'text-[#b94b42]'}`} role="alert">
            <WarnIcon />{errors.consent}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn btn-primary min-h-[52px] px-8 disabled:pointer-events-none disabled:opacity-60"
        >
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Отправка…
            </span>
          ) : 'Отправить заявку'}
        </button>

        {status === 'error' && (
          <p className={`flex items-center gap-2 text-[12px] leading-tight ${dark ? 'text-[#ffb0a9]' : 'text-[#b94b42]'}`} role="alert">
            <WarnIcon />
            Ошибка отправки — позвоните:{' '}
            <a href="tel:+79892888980" className="font-semibold underline">
              +7 (989) 288-89-80
            </a>
          </p>
        )}
      </div>
    </form>
  )
}
