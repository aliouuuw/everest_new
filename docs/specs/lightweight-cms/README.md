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
├── README.md                 # This file (updated with progress)
├── architecture.md          # System architecture
├── database-schema.md       # ConvexDB schema design
├── components.md            # React components spec
├── api-endpoints.md         # API specifications
├── implementation-roadmap.md # Development phases (updated)
├── testing-strategy.md      # Testing approach
├── deployment.md            # Deployment configuration
└── authentication-system.md # Role-based authentication system
```

### Implementation (Current State)
```
convex/
├── schema.ts               # ✅ Complete database schema (4 tables)
├── publications.ts         # ✅ Full CRUD operations with search/filtering
├── media.ts                # ✅ Media management functions (infrastructure)
├── users.ts                # ✅ User management functions
├── categories.ts           # ✅ Category management functions
├── auth.ts                 # ✅ Authentication utilities
├── uploadthing.ts          # ✅ Uploadthing configuration
├── api/
│   └── uploadthing.ts      # 🔄 Uploadthing webhook handler (ready)
├── _generated/             # ✅ Auto-generated ConvexDB files
└── convex.json             # ✅ ConvexDB configuration

src/
├── components/
│   ├── Auth.tsx            # ✅ Authentication component
│   └── CMS/
│       ├── Admin/
│       │   ├── AdminLayout.tsx      # ✅ Main admin layout with sidebar
│       │   ├── PublicationForm.tsx  # ✅ Complete form (398 lines)
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
│   ├── PublicationsPage.tsx    # ✅ Public publications page
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
    ├── uploadthing.ts          # ✅ Uploadthing React utilities
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

| Component | Status | Priority |
|-----------|--------|----------|
| Database Schema | ✅ Completed | High |
| ConvexDB Integration | ✅ Completed | High |
| Uploadthing Integration | ✅ Completed | High |
| React Provider Setup | ✅ Completed | High |
| Authentication | ✅ Completed | High |
| Role-Based Access Control | ✅ Completed | High |
| Admin Interface | 🟡 Foundation Ready | High |
| Public Components | ✅ Completed | Medium |
| CMS Hooks | ✅ Complete | High |
| Rich Text Editor | ✅ Implemented | Medium |
| User Management | ✅ Complete | High |
| File Upload System | 🔄 Ready for Integration | Medium |
| Testing Strategy | ✅ Documented | Medium |
| Publication CRUD | ✅ Complete | High |
| Admin Routes | ✅ Complete | High |
| Real-time Sync | ✅ Working | High |
| Search & Filtering | ✅ Implemented | Medium |
| Category Management | ✅ Complete | Medium |

### 📋 Phase 1: Foundation Setup - COMPLETED ✅

**Completed Tasks:**
- ✅ Dependencies & Configuration
- ✅ Database Schema & API Functions
- ✅ Component Architecture
- ✅ Project Structure & Utilities
- ✅ Development Workflow Setup
- ✅ ConvexDB Integration
- ✅ Uploadthing Integration
- ✅ React Provider Setup

**Key Deliverables:**
- Complete ConvexDB schema with 4 tables (publications, media, users, categories)
- Full API layer with CRUD operations and search functionality
- React component structure (Admin, Public, Shared)
- CMS utilities and helper functions
- ConvexDB client integration with React
- Uploadthing configuration and utilities
- Development scripts and environment configuration

### 📋 Phase 2: Core Database & API - COMPLETED ✅

**Completed Tasks:**
- ✅ ConvexDB project setup
- ✅ Uploadthing account configuration
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

### 🛠️ Implementation Details

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
│   ├── PublicationForm.tsx  # Comprehensive publication create/edit form (398 lines)
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

## 🎯 Next Steps - Phase 3: Admin Interface Development

### Immediate Priorities
1. **Admin Interface Development** ✅ Foundation Ready
   - Build publication creation/editing forms
   - Implement rich text editor
   - Create media management interface

2. **Content Management System**
   - Publication CRUD operations
   - Media upload and management
   - Category and tag management

3. **User Role Management Interface**
   - Admin panel for managing user roles
   - Role assignment and permissions
   - User activity monitoring

### Phase 3 Deliverables
- 🔄 Complete admin interface for content management
- 🔄 Integrated file upload system
- 🔄 Rich text editor for publications
- 🔄 User role management interface

### Phase 4: Public Interface (Next)
- Connect CMS data to existing public pages
- Implement search and filtering
- Add category navigation
- Optimize performance and SEO

## 📝 Implementation Notes

### Phase 1 & 2 Lessons Learned
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

### Recent Implementation Updates (Latest Commits)

**Testing Strategy Implementation:**
- ✅ Comprehensive testing strategy documented with Vitest, React Testing Library, and Playwright
- ✅ Unit testing framework configured for components, hooks, and utilities
- ✅ Integration testing setup for API and component interactions
- ✅ End-to-end testing strategy with Playwright for critical user workflows
- ✅ Test coverage targets defined (90%+ for core components, 100% for utilities)
- ✅ CI/CD pipeline configuration for automated testing
- ✅ Performance and security testing guidelines established

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
- File URLs are served directly from Uploadthing's CDN
- Real-time subscriptions provide instant UI updates
- Pagination implemented for large datasets
- Authentication state is cached and managed efficiently

## 🎯 Success Criteria

- [x] Authentication system with role-based access control
- [x] User registration and login functionality
- [x] Protected routes and authorization
- [x] Role-based navigation after authentication
- [ ] Admin can create/edit/delete publications
- [ ] File uploads work with automatic optimization
- [ ] Public pages display content correctly
- [ ] Search and filtering functionality
- [ ] Responsive design maintained
- [ ] Performance meets requirements
- [ ] Cost-effective storage solution

## 📞 Support

For questions about this implementation, refer to the specific specification documents in this directory.
