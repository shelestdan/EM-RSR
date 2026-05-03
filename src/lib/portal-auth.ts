import config from '@payload-config'
import type { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

export const PORTAL_COOKIE = 'portal_session'
export const PORTAL_SESSION_SECONDS = 45 * 60
export const PORTAL_MAX_LOGIN_ATTEMPTS = 5
export const PORTAL_LOCK_SECONDS = 15 * 60

type PortalAccessEvent = 'login_success' | 'login_failed' | 'logout' | 'locked_out'

type PortalAuthUser = {
  id: string | number
  collection?: string
  email?: string
  name?: string
  active?: boolean
}

type LoginRateState = {
  attempts: number
  lockedUntil: number
}

const loginRateStore = new Map<string, LoginRateState>()

export async function getPortalPayload() {
  return getPayload({ config })
}

export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

function rateLimitKey(req: NextRequest, email: string): string {
  return `${getClientIp(req)}:${email.toLowerCase()}`
}

export function getPortalLoginLock(req: NextRequest, email: string): number {
  const state = loginRateStore.get(rateLimitKey(req, email))
  if (!state || state.lockedUntil <= Date.now()) return 0
  return Math.ceil((state.lockedUntil - Date.now()) / 1000)
}

export function clearPortalLoginRate(req: NextRequest, email: string) {
  loginRateStore.delete(rateLimitKey(req, email))
}

export function recordPortalLoginFailure(req: NextRequest, email: string): {
  locked: boolean
  remaining: number
  retryAfter: number
} {
  const key = rateLimitKey(req, email)
  const current = loginRateStore.get(key)
  const now = Date.now()

  if (current?.lockedUntil && current.lockedUntil > now) {
    return {
      locked: true,
      remaining: 0,
      retryAfter: Math.ceil((current.lockedUntil - now) / 1000),
    }
  }

  const attempts = (current?.attempts || 0) + 1
  if (attempts >= PORTAL_MAX_LOGIN_ATTEMPTS) {
    const lockedUntil = now + PORTAL_LOCK_SECONDS * 1000
    loginRateStore.set(key, { attempts, lockedUntil })
    return {
      locked: true,
      remaining: 0,
      retryAfter: PORTAL_LOCK_SECONDS,
    }
  }

  loginRateStore.set(key, { attempts, lockedUntil: 0 })
  return {
    locked: false,
    remaining: PORTAL_MAX_LOGIN_ATTEMPTS - attempts,
    retryAfter: 0,
  }
}

export async function logPortalAccess({
  event,
  req,
  userEmail,
}: {
  event: PortalAccessEvent
  req: NextRequest
  userEmail?: string
}) {
  try {
    const payload = await getPortalPayload()
    await payload.create({
      collection: 'portal-access-log',
      data: {
        userEmail,
        ip: getClientIp(req),
        userAgent: req.headers.get('user-agent') || '',
        event,
      },
      overrideAccess: true,
    })
  } catch {
    // Login/logout must not fail because audit write failed.
  }
}

export function setPortalCookie(response: NextResponse, token: string) {
  response.cookies.set(PORTAL_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: PORTAL_SESSION_SECONDS,
    path: '/',
  })
}

export function clearPortalCookie(response: NextResponse) {
  response.cookies.set(PORTAL_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
}

export async function verifyPortalRequest(req: NextRequest): Promise<{
  token: string
  user: PortalAuthUser
} | null> {
  const token = req.cookies.get(PORTAL_COOKIE)?.value
  if (!token) return null

  const payload = await getPortalPayload()
  const headers = new Headers()
  headers.set('Authorization', `JWT ${token}`)

  const result = await payload.auth({
    canSetHeaders: false,
    headers,
  })

  const user = result.user as PortalAuthUser | null
  if (!user || user.collection !== 'portal-users' || user.active === false) return null

  return { token, user }
}
