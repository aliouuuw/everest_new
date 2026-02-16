// Cloudflare integration for ConvexDB
// This file handles Cloudflare R2 and Images API integration

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Generate presigned upload URL for direct upload to Cloudflare R2
export const getUploadUrl = mutation({
  args: {
    fileName: v.string(),
    fileType: v.string(),
    contentType: v.string(),
    publicationId: v.optional(v.id("publications")),
  },
  handler: async (ctx, args) => {
    // Verify user authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Get user from database
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Check if user has permission to upload files
    if (!["admin", "editor"].includes(user.role || "")) {
      throw new Error("Insufficient permissions");
    }

    // Generate unique file key
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const sanitizedFileName = args.fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileKey = `${args.fileType}/${timestamp}-${randomId}-${sanitizedFileName}`;

    // In a real implementation, you would generate the presigned URL here
    // For now, we'll return a placeholder structure
    const uploadUrl = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/r2/upload`;
    const publicUrl = `https://${process.env.CLOUDFLARE_R2_BUCKET_NAME}.${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.dev/${fileKey}`;

    // Store upload session for tracking
    const uploadSession = await ctx.db.insert("uploadSessions", {
      fileKey,
      fileName: args.fileName,
      fileType: args.fileType,
      contentType: args.contentType,
      publicationId: args.publicationId,
      uploadedBy: user._id,
      status: "pending",
      createdAt: Date.now(),
    });

    return {
      uploadUrl,
      fileKey,
      publicUrl,
      sessionId: uploadSession,
    };
  },
});

// Confirm file upload and create media record
export const confirmUpload = mutation({
  args: {
    sessionId: v.id("uploadSessions"),
    cloudflareId: v.string(),
    cloudflareUrl: v.string(),
    fileSize: v.number(),
    variants: v.optional(v.object({
      thumbnail: v.string(),
      medium: v.string(),
      large: v.string(),
      webp: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    // Verify user authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Get upload session
    const session = await ctx.db.get(args.sessionId);
    if (!session) {
      throw new Error("Upload session not found");
    }

    // Update session status
    await ctx.db.patch(args.sessionId, {
      status: "completed",
      cloudflareId: args.cloudflareId,
      cloudflareUrl: args.cloudflareUrl,
      fileSize: args.fileSize,
      variants: args.variants,
      completedAt: Date.now(),
    });

    // Create media record
    const mediaId = await ctx.db.insert("media", {
      cloudflareId: args.cloudflareId,
      cloudflareUrl: args.cloudflareUrl,
      variants: args.variants,
      fileName: session.fileName,
      fileType: session.fileType,
      fileSize: args.fileSize,
      mimeType: session.contentType,
      publicationId: session.publicationId!,
      uploadedBy: session.uploadedBy,
      order: 0, // Will be updated when linked to publication
      tags: [],
      createdAt: Date.now(),
    });

    return {
      mediaId,
      cloudflareId: args.cloudflareId,
      url: args.cloudflareUrl,
      variants: args.variants,
    };
  },
});

// Get upload session status
export const getUploadSession = query({
  args: { sessionId: v.id("uploadSessions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.sessionId);
  },
});

// Clean up failed upload sessions (run periodically)
export const cleanupFailedUploads = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();

    if (!user || user.role !== "admin") {
      throw new Error("Admin access required");
    }

    // Find sessions older than 24 hours that are still pending
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    const failedSessions = await ctx.db
      .query("uploadSessions")
      .filter((q) => 
        q.and(
          q.eq(q.field("status"), "pending"),
          q.lt(q.field("createdAt"), oneDayAgo)
        )
      )
      .collect();

    // Mark as failed
    for (const session of failedSessions) {
      await ctx.db.patch(session._id, {
        status: "failed",
        failedAt: Date.now(),
      });
    }

    return {
      cleanedUp: failedSessions.length,
      sessions: failedSessions.map(s => s._id),
    };
  },
});

// Delete file from Cloudflare (for admin use)
export const deleteCloudflareFile = mutation({
  args: {
    mediaId: v.id("media"),
    cloudflareId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();

    if (!user || !["admin", "editor"].includes(user.role || "")) {
      throw new Error("Insufficient permissions");
    }

    // Get media record
    const media = await ctx.db.get(args.mediaId);
    if (!media) {
      throw new Error("Media not found");
    }

    // Verify the cloudflare ID matches
    if (media.cloudflareId !== args.cloudflareId) {
      throw new Error("Cloudflare ID mismatch");
    }

    // In a real implementation, you would call Cloudflare API to delete the file
    // For now, we'll just mark it as deleted in our database
    await ctx.db.patch(args.mediaId, {
      deletedAt: Date.now(),
      deletedBy: user._id,
    });

    return {
      success: true,
      mediaId: args.mediaId,
      cloudflareId: args.cloudflareId,
    };
  },
});

// Get Cloudflare usage statistics
export const getCloudflareStats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();

    if (!user || user.role !== "admin") {
      throw new Error("Admin access required");
    }

    // Get all media files
    const allMedia = await ctx.db.query("media").collect();
    const totalFiles = allMedia.length;
    const totalSize = allMedia.reduce((sum, media) => sum + (media.fileSize || 0), 0);

    // Get files by type
    const filesByType = allMedia.reduce((acc, media) => {
      const type = media.fileType || 'unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get recent uploads (last 30 days)
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const recentUploads = allMedia.filter(media => media.createdAt && media.createdAt > thirtyDaysAgo);

    return {
      totalFiles,
      totalSize,
      filesByType,
      recentUploads: recentUploads.length,
      averageFileSize: totalFiles > 0 ? Math.round(totalSize / totalFiles) : 0,
    };
  },
});
