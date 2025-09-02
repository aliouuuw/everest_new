# Role-Based Authentication Testing Guide

## Overview
The application now implements role-based navigation that automatically routes users to the appropriate dashboard based on their role after authentication.

## User Roles and Access

### 1. Admin Role
- **Access**: Admin Dashboard (`/admin/dashboard`)
- **Permissions**: Full administrative access
- **Navigation**: Automatically routed to admin dashboard after sign-in

### 2. Editor Role  
- **Access**: Admin Dashboard (`/admin/dashboard`)
- **Permissions**: Content management access
- **Navigation**: Automatically routed to admin dashboard after sign-in

### 3. Client Role
- **Access**: Client Dashboard (`/dashboard`)
- **Permissions**: Portfolio and account management
- **Navigation**: Automatically routed to client dashboard after sign-in
- **Default Role**: New users signing up get this role by default

### 4. Viewer Role
- **Access**: Limited read-only access
- **Permissions**: View-only access to certain areas
- **Navigation**: Routed based on specific implementation

## Testing the Role-Based Navigation

### 1. Setting Up Test Users

You can create test users with different roles using the Convex dashboard:

```bash
# In the Convex dashboard, run the seedTestUsers mutation
npx convex run seedUsers:seedTestUsers
```

This will create the following test users:
- `admin@everest.com` (Admin role)
- `editor@everest.com` (Editor role)
- `client@everest.com` (Client role)
- `viewer@everest.com` (Viewer role)

### 2. Testing Sign-In Flow

1. **Admin/Editor Sign-In**:
   - Navigate to `/auth`
   - Sign in with admin or editor credentials
   - Should be automatically redirected to `/admin/dashboard`

2. **Client Sign-In**:
   - Navigate to `/auth`
   - Sign in with client credentials
   - Should be automatically redirected to `/dashboard`

3. **New User Sign-Up**:
   - Navigate to `/auth` and switch to sign-up mode
   - Create a new account
   - Should be assigned "client" role by default
   - Should be redirected to `/dashboard`

### 3. Testing Protected Routes

1. **Client trying to access Admin Dashboard**:
   - Sign in as a client user
   - Try to navigate to `/admin/dashboard`
   - Should see "Access Denied" message

2. **Admin trying to access Client Dashboard**:
   - Sign in as an admin user
   - Try to navigate to `/dashboard`
   - Should be redirected to `/admin/dashboard`

### 4. Updating User Roles (For Testing)

You can update a user's role using the Convex dashboard:

```bash
# Update a user's role
npx convex run seedUsers:updateUserRole --email "user@example.com" --role "admin"
```

## Implementation Details

### Key Components

1. **`useAuth` Hook** (`src/components/Auth/useAuth.ts`):
   - Fetches current user data from Convex
   - Provides user role information
   - Handles authentication state

2. **`SigninForm` Component** (`src/components/Auth/SigninForm.tsx`):
   - Handles user sign-in
   - Implements role-based navigation after successful authentication
   - Routes admins/editors to `/admin/dashboard`
   - Routes clients to `/dashboard`

3. **`SignupForm` Component** (`src/components/Auth/SignupForm.tsx`):
   - Handles new user registration
   - New users get "client" role by default
   - Routes to client dashboard after sign-up

4. **`ProtectedRoute` Component** (`src/components/Auth/ProtectedRoute.tsx`):
   - Wraps protected pages
   - Checks user authentication and role
   - Shows access denied for unauthorized roles

5. **`DashboardPage` Component** (`src/routes/DashboardPage.tsx`):
   - Protected with `requiredRole="client"`
   - Only accessible to users with client role
   - Uses Convex Auth instead of sessionStorage

### Database Schema

The user roles are defined in `convex/schema.ts`:

```typescript
role: v.union(
  v.literal("admin"),
  v.literal("editor"),
  v.literal("viewer"),
  v.literal("client")
)
```

### Default Role Assignment

- New users signing up get "client" role by default (defined in `convex/auth.ts`)
- Admin users must be manually assigned the admin role

## Troubleshooting

### User not redirected after sign-in
- Check browser console for errors
- Verify user role in Convex dashboard
- Ensure authentication state is properly loaded

### Access Denied errors
- Verify user has correct role for the route
- Check ProtectedRoute component configuration
- Ensure role is properly fetched from database

### Authentication state not persisting
- Check Convex Auth configuration
- Verify auth cookies are being set
- Check browser storage settings

## Future Enhancements

1. **Role Management UI**: Admin interface to manage user roles
2. **Permission System**: More granular permissions within roles
3. **Multi-factor Authentication**: Enhanced security for admin users
4. **Session Management**: Better control over user sessions
5. **Audit Logging**: Track role changes and access attempts
