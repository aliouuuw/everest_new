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
    if (!isAuthenticated || !user) return;

    const currentPath = window.location.pathname;
    
    // If user is on auth page and is authenticated, redirect based on role
    if (currentPath === '/auth') {
      if (user.role === 'admin' || user.role === 'editor') {
        navigate({ to: '/admin', replace: true });
      } else {
        navigate({ to: '/dashboard', replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  // Watch for auth state changes and navigate accordingly
  useEffect(() => {
    if (!isLoading) {
      navigateBasedOnRole();
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
