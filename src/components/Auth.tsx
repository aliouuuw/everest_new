import React, { useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { FaSignInAlt, FaSpinner } from 'react-icons/fa';

export const Auth: React.FC = () => {
  const { signIn, signOut } = useAuthActions();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('convex');
    } catch (error) {
      console.error('Sign in failed:', error);
    } finally {
      setIsLoading(false);
    }
  };



  // For now, just show sign in button
  // We'll enhance this later with user state
  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
    >
      {isLoading ? (
        <FaSpinner className="animate-spin" />
      ) : (
        <FaSignInAlt />
      )}
      <span>Sign In</span>
    </button>
  );
};

export default Auth;
