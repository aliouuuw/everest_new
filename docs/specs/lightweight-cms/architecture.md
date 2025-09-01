# CMS Architecture Specification

## 🏛️ System Architecture

### Overview
The CMS follows a modern, lightweight architecture optimized for content management with minimal overhead.

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Admin   │────│   ConvexDB      │────│  Uploadthing    │
│   Interface     │    │   (Metadata)    │    │  (Files/CDN)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Public Website │
                    │  (React/Vite)   │
                    └─────────────────┘
```

## 🧩 Components

### 1. Admin Interface (`src/components/CMS/`)
- **Purpose**: Content management interface for editors
- **Technology**: React + TanStack Router
- **Features**:
  - Publication CRUD operations
  - Media management
  - User management (future)
  - Analytics dashboard (future)

### 2. Database Layer (`convex/`)
- **Purpose**: Store content metadata and relationships
- **Technology**: ConvexDB
- **Responsibilities**:
  - Publication data
  - Media metadata (minimal)
  - User permissions
  - Search indexing

### 3. File Storage (`uploadthing/`)
- **Purpose**: Handle file uploads and CDN delivery
- **Technology**: Uploadthing
- **Responsibilities**:
  - File storage and optimization
  - CDN delivery
  - Automatic image resizing
  - File management

### 4. Public Interface (`src/routes/`)
- **Purpose**: Display content to website visitors
- **Technology**: React components
- **Features**:
  - Publication listing
  - Individual publication pages
  - Search and filtering
  - RSS feeds (future)

## 📊 Data Flow

### Publication Creation Flow
1. Admin creates publication in React interface
2. Data sent to ConvexDB mutation
3. Publication ID returned
4. Media files uploaded to Uploadthing
5. Media metadata linked to publication in ConvexDB
6. Publication status updated
7. Public pages automatically update via real-time subscriptions

### File Upload Flow
1. User selects files in admin interface
2. Files uploaded directly to Uploadthing
3. Uploadthing returns file URLs and metadata
4. Minimal metadata stored in ConvexDB (relationships only)
5. Files immediately available via CDN

## 🔒 Security Considerations

### Authentication
- ConvexDB handles authentication
- JWT tokens for API access
- Role-based permissions (admin, editor, viewer)

### File Security
- Uploadthing handles file validation
- File type restrictions
- Size limits enforced
- Private files via signed URLs (future)

### Data Validation
- ConvexDB schema validation
- Client-side validation in React
- Server-side validation in mutations

## ⚡ Performance Optimizations

### Frontend
- Code splitting for admin routes
- Lazy loading of heavy components
- Image optimization via Uploadthing
- Caching strategies for static content

### Backend
- ConvexDB query optimization
- Real-time subscriptions for live updates
- Efficient indexing on search fields
- CDN for file delivery

### Database
- Minimal data storage (metadata only)
- Efficient queries with proper indexing
- Real-time subscriptions for live updates
- Optimized relationships

## 📈 Scalability

### Current Limits
- Uploadthing: 2GB free storage, upgrade path clear
- ConvexDB: Generous free tier, pay-per-use scaling
- React/Vite: Handles large applications well

### Future Scaling
- Database sharding (if needed)
- CDN distribution
- Caching layers
- Microservices architecture (if required)

## 🔧 Development Workflow

### Local Development
```bash
# Start ConvexDB
bun convex dev

# Start development server
bun run dev

# Start Uploadthing dev server (if needed)
bun run dev:content
```

### Production Deployment
- ConvexDB deploys automatically
- Uploadthing handles production files
- Vite builds optimized bundles
- CDN serves static assets

## 📋 Dependencies

### Core Dependencies
- `convex`: Database and real-time features
- `uploadthing`: File upload and CDN
- `@uploadthing/react`: React integration
- `react`: UI framework
- `@tanstack/react-router`: Routing
- `tailwindcss`: Styling

### Development Dependencies
- `vite`: Build tool
- `typescript`: Type safety
- `eslint`: Code quality
- `@types/*`: TypeScript definitions

## 🎯 Success Metrics

- **Performance**: < 2s page load times
- **Reliability**: 99.9% uptime
- **Cost**: < $10/month for storage
- **Developer Experience**: < 5min setup time
- **User Experience**: Intuitive admin interface
