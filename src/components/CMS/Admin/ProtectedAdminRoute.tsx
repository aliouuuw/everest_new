import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { LoadingSpinner } from '@/components/CMS/Shared';
import { useCurrentUser } from '@/hooks/useAuth';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  React.useEffect(() => {
    if (currentUser === undefined) {
      // Still loading, wait
      return;
    }

    if (!currentUser) {
      // User is not authenticated, redirect to signin
      navigate({ to: '/auth', replace: true });
      return;
    }

    if (currentUser.role !== 'admin') {
      // User is not an admin, redirect to signin
      navigate({ to: '/auth', replace: true });
      return;
    }
  }, [currentUser, navigate]);

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
