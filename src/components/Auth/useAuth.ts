import { useConvexAuth, useQuery } from 'convex/react';
import { useAuthActions } from '@convex-dev/auth/react';
import { useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
import { api } from '../../../convex/_generated/api';

export const useAuth = () => {
  const { isAuthenticated, isLoading: convexLoading } = useConvexAuth();
  const { signIn: convexSignIn, signOut: convexSignOut } = useAuthActions();
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Query user data only when authenticated
  const user = useQuery(api.users.getCurrentUser, isAuthenticated ? {} : "skip");
  
  // Combined loading state
  const isLoading = convexLoading || isTransitioning || (isAuthenticated && user === undefined);

  // Enhanced sign in with proper state management
  const signIn = useCallback(async (provider: string, params: any) => {
    setIsTransitioning(true);
    try {
      await convexSignIn(provider, params);
      
      // Wait for auth state to stabilize
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsTransitioning(false);
    }
  }, [convexSignIn]);

  // Enhanced sign out with proper state management
  const signOut = useCallback(async () => {
    setIsTransitioning(true);
    try {
      await convexSignOut();
      
      // Wait for auth state to clear
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear any cached data
      window.localStorage.removeItem('convex-auth-token');
      
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      // Continue with navigation even if sign out fails
      return { success: false };
    } finally {
      setIsTransitioning(false);
    }
  }, [convexSignOut]);

  // Handle navigation after auth state changes
  const navigateBasedOnRole = useCallback(() => {
    if (!isAuthenticated || !user || isTransitioning) return;

    const currentPath = window.location.pathname;
    
    // Only redirect if user is on auth page or root
    if (currentPath === '/auth' || currentPath === '/') {
      try {
        // Add a small delay to ensure user data is fully loaded
        setTimeout(() => {
          if (user.role === 'admin' || user.role === 'editor') {
            navigate({ to: '/admin', replace: true });
          } else if (user.role === 'client') {
            navigate({ to: '/dashboard', replace: true });
          } else {
            // For any other role or if role is undefined, redirect to home
            console.log('User role undefined or unknown, redirecting to home');
            navigate({ to: '/', replace: true });
          }
        }, 200);
      } catch (error) {
        console.warn('Navigation error during role-based redirect:', error);
        // Fallback: try direct navigation
        setTimeout(() => {
          try {
            if (user.role === 'admin' || user.role === 'editor') {
              window.location.href = '/admin';
            } else if (user.role === 'client') {
              window.location.href = '/dashboard';
            } else {
              window.location.href = '/';
            }
          } catch (fallbackError) {
            console.error('Fallback navigation also failed:', fallbackError);
          }
        }, 300);
      }
    }
  }, [isAuthenticated, user, navigate, isTransitioning]);

  // Watch for auth state changes and navigate accordingly
  useEffect(() => {
    if (!isLoading) {
      // Add a small delay to ensure state has stabilized
      const timeoutId = setTimeout(() => {
        navigateBasedOnRole();
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading, navigateBasedOnRole]);

  return {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signOut,
    isTransitioning
  };
};
