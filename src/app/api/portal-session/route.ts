import { NextRequest, NextResponse } from 'next/server'
import {
  clearPortalCookie,
  PORTAL_SESSION_SECONDS,
  setPortalCookie,
  verifyPortalRequest,
} from '@/lib/portal-auth'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const session = await verifyPortalRequest(req).catch(() => null)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const response = NextResponse.json({
    ok: true,
    expiresIn: PORTAL_SESSION_SECONDS,
    user: {
      email: session.user.email,
      name: session.user.name || '',
    },
  })
  setPortalCookie(response, session.token)
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  clearPortalCookie(response)
  return response
}
