import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Media Queries

// Get media for a publication
export const getPublicationMedia = query({
  args: { publicationId: v.id("publications") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("media")
      .filter(q => q.eq(q.field("publicationId"), args.publicationId))
      .order("asc") // Order by creation time
      .collect();
  },
});

// Get media by type
export const getMediaByType = query({
  args: {
    fileType: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { fileType, limit = 50 } = args;

    return await ctx.db
      .query("media")
      .filter(q => q.eq(q.field("fileType"), fileType))
      .order("desc") // Newest first
      .take(limit);
  },
});

// Media Mutations

// Link uploaded file to publication
export const linkMediaToPublication = mutation({
  args: {
    publicationId: v.id("publications"),
    uploadthingKey: v.string(),
    uploadthingUrl: v.string(),
    fileName: v.string(),
    fileType: v.string(),
    fileSize: v.number(),
    alt: v.optional(v.string()),
    caption: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    uploadedBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    const { publicationId, ...mediaData } = args;

    // Create media record
    const mediaId = await ctx.db.insert("media", {
      ...mediaData,
      publicationId,
      order: 0, // Default order
      tags: mediaData.tags || [],
      createdAt: Date.now(),
    });

    // Link media to publication
    const publication = await ctx.db.get(publicationId);
    if (publication) {
      await ctx.db.patch(publicationId, {
        mediaIds: [...publication.mediaIds, mediaId],
        updatedAt: Date.now(),
      });
    }

    return mediaId;
  },
});

// Update media metadata
export const updateMedia = mutation({
  args: {
    id: v.id("media"),
    alt: v.optional(v.string()),
    caption: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    await ctx.db.patch(id, updates);
    return id;
  },
});

// Delete media
export const deleteMedia = mutation({
  args: { id: v.id("media") },
  handler: async (ctx, args) => {
    const media = await ctx.db.get(args.id);
    if (!media) {
      throw new Error("Media not found");
    }

    // Remove from publication's media list
    const publication = await ctx.db.get(media.publicationId);
    if (publication) {
      await ctx.db.patch(media.publicationId, {
        mediaIds: publication.mediaIds.filter(id => id !== args.id),
        updatedAt: Date.now(),
      });
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Update media order in publication
export const updateMediaOrder = mutation({
  args: {
    publicationId: v.id("publications"),
    mediaOrders: v.array(v.object({
      mediaId: v.id("media"),
      order: v.number(),
    })),
  },
  handler: async (ctx, args) => {
    const { publicationId, mediaOrders } = args;

    // Update each media item's order
    for (const { mediaId, order } of mediaOrders) {
      await ctx.db.patch(mediaId, { order });
    }

    return publicationId;
  },
});
