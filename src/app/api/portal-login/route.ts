import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const PORTAL_COOKIE = 'portal_session'

// Login
export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  const userAgent = req.headers.get('user-agent') || ''

  const baseUrl =
    process.env.PAYLOAD_INTERNAL_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Authenticate against Payload's portal-users collection
  const res = await fetch(`${baseUrl}/api/portal-users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const event = res.ok ? 'login_success' : 'login_failed'

  // Log the attempt
  await fetch(`${baseUrl}/api/portal-access-log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userEmail: email, ip, userAgent, event }),
  }).catch(() => {})

  if (!res.ok) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const data = await res.json()
  const token = data.token

  const response = NextResponse.json({ ok: true })
  response.cookies.set(PORTAL_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 45, // 45 min
    path: '/',
  })

  return response
}

// Logout
export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(PORTAL_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
  return response
}
