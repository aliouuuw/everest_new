// Cloudflare API handlers for ConvexDB integration
// This handles webhooks and direct API calls from Cloudflare services

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v } from "convex/values";
import { action, httpAction } from "../_generated/server";
import { api } from "../_generated/api";

// Handle direct file upload to Cloudflare R2
export const uploadToCloudflare = httpAction(async (_ctx, request) => {
  try {
    // Verify the request method
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    // Parse the request body
    const formData = await request.formData();
    const file = formData.get("file");
    const fileName = formData.get("fileName");
    const fileType = formData.get("fileType");

    if (!file || !fileName || !fileType || !(file instanceof File)) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Generate unique file key
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const sanitizedFileName = fileName.toString().replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileKey = `${fileType}/${timestamp}-${randomId}-${sanitizedFileName}`;

    // Prepare Cloudflare upload based on file type
    let uploadResult;

    if (file.type.startsWith('image/')) {
      // Upload to Cloudflare Images API
      uploadResult = await uploadToCloudflareImages(file);
    } else {
      // Upload to Cloudflare R2
      uploadResult = await uploadToCloudflareR2(file, fileKey);
    }

    // For now, return success without creating database record
    // We'll handle database operations on the frontend
    return new Response(JSON.stringify({
      success: true,
      uploadResult: {
        id: uploadResult.id,
        url: uploadResult.url,
        variants: 'variants' in uploadResult ? uploadResult.variants : undefined,
        fileName: fileName.toString(),
        fileType: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document',
        fileSize: file.size,
        mimeType: file.type,
      },
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Upload error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// Handle Cloudflare Images API webhook for processing completion
export const cloudflareImagesWebhook = httpAction(async (_ctx, request) => {
  try {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    // Verify webhook signature (in production, you should verify the webhook signature)
    const webhookData = await request.json();
    
    // Process the webhook data
    const { imageId, status, variants } = webhookData;

    if (status === "ready" && variants) {
      // Update media record with processed variants
      // This would typically involve finding the media record by cloudflareId
      // and updating it with the new variant URLs
      console.log("Image processing completed:", {
        imageId,
        variants: Object.keys(variants),
      });
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Webhook processing failed", { status: 500 });
  }
});

// Handle file deletion requests
export const deleteFile = httpAction(async (ctx, request) => {
  try {
    if (request.method !== "DELETE") {
      return new Response("Method not allowed", { status: 405 });
    }

    const { mediaId, cloudflareId } = await request.json();

    if (!mediaId || !cloudflareId) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Delete from ConvexDB (marks as deleted)
    const result = await ctx.runMutation(api.cloudflare.deleteCloudflareFile, {
      mediaId: mediaId,
      cloudflareId: cloudflareId,
    });

    // In production, you would also call Cloudflare API to delete the actual file
    // await deleteFromCloudflare(cloudflareId);

    return new Response(JSON.stringify({
      success: true,
      result,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Deletion error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : "Deletion failed",
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// Generate presigned upload URL for R2
export const getUploadUrl = action({
  args: {
    fileName: v.string(),
    fileType: v.string(),
    contentType: v.string(),
    fileKey: v.string(),
  },
  handler: async (_ctx, args) => {
    // Configure S3 client for R2
    const s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.CONVEX_CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.CONVEX_CLOUDFLARE_R2_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.CONVEX_CLOUDFLARE_R2_SECRET_ACCESS_KEY || "",
      },
    });

    const bucketName = process.env.CONVEX_CLOUDFLARE_R2_BUCKET_NAME || "";

    // Generate presigned URL
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: args.fileKey,
      ContentType: args.contentType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour
    const publicUrl = `https://${bucketName}.${process.env.CONVEX_CLOUDFLARE_ACCOUNT_ID}.r2.dev/${args.fileKey}`;

    return {
      uploadUrl,
      publicUrl,
      fileKey: args.fileKey,
    };
  },
});

// Get usage statistics endpoint
export const getUsageStats = httpAction(async (ctx, request) => {
  try {
    if (request.method !== "GET") {
      return new Response("Method not allowed", { status: 405 });
    }

    const stats = await ctx.runQuery(api.cloudflare.getCloudflareStats, {});

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Stats error:", error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : "Failed to get stats",
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// Helper function to upload to Cloudflare Images API
async function uploadToCloudflareImages(file: File): Promise<{
  id: string;
  url: string;
  variants?: {
    thumbnail: string;
    medium: string;
    large: string;
    webp: string;
  };
}> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CONVEX_CLOUDFLARE_ACCOUNT_ID}/images/v1`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CONVEX_CLOUDFLARE_IMAGES_API_TOKEN}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(`Cloudflare Images upload failed: ${response.statusText}`);
  }

  const result = await response.json();
  const imageId = result.result.id;
  const baseUrl = result.result.variants[0];

  // Generate variant URLs
  const variants = {
    thumbnail: baseUrl.replace('/public', '/thumbnail'),
    medium: baseUrl.replace('/public', '/medium'),
    large: baseUrl.replace('/public', '/large'),
    webp: baseUrl.replace('/public', '/webp'),
  };

  return {
    id: imageId,
    url: baseUrl,
    variants,
  };
}

// Helper function to upload to Cloudflare R2
async function uploadToCloudflareR2(file: File, fileKey: string): Promise<{
  id: string;
  url: string;
}> {
  const bucketName = process.env.CONVEX_CLOUDFLARE_R2_BUCKET_NAME;
  const accountId = process.env.CONVEX_CLOUDFLARE_ACCOUNT_ID;

  if (!bucketName || !accountId) {
    throw new Error("Cloudflare R2 configuration missing");
  }

  // Configure S3 client for R2
  const s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CONVEX_CLOUDFLARE_R2_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.CONVEX_CLOUDFLARE_R2_SECRET_ACCESS_KEY || "",
    },
  });

  try {
    // Convert File to Uint8Array for upload
    const fileBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(fileBuffer);

    // Upload file to R2
    const uploadCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
      Body: fileData,
      ContentType: file.type,
      ContentLength: file.size,
    });

    await s3Client.send(uploadCommand);

    // Generate public URL
    const publicUrl = `https://${bucketName}.${accountId}.r2.dev/${fileKey}`;

    console.log('R2 upload successful:', { fileKey, publicUrl, fileName: file.name, size: file.size });

    return {
      id: fileKey,
      url: publicUrl,
    };
  } catch (error) {
    console.error('R2 upload failed:', error);
    throw new Error(`Failed to upload to Cloudflare R2: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Helper function to delete from Cloudflare (placeholder)
// async function deleteFromCloudflare(cloudflareId: string): Promise<boolean> {
//   // In production, implement actual deletion logic here
//   // For Cloudflare Images: DELETE to /images/v1/{id}
//   // For R2: Use S3 SDK deleteObject
//   
//   console.log(`Would delete file: ${cloudflareId}`);
//   return true;
// }
