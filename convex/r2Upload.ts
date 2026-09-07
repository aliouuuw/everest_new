"use node";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v } from "convex/values";
import { action } from "./_generated/server";

// Generate a presigned PUT URL for direct browser → R2 upload
export const getUploadUrl = action({
  args: {
    fileName: v.string(),
    fileType: v.string(),
    contentType: v.string(),
    fileKey: v.string(),
  },
  handler: async (_ctx, args) => {
    const accountId = process.env.CONVEX_CLOUDFLARE_ACCOUNT_ID;
    const accessKeyId = process.env.CONVEX_CLOUDFLARE_R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.CONVEX_CLOUDFLARE_R2_SECRET_ACCESS_KEY;
    const bucketName = process.env.CONVEX_CLOUDFLARE_R2_BUCKET_NAME;

    const publicBaseUrl = process.env.CONVEX_CLOUDFLARE_R2_PUBLIC_URL; // e.g. https://pub-xxx.r2.dev

    if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicBaseUrl) {
      throw new Error(
        "Missing R2 env vars. Need: CONVEX_CLOUDFLARE_ACCOUNT_ID, CONVEX_CLOUDFLARE_R2_ACCESS_KEY_ID, CONVEX_CLOUDFLARE_R2_SECRET_ACCESS_KEY, CONVEX_CLOUDFLARE_R2_BUCKET_NAME, CONVEX_CLOUDFLARE_R2_PUBLIC_URL"
      );
    }

    const s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId, secretAccessKey },
    });

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: args.fileKey,
      ContentType: args.contentType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    const base = publicBaseUrl.replace(/\/$/, "");
    const publicUrl = `${base}/${args.fileKey}`;

    return { uploadUrl, publicUrl, fileKey: args.fileKey };
  },
});
