import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import {  query } from "convex/_generated/server";
import type {QueryCtx} from "convex/_generated/server";
import type { Id } from "convex/_generated/dataModel";

// Helper function to get user data
async function getUserData(ctx: QueryCtx, userId: Id<"users">) {
  return await ctx.db.get(userId);
}

export const getCurrentUser = query({
  args: {},
  handler: async (ctx: QueryCtx) => {
    try {
      const userId = await getAuthUserId(ctx);
      if (!userId) {
        return null;
      }

      const user = await getUserData(ctx, userId);
      if (!user) {
        return null;
      }

      return {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      };
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },
});

export const getUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx: QueryCtx, args: { userId: Id<"users"> }) => {
    try {
      const user = await getUserData(ctx, args.userId);
      if (!user) {
        return null;
      }

      return {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      };
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  },
});
