# API Endpoints Specification

## 🔌 ConvexDB API Functions

### Overview
The API layer consists of ConvexDB queries and mutations that handle all data operations. The API is designed to be minimal and focused on the CMS requirements.

## 📊 Publications API

### Queries

#### `getPublications`
**Purpose:** Retrieve publications with filtering and pagination
```typescript
export const getPublications = query({
  args: {
    status: v.optional(v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))),
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
    featured: v.optional(v.boolean()),
    authorId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    // Implementation with proper filtering and sorting
  },
});
```

**Response:**
```typescript
{
  publications: Publication[];
  total: number;
  hasMore: boolean;
}
```

#### `getPublicationBySlug`
**Purpose:** Get a single publication by slug
```typescript
export const getPublicationBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    // Return publication with related media
  },
});
```

**Response:**
```typescript
{
  publication: Publication;
  media: Media[];
  author: User;
}
```

#### `searchPublications`
**Purpose:** Full-text search across publications
```typescript
export const searchPublications = query({
  args: {
    query: v.string(),
    category: v.optional(v.string()),
    status: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Full-text search implementation
  },
});
```

### Mutations

#### `createPublication`
**Purpose:** Create a new publication
```typescript
export const createPublication = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    content: v.string(),
    category: v.string(),
    excerpt: v.string(),
    tags: v.array(v.string()),
    featured: v.optional(v.boolean()),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Create publication with proper validation
  },
});
```

**Response:**
```typescript
{
  id: Id<"publications">;
  slug: string;
}
```

#### `updatePublication`
**Purpose:** Update an existing publication
```typescript
export const updatePublication = mutation({
  args: {
    id: v.id("publications"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    content: v.optional(v.string()),
    category: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    featured: v.optional(v.boolean()),
    status: v.optional(v.string()),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Update publication with validation
  },
});
```

## 📸 Media API

### Queries

#### `getPublicationMedia`
**Purpose:** Get all media files for a publication
```typescript
export const getPublicationMedia = query({
  args: { publicationId: v.id("publications") },
  handler: async (ctx, args) => {
    // Return media with optimized URLs
  },
});
```

**Response:**
```typescript
{
  media: Array<{
    id: Id<"media">;
    fileName: string;
    fileType: string;
    displayUrl: string;    // Optimized URL
    thumbnailUrl: string;  // Thumbnail URL
    alt?: string;
    caption?: string;
    order: number;
  }>;
}
```

#### `getMediaStats`
**Purpose:** Get media usage statistics
```typescript
export const getMediaStats = query({
  args: {},
  handler: async (ctx, args) => {
    // Return storage and usage statistics
  },
});
```

### Mutations

#### `linkMediaToPublication`
**Purpose:** Link uploaded media to a publication
```typescript
export const linkMediaToPublication = mutation({
  args: {
    publicationId: v.id("publications"),
    uploadthingKey: v.string(),
    uploadthingUrl: v.string(),
    fileName: v.string(),
    fileType: v.string(),
    fileSize: v.number(),
    alt: v.optional(v.string()),
    caption: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    // Create media record and link to publication
  },
});
```

#### `updateMediaMetadata`
**Purpose:** Update media metadata
```typescript
export const updateMediaMetadata = mutation({
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

## 👥 Users API

### Queries

#### `getCurrentUser`
**Purpose:** Get current authenticated user
```typescript
export const getCurrentUser = query({
  args: {},
  handler: async (ctx, args) => {
    // Return current user information
  },
});
```

#### `getUsers`
**Purpose:** Get users (admin only)
```typescript
export const getUsers = query({
  args: {
    role: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Return users with role filtering
  },
});
```

### Mutations

#### `updateUserProfile`
**Purpose:** Update user profile
```typescript
export const updateUserProfile = mutation({
  args: {
    name: v.optional(v.string()),
    bio: v.optional(v.string()),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Update user profile information
  },
});
```

## 📈 Analytics API

### Queries

#### `getPublicationStats`
**Purpose:** Get publication statistics
```typescript
export const getPublicationStats = query({
  args: {
    publicationId: v.optional(v.id("publications")),
    period: v.optional(v.string()), // "day", "week", "month"
  },
  handler: async (ctx, args) => {
    // Return publication statistics
  },
});
```

#### `getContentAnalytics`
**Purpose:** Get content analytics
```typescript
export const getContentAnalytics = query({
  args: {
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, args) => {
    // Return content analytics data
  },
});
```

## 🔒 Authentication & Authorization

### Middleware Functions

#### `requireAuth`
**Purpose:** Require authenticated user
```typescript
export const requireAuth = async (ctx: MutationContext) => {
  const userId = await ctx.auth.getUserIdentity();
  if (!userId) {
    throw new Error("Authentication required");
  }
  return userId;
};
```

#### `requireRole`
**Purpose:** Require specific user role
```typescript
export const requireRole = async (ctx: MutationContext, requiredRole: string) => {
  const userId = await requireAuth(ctx);
  const user = await ctx.db.get(userId.subject as Id<"users">);

  if (!user || user.role !== requiredRole) {
    throw new Error(`Role ${requiredRole} required`);
  }

  return user;
};
```

## 📊 Real-time Subscriptions

### Publication Updates
```typescript
// Subscribe to publication changes
export const watchPublications = query({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, args) => {
    // Return real-time publication updates
  },
});
```

### Media Updates
```typescript
// Subscribe to media changes for a publication
export const watchPublicationMedia = query({
  args: { publicationId: v.id("publications") },
  handler: async (ctx, args) => {
    // Return real-time media updates
  },
});
```

## 🚨 Error Handling

### Error Types
```typescript
export class CMSError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = "CMSError";
  }
}

export const ERROR_CODES = {
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  UPLOAD_ERROR: "UPLOAD_ERROR",
} as const;
```

### Error Responses
```typescript
{
  error: {
    code: string;
    message: string;
    details?: any;
  }
}
```

## 🔧 Utility Functions

### Slug Generation
```typescript
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};
```

### Reading Time Calculation
```typescript
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};
```

## 📊 Rate Limiting

### API Limits
- Publication creation: 10 per hour per user
- Media uploads: 50 per hour per user
- Search queries: 100 per hour per user
- Admin operations: Unlimited for admin users

### Implementation
```typescript
export const checkRateLimit = async (
  ctx: MutationContext,
  operation: string,
  limit: number,
  windowMs: number
) => {
  // Rate limiting implementation
};
```

## 🔍 Validation Schemas

### Publication Validation
```typescript
import { z } from "zod";

export const publicationSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(500),
  content: z.string().min(1),
  category: z.enum([
    "revues-hebdo",
    "revues-mensuelles",
    "teaser-dividende",
    "marches",
    "analyses"
  ]),
  excerpt: z.string().max(300).optional(),
  tags: z.array(z.string()).max(10),
  featured: z.boolean().optional(),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
});
```

### Media Validation
```typescript
export const mediaSchema = z.object({
  fileName: z.string().min(1).max(255),
  fileType: z.enum(["image", "video", "document"]),
  fileSize: z.number().max(50 * 1024 * 1024), // 50MB
  alt: z.string().max(255).optional(),
  caption: z.string().max(500).optional(),
  tags: z.array(z.string()).max(10).optional(),
});
```

## 📈 Monitoring & Logging

### Request Logging
```typescript
export const logRequest = async (
  ctx: MutationContext,
  operation: string,
  data: any
) => {
  console.log(`[${new Date().toISOString()}] ${operation}`, {
    userId: ctx.auth.getUserIdentity(),
    data,
  });
};
```

### Performance Monitoring
```typescript
export const measurePerformance = async <T>(
  operation: string,
  fn: () => Promise<T>
): Promise<T> => {
  const start = Date.now();
  try {
    const result = await fn();
    const duration = Date.now() - start;
    console.log(`${operation} completed in ${duration}ms`);
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`${operation} failed after ${duration}ms:`, error);
    throw error;
  }
};
```

## 🚀 API Versioning

### Version Strategy
- API functions include version in name when breaking changes occur
- Backward compatibility maintained for 6 months
- Deprecation warnings sent to clients
- Migration guides provided

### Version Examples
```typescript
// Current version
export const getPublications = query({...});

// Future version
export const getPublicationsV2 = query({...});

// Deprecated (with warning)
export const getPublicationsV1 = query({...});
```

## 📚 API Documentation

### OpenAPI Specification
```yaml
openapi: 3.0.3
info:
  title: Everest Finance CMS API
  version: 1.0.0
  description: Content Management System API

servers:
  - url: https://convex.cloud
    description: ConvexDB API

paths:
  /publications:
    get:
      summary: Get publications
      # ... detailed API documentation
```

### SDK Generation
- TypeScript types automatically generated from ConvexDB
- API client libraries for different platforms
- Documentation automatically updated from code comments
