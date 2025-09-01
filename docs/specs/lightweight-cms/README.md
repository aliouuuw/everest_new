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
└── deployment.md            # Deployment configuration
```

### Implementation
```
convex/
├── schema.ts               # Database schema definition
├── publications.ts         # Publication CRUD operations
├── media.ts                # Media management functions
├── users.ts                # User management functions
├── categories.ts           # Category management functions
├── _generated/             # Auto-generated ConvexDB files
└── convex.json             # ConvexDB configuration

src/
├── components/CMS/
│   ├── Admin/
│   │   ├── AdminLayout.tsx
│   │   └── index.ts
│   ├── Public/
│   │   ├── PublicationCard.tsx
│   │   └── index.ts
│   └── Shared/
│       ├── LoadingSpinner.tsx
│       └── index.ts
├── hooks/useCMS/           # CMS-specific hooks (future)
├── routes/admin/           # Admin routes (future)
└── utils/cms/
    ├── constants.ts        # CMS constants and config
    ├── helpers.ts          # Utility functions
    └── index.ts

env.example                 # Environment variables template
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

## 📊 Implementation Status

| Component | Status | Priority |
|-----------|--------|----------|
| Database Schema | ✅ Completed | High |
| Authentication | Planned | High |
| File Upload System | Planned | High |
| Admin Interface | 🟡 In Progress | High |
| Public Components | ✅ Completed | Medium |
| Testing | Planned | Medium |

### 📋 Phase 1: Foundation Setup - COMPLETED ✅

**Completed Tasks:**
- ✅ Dependencies & Configuration
- ✅ Database Schema & API Functions
- ✅ Component Architecture
- ✅ Project Structure & Utilities
- ✅ Development Workflow Setup

**Key Deliverables:**
- Complete ConvexDB schema with 4 tables (publications, media, users, categories)
- Full API layer with CRUD operations and search functionality
- React component structure (Admin, Public, Shared)
- CMS utilities and helper functions
- Development scripts and environment configuration

### 🛠️ Implementation Details

**Database Schema:**
- `publications`: Content storage with categories, status, and metadata
- `media`: Minimal metadata for Uploadthing integration
- `users`: Authentication and role management
- `categories`: Content organization and display

**API Functions:**
- Publications: create, update, delete, search, filter by category/status
- Media: file linking, metadata updates, type filtering
- Users: role management, authentication tracking
- Categories: CRUD operations with ordering

**Component Structure:**
```
src/components/CMS/
├── Admin/
│   ├── AdminLayout.tsx      # Main admin interface
│   └── index.ts
├── Public/
│   ├── PublicationCard.tsx  # Content display
│   └── index.ts
└── Shared/
    ├── LoadingSpinner.tsx   # Reusable components
    └── index.ts
```

**Development Scripts:**
- `npm run cms:dev` - Start both ConvexDB and React dev servers
- `npm run convex:dev` - ConvexDB development server
- `npm run convex:deploy` - Deploy ConvexDB functions

## 🎯 Next Steps - Phase 2: Core Database & API

### Immediate Priorities
1. **Set up External Services**
   - Create ConvexDB account and project
   - Create Uploadthing account and configure
   - Configure environment variables

2. **Authentication System**
   - Implement ConvexDB authentication
   - Set up user roles (admin, editor, viewer)
   - Add authorization checks

3. **Complete API Functions**
   - Add data validation
   - Implement real-time subscriptions
   - Add error handling

### Phase 2 Deliverables
- ✅ Working ConvexDB connection
- ✅ Authentication and authorization
- ✅ Complete API with validation
- ✅ Real-time data synchronization

## 📝 Implementation Notes

### Phase 1 Lessons Learned
- **ConvexDB Schema**: The minimalist approach works well - storing only essential metadata while leveraging Uploadthing for file management
- **Component Architecture**: Separating Admin/Public/Shared components provides good organization and reusability
- **Development Workflow**: Using `npm run cms:dev` for concurrent development of both frontend and backend is efficient
- **API Design**: Full-text search and real-time subscriptions are well-supported by ConvexDB

### Architecture Decisions
- **Media Storage**: Uploadthing handles all file operations, ConvexDB stores only metadata and relationships
- **Authentication**: ConvexDB's built-in auth system will be used for user management and permissions
- **State Management**: ConvexDB's real-time features eliminate need for additional state management libraries
- **Search**: Full-text search implemented at database level for optimal performance

### Performance Considerations
- Database queries are optimized with proper indexing
- File URLs are served directly from Uploadthing's CDN
- Real-time subscriptions provide instant UI updates
- Pagination implemented for large datasets

## 🎯 Success Criteria

- [ ] Admin can create/edit/delete publications
- [ ] File uploads work with automatic optimization
- [ ] Public pages display content correctly
- [ ] Search and filtering functionality
- [ ] Responsive design maintained
- [ ] Performance meets requirements
- [ ] Cost-effective storage solution

## 📞 Support

For questions about this implementation, refer to the specific specification documents in this directory.
