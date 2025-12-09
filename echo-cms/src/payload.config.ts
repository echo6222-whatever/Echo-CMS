import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const connectionStr = process.env.POSTGRES_URL || process.env.DATABASE_URL
if (!connectionStr) {
  console.warn('No POSTGRES_URL/DATABASE_URL set — skipping DB adapter for build-time.')
}

const payloadSecret = process.env.PAYLOAD_SECRET
if (!payloadSecret) {
  throw new Error('Missing PAYLOAD_SECRET — set PAYLOAD_SECRET in Vercel (Build + Production) and locally (.env.local)')
}

const enablePostgres = !!process.env.POSTGRES_URL
const enableBlob = !!process.env.BLOB_READ_WRITE_TOKEN

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: connectionStr,
    },
  }),
  sharp,
  plugins: [
    ...(process.env.PAYLOAD_CLOUD ? [payloadCloudPlugin()] : []), // requires install + import OR remove entirely
    ...(enableBlob
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN,
            clientUploads: true,
          }),
        ]
      : []),
  ],
})

