# Everest Finance Landing Page - Technical Documentation

> **Prepared for:** Management & IT Security Teams  
> **Project:** Everest Finance SGI Landing Page with CMS  
> **Date:** March 2026  
> **Classification:** Internal Technical Documentation  
> **Status:** Based on Actual Code Analysis

---

## Executive Summary

This document provides an technical overview based on actual code inspection. Unlike the previous version which made assumptions, this documentation reflects the **current implementation state** as found in the codebase.

**Key Finding:** The file upload system has **partially implemented** Cloudflare R2 + Images API integration. Backend code exists with real AWS S3 SDK integration, but HTTP routes are **not registered**, meaning the upload feature is currently non-functional.

---

## 1. Actual Project Architecture (Verified)

### 1.1 Technology Stack (What's Actually Used)

| Layer | Technology | Status | Notes |
|-------|-----------|--------|-------|
| **Frontend** | React 19 + TypeScript | ✅ Active | Modern React with hooks |
| **Routing** | TanStack Router | ✅ Active | File-based routing configured |
| **Styling** | Tailwind CSS 4 | ✅ Active | Custom design tokens implemented |
| **Animations** | GSAP + Lenis | ✅ Active | Scroll animations working |
| **3D Graphics** | Three.js | ✅ Active | Hero section WebGL effects |
| **Backend** | Convex | ✅ Active | Serverless database + functions |
| **Auth** | @convex-dev/auth | ✅ Active | JWT-based with role system |
| **File Storage** | Cloudflare R2 | ⚠️ **Partial** | Backend code exists, routes not wired |
| **Image CDN** | Cloudflare Images | ⚠️ **Partial** | Backend code exists, routes not wired |
| **Build Tool** | Vite 6 | ✅ Active | Optimized build configuration |
| **Package Manager** | Bun | ✅ Active | Per user preference |

### 1.2 What's NOT Actually Used (Despite Being in package.json)

- **Uploadthing** - Listed in dependencies but NO usage found in code
- **AWS SDK** - Listed but only used indirectly via Cloudflare R2 compatibility
- **@uploadthing/react** - Installed but not imported anywhere

---

## 2. File Storage Implementation Status

### 2.1 Current Implementation (The Real State)

```
┌─────────────────────────────────────────────────────────────────┐
│                    FILE UPLOAD FLOW                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Frontend                    Backend                    Cloudflare
│  ────────                    ───────                    ─────────
│                                                                 │
│  uploadMediaFile()     →    ⚠️ MISSING              →   (unreachable)
│       │                         │                              
│       │    POST /api/cloudflare/upload                        
│       └───────────────────→  ⚠️ NOT REGISTERED     
│                                in http.ts                       
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  BACKEND CODE EXISTS (convex/api/cloudflare.ts):        │   │
│  │  • uploadToCloudflare (httpAction) - handles uploads    │   │
│  │  • AWS S3 SDK for R2 integration                        │   │
│  │  • Cloudflare Images API with fetch()                   │   │
│  │  • Environment variables defined                        │   │
│  │                                                         │   │
│  │  PROBLEM: Routes NOT registered in convex/http.ts       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Backend Implementation (Exists but Unreachable)

**File:** `@/Users/aliouwade/Documents/everest_finance/new_lp/convex/api/cloudflare.ts`

The following **real implementation** exists:

1. **AWS S3 SDK Integration for R2:**
   ```typescript
   import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
   import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
   
   // Actual S3 client configuration for Cloudflare R2
   const s3Client = new S3Client({
     region: "auto",
     endpoint: `https://${process.env.CONVEX_CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
     credentials: { ... }
   });
   ```

2. **Cloudflare Images API Integration:**
   ```typescript
   // Real fetch() call to Cloudflare Images API
   const response = await fetch(
     `https://api.cloudflare.com/client/v4/accounts/${process.env.CONVEX_CLOUDFLARE_ACCOUNT_ID}/images/v1`,
     {
       method: 'POST',
       headers: {
         Authorization: `Bearer ${process.env.CONVEX_CLOUDFLARE_IMAGES_API_TOKEN}`,
       },
       body: formData,
     }
   );
   ```

3. **HTTP Actions Defined but Not Registered:**
   - `uploadToCloudflare` - httpAction for file uploads
   - `cloudflareImagesWebhook` - httpAction for webhooks
   - `deleteFile` - httpAction for deletions
   - `getUsageStats` - httpAction for statistics

### 2.3 The Actual Problem

**File:** `@/Users/aliouwade/Documents/everest_finance/new_lp/convex/http.ts`

```typescript
import { httpRouter } from "convex/server";
import { auth } from "./auth";

const http = httpRouter();

auth.addHttpRoutes(http);  // ← ONLY auth routes registered
// ⚠️ MISSING: Cloudflare routes not added!

export default http;
```

**Missing Registration:**
```typescript
// This should be in http.ts but isn't:
import { uploadToCloudflare } from "./api/cloudflare";
http.route({
  path: "/api/cloudflare/upload",
  method: "POST",
  handler: uploadToCloudflare,
});
```

### 2.4 Frontend Expectations

**File:** `@/Users/aliouwade/Documents/everest_finance/new_lp/src/utils/cloudflare.ts`

```typescript
export const uploadToR2 = async (file: File, fileType: string) => {
  const convexUrl = import.meta.env.VITE_CONVEX_SITE_URL;
  
  // Frontend expects this endpoint to exist:
  const response = await fetch(`${convexUrl}/api/cloudflare/upload`, {
    method: 'POST',
    body: formData,
  });
  // ...
};
```

**Result:** Upload attempts will fail with 404 errors because the endpoint doesn't exist.

---

## 3. Database Schema (Actual Implementation)

### 3.1 Fully Implemented Tables

| Table | Status | Purpose |
|-------|--------|---------|
| **publications** | ✅ Complete | Content articles with categories |
| **media** | ✅ Complete | File metadata (references Cloudflare IDs) |
| **users** | ✅ Complete | User accounts with roles |
| **categories** | ✅ Complete | Publication categories |
| **uploadSessions** | ✅ Complete | Track upload progress |
| **auth tables** | ✅ Complete | Convex Auth managed |

### 3.2 Media Table Schema

```typescript
media: defineTable({
  cloudflareId: v.string(),      // R2 file key or Images API ID
  cloudflareUrl: v.string(),     // CDN URL
  variants: v.optional(v.object({
    thumbnail: v.string(),
    medium: v.string(),
    large: v.string(),
    webp: v.string(),
  })),
  fileName: v.string(),
  fileType: v.string(),          // "image", "video", "document"
  fileSize: v.number(),
  mimeType: v.string(),
  // ... relationships and metadata
})
```

**Note:** The schema stores Cloudflare references, but the upload mechanism to populate these fields is not functional.

---

## 4. Authentication & Authorization

### 4.1 Actually Working Components

| Component | Status | Implementation |
|-----------|--------|----------------|
| **Login/Logout** | ✅ Working | Convex Auth with email/password |
| **JWT Tokens** | ✅ Working | Automatic token management |
| **Role System** | ✅ Working | Admin, Editor, Viewer, Client roles |
| **Protected Routes** | ✅ Working | Route guards implemented |
| **Admin Dashboard** | ✅ Working | Publications, Media, Settings pages |

### 4.2 Role-Based Access Control

**File:** `@/Users/aliouwade/Documents/everest_finance/new_lp/convex/publications.ts`

```typescript
// Publications use role-based authorization
const user = await ctx.db
  .query("users")
  .withIndex("by_email", (q) => q.eq("email", identity.email!))
  .first();

if (!user || !["admin", "editor"].includes(user.role || "")) {
  throw new Error("Unauthorized: Admin or Editor role required");
}
```

**Verified:** This authorization code is actively used in publications, media, and cloudflare handlers.

---

## 5. Environment Variables (Actual)

### 5.1 Frontend Variables (.env.local)

```env
# Required and Used
VITE_CONVEX_URL=https://your-convex-instance.convex.cloud

# Required but Endpoint Not Implemented
VITE_CONVEX_SITE_URL=https://your-convex-instance.convex.site
```

### 5.2 Backend Variables (Convex Dashboard)

```env
# Required for Cloudflare Integration (Backend code exists)
CONVEX_CLOUDFLARE_ACCOUNT_ID=your-account-id
CONVEX_CLOUDFLARE_R2_ACCESS_KEY_ID=your-r2-access-key
CONVEX_CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-r2-secret-key
CONVEX_CLOUDFLARE_R2_BUCKET_NAME=everest-cms
CONVEX_CLOUDFLARE_IMAGES_API_TOKEN=your-images-api-token
```

**Note:** These environment variables are expected by the backend code, but the upload feature won't work until HTTP routes are registered.

---

## 6. VPS Self-Hosting Requirements

### 6.1 Current Architecture Limitations

**Critical Finding:** The current architecture is **tightly coupled to Convex**, making VPS migration complex.

| Component | Current (Convex) | VPS Alternative | Complexity |
|-----------|-----------------|-----------------|------------|
| **Database** | Convex (serverless) | PostgreSQL + custom API | **High** |
| **Auth** | Convex Auth | Implement JWT auth | **High** |
| **File Storage** | Cloudflare R2 | MinIO (S3-compatible) | **Medium** |
| **Real-time** | Convex subscriptions | WebSockets + Redis | **High** |
| **Functions** | Convex serverless | Express/Fastify API | **High** |

### 6.2 Honest Assessment: VPS Migration is a Rewrite

**The Reality:**
- Convex is not just a database - it's a full backend platform
- The application uses Convex-specific features:
  - Real-time subscriptions (`useQuery` from convex/react)
  - Serverless functions (queries, mutations, actions)
  - Auth integration (`@convex-dev/auth`)
  - HTTP actions (`httpAction`)

**VPS Migration would require:**
1. **New Backend:** Express.js or Fastify API server
2. **Database Migration:** PostgreSQL with all data
3. **Auth Rewrite:** Custom JWT implementation or Passport.js
4. **Real-time Rewrite:** WebSocket server (Socket.io or native WS)
5. **File Storage:** MinIO for S3-compatible storage
6. **Frontend Refactor:** Replace all `convex/react` hooks with custom API calls

**Estimated Effort:** 4-6 weeks of dedicated development work

### 6.3 Simpler Alternative: Self-Hosted Convex

**Option:** Run Convex open-source on your own infrastructure
- **Pros:** Minimal code changes, keeps all current functionality
- **Cons:** Still requires Kubernetes or Docker Compose setup
- **Effort:** 1-2 weeks for infrastructure setup

---

## 7. Security Status

### 7.1 What's Actually Protected

| Security Measure | Status | Implementation |
|-----------------|--------|----------------|
| **HTTPS** | ✅ Enforced | Vercel/Convex default |
| **Auth Required** | ✅ Working | JWT validation on all mutations |
| **Role Checks** | ✅ Working | Admin/Editor/Viewer enforced |
| **CSP Headers** | ✅ Partial | Basic headers in vercel.json |
| **Input Validation** | ✅ Working | Schema validation on all inputs |
| **XSS Protection** | ✅ React Default | React escapes by default |

### 7.2 Security Concerns Identified

1. **Upload Endpoint Missing**
   - The upload endpoint isn't registered, which is actually preventing a potential security issue until it's properly implemented with authentication checks

2. **Environment Variables**
   - Cloudflare API tokens would be exposed to Convex functions (intended), but need proper rotation policy

3. **No Rate Limiting**
   - Currently no rate limiting on API endpoints
   - Should implement on `/api/cloudflare/*` once routes are registered

---

## 8. Recommendations

### 8.1 For Management - Immediate Actions

1. **Decide on File Upload Strategy** (Priority: HIGH)
   - **Option A:** Fix Cloudflare integration (1-2 days dev work)
   - **Option B:** Remove upload feature, use external image hosting
   - **Option C:** Implement simple file upload to Convex storage

2. **Current Costs**
   | Service | Actual Cost | Notes |
   |---------|-------------|-------|
   | Vercel | $0-20/mo | Hobby plan sufficient |
   | Convex | $0/mo | Within free tier |
   | Cloudflare R2 | $0/mo | Not being used (routes not wired) |
   | **Total** | **$0-20/mo** | Very cost-effective currently |

### 8.2 For IT Security

1. **Before Enabling Uploads:**
   - [ ] Add rate limiting to upload endpoints
   - [ ] Implement file size and type validation (partially exists)
   - [ ] Add virus scanning for uploads (ClamAV or similar)
   - [ ] Configure CORS properly for Cloudflare endpoints
   - [ ] Set up Cloudflare webhook signature verification

2. **Environment Security:**
   - [ ] Rotate Cloudflare API tokens quarterly
   - [ ] Use separate R2 buckets for dev/staging/prod
   - [ ] Enable R2 object lock for compliance

### 8.3 For Development Team

**To Fix Uploads (2-day sprint):**

1. Register routes in `convex/http.ts`:
   ```typescript
   import { uploadToCloudflare, deleteFile } from "./api/cloudflare";
   
   http.route({
     path: "/api/cloudflare/upload",
     method: "POST",
     handler: uploadToCloudflare,
   });
   
   http.route({
     path: "/api/cloudflare/delete",
     method: "DELETE",
     handler: deleteFile,
   });
   ```

2. Add authentication check to upload handler (currently missing!)

3. Test with actual Cloudflare credentials

4. Add error handling for failed uploads

---

## 9. Infrastructure Diagram (Actual)

```
┌──────────────────────────────────────────────────────────────────────┐
│                          CURRENT STATE                                │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌──────────────┐         ┌──────────────┐         ┌──────────────┐   │
│   │   Vercel     │────────▶│    Convex    │────────▶│  Cloudflare  │   │
│   │  (Frontend)  │  HTTPS  │  (Backend)   │  HTTPS  │     R2       │   │
│   │              │         │              │         │   (Unused)   │   │
│   └──────────────┘         └──────────────┘         └──────────────┘   │
│          │                        │                                    │
│          │                        │                                    │
│          ▼                        ▼                                    │
│   ┌──────────────┐         ┌──────────────┐                           │
│   │   Static     │         │   ConvexDB   │                           │
│   │    Build     │         │  (Database)    │                           │
│   └──────────────┘         └──────────────┘                           │
│                                                                       │
│   ⚠️  BROKEN CONNECTION: HTTP routes not registered                 │
│       Frontend calls /api/cloudflare/upload → 404                     │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 10. Summary

### What's Working ✅
- Landing page with WebGL animations
- Publication management (create, edit, delete)
- User authentication and roles
- Admin dashboard interface
- Media metadata storage

### What's Broken ⚠️
- File uploads (backend exists, routes not wired)
- Media display (references Cloudflare URLs that don't exist)

### What's Missing ❌
- Upload endpoint registration in http.ts
- File upload authentication checks
- Rate limiting on file operations
- Virus scanning for uploads

### For VPS Migration
- **Not recommended** without significant investment
- Current Convex-based architecture is working (except uploads)
- Consider self-hosted Convex as middle ground

---

**Document Version:** 2.0 (Based on Code Analysis)  
**Last Updated:** March 2026  
**Next Review:** After upload fix implementation

**Files Referenced:**
- `@/Users/aliouwade/Documents/everest_finance/new_lp/convex/http.ts`
- `@/Users/aliouwade/Documents/everest_finance/new_lp/convex/api/cloudflare.ts`
- `@/Users/aliouwade/Documents/everest_finance/new_lp/convex/cloudflare.ts`
- `@/Users/aliouwade/Documents/everest_finance/new_lp/convex/media.ts`
- `@/Users/aliouwade/Documents/everest_finance/new_lp/src/utils/cloudflare.ts`
- `@/Users/aliouwade/Documents/everest_finance/new_lp/src/routes/admin/MediaManagement.tsx`
