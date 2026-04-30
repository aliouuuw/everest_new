import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

function makeSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

// ── Queries ─────────────────────────────────────────────────────────────────

export const getArticles = query({
  args: {
    status: v.optional(v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { status, limit }) => {
    let q = ctx.db.query("articles").order("desc");
    const all = await q.collect();
    const filtered = status ? all.filter(a => a.status === status) : all;
    return limit ? filtered.slice(0, limit) : filtered;
  },
});

export const getArticleBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("articles")
      .withIndex("by_slug", q => q.eq("slug", slug))
      .first();
  },
});

export const getArticleById = query({
  args: { id: v.id("articles") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const getFeaturedArticle = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("articles")
      .withIndex("by_featured", q => q.eq("featured", true))
      .filter(q => q.eq(q.field("status"), "published"))
      .first();
  },
});

// ── Mutations ────────────────────────────────────────────────────────────────

export const createArticle = mutation({
  args: {
    title: v.string(),
    excerpt: v.string(),
    content: v.string(),
    imageUrl: v.optional(v.string()),
    category: v.union(
      v.literal("Marchés"),
      v.literal("Obligations"),
      v.literal("Finance"),
      v.literal("Économie"),
      v.literal("BRVM"),
      v.literal("Analyses")
    ),
    status: v.union(v.literal("draft"), v.literal("published"), v.literal("archived")),
    featured: v.boolean(),
    authorId: v.id("users"),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const slug = makeSlug(args.title);
    const now = Date.now();
    return await ctx.db.insert("articles", {
      ...args,
      slug,
      publishedAt: args.status === "published" ? now : undefined,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateArticle = mutation({
  args: {
    id: v.id("articles"),
    title: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    content: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    category: v.optional(v.union(
      v.literal("Marchés"),
      v.literal("Obligations"),
      v.literal("Finance"),
      v.literal("Économie"),
      v.literal("BRVM"),
      v.literal("Analyses")
    )),
    status: v.optional(v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))),
    featured: v.optional(v.boolean()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, { id, ...fields }) => {
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Article not found");

    const updates: Record<string, unknown> = { ...fields, updatedAt: Date.now() };

    if (fields.title && fields.title !== existing.title) {
      updates.slug = makeSlug(fields.title);
    }
    if (fields.status === "published" && existing.status !== "published") {
      updates.publishedAt = Date.now();
    }

    await ctx.db.patch(id, updates as Partial<typeof existing>);
    return id;
  },
});

export const deleteArticle = mutation({
  args: { id: v.id("articles") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
