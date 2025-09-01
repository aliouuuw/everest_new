import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { LoadingSpinner } from '../Shared';
import { useCurrentUser } from '@/hooks/useAuth';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const ensureUserProfile = useMutation(api.auth.ensureUserProfile);

  React.useEffect(() => {
    if (currentUser === undefined) {
      // Still loading, wait
      return;
    }

    if (!currentUser) {
      // User is not authenticated, redirect to signin
      navigate({ to: '/admin/signin', replace: true });
      return;
    }

    // If user exists but is missing required fields, ensure profile is complete
    // Add a small delay to ensure authentication is fully established
    if (currentUser && (!currentUser.createdAt || !currentUser.lastLogin)) {
      const timer = setTimeout(() => {
        ensureUserProfile().catch(error => {
          console.warn('Failed to ensure user profile:', error);
          // Continue anyway - this is not critical
        });
      }, 1000); // Wait 1 second for auth to fully establish
      
      return () => clearTimeout(timer);
    }

    if (currentUser.role !== 'admin') {
      // User is not an admin, redirect to signin
      navigate({ to: '/admin/signin', replace: true });
      return;
    }
  }, [currentUser, navigate, ensureUserProfile]);

  // Show loading while checking authentication status
  if (currentUser === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // If user is not authenticated or not admin, don't render anything
  if (!currentUser || currentUser.role !== 'admin') {
    return null;
  }

  // User is authenticated and is admin, render the protected content
  return <>{children}</>;
};
