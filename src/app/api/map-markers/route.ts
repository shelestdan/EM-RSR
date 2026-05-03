import { NextResponse } from 'next/server'
import { getPortalPayload } from '@/lib/portal-auth'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type MapMarkerDoc = {
  id: string | number
  title?: string | null
  lat?: number | null
  lng?: number | null
  type?: string | null
  category?: string | null
  contractType?: string | null
  region?: string | null
  year?: number | null
  description?: string | null
  positiveConclusion?: string | null
  conclusionUrl?: string | null
  yandexMapsUrl?: string | null
}

export async function GET() {
  try {
    const payload = await getPortalPayload()
    const result = await payload.find({
      collection: 'map-markers',
      limit: 1000,
      sort: '-year,title',
      depth: 0,
      overrideAccess: true,
    })

    const docs = (result.docs as MapMarkerDoc[])
      .filter((doc) => (
        typeof doc.title === 'string' &&
        typeof doc.lat === 'number' &&
        Number.isFinite(doc.lat) &&
        typeof doc.lng === 'number' &&
        Number.isFinite(doc.lng) &&
        typeof doc.year === 'number' &&
        Number.isFinite(doc.year) &&
        typeof doc.region === 'string'
      ))
      .map((doc) => ({
        id: `admin-${doc.id}`,
        title: doc.title,
        lat: doc.lat,
        lng: doc.lng,
        type: doc.type || doc.category || 'other',
        category: doc.category || undefined,
        contractType: doc.contractType || undefined,
        region: doc.region,
        year: doc.year,
        description: doc.description || undefined,
        workDescription: doc.description || undefined,
        positiveConclusion: doc.positiveConclusion || undefined,
        conclusionUrl: doc.conclusionUrl || undefined,
        yandexMapsUrl: doc.yandexMapsUrl || undefined,
      }))

    return NextResponse.json({ docs })
  } catch {
    return NextResponse.json({ docs: [] }, { status: 200 })
  }
}
