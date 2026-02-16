# Database Schema Specification

## 🗄️ ConvexDB Schema Design

### Overview
The database schema is designed to be minimal and focused, storing only essential metadata and relationships while leveraging Cloudflare R2 and Images API for file storage.

## 📋 Tables

### 1. Publications Table

```typescript
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

  // Metadata
  tags: v.array(v.string()),
  featured: v.boolean(),
  readingTime: v.optional(v.number()),
  publishedAt: v.optional(v.number()),
  createdAt: v.number(),
  updatedAt: v.number(),

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
})
```

### 2. Media Table (Minimal Metadata Only)

```typescript
media: defineTable({
  // Cloudflare References
  cloudflareId: v.string(),       // Unique file identifier in R2/Images
  cloudflareUrl: v.string(),      // Direct CDN URL
  variants: v.optional(v.object({
    thumbnail: v.string(),        // Thumbnail variant URL
    medium: v.string(),           // Medium size variant URL
    large: v.string(),            // Large size variant URL
    webp: v.string(),            // WebP optimized variant URL
  })),

  // Essential File Info (from Cloudflare)
  fileName: v.string(),
  fileType: v.string(),           // "image", "video", "document"
  fileSize: v.number(),
  mimeType: v.string(),           // Full MIME type

  // Custom Metadata (what we add)
  alt: v.optional(v.string()),
  caption: v.optional(v.string()),
  tags: v.array(v.string()),
  order: v.number(),              // Display order in publication

  // Relationships
  publicationId: v.id("publications"),
  uploadedBy: v.id("users"),

  // Timestamps
  createdAt: v.number(),
})
.index("by_publication", ["publicationId"])
.index("by_type", ["fileType"])
.index("by_uploader", ["uploadedBy"])
.index("by_cloudflare_id", ["cloudflareId"])
```

### 3. Users Table

```typescript
users: defineTable({
  // Authentication
  email: v.string(),
  name: v.string(),

  // Authorization
  role: v.union(
    v.literal("admin"),
    v.literal("editor"),
    v.literal("viewer")
  ),

  // Profile
  avatar: v.optional(v.string()),
  bio: v.optional(v.string()),

  // Activity
  lastLogin: v.optional(v.number()),
  createdAt: v.number(),
})
.index("by_email", ["email"])
```

### 4. Categories Table (Metadata)

```typescript
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
.index("by_order", ["order"])
```

## 🔍 Queries

### Publication Queries

```typescript
// Get all publications with filters
export const getPublications = query({
  args: {
    status: v.optional(v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))),
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Implementation with proper filtering and pagination
  },
});

// Get publication by slug
export const getPublicationBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    // Return publication with related media
  },
});

// Search publications
export const searchPublications = query({
  args: {
    query: v.string(),
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Full-text search implementation
  },
});
```

### Media Queries

```typescript
// Get media for a publication
export const getPublicationMedia = query({
  args: { publicationId: v.id("publications") },
  handler: async (ctx, args) => {
    // Return media with Uploadthing URLs
  },
});

// Get media by type
export const getMediaByType = query({
  args: {
    fileType: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Filter media by type
  },
});
```

## ✏️ Mutations

### Publication Mutations

```typescript
// Create publication
export const createPublication = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    content: v.string(),
    category: v.string(),
    excerpt: v.string(),
    tags: v.array(v.string()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Create publication with proper validation
  },
});

// Update publication
export const updatePublication = mutation({
  args: {
    id: v.id("publications"),
    // ... fields to update
  },
  handler: async (ctx, args) => {
    // Update with proper validation and timestamps
  },
});

// Delete publication
export const deletePublication = mutation({
  args: { id: v.id("publications") },
  handler: async (ctx, args) => {
    // Soft delete or hard delete with cleanup
  },
});
```

### Media Mutations

```typescript
// Link uploaded file to publication
export const linkMediaToPublication = mutation({
  args: {
    publicationId: v.id("publications"),
    cloudflareId: v.string(),
    cloudflareUrl: v.string(),
    fileName: v.string(),
    fileType: v.string(),
    fileSize: v.number(),
    mimeType: v.string(),
    variants: v.optional(v.object({
      thumbnail: v.string(),
      medium: v.string(),
      large: v.string(),
      webp: v.string(),
    })),
    alt: v.optional(v.string()),
    caption: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    // Create media record and link to publication
  },
});

// Update media metadata
export const updateMedia = mutation({
  args: {
    id: v.id("media"),
    alt: v.optional(v.string()),
    caption: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Update media metadata only
  },
});
```

## 🔒 Security & Validation

### Authentication Checks
- All mutations require authenticated user
- Role-based access control
- User can only modify their own content (except admins)

### Data Validation
- Required fields validation
- String length limits
- Array size limits
- URL format validation
- Slug uniqueness validation

### File Validation (Handled by Uploadthing)
- File type restrictions
- Size limits
- Malware scanning
- Content validation

## 📊 Indexes & Performance

### Current Indexes
- `publications.by_slug` - Fast slug lookups
- `publications.by_category` - Category filtering
- `publications.by_status` - Status filtering
- `publications.by_author` - Author filtering
- `publications.by_featured` - Featured content
- `media.by_publication` - Publication media lookup
- `media.by_type` - File type filtering

### Search Indexes
- `publications.search_content` - Full-text search on titles
- Filter by status and category in search

### Query Optimization
- Use pagination for large result sets
- Implement cursor-based pagination
- Cache frequently accessed data
- Use selective field queries

## 🔄 Migrations

### Version 1.0 (Initial)
- Basic publications and media tables
- Essential indexes
- Core CRUD operations

### Future Migrations
- Add analytics tracking
- Implement content versioning
- Add collaborative editing
- Support for scheduled publishing

## 📈 Monitoring & Analytics

### Database Metrics
- Query performance
- Storage usage
- Real-time connection count
- Error rates

### Content Metrics
- Publication views
- Popular categories
- Upload frequency
- Storage growth

## 🚀 Deployment Considerations

### Environment Variables
```bash
CONVEX_URL=your_convex_url
UPLOADTHING_SECRET=your_secret
UPLOADTHING_APP_ID=your_app_id
```

### Backup Strategy
- ConvexDB automatic backups
- Uploadthing file redundancy
- Regular data exports
- Disaster recovery plan

### Scaling
- ConvexDB handles scaling automatically
- Uploadthing scales with usage
- Monitor costs and usage patterns
- Plan for growth
