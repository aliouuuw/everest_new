import type { Plugin } from 'payload'
import { s3Storage } from '@payloadcms/storage-s3'

export type R2Env = {
  R2_ACCOUNT_ID?: string
  R2_ACCESS_KEY_ID?: string
  R2_SECRET_ACCESS_KEY?: string
  R2_BUCKET_NAME?: string
  R2_PUBLIC_URL?: string
  /** Bucket with NO public access, for identity documents (pieces-ouverture). */
  R2_PRIVATE_BUCKET_NAME?: string
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

function s3Config(endpoint: string, credentials: R2Config['credentials']) {
  return { credentials, region: 'auto', endpoint, forcePathStyle: true }
}

export function r2StoragePlugins(env: R2Env = process.env as R2Env): Plugin[] {
  const r2 = r2ConfigFromEnv(env)
  const media: Plugin[] = r2
    ? [
        s3Storage({
          enabled: true,
          bucket: r2.bucket,
          config: s3Config(r2.endpoint, r2.credentials),
          collections: {
            media: {
              disablePayloadAccessControl: true,
              generateFileURL: ({ filename, prefix }) =>
                r2FileUrl(r2.publicUrl, filename, prefix),
            },
          },
        }),
      ]
    : []
  return [...media, ...privateBucket(env)]
}

/**
 * Identity documents: private bucket, files served only through Payload access control (staff).
 * Independent of the media bucket: needs account, keys and R2_PRIVATE_BUCKET_NAME only.
 */
function privateBucket(env: R2Env): Plugin[] {
  const accountId = trim(env.R2_ACCOUNT_ID)
  const accessKeyId = trim(env.R2_ACCESS_KEY_ID)
  const secretAccessKey = trim(env.R2_SECRET_ACCESS_KEY)
  const bucket = trim(env.R2_PRIVATE_BUCKET_NAME)
  if (!accountId || !accessKeyId || !secretAccessKey || !bucket) return []
  return [
    s3Storage({
      enabled: true,
      bucket,
      config: s3Config(`https://${accountId}.r2.cloudflarestorage.com`, { accessKeyId, secretAccessKey }),
      collections: { 'pieces-ouverture': true },
    }),
  ]
}
