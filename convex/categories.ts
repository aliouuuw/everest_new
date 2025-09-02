import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Category Queries

// Get all categories
export const getCategories = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("categories")
      .filter(q => q.eq(q.field("isActive"), true))
      .order("asc") // Order by order field
      .collect();
  },
});

// Get category by slug
export const getCategoryBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("categories")
      .filter(q => q.eq(q.field("slug"), args.slug))
      .first();
  },
});

// Category Mutations

// Create category
export const createCategory = mutation({
  args: {
    slug: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
    icon: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Check if slug already exists
    const existingCategory = await ctx.db
      .query("categories")
      .filter(q => q.eq(q.field("slug"), args.slug))
      .first();

    if (existingCategory) {
      throw new Error("Category slug already exists");
    }

    // Get next order if not provided
    let order = args.order;
    if (order === undefined) {
      const categories = await ctx.db.query("categories").collect();
      order = categories.length;
    }

    return await ctx.db.insert("categories", {
      ...args,
      order,
      isActive: true,
    });
  },
});

// Update category
export const updateCategory = mutation({
  args: {
    id: v.id("categories"),
    slug: v.optional(v.string()),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
    icon: v.optional(v.string()),
    order: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, slug, ...updates } = args;

    // Check slug uniqueness if being updated
    if (slug) {
      const existingCategory = await ctx.db
        .query("categories")
        .filter(q => q.eq(q.field("slug"), slug))
        .filter(q => q.neq(q.field("_id"), id))
        .first();

      if (existingCategory) {
        throw new Error("Category slug already exists");
      }
    }

    await ctx.db.patch(id, {
      ...updates,
      ...(slug && { slug }),
    });

    return id;
  },
});

// Delete category
export const deleteCategory = mutation({
  args: { id: v.id("categories") },
  handler: async (ctx, args) => {
    // Check if category has publications
    const category = await ctx.db.get(args.id);
    if (!category) return args.id;
    
    const publications = await ctx.db
      .query("publications")
      .filter(q => q.eq(q.field("category"), category.slug))
      .collect();

    if (publications.length > 0) {
      // Soft delete - just deactivate
      await ctx.db.patch(args.id, { isActive: false });
    } else {
      // Hard delete if no publications
      await ctx.db.delete(args.id);
    }

    return args.id;
  },
});

// Update category order
export const updateCategoryOrder = mutation({
  args: {
    categories: v.array(v.object({
      id: v.id("categories"),
      order: v.number(),
    })),
  },
  handler: async (ctx, args) => {
    for (const { id, order } of args.categories) {
      await ctx.db.patch(id, { order });
    }

    return true;
  },
});
