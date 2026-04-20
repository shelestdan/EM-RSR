export const dynamic = 'force-static'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // Verify portal session cookie
  const token = req.cookies.get('portal_session')?.value
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const res = await fetch(`${baseUrl}/api/portal-links?sort=order&limit=100`, {
    headers: { Authorization: `JWT ${token}` },
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
