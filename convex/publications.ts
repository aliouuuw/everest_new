import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Publication Queries

// Get all publications with filters
export const getPublications = query({
  args: {
    status: v.optional(v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))),
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { status, category, limit = 20, featured } = args;

    let resultQuery = ctx.db.query("publications");

    // Apply filters
    if (status) {
      resultQuery = resultQuery.filter(q => q.eq(q.field("status"), status));
    }

    if (category) {
      resultQuery = resultQuery.filter(q => q.eq(q.field("category"), category));
    }

    if (featured !== undefined) {
      resultQuery = resultQuery.filter(q => q.eq(q.field("featured"), featured));
    }

    // Order by creation date (newest first) and paginate
    return await resultQuery
      .order("desc")
      .paginate({ numItems: limit, cursor: null });
  },
});

// Get publication by ID
export const getPublicationById = query({
  args: { id: v.id("publications") },
  handler: async (ctx, args) => {
    const publication = await ctx.db.get(args.id);

    if (!publication) {
      return null;
    }

    // Get associated media
    const media = await ctx.db
      .query("media")
      .filter(q => q.eq(q.field("publicationId"), publication._id))
      .collect();

    // Get author info
    const author = await ctx.db.get(publication.authorId);

    return {
      ...publication,
      media,
      author: author ? { name: author.name, avatar: author.avatar } : null,
    };
  },
});

// Get publication by slug
export const getPublicationBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const publication = await ctx.db
      .query("publications")
      .filter(q => q.eq(q.field("slug"), args.slug))
      .first();

    if (!publication) {
      return null;
    }

    // Get associated media
    const media = await ctx.db
      .query("media")
      .filter(q => q.eq(q.field("publicationId"), publication._id))
      .collect();

    // Get author info
    const author = await ctx.db.get(publication.authorId);

    return {
      ...publication,
      media,
      author: author ? { name: author.name, avatar: author.avatar } : null,
    };
  },
});

// Search publications
export const searchPublications = query({
  args: {
    query: v.string(),
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { query: searchQuery, category, limit = 20 } = args;

    let searchQueryBuilder = ctx.db
      .query("publications")
      .withSearchIndex("search_content", q =>
        q.search("title", searchQuery)
      );

    if (category) {
      searchQueryBuilder = searchQueryBuilder.filter(q =>
        q.eq(q.field("category"), category)
      );
    }

    // Only return published content for search
    searchQueryBuilder = searchQueryBuilder.filter(q =>
      q.eq(q.field("status"), "published")
    );

    return await searchQueryBuilder.take(limit);
  },
});

// Publication Mutations

// Create publication
export const createPublication = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    content: v.string(),
    category: v.union(v.literal("revues-hebdo"), v.literal("revues-mensuelles"), v.literal("teaser-dividende"), v.literal("marches"), v.literal("analyses")),
    excerpt: v.string(),
    tags: v.array(v.string()),
    featured: v.optional(v.boolean()),
    status: v.optional(v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    authorId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const { user } = await requireEditor(ctx);

    const now = Date.now();

    // Generate slug from title
    const slug = args.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    return await ctx.db.insert("publications", {
      ...args,
      authorId: user._id,
      slug,
      status: args.status || "draft", // Use provided status or default to draft
      featured: args.featured ?? false, // Default to false if not provided
      mediaIds: [],
      readingTime: Math.ceil(args.content.split(' ').length / 200), // Rough estimate
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update publication
export const updatePublication = mutation({
  args: {
    id: v.id("publications"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    content: v.optional(v.string()),
    category: v.optional(v.union(v.literal("revues-hebdo"), v.literal("revues-mensuelles"), v.literal("teaser-dividende"), v.literal("marches"), v.literal("analyses"))),
    excerpt: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    featured: v.optional(v.boolean()),
    status: v.optional(v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { user } = await requireEditor(ctx);

    const { id, ...updates } = args;

    // Generate new slug if title is being updated
    let slug: string | undefined;
    if (updates.title) {
      slug = updates.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Check if slug already exists (excluding current publication)
      const existing = await ctx.db
        .query("publications")
        .filter(q => q.eq(q.field("slug"), slug))
        .filter(q => q.neq(q.field("_id"), id))
        .first();

      if (existing) {
        // Append timestamp to make slug unique
        slug = `${slug}-${Date.now()}`;
      }
    }

    await ctx.db.patch(id, {
      ...updates,
      ...(slug && { slug }),
      updatedAt: Date.now(),
      ...(updates.status === "published" && {
        publishedAt: Date.now()
      }),
    });

    return id;
  },
});

// Delete publication
export const deletePublication = mutation({
  args: { id: v.id("publications") },
  handler: async (ctx, args) => {
    const { user } = await requireEditor(ctx);

    // Get publication to clean up media references
    const publication = await ctx.db.get(args.id);
    if (!publication) {
      throw new Error("Publication not found");
    }

    // Remove media associations
    if (publication.mediaIds.length > 0) {
      for (const mediaId of publication.mediaIds) {
        await ctx.db.delete(mediaId);
      }
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});
