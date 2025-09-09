import React, { useState } from 'react';
import { Outlet, useNavigate } from '@tanstack/react-router';
import { FaBars, FaCog, FaImages, FaNewspaper, FaSearch, FaSignOutAlt, FaTachometerAlt, FaUsers } from 'react-icons/fa';
import { useAuth } from '../../components/Auth/useAuth';

const AdminLayout: React.FC = () => {
  const { signOut, isTransitioning } = useAuth();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  const navigationItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", id: 'dashboard', href: '/admin', active: activeView === 'dashboard' },
    { icon: <FaNewspaper />, label: "Publications", id: 'publications', href: '/admin/publications', active: activeView === 'publications' },
    { icon: <FaImages />, label: "Media", id: 'media', href: '/admin/media', active: activeView === 'media' },
    { icon: <FaUsers />, label: "Users", id: 'users', href: '/admin/users', active: activeView === 'users' },
    { icon: <FaCog />, label: "Settings", id: 'settings', href: '/admin/settings', active: activeView === 'settings' },
  ];

  const handleLogout = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      
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
    <div className="min-h-screen bg-gradient-to-br from-[var(--pure-white)] to-[var(--white-smoke)] text-[var(--night)]">
      {/* App Chrome Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--night)]/10 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 hover:bg-[var(--night)]/5 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            <FaBars className="text-lg text-[var(--night-80)]" />
          </button>
          <img src="/logo-everest.png" alt="Everest" className="h-6" />
          <div className="text-sm font-display">CMS Admin</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--white-smoke)]/60 border border-[var(--night)]/10">
            <FaSearch className="text-secondary" />
            <input aria-label="Rechercher" placeholder="Rechercher…" className="bg-transparent text-sm outline-none placeholder:text-secondary/70" />
          </div>
          <div className="text-xs text-secondary">Administrateur</div>
          <button
            onClick={handleLogout}
            disabled={isSigningOut || isTransitioning}
            className="flex items-center gap-2 px-3 py-2 text-sm text-secondary hover:text-[var(--night)] hover:bg-[var(--night)]/5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaSignOutAlt />
            Déconnexion
          </button>
        </div>
      </div>


      <div className="grid grid-cols-12 min-h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className={`col-span-12 lg:col-span-2 xl:col-span-2 border-r border-[var(--night)]/10 bg-white/50 p-4 ${
          isSidebarCollapsed ? 'hidden lg:block' : ''
        }`}>
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    navigate({ to: item.href });
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    item.active
                      ? 'bg-[var(--night)] text-[var(--pure-white)]'
                      : 'hover:bg-[var(--white-smoke)] text-secondary hover:text-[var(--night)]'
                  }`}
                >
                  <span className="opacity-80">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </nav>

          {/* System Status Card */}
          <div className="mt-8 p-4 rounded-lg bg-[var(--gold-metallic)]/10 border border-[var(--gold-metallic)]/20">
            <div className="text-xs text-secondary mb-1">System Status</div>
            <div className="font-display text-sm text-[var(--night)]">Online</div>
            <div className="text-xs text-secondary mt-1">All systems operational</div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="col-span-12 lg:col-span-10 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
