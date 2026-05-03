import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { ru } from '@payloadcms/translations/languages/ru'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Projects } from './collections/Projects'
import { MapMarkers } from './collections/MapMarkers'
import { MapRegions } from './collections/MapRegions'
import { MapYears } from './collections/MapYears'
import { MapWorkTypes } from './collections/MapWorkTypes'
import { Certificates } from './collections/Certificates'
import { FormSubmissions } from './collections/FormSubmissions'
import { PortalUsers } from './collections/PortalUsers'
import { PortalLinks } from './collections/PortalLinks'
import { PortalAccessLog } from './collections/PortalAccessLog'
import { HomePage } from './globals/HomePage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const payloadSecret = process.env.PAYLOAD_SECRET

if (process.env.NODE_ENV === 'production' && !payloadSecret && !process.env.GITHUB_PAGES) {
  throw new Error('PAYLOAD_SECRET is required in production')
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— EM-РСР Admin',
    },
    components: {},
  },
  collections: [
    Users,
    Media,
    Services,
    Projects,
    MapRegions,
    MapYears,
    MapWorkTypes,
    MapMarkers,
    Certificates,
    FormSubmissions,
    PortalUsers,
    PortalLinks,
    PortalAccessLog,
  ],
  globals: [HomePage],
  editor: lexicalEditor(),
  secret: payloadSecret || 'fallback-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  i18n: {
    supportedLanguages: { ru },
    fallbackLanguage: 'ru',
  },
  localization: false,
  upload: {
    limits: {
      fileSize: 25000000, // 25MB
    },
  },
})
