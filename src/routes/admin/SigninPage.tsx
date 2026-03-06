import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useAuthActions } from '@convex-dev/auth/react';
import { useCurrentUser } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/CMS/Shared';

const AdminSigninPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuthActions();
  const currentUser = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Check if user is already authenticated and is admin
  React.useEffect(() => {
    if (currentUser === undefined) {
      // Still loading
      console.log('No user found, still loading');
      return;
    }

    if (currentUser && currentUser.role === 'admin') {
      // User is authenticated and is admin, redirect to admin dashboard
      navigate({ to: '/admin', replace: true });
    }
  }, [currentUser, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use Convex authentication with password provider
      await signIn('password', { email, password, role: "admin", flow: "signIn", redirectTo: "/admin" });
      
      // Don't call ensureUserProfile here - let the useEffect handle the redirect
      // after authentication is fully established
      console.log('Sign in successful');
      
    } catch (err) {
      console.error('Sign in failed:', err);
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking authentication status
  if (currentUser === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--mauve)' }}>
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // If user exists but is not admin, show error
  if (currentUser && currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--mauve)' }}>
        <div className="max-w-md w-full p-8 text-center" style={{ background: 'var(--pure-white)', border: '1px solid rgba(70,29,76,0.2)' }}>
          <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--night)', fontFamily: 'var(--font-display-aptos)' }}>
            Accès refusé
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--night-60)', fontFamily: 'var(--font-primary)' }}>
            Vous n'avez pas les privilèges administrateur.
          </p>
          <button
            onClick={() => navigate({ to: '/', replace: true })}
            className="btn-primary"
          >
            Retour au site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--mauve) 0%, #2e1133 100%)' }}
    >
      {/* Gold atmospheric glow */}
      <div
        className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(202,148,47,0.12) 0%, transparent 60%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-1/2 h-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(70,29,76,0.4) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-md w-full mx-4">
        {/* Brand header */}
        <div className="text-center mb-10">
          <span
            className="block text-[10px] tracking-[0.35em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
          >
            Administration
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: '2rem',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--pure-white)',
            }}
          >
            Accès CMS
          </h2>
        </div>

        <div
          className="py-8 px-8"
          style={{ background: 'var(--pure-white)', border: '1px solid rgba(202,148,47,0.2)' }}
        >
          {error && (
            <div
              className="mb-6 p-4"
              style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)' }}
            >
              <p className="text-sm" style={{ color: '#dc2626', fontFamily: 'var(--font-primary)' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] tracking-[0.1em] uppercase mb-2"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}
              >
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-4 w-4" style={{ color: 'var(--mauve-40)' }} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 text-sm outline-none transition-all duration-300"
                  style={{
                    border: '1px solid rgba(70,29,76,0.2)',
                    fontFamily: 'var(--font-primary)',
                    color: 'var(--night)',
                    background: 'var(--pure-white)',
                  }}
                  placeholder="admin@everestfin.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[11px] tracking-[0.1em] uppercase mb-2"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}
              >
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-4 w-4" style={{ color: 'var(--mauve-40)' }} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 text-sm outline-none transition-all duration-300"
                  style={{
                    border: '1px solid rgba(70,29,76,0.2)',
                    fontFamily: 'var(--font-primary)',
                    color: 'var(--night)',
                    background: 'var(--pure-white)',
                  }}
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="transition-colors duration-200"
                    style={{ color: 'var(--mauve-40)' }}
                  >
                    {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-3 px-6 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: isLoading ? 'rgba(70,29,76,0.7)' : 'var(--mauve)',
                  color: 'var(--pure-white)',
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 500,
                }}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Connexion...
                  </>
                ) : (
                  <>
                    <FaSignInAlt />
                    Se connecter
                  </>
                )}
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => navigate({ to: '/', replace: true })}
                className="text-[11px] tracking-[0.1em] uppercase transition-colors duration-300 hover:text-[var(--mauve)]"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'var(--night-60)' }}
              >
                ← Retour au site
              </button>
            </div>
          </form>
        </div>

        {/* Gold rule at bottom */}
        <div
          className="h-[2px] w-16 mx-auto mt-6"
          style={{ background: 'linear-gradient(90deg, transparent, var(--jaune-or), transparent)' }}
        />
      </div>
    </div>
  );
};

export default AdminSigninPage;
