import { ConvexError } from "convex/values";

// Temporary auth function - we'll implement proper authentication later
export const auth = async () => {
  // For now, return a mock user
  // In production, this will integrate with your authentication provider
  return {
    userId: "user-1",
    role: "admin" as const,
  };
};

// Check if user has admin role
export const requireAdmin = async () => {
  const user = await auth();
  if (user.role !== "admin") {
    throw new ConvexError("Admin access required");
  }
  return user;
};

// Check if user has editor role or higher
export const requireEditor = async () => {
  const user = await auth();
  if (!["admin", "editor"].includes(user.role)) {
    throw new ConvexError("Editor access required");
  }
  return user;
};
