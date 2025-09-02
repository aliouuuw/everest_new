import React from 'react';
import { Link, Outlet, useNavigate } from '@tanstack/react-router';
import { FaCog, FaHome, FaImages, FaNewspaper, FaSignOutAlt, FaUsers } from 'react-icons/fa';
import { useAuth } from '../../components/Auth/useAuth';

const AdminLayout: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate({ to: '/auth' });
  };

  return (
    <div className="min-h-screen bg-[var(--white-smoke)]">
      {/* Admin Header */}
      <header className="bg-[var(--pure-white)]/80 backdrop-blur-sm border-b border-[var(--gold-metallic)]/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[var(--gold-metallic)] to-[var(--gold-dark)] rounded-xl flex items-center justify-center">
                  <FaCog className="text-white text-lg" />
                </div>
                <h1 className="text-2xl font-display font-semibold text-[var(--night)]">CMS Admin</h1>
              </div>
              {user && (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-[var(--night-80)]">
                    Logged in as: <span className="font-medium text-[var(--night)]">{user.name}</span>
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-[var(--gold-metallic-10)] text-[var(--gold-dark)] rounded-full border border-[var(--gold-metallic)]/20">
                    {user.role}
                  </span>
                </div>
              )}
            </div>
            <nav className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center text-[var(--night-80)] hover:text-[var(--night)] px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--white-smoke)]"
              >
                <FaHome className="mr-2" />
                Back to Site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-[var(--error-red)] hover:text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-red-50"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-72 bg-[var(--pure-white)]/80 backdrop-blur-sm border-r border-[var(--gold-metallic)]/20 shadow-sm min-h-screen">
          <div className="p-8">
            <ul className="space-y-3">
              <li>
                <Link
                  to="/admin"
                  className="flex items-center px-4 py-3 text-[var(--night-80)] hover:text-[var(--night)] hover:bg-[var(--gold-metallic-10)] rounded-xl transition-all duration-200 group"
                  activeProps={{ 
                    className: 'bg-[var(--gold-metallic-10)] text-[var(--gold-dark)] border border-[var(--gold-metallic)]/20' 
                  }}
                >
                  <div className="p-2 bg-[var(--gold-metallic-10)] group-hover:bg-[var(--gold-metallic-20)] rounded-lg transition-colors">
                    <FaHome className="text-[var(--gold-dark)]" />
                  </div>
                  <span className="ml-3 font-medium">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/publications"
                  className="flex items-center px-4 py-3 text-[var(--night-80)] hover:text-[var(--night)] hover:bg-[var(--gold-metallic-10)] rounded-xl transition-all duration-200 group"
                  activeProps={{ 
                    className: 'bg-[var(--gold-metallic-10)] text-[var(--gold-dark)] border border-[var(--gold-metallic)]/20' 
                  }}
                >
                  <div className="p-2 bg-[var(--gold-metallic-10)] group-hover:bg-[var(--gold-metallic-20)] rounded-lg transition-colors">
                    <FaNewspaper className="text-[var(--gold-dark)]" />
                  </div>
                  <span className="ml-3 font-medium">Publications</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/media"
                  className="flex items-center px-4 py-3 text-[var(--night-80)] hover:text-[var(--night)] hover:bg-[var(--gold-metallic-10)] rounded-xl transition-all duration-200 group"
                  activeProps={{ 
                    className: 'bg-[var(--gold-metallic-10)] text-[var(--gold-dark)] border border-[var(--gold-metallic)]/20' 
                  }}
                >
                  <div className="p-2 bg-[var(--gold-metallic-10)] group-hover:bg-[var(--gold-metallic-20)] rounded-lg transition-colors">
                    <FaImages className="text-[var(--gold-metallic)]" />
                  </div>
                  <span className="ml-3 font-medium">Media</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className="flex items-center px-4 py-3 text-[var(--night-80)] hover:text-[var(--night)] hover:bg-[var(--gold-metallic-10)] rounded-xl transition-all duration-200 group"
                  activeProps={{ 
                    className: 'bg-[var(--gold-metallic-10)] text-[var(--gold-dark)] border border-[var(--gold-metallic)]/20' 
                  }}
                >
                  <div className="p-2 bg-[var(--gold-metallic-10)] group-hover:bg-[var(--gold-metallic-20)] rounded-lg transition-colors">
                    <FaUsers className="text-[var(--gold-dark)]" />
                  </div>
                  <span className="ml-3 font-medium">Users</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/settings"
                  className="flex items-center px-4 py-3 text-[var(--night-80)] hover:text-[var(--night)] hover:bg-[var(--gold-metallic-10)] rounded-xl transition-all duration-200 group"
                  activeProps={{ 
                    className: 'bg-[var(--gold-metallic-10)] text-[var(--gold-dark)] border border-[var(--gold-metallic)]/20' 
                  }}
                >
                  <div className="p-2 bg-[var(--gold-metallic-10)] group-hover:bg-[var(--gold-metallic-20)] rounded-lg transition-colors">
                    <FaCog className="text-[var(--gold-dark)]" />
                  </div>
                  <span className="ml-3 font-medium">Settings</span>
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
