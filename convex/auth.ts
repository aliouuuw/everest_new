import { v } from "convex/values";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
});

// Store function to handle user creation and updates
export const storeUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), identity.email))
      .first();

    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        lastLogin: Date.now(),
      });
      return existingUser._id;
    }

    // Create new user with required fields
    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      role: "admin", // Default role for new users
      createdAt: Date.now(),
      lastLogin: Date.now(),
    });

    return userId;
  },
});

// Function to ensure user has all required fields after Convex Auth creates them
export const ensureUserProfile = mutation({
  args: {},
  handler: async (ctx) => {
    try {
      const identity = await ctx.auth.getUserIdentity();
      console.log('ensureUserProfile: identity check', { hasIdentity: !!identity, email: identity?.email });
      
      if (!identity) {
        throw new Error("Not authenticated");
      }

      // Find the user that Convex Auth created
      let user = await ctx.db
        .query("users")
        .filter(q => q.eq(q.field("email"), identity.email))
        .first();

      console.log('ensureUserProfile: user lookup', { foundUser: !!user, userEmail: user?.email });

      if (!user) {
        throw new Error("User not found");
      }

      // Ensure all required fields are set
      const updates: any = {};
      
      if (!user.createdAt) {
        updates.createdAt = Date.now();
      }
      
      if (!user.lastLogin) {
        updates.lastLogin = Date.now();
      }
      
      // Set name if not provided (use email prefix)
      if (!user.name && identity.email) {
        updates.name = identity.email.split('@')[0];
      }
      
      // Set role if not provided (default to admin for now)
      if (!user.role) {
        updates.role = "admin";
      }

      console.log('ensureUserProfile: updates needed', { updatesCount: Object.keys(updates).length, updates });

      // Update user if needed
      if (Object.keys(updates).length > 0) {
        await ctx.db.patch(user._id, updates);
        user = await ctx.db.get(user._id);
        console.log('ensureUserProfile: user updated', { userId: user?._id });
      }

      return user;
    } catch (error) {
      console.error('ensureUserProfile error:', error);
      throw error;
    }
  },
});

// Get current authenticated user
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      // Return null instead of throwing error for unauthenticated users
      return null;
    }

    // Get user from our users table
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), identity.email))
      .first();

    if (!user) {
      // Return null instead of throwing error for users not in our database
      return null;
    }

    // Check if user has all required fields
    if (!user.createdAt || !user.lastLogin) {
      // User is missing required fields, but we can't call mutations from queries
      // The client should call ensureUserProfile after getting the user
      console.warn('User missing required fields:', user);
    }

    return user;
  },
});

// Create user on first login (called from client)
export const createUserOnLogin = mutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null; // Return null instead of throwing error
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
      role: "admin",
      createdAt: Date.now(),
    });

    return await ctx.db.get(userId);
  },
});

// Check if user has admin role
export const requireAdmin = async (ctx: any) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null; // Return null instead of throwing error
  }

  const user = await ctx.db
    .query("users")
    .filter((q: { eq: (arg0: any, arg1: any) => any; field: (arg0: string) => any; }) => q.eq(q.field("email"), identity.email))
    .first();

  if (!user || user.role !== "admin") {
    return null; // Return null instead of throwing error
  }

  return { user, identity };
};

// Check if user has editor role or higher
export const requireEditor = async (ctx: any) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null; // Return null instead of throwing error
  }

  const user = await ctx.db
    .query("users")
    .filter((q: { eq: (arg0: any, arg1: any) => any; field: (arg0: string) => any; }) => q.eq(q.field("email"), identity.email))
    .first();

  if (!["admin", "editor"].includes(user.role)) {
    return null; // Return null instead of throwing error
  }

  return { user, identity };
};

// Check if user has viewer role or higher (any authenticated user)
export const requireViewer = async (ctx: any) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null; // Return null instead of throwing error
  }

  const user = await ctx.db
    .query("users")
    .filter((q: { eq: (arg0: any, arg1: any) => any; field: (arg0: string) => any; }) => q.eq(q.field("email"), identity.email))
    .first();

  if (!user) {
    return null; // Return null instead of throwing error
  }

  return { user, identity };
};
