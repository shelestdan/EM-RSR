'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

// Rate limiting: track attempts in sessionStorage
const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 min

function getRateLimitState() {
  if (typeof window === 'undefined') return { attempts: 0, lockedUntil: 0 }
  const stored = sessionStorage.getItem('portal_rl')
  if (!stored) return { attempts: 0, lockedUntil: 0 }
  return JSON.parse(stored)
}

function setRateLimitState(state: { attempts: number; lockedUntil: number }) {
  sessionStorage.setItem('portal_rl', JSON.stringify(state))
}

export default function PortalLoginPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'locked'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [lockRemaining, setLockRemaining] = useState(0)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  // Check lockout on mount and start countdown
  useEffect(() => {
    const { lockedUntil } = getRateLimitState()
    if (lockedUntil > Date.now()) {
      setStatus('locked')
      const interval = setInterval(() => {
        const remaining = Math.ceil((lockedUntil - Date.now()) / 1000)
        setLockRemaining(remaining)
        if (remaining <= 0) {
          clearInterval(interval)
          setStatus('idle')
          setRateLimitState({ attempts: 0, lockedUntil: 0 })
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const rl = getRateLimitState()
    if (rl.lockedUntil > Date.now()) {
      setStatus('locked')
      return
    }

    const email = emailRef.current?.value.trim() || ''
    const password = passwordRef.current?.value || ''

    if (!email || !password) {
      setErrorMsg('Введите логин и пароль')
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/portal-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        // Reset rate limit on success
        setRateLimitState({ attempts: 0, lockedUntil: 0 })
        router.push('/portal/dashboard')
      } else {
        const newAttempts = rl.attempts + 1
        if (newAttempts >= MAX_ATTEMPTS) {
          const lockedUntil = Date.now() + LOCKOUT_DURATION
          setRateLimitState({ attempts: newAttempts, lockedUntil })
          setStatus('locked')
          setLockRemaining(LOCKOUT_DURATION / 1000)
        } else {
          setRateLimitState({ attempts: newAttempts, lockedUntil: 0 })
          const remaining = MAX_ATTEMPTS - newAttempts
          setErrorMsg(
            `Неверный логин или пароль. Осталось попыток: ${remaining}`
          )
          setStatus('error')
        }
      }
    } catch {
      setErrorMsg('Ошибка подключения. Попробуйте позже.')
      setStatus('error')
    }
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-[#121625] px-5 py-10">
      <div className="absolute inset-0 eng-grid-overlay opacity-70" aria-hidden="true" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="relative grid h-20 w-20 place-items-center border border-white/30 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <Image
                src={`${BASE}/brand/logo-icon.png`}
                alt="EM-PCP"
                width={58}
                height={58}
                className="h-14 w-14 object-contain"
              />
            </div>
          </div>
          <div className="font-brand text-3xl font-black leading-tight text-white">Портал исполнителей</div>
          <div className="mt-2 text-sm text-white/46">Закрытый доступ к рабочим материалам ЕМ-ПСП</div>
        </div>

        <div className="border border-white/12 bg-white/[0.055] p-7 backdrop-blur-xl sm:p-8">
          {status === 'locked' ? (
            <div className="text-center py-6">
              <h2 className="mb-2 font-brand text-2xl font-black text-white">Доступ временно закрыт</h2>
              <p className="text-sm leading-[1.7] text-white/62">
                Превышено количество попыток входа. Попробуйте через{' '}
                <span className="text-white font-mono">
                  {Math.floor(lockRemaining / 60)}:{String(lockRemaining % 60).padStart(2, '0')}
                </span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-white/56">
                    Email / Логин
                  </label>
                  <input
                    ref={emailRef}
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="field-input-dark"
                    placeholder="login@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-white/56">
                    Пароль
                  </label>
                  <input
                    ref={passwordRef}
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="field-input-dark"
                    placeholder="••••••••"
                  />
                </div>

                {status === 'error' && (
                  <div className="border border-[#ffb0a9]/30 bg-[#ffb0a9]/10 px-3 py-2 text-xs text-[#ffb0a9]">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn btn-primary w-full disabled:pointer-events-none disabled:opacity-60"
                >
                  {status === 'loading' ? 'Проверка' : 'Войти'}
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-white/28">
          Сессия автоматически завершается через 45 минут неактивности
        </p>
      </div>
    </div>
  )
}
