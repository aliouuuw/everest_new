import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { isKnownContentId, MAX_VALUE_LENGTH } from "../src/cms/registry";

/**
 * Light CMS content API.
 *
 * Writes are gated by:
 *  1. Authenticated session (`getAuthUserId`).
 *  2. Caller has `role === "admin"` on the `users` row.
 *  3. `contentId` is present in the registry allowlist (`isKnownContentId`).
 *
 * Values are trimmed and bounded by `MAX_VALUE_LENGTH`. v1 is text-only.
 */

async function requireAdmin(ctx: { auth: any; db: any }): Promise<string> {
  const userId = await getAuthUserId(ctx as any);
  if (!userId) {
    throw new Error("Not authenticated");
  }
  const user = await ctx.db.get(userId);
  if (!user || user.role !== "admin") {
    throw new Error("Forbidden: admin role required");
  }
  return userId;
}

// Queries

export const getByPage = query({
  args: { pageKey: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("siteContent")
      .withIndex("by_page", (q) => q.eq("pageKey", args.pageKey))
      .collect();
  },
});

export const getById = query({
  args: { contentId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("siteContent")
      .withIndex("by_contentId", (q) => q.eq("contentId", args.contentId))
      .unique();
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("siteContent").collect();
  },
});

// Mutations

export const upsert = mutation({
  args: {
    contentId: v.string(),
    pageKey: v.string(),
    type: v.literal("text"),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await requireAdmin(ctx);

    if (!isKnownContentId(args.contentId)) {
      throw new Error(`Unknown contentId: ${args.contentId}`);
    }

    const value = args.value.trim();
    if (value.length > MAX_VALUE_LENGTH) {
      throw new Error(
        `Value too long (${value.length} > ${MAX_VALUE_LENGTH} chars)`,
      );
    }

    const existing = await ctx.db
      .query("siteContent")
      .withIndex("by_contentId", (q) => q.eq("contentId", args.contentId))
      .unique();

    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        value,
        type: args.type,
        pageKey: args.pageKey,
        updatedBy: userId as any,
        updatedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("siteContent", {
      contentId: args.contentId,
      pageKey: args.pageKey,
      type: args.type,
      value,
      updatedBy: userId as any,
      updatedAt: now,
    });
  },
});

export const remove = mutation({
  args: { contentId: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    if (!isKnownContentId(args.contentId)) {
      throw new Error(`Unknown contentId: ${args.contentId}`);
    }

    const existing = await ctx.db
      .query("siteContent")
      .withIndex("by_contentId", (q) => q.eq("contentId", args.contentId))
      .unique();

    if (existing) {
      await ctx.db.delete(existing._id);
    }
    return { removed: !!existing };
  },
});
