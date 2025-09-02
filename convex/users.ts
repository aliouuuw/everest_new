import { v } from "convex/values";
import { mutation, query   } from "./_generated/server";

// User Queries

// Get user by email
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .first();
  },
});

// Get user by ID
export const getUser = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get all users (admin only)
export const getUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

// User Mutations

// Create user
export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    role: v.optional(v.union(
      v.literal("admin"),
      v.literal("editor"),
      v.literal("viewer"),
      v.literal("client")
    )),
  },
  handler: async (ctx, args) => {

    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .first();

    if (existingUser) {
      throw new Error("User already exists");
    }

    return await ctx.db.insert("users", {
      ...args,
      role: args.role || "client",
      createdAt: Date.now(),
    });
  },
});

// Update user
export const updateUser = mutation({
  args: {
    id: v.id("users"),
    name: v.optional(v.string()),
    role: v.optional(v.union(
      v.literal("admin"),
      v.literal("editor"),
      v.literal("viewer"),
      v.literal("client")
    )),
    avatar: v.optional(v.string()),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {

    const { id, ...updates } = args;

    await ctx.db.patch(id, updates);
    return id;
  },
});

// Update last login
export const updateLastLogin = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      lastLogin: Date.now(),
    });

    return args.id;
  },
});

// Delete user
export const deleteUser = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    // Check if user has publications
    const publications = await ctx.db
      .query("publications")
      .filter(q => q.eq(q.field("authorId"), args.id))
      .collect();

    if (publications.length > 0) {
      throw new Error("Cannot delete user with existing publications");
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});
