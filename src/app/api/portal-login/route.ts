import { NextRequest, NextResponse } from 'next/server'
import {
  clearPortalCookie,
  clearPortalLoginRate,
  getPortalLoginLock,
  getPortalPayload,
  logPortalAccess,
  PORTAL_LOCK_SECONDS,
  recordPortalLoginFailure,
  setPortalCookie,
  verifyPortalRequest,
} from '@/lib/portal-auth'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Login
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const password = typeof body.password === 'string' ? body.password : ''

  if (!email || !password) {
    await logPortalAccess({ event: 'login_failed', req, userEmail: email })
    return NextResponse.json({ error: 'Введите логин и пароль' }, { status: 400 })
  }

  const lockedFor = getPortalLoginLock(req, email)
  if (lockedFor > 0) {
    await logPortalAccess({ event: 'locked_out', req, userEmail: email })
    return NextResponse.json(
      { error: 'Доступ временно закрыт', retryAfter: lockedFor },
      { status: 423 },
    )
  }

  try {
    const payload = await getPortalPayload()
    const login = await payload.login({
      collection: 'portal-users',
      data: { email, password },
      overrideAccess: true,
    })

    const user = login.user as { active?: boolean; email?: string; name?: string } | undefined
    if (!login.token || user?.active === false) {
      const rate = recordPortalLoginFailure(req, email)
      await logPortalAccess({ event: 'login_failed', req, userEmail: email })
      return NextResponse.json(
        { error: 'Доступ отключён', remaining: rate.remaining, retryAfter: rate.retryAfter },
        { status: rate.locked ? 423 : 403 },
      )
    }

    clearPortalLoginRate(req, email)
    await logPortalAccess({ event: 'login_success', req, userEmail: user?.email || email })

    const response = NextResponse.json({
      ok: true,
      user: {
        email: user?.email || email,
        name: user?.name || '',
      },
    })
    setPortalCookie(response, login.token)

    return response
  } catch (error) {
    const errorName = error instanceof Error ? error.name : ''
    const constructorName =
      typeof error === 'object' && error && 'constructor' in error
        ? (error.constructor as { name?: string }).name || ''
        : ''
    const locked = errorName === 'LockedAuth' || constructorName === 'LockedAuth'
    const rate = locked
      ? { locked: true, remaining: 0, retryAfter: PORTAL_LOCK_SECONDS }
      : recordPortalLoginFailure(req, email)
    const isLocked = locked || rate.locked

    await logPortalAccess({ event: isLocked ? 'locked_out' : 'login_failed', req, userEmail: email })

    return NextResponse.json(
      {
        error: isLocked ? 'Доступ временно закрыт' : 'Неверный логин или пароль',
        remaining: rate.remaining,
        retryAfter: rate.retryAfter,
      },
      { status: isLocked ? 423 : 401 },
    )
  }
}

// Logout
export async function DELETE(req: NextRequest) {
  const session = await verifyPortalRequest(req).catch(() => null)
  await logPortalAccess({ event: 'logout', req, userEmail: session?.user.email })

  const response = NextResponse.json({ ok: true })
  clearPortalCookie(response)
  return response
}
