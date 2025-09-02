import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
  callbacks: {
    async createOrUpdateUser(ctx, args) {
      // Extract user info from the args
      const { existingUserId, profile } = args;
      
      if (existingUserId) {
        // Update existing user
        return existingUserId;
      }
      
      // Create new user with required fields
      const userId = await ctx.db.insert("users", {
        email: profile.email as string,
        name: (profile.name as string) || (profile.email as string).split('@')[0], // Use email prefix as fallback name
        role: "client", // Default role for regular users
        createdAt: Date.now(),
      });
      
      return userId;
    },
  },
});
