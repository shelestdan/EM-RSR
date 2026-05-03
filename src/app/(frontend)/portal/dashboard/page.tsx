'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const INACTIVITY_LIMIT = 45 * 60 * 1000 // 45 min
const SESSION_REFRESH_INTERVAL = 5 * 60 * 1000

interface PortalLink {
  id: string
  title: string
  url: string
  description?: string
  category: string
}

const CATEGORY_LABELS: Record<string, string> = {
  project_docs: 'Проектная документация',
  working_docs: 'Рабочая документация',
  estimates: 'Сметы',
  contracts: 'Акты и договоры',
  photos: 'Фотоматериалы',
  general: 'Общее',
}

export default function PortalDashboard() {
  const router = useRouter()
  const [links, setLinks] = useState<PortalLink[]>([])
  const [loading, setLoading] = useState(true)
  const [lastActivity, setLastActivity] = useState(Date.now())
  const [timeoutWarning, setTimeoutWarning] = useState(false)
  const lastRefreshRef = useRef(Date.now())

  const logout = useCallback(async () => {
    await fetch('/api/portal-login', { method: 'DELETE' })
    router.push('/portal')
  }, [router])

  const refreshSession = useCallback(async () => {
    const res = await fetch('/api/portal-session', { cache: 'no-store' })
    if (res.status === 401) {
      await logout()
    }
  }, [logout])

  // Activity tracking for 45-min timeout
  useEffect(() => {
    const resetActivity = () => {
      const now = Date.now()
      setLastActivity(now)
      setTimeoutWarning(false)

      if (now - lastRefreshRef.current >= SESSION_REFRESH_INTERVAL) {
        lastRefreshRef.current = now
        void refreshSession()
      }
    }

    const events = ['mousemove', 'keydown', 'click', 'touchstart', 'scroll']
    events.forEach((ev) => window.addEventListener(ev, resetActivity, { passive: true }))

    const check = setInterval(() => {
      const elapsed = Date.now() - lastActivity
      if (elapsed >= INACTIVITY_LIMIT) {
        logout()
      } else if (elapsed >= INACTIVITY_LIMIT - 5 * 60 * 1000) {
        setTimeoutWarning(true)
      }
    }, 60 * 1000)

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, resetActivity))
      clearInterval(check)
    }
  }, [lastActivity, logout, refreshSession])

  // Fetch links
  useEffect(() => {
    async function fetchLinks() {
      try {
        const res = await fetch('/api/portal-links')
        if (res.status === 401) {
          router.push('/portal')
          return
        }
        if (res.ok) {
          const data = await res.json()
          setLinks(data.docs || [])
        }
      } catch {
        router.push('/portal')
      } finally {
        setLoading(false)
      }
    }
    fetchLinks()
  }, [router])

  // Group links by category
  const grouped = links.reduce<Record<string, PortalLink[]>>((acc, link) => {
    const cat = link.category || 'general'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(link)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-[#121625]">
      <div className="border-b border-white/10 bg-[#0d101c] px-5 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative grid h-12 w-12 place-items-center border border-white/30 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.24)]">
              <Image src={`${BASE}/brand/logo-icon.png`} alt="EM-PCP" width={36} height={36} className="h-9 w-9 object-contain" />
            </div>
            <div>
              <div className="font-brand text-sm font-black text-white">Портал исполнителей</div>
              <div className="text-white/30 text-xs">ЕМ–ПСП</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="text-white/50 hover:text-white text-xs flex items-center gap-1.5 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Выйти
          </button>
        </div>
      </div>

      {timeoutWarning && (
        <div className="border-b border-[#a37f5c]/40 bg-[#a37f5c]/12 px-6 py-3 text-center">
          <p className="text-sm text-[#e4c29f]">
            Сессия завершится через 5 минут из-за неактивности. Совершите любое действие для продления.
          </p>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="font-brand mb-2 text-3xl font-black text-white">Документы и материалы</h1>
        <p className="text-white/40 text-sm mb-8">
          Папки Synology Drive с документацией по объектам
        </p>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-white/30 animate-pulse">Загрузка...</div>
          </div>
        ) : links.length === 0 ? (
          <div className="border border-white/10 bg-white/[0.035] py-16 text-center text-white/38">
            <p>Документы не добавлены</p>
            <p className="text-sm mt-1 text-white/20">Администратор не добавил ссылки на папки</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([category, catLinks]) => (
              <div key={category}>
                <h2 className="text-xs text-white/40 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                  {CATEGORY_LABELS[category] || category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {catLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 border border-white/10 bg-white/[0.045] p-4 transition-all hover:border-[#5f8b7d]/50 hover:bg-white/[0.08]"
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center bg-[#3E5854]/24 transition-colors group-hover:bg-[#3E5854]/38">
                        <svg className="w-4 h-4 text-[#8ab0a3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-white text-sm font-medium truncate">{link.title}</div>
                        {link.description && (
                          <div className="text-white/40 text-xs mt-0.5 truncate">{link.description}</div>
                        )}
                        <div className="text-[#8ab0a3] text-xs mt-1 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Открыть в Synology Drive
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
