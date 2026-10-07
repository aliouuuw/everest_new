import type { Plugin } from 'payload'
import { s3Storage } from '@payloadcms/storage-s3'

export type R2Env = {
  R2_ACCOUNT_ID?: string
  R2_ACCESS_KEY_ID?: string
  R2_SECRET_ACCESS_KEY?: string
  R2_BUCKET_NAME?: string
  R2_PUBLIC_URL?: string
}

export type R2Config = {
  bucket: string
  publicUrl: string
  endpoint: string
  credentials: {
    accessKeyId: string
    secretAccessKey: string
  }
}

function trim(value: string | undefined): string {
  return value?.trim() ?? ''
}

export function r2ConfigFromEnv(env: R2Env = process.env as R2Env): R2Config | null {
  const accountId = trim(env.R2_ACCOUNT_ID)
  const accessKeyId = trim(env.R2_ACCESS_KEY_ID)
  const secretAccessKey = trim(env.R2_SECRET_ACCESS_KEY)
  const bucket = trim(env.R2_BUCKET_NAME)
  const publicUrl = trim(env.R2_PUBLIC_URL).replace(/\/$/, '')
  if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !publicUrl) {
    return null
  }
  return {
    bucket,
    publicUrl,
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  }
}

export function r2FileUrl(publicUrl: string, filename: string, prefix?: string): string {
  const base = publicUrl.replace(/\/$/, '')
  const key = prefix ? `${prefix}/${filename}` : filename
  return `${base}/${key}`
}

export function r2StoragePlugins(env: R2Env = process.env as R2Env): Plugin[] {
  const r2 = r2ConfigFromEnv(env)
  if (!r2) return []

  return [
    s3Storage({
      enabled: true,
      bucket: r2.bucket,
      config: {
        credentials: r2.credentials,
        region: 'auto',
        endpoint: r2.endpoint,
        forcePathStyle: true,
      },
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) =>
            r2FileUrl(r2.publicUrl, filename, prefix),
        },
      },
    }),
  ]
}
