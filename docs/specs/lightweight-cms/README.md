# CMS Implementation Specifications

## 📋 Overview

This document outlines the implementation plan for a lightweight CMS system for the Everest Finance website using ConvexDB and Uploadthing.

### 🎯 Goals
- **Lightweight**: Minimal overhead, focused on publications/blog content
- **Developer-friendly**: Easy to maintain and extend
- **Scalable**: Handle media-rich finance publications
- **Cost-effective**: Optimize for storage and bandwidth costs

### 🏗️ Architecture
- **Frontend**: React + TanStack Router + Tailwind CSS
- **Backend**: ConvexDB (real-time database)
- **Storage**: Uploadthing (file uploads & CDN)
- **Package Manager**: Bun
- **Build Tool**: Vite

## 📁 Directory Structure

### Documentation
```
docs/specs/lightweight-cms/
├── README.md                 # This file (updated with current state)
├── architecture.md          # System architecture
├── database-schema.md       # ConvexDB schema design
├── components.md            # React components spec
├── api-endpoints.md         # API specifications
├── implementation-roadmap.md # Development phases (updated)
├── testing-strategy.md      # Testing approach
├── deployment.md            # Deployment configuration
└── authentication-system.md # Role-based authentication system
```

### Implementation (Current State - Updated)
```
convex/
├── schema.ts               # ✅ Complete database schema (4 tables)
├── publications.ts         # ✅ Full CRUD operations with search/filtering
├── media.ts                # ✅ Media management functions (infrastructure)
├── users.ts                # ✅ User management functions
├── categories.ts           # ✅ Category management functions
├── auth.ts                 # ✅ Authentication utilities
├── uploadthing.ts          # 🔄 Uploadthing configuration (placeholder)
├── api/
│   └── uploadthing.ts      # 🔄 Uploadthing webhook handler (placeholder)
├── _generated/             # ✅ Auto-generated ConvexDB files
└── convex.json             # ✅ ConvexDB configuration

src/
├── components/
│   ├── Auth/
│   │   ├── ProtectedRoute.tsx      # ✅ Role-based access control
│   │   ├── SigninForm.tsx          # ✅ Authentication component
│   │   ├── SignupForm.tsx          # ✅ User registration component
│   │   ├── useAuth.ts              # ✅ Authentication state management
│   │   └── index.ts
│   └── CMS/
│       ├── Admin/
│       │   ├── AdminLayout.tsx      # ✅ Main admin layout with sidebar
│       │   ├── PublicationForm.tsx  # ✅ Complete form (397 lines)
│       │   ├── UserForm.tsx         # ✅ Complete form (243 lines)
│       │   └── index.ts
│       ├── Public/
│       │   ├── PublicationCard.tsx  # ✅ Content display component
│       │   └── index.ts
│       └── Shared/
│           ├── LoadingSpinner.tsx   # ✅ Loading state component
│           ├── RichTextEditor.tsx   # ✅ WYSIWYG editor
│           ├── ErrorMessage.tsx     # ✅ Error display
│           ├── ConfirmationDialog.tsx # ✅ User confirmation dialogs
│           └── index.ts
├── hooks/
│   ├── useAuth.ts          # ✅ Authentication hook
│   └── useCMS/             # ✅ CMS-specific React hooks
│       ├── usePublications.ts   # ✅ Publication CRUD hooks
│       ├── useUsers.ts         # ✅ User management hooks
│       ├── useMedia.ts         # ✅ Media management hooks
│       └── index.ts
├── routes/
│   ├── PublicationsPage.tsx    # ✅ Public publications page (working)
│   ├── PublicationPage.tsx     # ✅ Individual publication page (working)
│   └── admin/                  # ✅ Complete admin routes
│       ├── PublicationsPage.tsx
│       ├── UsersPage.tsx
│       ├── MediaPage.tsx
│       ├── SettingsPage.tsx
│       ├── PublicationFormPage.tsx
│       ├── UserFormPage.tsx
│       └── index.ts
└── utils/
    ├── cms/
    │   ├── constants.ts        # ✅ CMS constants and config
    │   ├── helpers.ts          # ✅ Utility functions
    │   └── index.ts
    ├── uploadthing.ts          # 🔄 Uploadthing React utilities (placeholder)
    └── serviceWorker.ts        # ✅ PWA service worker

env.example                 # ✅ Environment variables template
.env.local                  # Local environment variables (gitignored)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Bun package manager
- Uploadthing account
- ConvexDB account

### Installation
```bash
# Install dependencies with bun
bun install

# Install additional packages (already included in package.json)
bun add convex uploadthing @uploadthing/react
```

### Setup Environment
```bash
# Copy environment template
cp env.example .env.local

# Fill in your API keys:
# - CONVEX_URL (from ConvexDB dashboard)
# - UPLOADTHING_SECRET (from Uploadthing dashboard)
# - UPLOADTHING_APP_ID (from Uploadthing dashboard)
```

### Development
```bash
# Start full CMS development environment
npm run cms:dev

# Or run services separately:
npm run convex:dev    # Start ConvexDB
npm run dev          # Start React app
```

### Getting Started with CMS
```bash
# 1. Start the development servers
npm run cms:dev

# 2. Access the admin dashboard
# Navigate to: http://localhost:5173/admin/users

# 3. Create your first admin user
# Go to: http://localhost:5173/admin/users/new

# 4. Create sample publications
# Go to: http://localhost:5173/admin/publications/new

# 5. View public content
# Navigate to: http://localhost:5173/publications
```

## 📊 Implementation Status

| Component | Status | Priority | Notes |
|-----------|--------|----------|-------|
| Database Schema | ✅ Completed | High | All 4 tables implemented |
| ConvexDB Integration | ✅ Completed | High | Full API layer working |
| Uploadthing Integration | 🔄 Placeholder Only | Medium | Configuration exists but not functional |
| React Provider Setup | ✅ Completed | High | ConvexDB client integrated |
| Authentication | ✅ Completed | High | Role-based system working |
| Role-Based Access Control | ✅ Completed | High | Protected routes implemented |
| Admin Interface | ✅ Foundation Ready | High | All components built |
| Public Components | ✅ Completed | Medium | Publications display working |
| CMS Hooks | ✅ Complete | High | All CRUD operations available |
| Rich Text Editor | ✅ Implemented | Medium | Component exists |
| User Management | ✅ Complete | High | Full CRUD operations |
| File Upload System | ❌ Not Functional | Medium | Placeholder implementation only |
| Testing Strategy | ✅ Documented | Medium | Framework configured |
| Publication CRUD | ✅ Complete | High | Full operations working |
| Admin Routes | ✅ Complete | High | All routes configured |
| Real-time Sync | ✅ Working | High | ConvexDB real-time features |
| Search & Filtering | ✅ Implemented | Medium | Working in publications |
| Category Management | ✅ Complete | Medium | CRUD operations available |

### 📋 Phase 1: Foundation Setup - COMPLETED ✅

**Completed Tasks:**
- ✅ Dependencies & Configuration
- ✅ Database Schema & API Functions
- ✅ Component Architecture
- ✅ Project Structure & Utilities
- ✅ Development Workflow Setup
- ✅ ConvexDB Integration
- ✅ React Provider Setup

**Key Deliverables:**
- Complete ConvexDB schema with 4 tables (publications, media, users, categories)
- Full API layer with CRUD operations and search functionality
- React component structure (Admin, Public, Shared)
- CMS utilities and helper functions
- ConvexDB client integration with React
- Development scripts and environment configuration

### 📋 Phase 2: Core Database & API - COMPLETED ✅

**Completed Tasks:**
- ✅ ConvexDB project setup
- ✅ Environment variables setup
- ✅ React app integration
- ✅ Complete authentication system with role-based access control
- ✅ User management with roles (admin, editor, viewer, client)
- ✅ Protected routes and authorization middleware
- ✅ Automatic role-based navigation after authentication

**Key Deliverables:**
- **Role-Based Authentication System**: Complete implementation with 4 user roles
- **Protected Routes**: Admin and client dashboards with proper access control
- **User Management**: Role assignment, authentication flow, and session management
- **Navigation Logic**: Automatic routing based on user role after sign-in/sign-up
- **Security**: Proper authorization checks and access denied handling

### 📋 Phase 3: Admin Interface - COMPLETED ✅

**Completed Tasks:**
- ✅ Complete admin interface for content management
- ✅ Publication creation/editing forms
- ✅ User management interface
- ✅ Media management interface
- ✅ Settings and configuration pages
- ✅ Rich text editor integration
- ✅ Admin layout with sidebar navigation

**Key Deliverables:**
- **Admin Dashboard**: Complete overview with statistics and quick actions
- **Publication Management**: Full CRUD operations with rich text editing
- **User Management**: Role assignment and user administration
- **Media Management**: File organization and metadata editing
- **Settings**: System configuration and preferences

### 📋 Phase 4: Public Interface - PARTIALLY COMPLETED 🔄

**Completed Tasks:**
- ✅ Publications listing page with search and filtering
- ✅ Individual publication display pages
- ✅ Category-based navigation
- ✅ Responsive design and animations

**Remaining Tasks:**
- 🔄 Connect CMS data to existing public pages
- 🔄 Optimize performance and SEO
- 🔄 Add more interactive features

## 🚨 Critical Gaps Identified

### 1. Uploadthing Integration - NOT FUNCTIONAL ❌
**Current State**: Only placeholder configuration exists
**Impact**: File uploads cannot work, media management is broken
**Files Affected**: 
- `convex/uploadthing.ts` - Placeholder configuration
- `src/utils/uploadthing.ts` - Placeholder utilities
- `convex/api/uploadthing.ts` - Missing webhook handler

**Required Actions**:
1. Set up actual Uploadthing server configuration
2. Implement webhook handlers for file processing
3. Connect frontend upload components to working backend
4. Test file upload flow end-to-end

### 2. Media Management - PARTIALLY BROKEN 🔄
**Current State**: Database schema exists, but file uploads don't work
**Impact**: Users cannot add images/documents to publications
**Files Affected**: All media-related functionality

### 3. Environment Configuration - INCOMPLETE 🔄
**Current State**: Template exists but actual configuration may be missing
**Impact**: App may not connect to ConvexDB or Uploadthing
**Required**: Verify `.env.local` exists with real API keys

## 🛠️ Implementation Details

**Database Schema:**
- `publications`: Content storage with categories, status, and metadata
- `media`: Minimal metadata for Uploadthing integration
- `users`: Authentication and role management with 4 roles (admin, editor, viewer, client)
- `categories`: Content organization and display

**API Functions:**
- Publications: create, update, delete, search, filter by category/status
- Media: file linking, metadata updates, type filtering
- Users: role management, authentication tracking, current user queries
- Categories: CRUD operations with ordering

**Authentication System:**
- **User Roles**: admin, editor, viewer, client
- **Default Role**: New users get 'client' role automatically
- **Role-Based Navigation**: 
  - Admin/Editor → `/admin/dashboard`
  - Client/Viewer → `/dashboard`
- **Protected Routes**: Role-based access control for all admin functions
- **Session Management**: Convex Auth with automatic state management

**Component Structure:**
```
src/components/CMS/
├── Admin/
│   ├── AdminLayout.tsx      # Main admin layout with sidebar navigation
│   ├── PublicationForm.tsx  # Comprehensive publication create/edit form (397 lines)
│   ├── UserForm.tsx         # User management form with role selection (243 lines)
│   └── index.ts
├── Public/
│   ├── PublicationCard.tsx  # Publication display card with category badges
│   └── index.ts
└── Shared/
    ├── LoadingSpinner.tsx   # Loading state component with size variants
    ├── RichTextEditor.tsx   # WYSIWYG content editor integration
    ├── ErrorMessage.tsx     # Error display component
    ├── ConfirmationDialog.tsx # User confirmation dialogs
    └── index.ts

src/components/Auth/
├── ProtectedRoute.tsx       # Role-based access control
├── SigninForm.tsx          # Authentication with role-based navigation
├── SignupForm.tsx          # User registration with default role
├── useAuth.ts              # Authentication state management
└── index.ts
```

**CMS Hooks (Complete Implementation):**
```
src/hooks/useCMS/
├── usePublications.ts   # Full publication CRUD with search/filtering
├── useUsers.ts         # User management operations
├── useMedia.ts         # Media management hooks
└── index.ts
```

**Development Scripts:**
- `npm run cms:dev` - Concurrent development (ConvexDB + React)
- `npm run convex:dev` - ConvexDB development server
- `npm run convex:deploy` - Deploy ConvexDB functions to production
- `npm run dev` - React development server
- `npm run build` - Production build

## 🎯 Next Steps - Phase 4: File Upload Integration

### Immediate Priorities
1. **Fix Uploadthing Integration** ❌ CRITICAL
   - Implement actual server-side configuration
   - Set up webhook handlers
   - Test file upload flow

2. **Complete Media Management**
   - Connect file uploads to publications
   - Implement media library interface
   - Add file optimization and CDN delivery

3. **Environment Setup Verification**
   - Ensure all API keys are configured
   - Test ConvexDB connection
   - Verify Uploadthing integration

### Phase 4 Deliverables
- 🔄 Functional file upload system
- 🔄 Complete media management interface
- 🔄 Optimized file delivery via CDN
- 🔄 End-to-end file workflow testing

### Phase 5: Public Interface Completion (Next)
- Connect CMS data to existing public pages
- Implement advanced search and filtering
- Add category navigation and breadcrumbs
- Optimize performance and SEO

## 📝 Implementation Notes

### Phase 1-3 Lessons Learned
- **ConvexDB Schema**: The minimalist approach works well - storing only essential metadata while leveraging Uploadthing for file management
- **Component Architecture**: Separating Admin/Public/Shared components provides good organization and reusability
- **Authentication System**: Convex Auth with role-based access control provides robust security with minimal complexity
- **Role-Based Navigation**: Automatic routing based on user roles eliminates confusion and improves user experience
- **Development Workflow**: Using `npm run cms:dev` for concurrent development of both frontend and backend is efficient
- **API Design**: Full-text search and real-time subscriptions are well-supported by ConvexDB

**Phase 2:**
- **Route Parameter Handling**: Need to handle "new" as a special case for create operations vs. actual IDs for editing
- **TypeScript Integration**: Convex's generated types work excellently with React hooks for type safety
- **Real-time Updates**: ConvexDB's real-time features eliminate complex state management needs
- **Admin UX**: Clean, intuitive admin interfaces significantly improve content management efficiency
- **Hook Pattern**: Custom hooks for each entity (publications, users, media) provide excellent code organization
- **Error Handling**: Proper error boundaries and user feedback are crucial for admin interfaces

**Phase 3:**
- **Admin Interface**: Complete admin system provides full content management capabilities
- **Form Validation**: Comprehensive form handling with error states and user feedback
- **Rich Text Editing**: WYSIWYG editor integration for content creation
- **Navigation**: Intuitive sidebar navigation with active state management

### Recent Implementation Updates (Latest Commits)

**Critical Gap Identified:**
- ❌ **Uploadthing Integration**: Only placeholder configuration exists, file uploads are non-functional
- 🔄 **Media Management**: Database schema ready but file handling broken
- 🔄 **Environment Setup**: May be incomplete for production use

**Code Quality Improvements:**
- ✅ ESLint configuration updated for React/TypeScript best practices
- ✅ Prettier formatting rules applied consistently
- ✅ TypeScript strict mode enabled for better type safety
- ✅ Import organization and module structure optimized

**Development Environment Enhancements:**
- ✅ Environment variables template (`env.example`) created for easy setup
- ✅ Package.json scripts updated with CMS-specific development commands
- ✅ Concurrent development setup for running both ConvexDB and React servers
- ✅ Build optimization and performance monitoring scripts added

**Recent Component Additions:**
- ✅ `Auth.tsx` component created for authentication handling
- ✅ `ConfirmationDialog.tsx` component for user confirmations
- ✅ `RichTextEditor.tsx` component for WYSIWYG content editing
- ✅ Admin route structure completed with all CRUD pages
- ✅ CMS hooks implemented for publications, users, and media management

### Architecture Decisions
- **Media Storage**: Uploadthing handles all file operations, ConvexDB stores only metadata and relationships
- **Authentication**: ConvexDB's built-in auth system with custom role management for flexible permissions
- **State Management**: ConvexDB's real-time features eliminate need for additional state management libraries
- **Search**: Full-text search implemented at database level for optimal performance
- **Security**: Role-based access control with protected routes ensures proper authorization

### Performance Considerations
- Database queries are optimized with proper indexing
- File URLs are served directly from Uploadthing's CDN (when functional)
- Real-time subscriptions provide instant UI updates
- Pagination implemented for large datasets
- Authentication state is cached and managed efficiently

## 🎯 Success Criteria

- [x] Authentication system with role-based access control
- [x] User registration and login functionality
- [x] Protected routes and authorization
- [x] Role-based navigation after authentication
- [x] Admin can create/edit/delete publications
- [x] Admin interface for user management
- [x] Rich text editor for content creation
- [x] Public pages display content correctly
- [x] Search and filtering functionality
- [x] Responsive design maintained
- [ ] File uploads work with automatic optimization ❌ CRITICAL GAP
- [ ] Media management interface functional ❌ CRITICAL GAP
- [ ] Performance meets requirements
- [ ] Cost-effective storage solution

## 🚨 Critical Action Items

### IMMEDIATE (Blocking Production)
1. **Fix Uploadthing Integration**
   - Implement actual server configuration
   - Set up webhook handlers
   - Test file upload flow

2. **Verify Environment Configuration**
   - Ensure all API keys are set
   - Test ConvexDB connection
   - Verify Uploadthing setup

### HIGH PRIORITY (Next Sprint)
1. **Complete Media Management**
   - Connect file uploads to publications
   - Implement media library interface
   - Add file optimization

2. **End-to-End Testing**
   - Test complete publication workflow
   - Verify file upload integration
   - Test admin user management

## 📞 Support

For questions about this implementation, refer to the specific specification documents in this directory.

**⚠️ IMPORTANT**: The CMS is 90% complete but has a critical gap in file upload functionality. File uploads will not work until Uploadthing integration is properly implemented.
