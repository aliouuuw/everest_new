import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from '@tanstack/react-router';
import { FaBars, FaCog, FaImages, FaNewspaper, FaSignOutAlt, FaTachometerAlt, FaUsers } from 'react-icons/fa';
import { useAuth } from '../../components/Auth/useAuth';

const AdminLayout: React.FC = () => {
  const { signOut, isTransitioning } = useAuth();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleLogout = async () => {
    setIsSigningOut(true);
    try {
      const result = await signOut();
      
      // Wait a moment for state to clear
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Navigate to auth page
      navigate({ to: '/auth', replace: true });
    } catch (error) {
      console.warn('Signout error:', error);
      // Still navigate even if there's an error
      navigate({ to: '/auth', replace: true });
    } finally {
      setIsSigningOut(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-[var(--pure-white)] text-[var(--night)]">
      {/* Admin Header */}
      <header className="glassmorphism sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-[var(--gold-metallic-10)] transition-colors duration-200"
                aria-label="Toggle sidebar"
              >
                <FaBars className="text-lg text-[var(--night-80)]" />
              </button>
              <h1 className="text-2xl font-display font-semibold text-[var(--night)]">CMS Admin</h1>
            </div>
            <nav className="flex space-x-4">
              <Link
                to="/"
                className="btn-secondary font-display tracking-wide"
              >
                ← Back to Site
              </Link>
              <button
                onClick={handleLogout}
                disabled={isSigningOut || isTransitioning}
                className="btn-primary font-display tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaSignOutAlt className="mr-2" />
                {isSigningOut || isTransitioning ? 'Signing Out...' : 'Sign Out'}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className={`min-h-screen p-6 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'w-0 overflow-hidden' : 'w-64'
        }`}>
          <div className={`stat-card h-full transition-opacity duration-200 ${
            isSidebarCollapsed ? 'opacity-0' : 'opacity-100'
          }`}>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin"
                  className="flex items-center px-4 py-3 text-[var(--night-80)] hover:text-[var(--night)] hover:bg-[var(--gold-metallic-10)] rounded-xl transition-all duration-300 font-medium"
                  activeProps={{ className: 'bg-[var(--gold-metallic-10)] text-[var(--gold-dark)] font-semibold' }}
                  activeOptions={{ exact: true }}
                >
                  <FaTachometerAlt className="mr-3 text-lg" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/publications"
                  className="flex items-center px-4 py-3 text-[var(--night-80)] hover:text-[var(--night)] hover:bg-[var(--gold-metallic-10)] rounded-xl transition-all duration-300 font-medium"
                  activeProps={{ className: 'bg-[var(--gold-metallic-10)] text-[var(--gold-dark)] font-semibold' }}
                >
                  <FaNewspaper className="mr-3 text-lg" />
                  Publications
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/media"
                  className="flex items-center px-4 py-3 text-[var(--night-80)] hover:text-[var(--night)] hover:bg-[var(--gold-metallic-10)] rounded-xl transition-all duration-300 font-medium"
                  activeProps={{ className: 'bg-[var(--gold-metallic-10)] text-[var(--gold-dark)] font-semibold' }}
                >
                  <FaImages className="mr-3 text-lg" />
                  Media
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className="flex items-center px-4 py-3 text-[var(--night-80)] hover:text-[var(--night)] hover:bg-[var(--gold-metallic-10)] rounded-xl transition-all duration-300 font-medium"
                  activeProps={{ className: 'bg-[var(--gold-metallic-10)] text-[var(--gold-dark)] font-semibold' }}
                >
                  <FaUsers className="mr-3 text-lg" />
                  Users
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/settings"
                  className="flex items-center px-4 py-3 text-[var(--night-80)] hover:text-[var(--night)] hover:bg-[var(--gold-metallic-10)] rounded-xl transition-all duration-300 font-medium"
                  activeProps={{ className: 'bg-[var(--gold-metallic-10)] text-[var(--gold-dark)] font-semibold' }}
                >
                  <FaCog className="mr-3 text-lg" />
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
