import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const seedTestUsers = mutation({
  args: {},
  handler: async (ctx) => {
    // Test users with different roles
    const testUsers = [
      {
        email: "admin@company.com",
        name: "Admin User",
        role: "admin" as const,
        password: "admin123"
      },
      {
        email: "editor@company.com",
        name: "Editor User",
        role: "editor" as const,
        password: "editor123"
      },
      {
        email: "client@company.com",
        name: "Client User",
        role: "client" as const,
        password: "client123"
      },
      {
        email: "viewer@company.com",
        name: "Viewer User",
        role: "viewer" as const,
        password: "viewer123"
      }
    ];

    const results = [];
    
    for (const userData of testUsers) {
      // Check if user already exists
      const existingUser = await ctx.db
        .query("users")
        .filter(q => q.eq(q.field("email"), userData.email))
        .first();

      if (!existingUser) {
        // Create user
        await ctx.db.insert("users", {
          email: userData.email,
          name: userData.name,
          role: userData.role,
          createdAt: Date.now(),
        });

        // Note: In production, you would need to properly hash passwords
        // This is just for testing purposes
        console.log(`Created ${userData.role} user: ${userData.email}`);
        results.push({ email: userData.email, role: userData.role, created: true });
      } else {
        console.log(`User already exists: ${userData.email}`);
        results.push({ email: userData.email, role: userData.role, created: false });
      }
    }

    return {
      message: "Seed users process completed",
      results
    };
  },
});

// Helper mutation to update user role (for testing)
export const updateUserRole = mutation({
  args: {
    email: v.string(),
    role: v.union(
      v.literal("admin"),
      v.literal("editor"),
      v.literal("viewer"),
      v.literal("client")
    )
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .first();

    if (!user) {
      throw new Error(`User with email ${args.email} not found`);
    }

    await ctx.db.patch(user._id, { role: args.role });

    return {
      message: `Updated role for ${args.email} to ${args.role}`,
      userId: user._id,
      email: user.email,
      newRole: args.role
    };
  },
});
