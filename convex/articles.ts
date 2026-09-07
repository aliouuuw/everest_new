import { v } from "convex/values";
import { action, internalMutation, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";

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

// ── One-time migration: copy externalArticles → articles ────────────────────
const CATEGORY_MAP: Record<string, "Marchés" | "Obligations" | "Finance" | "Économie" | "BRVM" | "Analyses"> = {
  "Marchés":    "Marchés",
  "Bourse":     "BRVM",
  "Finance":    "Finance",
  "Économie":   "Économie",
  "Obligations":"Obligations",
  "Analyses":   "Analyses",
};

export const importExternalArticles = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Find an admin user to use as authorId
    const admin = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("role"), "admin"))
      .first();
    if (!admin) throw new Error("No admin user found — seed users first");

    const externals = await ctx.db.query("externalArticles").collect();
    let imported = 0;
    let skipped = 0;

    for (const ext of externals) {
      // Skip if an article with this slug already exists
      const existing = await ctx.db
        .query("articles")
        .withIndex("by_slug", q => q.eq("slug", ext.slug ?? makeSlug(ext.title)))
        .first();
      if (existing) { skipped++; continue; }

      const slug = ext.slug ?? makeSlug(ext.title);
      const category = CATEGORY_MAP[ext.category] ?? "Marchés";
      const now = Date.now();

      await ctx.db.insert("articles", {
        title: ext.title,
        slug,
        excerpt: ext.excerpt,
        content: ext.content ?? `<p>${ext.excerpt}</p>`,
        imageUrl: ext.imageUrl || undefined,
        category,
        status: "published",
        featured: false,
        authorId: admin._id,
        tags: [ext.sourceName],
        publishedAt: ext.publishedAt,
        createdAt: now,
        updatedAt: now,
      });
      imported++;
    }

    return { imported, skipped, total: externals.length };
  },
});

// One-time fix: rewrite old R2 URLs to the correct public subdomain
export const fixR2Urls = internalMutation({
  args: {},
  handler: async (ctx) => {
    const oldPattern = "everestfin-website.1a56b436e93b42f7548ea31d1174ef41.r2.dev";
    const newBase = "pub-3977d6c280ef4a1388e6f2edc2ecec78.r2.dev";
    const articles = await ctx.db.query("articles").collect();
    let fixed = 0;
    for (const a of articles) {
      if (a.imageUrl?.includes(oldPattern)) {
        await ctx.db.patch(a._id, {
          imageUrl: a.imageUrl.replace(oldPattern, newBase),
        });
        fixed++;
      }
    }
    return { fixed };
  },
});

export const runFixR2Urls = action({
  args: {},
  handler: async (ctx): Promise<{ fixed: number }> => {
    return await ctx.runMutation(internal.articles.fixR2Urls, {});
  },
});

// Trigger from dashboard: convex run articles:runImportExternal
export const runImportExternal = action({
  args: {},
  handler: async (ctx): Promise<{ imported: number; skipped: number; total: number }> => {
    return await ctx.runMutation(internal.articles.importExternalArticles, {});
  },
});
