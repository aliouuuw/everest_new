# API Endpoints Specification

## 📋 Overview

This document outlines the API endpoints for the Everest Finance CMS system. The API is built on ConvexDB and provides real-time data synchronization with comprehensive CRUD operations.

## 🚨 Current Status: 90% Complete with Critical Gaps

**API Status**: The core API is fully functional with complete CRUD operations for publications, users, media, and categories. However, **file upload endpoints are completely non-functional** due to placeholder Uploadthing integration.

**Critical Issues**:
- ❌ File upload endpoints return errors or don't exist
- ❌ Media management API cannot handle actual file uploads
- ❌ Webhook handlers for file processing are missing

## 🏗️ Architecture Overview

### Technology Stack
- **Backend**: ConvexDB (real-time database)
- **API Layer**: ConvexDB functions with TypeScript
- **Authentication**: Convex Auth with role-based access control
- **File Storage**: Uploadthing (currently non-functional)
- **Real-time**: WebSocket connections via ConvexDB

### API Structure
```
convex/
├── publications.ts     # ✅ Complete publication CRUD
├── users.ts           # ✅ Complete user management
├── media.ts           # ✅ Complete media metadata API
├── categories.ts      # ✅ Complete category management
├── auth.ts            # ✅ Authentication utilities
├── uploadthing.ts     # ❌ Placeholder configuration only
└── api/
    └── uploadthing.ts # ❌ Missing webhook handler
```

## 📊 API Endpoints Status

| Category | Endpoints | Status | Critical Issues |
|----------|-----------|--------|-----------------|
| **Publications** | 6 endpoints | ✅ Complete | None |
| **Users** | 7 endpoints | ✅ Complete | None |
| **Media** | 6 endpoints | ✅ Complete | File uploads broken |
| **Categories** | 6 endpoints | ✅ Complete | None |
| **Authentication** | 4 endpoints | ✅ Complete | None |
| **File Uploads** | 0 endpoints | ❌ Missing | **BLOCKING PRODUCTION** |

## 📚 Publications API

### ✅ Complete Implementation

#### Get Publications
```typescript
// GET /api/publications/getPublications
export const getPublications = query({
  args: {
    status?: "draft" | "published" | "archived";
    category?: string;
    limit?: number;
    offset?: number;
    featured?: boolean;
  },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Status filtering (draft, published, archived)
- ✅ Category filtering
- ✅ Pagination support
- ✅ Featured content filtering
- ✅ Real-time updates

#### Get Publication by ID
```typescript
// GET /api/publications/getPublicationById
export const getPublicationById = query({
  args: { id: v.id("publications") },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Full publication data retrieval
- ✅ Associated media files
- ✅ Author information
- ✅ Error handling for missing publications

#### Get Publication by Slug
```typescript
// GET /api/publications/getPublicationBySlug
export const getPublicationBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ SEO-friendly URL support
- ✅ Complete publication data
- ✅ Media and author information
- ✅ Used by public pages

#### Search Publications
```typescript
// GET /api/publications/searchPublications
export const searchPublications = query({
  args: { 
    query: v.string();
    category?: string;
  },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Full-text search in titles and content
- ✅ Category-based filtering
- ✅ Search index optimization
- ✅ Real-time search results

#### Create Publication
```typescript
// POST /api/publications/createPublication
export const createPublication = mutation({
  args: {
    title: v.string();
    slug: v.string();
    description: v.string();
    content: v.string();
    excerpt: v.string();
    category: v.union(/* category types */);
    status: v.union("draft" | "published" | "archived");
    featured: v.boolean();
    tags: v.array(v.string());
    authorId: v.id("users");
  },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Complete validation
- ✅ Author assignment
- ✅ Automatic timestamps
- ✅ Role-based access control (admin/editor only)

#### Update Publication
```typescript
// PUT /api/publications/updatePublication
export const updatePublication = mutation({
  args: {
    id: v.id("publications");
    /* All publication fields optional for updates */
  },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Partial updates supported
- ✅ Validation and error handling
- ✅ Role-based access control
- ✅ Automatic timestamp updates

#### Delete Publication
```typescript
// DELETE /api/publications/deletePublication
export const deletePublication = mutation({
  args: { id: v.id("publications") },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Soft delete support
- ✅ Associated media cleanup
- ✅ Role-based access control
- ✅ Confirmation required

## 👥 Users API

### ✅ Complete Implementation

#### Get Current User
```typescript
// GET /api/users/getCurrentUser
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Authentication state integration
- ✅ Complete user profile data
- ✅ Role and permission information
- ✅ Used by protected routes

#### Get User by Email
```typescript
// GET /api/users/getUserByEmail
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Email-based user lookup
- ✅ Authentication integration
- ✅ Error handling for missing users

#### Get User by ID
```typescript
// GET /api/users/getUser
export const getUser = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ ID-based user retrieval
- ✅ Complete user data
- ✅ Error handling

#### Get All Users (Admin Only)
```typescript
// GET /api/users/getUsers
export const getUsers = query({
  handler: async (ctx) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Complete user list
- ✅ Admin-only access
- ✅ Real-time updates

#### Create User
```typescript
// POST /api/users/createUser
export const createUser = mutation({
  args: {
    email: v.string();
    name: v.string();
    role?: v.union("admin" | "editor" | "viewer" | "client");
  },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Email validation
- ✅ Role assignment (defaults to "client")
- ✅ Duplicate email prevention
- ✅ Automatic timestamps

#### Update User
```typescript
// PUT /api/users/updateUser
export const updateUser = mutation({
  args: {
    id: v.id("users");
    /* All user fields optional for updates */
  },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Partial updates supported
- ✅ Role modification
- ✅ Profile updates
- ✅ Validation and error handling

#### Update Last Login
```typescript
// PUT /api/users/updateLastLogin
export const updateLastLogin = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Automatic login tracking
- ✅ Authentication integration
- ✅ Performance optimized

#### Delete User
```typescript
// DELETE /api/users/deleteUser
export const deleteUser = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ User removal
- ✅ Associated data cleanup
- ✅ Admin-only access
- ✅ Confirmation required

## 🖼️ Media API

### ✅ Complete Implementation (Metadata Only)

#### Get All Media
```typescript
// GET /api/media/getMedia
export const getMedia = query({
  handler: async (ctx) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Complete media list
- ✅ Metadata retrieval
- ✅ Real-time updates
- ⚠️ **No file content** (only metadata)

#### Get Publication Media
```typescript
// GET /api/media/getPublicationMedia
export const getPublicationMedia = query({
  args: { publicationId: v.id("publications") },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Publication-specific media
- ✅ Ordered display support
- ✅ Metadata and relationships
- ⚠️ **No file content** (only metadata)

#### Get Media by Type
```typescript
// GET /api/media/getMediaByType
export const getMediaByType = query({
  args: { fileType: v.string() },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Type-based filtering
- ✅ Performance optimized
- ✅ Real-time updates
- ⚠️ **No file content** (only metadata)

#### Link Media to Publication
```typescript
// POST /api/media/linkMediaToPublication
export const linkMediaToPublication = mutation({
  args: {
    uploadthingKey: v.string();
    uploadthingUrl: v.string();
    fileName: v.string();
    fileType: v.string();
    fileSize: v.number();
    publicationId: v.id("publications");
    uploadedBy: v.id("users");
    /* Optional metadata fields */
  },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Media linking
- ✅ Metadata storage
- ✅ Relationship management
- ⚠️ **No actual file upload** (manual linking only)

#### Update Media
```typescript
// PUT /api/media/updateMedia
export const updateMedia = mutation({
  args: {
    id: v.id("media");
    /* All media fields optional for updates */
  },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Metadata updates
- ✅ Relationship management
- ✅ Validation and error handling

#### Delete Media
```typescript
// DELETE /api/media/deleteMedia
export const deleteMedia = mutation({
  args: { id: v.id("media") },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Media removal
- ✅ Relationship cleanup
- ✅ Confirmation required

#### Update Media Order
```typescript
// PUT /api/media/updateMediaOrder
export const updateMediaOrder = mutation({
  args: {
    mediaIds: v.array(v.id("media"));
  },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Order management
- ✅ Batch updates
- ✅ Performance optimized

## 🏷️ Categories API

### ✅ Complete Implementation

#### Get All Categories
```typescript
// GET /api/categories/getCategories
export const getCategories = query({
  handler: async (ctx) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Complete category list
- ✅ Ordered display
- ✅ Active status filtering
- ✅ Real-time updates

#### Get Category by Slug
```typescript
// GET /api/categories/getCategoryBySlug
export const getCategoryBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Slug-based lookup
- ✅ Complete category data
- ✅ Error handling

#### Create Category
```typescript
// POST /api/categories/createCategory
export const createCategory = mutation({
  args: {
    slug: v.string();
    name: v.string();
    description?: v.string();
    color?: v.string();
    icon?: v.string();
    order: v.number();
    parentId?: v.id("categories");
    isActive: v.boolean();
  },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Complete validation
- ✅ Hierarchical support
- ✅ Visual customization
- ✅ Order management

#### Update Category
```typescript
// PUT /api/categories/updateCategory
export const updateCategory = mutation({
  args: {
    id: v.id("categories");
    /* All category fields optional for updates */
  },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Partial updates
- ✅ Validation
- ✅ Error handling

#### Delete Category
```typescript
// DELETE /api/categories/deleteCategory
export const deleteCategory = mutation({
  args: { id: v.id("categories") },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Category removal
- ✅ Relationship cleanup
- ✅ Confirmation required

#### Update Category Order
```typescript
// PUT /api/categories/updateCategoryOrder
export const updateCategoryOrder = mutation({
  args: {
    categoryIds: v.array(v.id("categories"));
  },
  handler: async (ctx, args) => { /* Implementation complete */ }
});
```

**Features**:
- ✅ Order management
- ✅ Batch updates
- ✅ Performance optimized

## 🔐 Authentication API

### ✅ Complete Implementation

#### Authentication Provider
```typescript
// Configured in convex/auth.ts
export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
  callbacks: {
    async createOrUpdateUser(ctx, args) { /* Implementation complete */ }
  },
});
```

**Features**:
- ✅ Password-based authentication
- ✅ User creation/update callbacks
- ✅ Role assignment (default: "client")
- ✅ Session management

#### Sign In
```typescript
// POST /api/auth/signIn
export const signIn = auth.signIn;
```

**Features**:
- ✅ Email/password authentication
- ✅ Role-based navigation
- ✅ Session establishment
- ✅ Error handling

#### Sign Out
```typescript
// POST /api/auth/signOut
export const signOut = auth.signOut;
```

**Features**:
- ✅ Session termination
- ✅ State cleanup
- ✅ Navigation to auth page

#### Authentication State
```typescript
// GET /api/auth/isAuthenticated
export const isAuthenticated = auth.isAuthenticated;
```

**Features**:
- ✅ Authentication status
- ✅ Real-time updates
- ✅ Protected route integration

## 🚨 Critical Gap: File Upload API

### ❌ Missing Implementation

#### Current State
The file upload system is completely non-functional with only placeholder configurations:

1. **`convex/uploadthing.ts`** - Placeholder configuration only
2. **`src/utils/uploadthing.ts`** - Placeholder utilities only
3. **`convex/api/uploadthing.ts`** - Missing webhook handler

#### Required Endpoints

##### File Upload Router
```typescript
// MISSING: convex/uploadthing.ts
export const uploadRouter = createUploadthing({
  f: {
    publicationImage: {
      image: { maxFileSize: "4MB" };
    },
    mediaFile: {
      image: { maxFileSize: "4MB" };
      video: { maxFileSize: "16MB" };
      "application/pdf": { maxFileSize: "8MB" };
    },
  },
});
```

##### Webhook Handler
```typescript
// MISSING: convex/api/uploadthing.ts
export const handleUploadthingWebhook = httpAction({
  handler: async (ctx, request) => {
    // Handle file upload completion
    // Update media table
    // Trigger notifications
  },
});
```

##### File Upload Components
```typescript
// MISSING: Functional upload components
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
```

## 📊 API Performance & Optimization

### ✅ Implemented Optimizations

#### Database Indexes
- **Publications**: slug, category, status, author, featured
- **Media**: publication, type, uploader
- **Users**: email
- **Categories**: slug, order

#### Search Optimization
- **Full-text search** on publication titles
- **Filtered search** by status and category
- **Real-time updates** via ConvexDB subscriptions

#### Query Optimization
- **Pagination** for large datasets
- **Selective field loading** for performance
- **Relationship preloading** for complex queries

### 🔄 Planned Optimizations

#### File Upload Performance
- **Chunked uploads** for large files
- **Image optimization** and resizing
- **CDN delivery** optimization
- **Upload progress** tracking

#### Caching Strategy
- **Query result caching** for static data
- **Media URL caching** for performance
- **User session caching** for authentication

## 🔒 Security & Access Control

### ✅ Implemented Security

#### Role-Based Access Control
- **Admin**: Full system access
- **Editor**: Content management only
- **Viewer**: Read-only access
- **Client**: Limited access

#### API Security
- **Authentication required** for all mutations
- **Role validation** for sensitive operations
- **Input validation** and sanitization
- **Error message sanitization**

#### Protected Routes
- **Admin routes** require admin/editor role
- **Client routes** require authentication
- **Public routes** accessible to all

### 🔄 Planned Security Enhancements

#### File Upload Security
- **File type validation** and scanning
- **Virus scanning** for uploaded files
- **File size limits** and quotas
- **Access control** for file downloads

## 📝 Error Handling & Validation

### ✅ Implemented Error Handling

#### API Error Responses
- **Validation errors** with field-specific messages
- **Authentication errors** with proper HTTP status
- **Permission errors** with role requirements
- **Database errors** with user-friendly messages

#### Input Validation
- **Type validation** using ConvexDB schemas
- **Required field validation** for mutations
- **Format validation** for emails, URLs, etc.
- **Business rule validation** for complex operations

### 🔄 Planned Error Handling

#### File Upload Errors
- **Upload failure** handling and retry
- **File type rejection** with user feedback
- **Size limit exceeded** with clear messaging
- **Network error** handling and recovery

## 🧪 Testing Strategy

### ✅ Current Testing

#### API Testing
- **ConvexDB function testing** in development
- **Manual API testing** via admin interface
- **Real-time functionality** testing
- **Authentication flow** testing

### 🔄 Planned Testing

#### Comprehensive Testing
- **Unit tests** for all API functions
- **Integration tests** for complete workflows
- **End-to-end tests** for user scenarios
- **Performance tests** for large datasets
- **Security tests** for access control

## 🚀 Deployment & Production

### ✅ Development Environment

#### Local Development
- **ConvexDB dev server** with `npm run convex:dev`
- **React dev server** with `npm run dev`
- **Concurrent development** with `npm run cms:dev`
- **Hot reload** for both frontend and backend

### 🔄 Production Deployment

#### Production Setup
- **ConvexDB deployment** with `npm run convex:deploy`
- **Environment configuration** for production
- **File upload configuration** for production
- **Performance monitoring** and logging

## 📊 API Usage Examples

### Frontend Integration

#### Using Publications API
```typescript
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';

// Get publications
const publications = useQuery(api.publications.getPublications, {
  status: 'published',
  limit: 10
});

// Create publication
const createPublication = useMutation(api.publications.createPublication);
const handleCreate = async (data) => {
  await createPublication(data);
};
```

#### Using Media API
```typescript
// Get publication media
const media = useQuery(api.media.getPublicationMedia, {
  publicationId: publicationId
});

// Link media to publication
const linkMedia = useMutation(api.media.linkMediaToPublication);
const handleLink = async (fileData) => {
  await linkMedia({
    ...fileData,
    publicationId: publicationId,
    uploadedBy: currentUser._id
  });
};
```

## 🎯 Next Steps

### IMMEDIATE PRIORITY (This Week)
1. **Implement File Upload API** ❌ CRITICAL
   - Set up Uploadthing server configuration
   - Create webhook handlers
   - Test file upload flow

2. **Verify API Functionality**
   - Test all existing endpoints
   - Verify authentication and authorization
   - Check real-time functionality

### HIGH PRIORITY (Next 2 Weeks)
1. **Complete File Upload Integration**
   - Connect uploads to media API
   - Implement file management
   - Add upload progress tracking

2. **API Testing & Documentation**
   - Comprehensive endpoint testing
   - API documentation updates
   - Performance optimization

## 📞 Support & Troubleshooting

### Common Issues

#### Authentication Problems
- **Check environment variables** for ConvexDB URL
- **Verify user roles** are properly assigned
- **Check protected route** configuration

#### Real-time Issues
- **Verify ConvexDB connection** is active
- **Check subscription** setup in components
- **Monitor network** connectivity

#### File Upload Issues
- **Uploadthing integration** is currently broken
- **Focus development** on fixing this critical gap
- **Test with placeholder** data until resolved

### Getting Help

#### Development Support
- **ConvexDB documentation** for API functions
- **Uploadthing documentation** for file handling
- **React community** for frontend integration

#### Project Support
- **Team collaboration** for technical issues
- **Code review** for implementation guidance
- **Documentation updates** for API changes

---

**⚠️ CRITICAL NOTE**: The API is 90% complete and fully functional for content management. However, file uploads are completely broken due to missing Uploadthing integration. This is the only blocker preventing production use of the CMS. Focus 100% of development effort on implementing the missing file upload endpoints.
