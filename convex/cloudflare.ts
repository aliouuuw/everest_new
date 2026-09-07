// Cloudflare integration for ConvexDB — admin utilities.
// Actual uploads go through convex/r2Upload.ts (presigned URL action).

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
