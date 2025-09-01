import { ConvexError, v  } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get current authenticated user
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    // Temporarily disable auth checks for testing
    // TODO: Re-enable authentication
    /*
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    // Get user from our users table
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), identity.email))
      .first();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
    */

    // Return mock user for testing
    return {
      _id: "mock-user-id",
      name: "Test User",
      email: "test@example.com",
      role: "admin",
      createdAt: Date.now(),
    };
  },
});

// Create user on first login (called from client)
export const createUserOnLogin = mutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Temporarily disable auth checks for testing
    // TODO: Re-enable authentication
    /*
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), identity.email))
      .first();

    if (existingUser) {
      return existingUser;
    }

    // Create new user with viewer role by default
    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      role: "viewer",
      createdAt: Date.now(),
    });

    return await ctx.db.get(userId);
    */

    // Create mock user for testing
    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      role: "viewer",
      createdAt: Date.now(),
    });

    return await ctx.db.get(userId);
  },
});

// Check if user has admin role
export const requireAdmin = async (ctx: any) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new ConvexError("Not authenticated");
  }

  const user = await ctx.db
    .query("users")
    .filter((q: { eq: (arg0: any, arg1: any) => any; field: (arg0: string) => any; }) => q.eq(q.field("email"), identity.email))
    .first();

  if (!user || user.role !== "admin") {
    throw new ConvexError("Admin access required");
  }

  return { user, identity };
};

// Check if user has editor role or higher
export const requireEditor = async (ctx: any) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new ConvexError("Not authenticated");
  }

  const user = await ctx.db
    .query("users")
    .filter((q: { eq: (arg0: any, arg1: any) => any; field: (arg0: string) => any; }) => q.eq(q.field("email"), identity.email))
    .first();

  if (!user || !["admin", "editor"].includes(user.role)) {
    throw new ConvexError("Editor access required");
  }

  return { user, identity };
};

// Check if user has viewer role or higher (any authenticated user)
export const requireViewer = async (ctx: any) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new ConvexError("Not authenticated");
  }

  const user = await ctx.db
    .query("users")
    .filter((q: { eq: (arg0: any, arg1: any) => any; field: (arg0: string) => any; }) => q.eq(q.field("email"), identity.email))
    .first();

  if (!user) {
    throw new ConvexError("User not found");
  }

  return { user, identity };
};
