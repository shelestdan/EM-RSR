import { NextRequest, NextResponse } from 'next/server'
import { getPortalPayload, setPortalCookie, verifyPortalRequest } from '@/lib/portal-auth'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const session = await verifyPortalRequest(req).catch(() => null)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPortalPayload()
  const data = await payload.find({
    collection: 'portal-links',
    limit: 100,
    sort: 'order',
    overrideAccess: true,
  })

  const response = NextResponse.json(data)
  setPortalCookie(response, session.token)
  return response
}
