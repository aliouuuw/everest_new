# Components Specification

## 🧩 React Components Architecture

### Overview
The CMS components are organized in a modular architecture with clear separation of concerns. Components are split between admin interface and public interface.

## 📁 Directory Structure

```
src/
├── components/
│   ├── CMS/                    # Admin interface components
│   │   ├── AdminLayout.tsx    # Main admin layout
│   │   ├── PublicationEditor.tsx # Create/edit publications
│   │   ├── MediaManager.tsx   # Media upload and management
│   │   ├── MediaGallery.tsx   # Display media files
│   │   ├── UserManager.tsx    # User management (future)
│   │   └── Dashboard.tsx      # Admin dashboard
│   │
│   ├── Publications/          # Public publication components
│   │   ├── PublicationCard.tsx # Individual publication preview
│   │   ├── PublicationGrid.tsx # Grid layout for publications
│   │   ├── PublicationFilters.tsx # Search and filter controls
│   │   ├── PublicationSearch.tsx # Search functionality
│   │   └── PublicationDetail.tsx # Full publication view
│   │
│   └── shared/                # Shared components
│       ├── LoadingSpinner.tsx
│       ├── ErrorBoundary.tsx
│       ├── Modal.tsx
│       ├── ConfirmDialog.tsx
│       └── Toast.tsx
│
├── routes/
│   ├── AdminPublicationsPage.tsx
│   ├── AdminMediaPage.tsx
│   ├── AdminDashboardPage.tsx
│   └── PublicationDetailPage.tsx
│
└── hooks/
    ├── usePublications.ts     # Publication data hooks
    ├── useMedia.ts           # Media management hooks
    ├── useAuth.ts            # Authentication hooks
    └── useSearch.ts          # Search functionality hooks
```

## 🎨 Component Specifications

### 1. AdminLayout Component

**Purpose:** Main layout for admin interface
**Props:**
```typescript
interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}
```

**Features:**
- Responsive sidebar navigation
- Mobile-friendly hamburger menu
- Breadcrumb navigation
- User profile dropdown
- Quick actions toolbar

**Styling:** Uses Tailwind CSS with custom design tokens

### 2. PublicationEditor Component

**Purpose:** Create and edit publications
**Props:**
```typescript
interface PublicationEditorProps {
  publicationId?: Id<"publications">;
  onSave?: (publication: Publication) => void;
  onCancel?: () => void;
  initialData?: Partial<Publication>;
}
```

**Features:**
- Rich text editor (Tiptap or similar)
- Auto-save functionality
- Real-time preview
- SEO optimization fields
- Media insertion
- Tag management
- Category selection
- Status management (draft/published/archived)

**State Management:**
- Local state for form data
- ConvexDB mutations for saving
- Optimistic updates for better UX

### 3. MediaManager Component

**Purpose:** Upload and manage media files
**Props:**
```typescript
interface MediaManagerProps {
  publicationId?: Id<"publications">;
  onMediaSelect?: (media: Media[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
}
```

**Features:**
- Drag-and-drop upload
- Progress indicators
- File validation
- Image preview
- Batch operations
- Uploadthing integration
- Automatic optimization

**Integration:**
- Direct Uploadthing integration
- ConvexDB metadata storage
- Real-time upload progress
- Error handling and retry logic

### 4. MediaGallery Component

**Purpose:** Display and manage media files
**Props:**
```typescript
interface MediaGalleryProps {
  publicationId?: Id<"publications">;
  viewMode?: "grid" | "list";
  selectable?: boolean;
  onSelectionChange?: (selected: Media[]) => void;
}
```

**Features:**
- Grid and list view modes
- Image thumbnails with lazy loading
- File type icons
- Bulk selection
- Search and filtering
- Quick actions (edit, delete, download)
- Infinite scroll for large collections

### 5. PublicationCard Component

**Purpose:** Display publication preview in listings
**Props:**
```typescript
interface PublicationCardProps {
  publication: Publication;
  variant?: "default" | "featured" | "compact";
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
  showCategory?: boolean;
}
```

**Features:**
- Multiple display variants
- Optimized images
- Reading time calculation
- Category badges
- Author information
- Hover effects and animations
- Responsive design

### 6. PublicationFilters Component

**Purpose:** Filter and search publications
**Props:**
```typescript
interface PublicationFiltersProps {
  onFiltersChange: (filters: PublicationFilters) => void;
  initialFilters?: PublicationFilters;
  categories: Category[];
}
```

**Features:**
- Category filtering
- Status filtering
- Date range filtering
- Tag filtering
- Search input with debouncing
- Filter persistence in URL
- Clear filters functionality

### 7. PublicationSearch Component

**Purpose:** Advanced search functionality
**Props:**
```typescript
interface PublicationSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  placeholder?: string;
  showAdvanced?: boolean;
}
```

**Features:**
- Full-text search
- Advanced filters
- Search suggestions
- Recent searches
- Search highlighting
- Keyboard shortcuts

## 🔧 Custom Hooks

### usePublications Hook
```typescript
interface UsePublicationsOptions {
  status?: PublicationStatus;
  category?: string;
  limit?: number;
  offset?: number;
}

function usePublications(options?: UsePublicationsOptions) {
  // Returns publications with loading states and error handling
}
```

### useMedia Hook
```typescript
interface UseMediaOptions {
  publicationId?: Id<"publications">;
  fileType?: string;
  limit?: number;
}

function useMedia(options?: UseMediaOptions) {
  // Returns media files with upload functionality
}
```

### useAuth Hook
```typescript
function useAuth() {
  // Returns user authentication state and methods
}
```

## 🎯 Component Patterns

### 1. Error Boundaries
All components wrapped with error boundaries for graceful error handling.

### 2. Loading States
Consistent loading spinners and skeleton screens across components.

### 3. Responsive Design
Mobile-first approach with responsive breakpoints.

### 4. Accessibility
ARIA labels, keyboard navigation, and screen reader support.

### 5. Performance
- Lazy loading for images
- Code splitting for routes
- Memoization for expensive computations
- Virtual scrolling for large lists

## 📱 Responsive Breakpoints

```typescript
const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};
```

## 🎨 Design System Integration

### Colors
- Uses existing Tailwind configuration
- Custom CSS variables for theming
- Consistent color palette across components

### Typography
- Font hierarchy from existing design system
- Responsive text sizing
- Proper line heights and spacing

### Spacing
- Consistent spacing scale
- Responsive spacing utilities
- Component-specific spacing patterns

## 🧪 Testing Strategy

### Unit Tests
- Component rendering tests
- Props validation tests
- Event handler tests
- Hook functionality tests

### Integration Tests
- Component interaction tests
- API integration tests
- Form submission tests
- Navigation tests

### E2E Tests
- Complete user workflows
- Cross-browser compatibility
- Performance testing
- Accessibility testing

## 📊 Performance Targets

- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **First Input Delay:** < 100ms
- **Cumulative Layout Shift:** < 0.1

## 🔄 Component Lifecycle

### Development Phase
1. Create component with TypeScript interfaces
2. Implement basic functionality
3. Add styling and responsive design
4. Integrate with data layer
5. Add error handling and loading states
6. Write unit tests
7. Code review and optimization

### Maintenance Phase
1. Monitor performance metrics
2. Track usage analytics
3. Handle bug reports
4. Plan feature enhancements
5. Regular dependency updates
6. Security patches

## 📚 Dependencies

### Core Dependencies
- `react`: ^19.0.0
- `convex`: Real-time database
- `uploadthing`: File uploads
- `@uploadthing/react`: React integration
- `@tanstack/react-router`: Routing
- `tailwindcss`: Styling

### Additional Dependencies
- `lucide-react`: Icons
- `react-hook-form`: Form management
- `zod`: Schema validation
- `@tiptap/react`: Rich text editor
- `react-dropzone`: File uploads

## 🚀 Future Enhancements

### Planned Features
- Drag-and-drop page builder
- Collaborative editing
- Content versioning
- Advanced analytics
- Multi-language support
- API integrations

### Performance Improvements
- Service worker caching
- Image optimization pipeline
- Database query optimization
- CDN integration
- Lazy loading improvements
