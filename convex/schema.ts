import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
 
export default defineSchema({
  ...authTables,
  // Publications Table
  publications: defineTable({
    // Content
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.string(),
    excerpt: v.string(),

    // Categorization
    category: v.union(
      v.literal("revues-hebdo"),
      v.literal("revues-mensuelles"),
      v.literal("teaser-dividende"),
      v.literal("marches"),
      v.literal("analyses")
    ),

    // Status & Workflow
    status: v.union(
      v.literal("draft"),
      v.literal("published"),
      v.literal("archived")
    ),

    // Relationships
    authorId: v.id("users"),
    mediaIds: v.array(v.id("media")), // Linked media files
    attachmentIds: v.array(v.id("media")), // Downloadable attachments

    // Metadata
    tags: v.array(v.string()),
    featured: v.boolean(),
    readingTime: v.optional(v.number()),
    publishedAt: v.optional(v.number()),
    createdAt: v.optional(v.number()), // Made optional for consistency
    updatedAt: v.optional(v.number()), // Made optional for consistency

    // SEO
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    canonicalUrl: v.optional(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_status", ["status"])
    .index("by_author", ["authorId"])
    .index("by_featured", ["featured"])
    .searchIndex("search_content", {
      searchField: "title",
      filterFields: ["status", "category"]
    }),

  // Media Table (Minimal Metadata Only)
  media: defineTable({
    // Uploadthing References
    uploadthingKey: v.string(),     // Unique file identifier
    uploadthingUrl: v.string(),     // Direct CDN URL

    // Essential File Info (from Uploadthing)
    fileName: v.string(),
    fileType: v.string(),           // "image", "video", "document"
    fileSize: v.number(),

    // Custom Metadata (what we add)
    alt: v.optional(v.string()),
    caption: v.optional(v.string()),
    tags: v.array(v.string()),
    order: v.number(),              // Display order in publication

    // Relationships
    publicationId: v.id("publications"),
    uploadedBy: v.id("users"),

    // Timestamps
    createdAt: v.optional(v.number()), // Made optional for consistency
  })
    .index("by_publication", ["publicationId"])
    .index("by_type", ["fileType"])
    .index("by_uploader", ["uploadedBy"]),

  // Users Table
  users: defineTable({
    // Authentication
    email: v.string(),
    name: v.optional(v.string()),

    // Authorization
    role: v.optional(v.union(
      v.literal("admin"),
      v.literal("editor"),
      v.literal("viewer"),
      v.literal("client")
    )),

    // Profile
    avatar: v.optional(v.string()),
    bio: v.optional(v.string()),

    // Activity
    lastLogin: v.optional(v.number()),
    createdAt: v.optional(v.number()), // Made optional for Convex Auth compatibility
  })
    .index("by_email", ["email"]),

  // Categories Table (Metadata)
  categories: defineTable({
    // Identity
    slug: v.string(),
    name: v.string(),

    // Display
    description: v.optional(v.string()),
    color: v.optional(v.string()),
    icon: v.optional(v.string()),

    // Organization
    order: v.number(),
    parentId: v.optional(v.id("categories")), // For subcategories

    // Status
    isActive: v.boolean(),
  })
    .index("by_slug", ["slug"])
    .index("by_order", ["order"]),
});
