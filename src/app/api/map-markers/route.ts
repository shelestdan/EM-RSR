import { NextResponse } from 'next/server'
import { getPortalPayload } from '@/lib/portal-auth'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type MapMarkerDoc = {
  id: string | number
  title?: string | null
  lat?: number | null
  lng?: number | null
  regionRef?: RelationDoc | string | number | null
  yearRef?: RelationDoc | string | number | null
  workTypeRef?: RelationDoc | string | number | null
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

type RelationDoc = {
  id?: string | number
  slug?: string | null
  label?: string | null
  year?: number | null
}

function asRelationDoc(value: unknown): RelationDoc | null {
  if (!value || typeof value !== 'object') return null
  return value as RelationDoc
}

export async function GET() {
  try {
    const payload = await getPortalPayload()
    const result = await payload.find({
      collection: 'map-markers',
      limit: 1000,
      sort: '-year,title',
      depth: 1,
      overrideAccess: true,
    })

    const docs = (result.docs as MapMarkerDoc[])
      .map((doc) => {
        const regionRef = asRelationDoc(doc.regionRef)
        const yearRef = asRelationDoc(doc.yearRef)
        const workTypeRef = asRelationDoc(doc.workTypeRef)
        const region = regionRef?.slug || doc.region
        const year = yearRef?.year ?? doc.year
        const category = workTypeRef?.slug || doc.category

        return {
          id: `admin-${doc.id}`,
          title: doc.title,
          lat: doc.lat,
          lng: doc.lng,
          type: doc.type || category || 'other',
          category: category || undefined,
          contractType: doc.contractType || undefined,
          region,
          year,
          description: doc.description || undefined,
          workDescription: doc.description || undefined,
          positiveConclusion: doc.positiveConclusion || undefined,
          conclusionUrl: doc.conclusionUrl || undefined,
          yandexMapsUrl: doc.yandexMapsUrl || undefined,
        }
      })
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
      .sort((a, b) => {
        const yearDelta = Number(b.year) - Number(a.year)
        if (yearDelta !== 0) return yearDelta
        return String(a.title).localeCompare(String(b.title), 'ru')
      })

    return NextResponse.json({ docs })
  } catch {
    return NextResponse.json({ docs: [] }, { status: 200 })
  }
}
