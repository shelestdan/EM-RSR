import { NextResponse } from 'next/server'
import { getPortalPayload } from '@/lib/portal-auth'
import {
  defaultMapRegions,
  defaultMapWorkTypes,
  defaultMapYears,
  type MapFilterOption,
  type MapWorkTypeOption,
  type MarkerShape,
} from '@/lib/map-filter-options'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type AdminDocBase = {
  id: string | number
  createdAt?: string
  sortOrder?: number | null
}

type RegionDoc = AdminDocBase & {
  label?: string | null
  slug?: string | null
}

type YearDoc = AdminDocBase & {
  year?: number | null
}

type WorkTypeDoc = AdminDocBase & {
  label?: string | null
  slug?: string | null
  color?: string | null
  shape?: MarkerShape | null
  publicFilter?: boolean | null
}

const fallbackPayload = {
  regions: defaultMapRegions,
  years: defaultMapYears,
  workTypes: defaultMapWorkTypes,
}

function sortAdminFirst<T extends AdminDocBase>(docs: T[]) {
  return [...docs].sort((a, b) => {
    const order = (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
    if (order !== 0) return order
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  })
}

function dedupeByValue<T extends { value: string }>(items: T[]) {
  const seen = new Set<string>()
  return items.filter((item) => {
    if (!item.value || seen.has(item.value)) return false
    seen.add(item.value)
    return true
  })
}

export async function GET() {
  try {
    const payload = await getPortalPayload()
    const [regionsResult, yearsResult, workTypesResult] = await Promise.all([
      payload.find({
        collection: 'map-regions',
        limit: 300,
        depth: 0,
        overrideAccess: true,
      }),
      payload.find({
        collection: 'map-years',
        limit: 80,
        depth: 0,
        overrideAccess: true,
      }),
      payload.find({
        collection: 'map-work-types',
        limit: 300,
        depth: 0,
        overrideAccess: true,
      }),
    ])

    const adminRegions: MapFilterOption[] = sortAdminFirst(regionsResult.docs as RegionDoc[])
      .filter((doc) => typeof doc.slug === 'string' && typeof doc.label === 'string')
      .map((doc) => ({ value: doc.slug as string, label: doc.label as string }))

    const adminYears = sortAdminFirst(yearsResult.docs as YearDoc[])
      .filter((doc) => typeof doc.year === 'number' && Number.isFinite(doc.year))
      .map((doc) => doc.year as number)

    const adminWorkTypes: MapWorkTypeOption[] = sortAdminFirst(workTypesResult.docs as WorkTypeDoc[])
      .filter((doc) => typeof doc.slug === 'string' && typeof doc.label === 'string')
      .map((doc) => ({
        value: doc.slug as string,
        label: doc.label as string,
        color: doc.color || '#546E7A',
        shape: doc.shape || 'square',
        publicFilter: doc.publicFilter !== false,
      }))

    return NextResponse.json({
      regions: dedupeByValue([...adminRegions, ...defaultMapRegions]),
      years: Array.from(new Set([...adminYears, ...defaultMapYears])),
      workTypes: dedupeByValue([...adminWorkTypes, ...defaultMapWorkTypes]),
    })
  } catch {
    return NextResponse.json(fallbackPayload, { status: 200 })
  }
}
