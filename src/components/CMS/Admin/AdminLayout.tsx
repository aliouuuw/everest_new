import React from 'react';
import { Link, Outlet } from '@tanstack/react-router';
import { FaChartLine, FaCog, FaImages, FaNewspaper, FaSignOutAlt, FaUsers } from 'react-icons/fa';
import { useAuthActions } from '@convex-dev/auth/react';
import { ProtectedAdminRoute } from './ProtectedAdminRoute';

const AdminLayout: React.FC = () => {
  const { signOut } = useAuthActions();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Convex will handle the redirect after sign out
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <ProtectedAdminRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Admin Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">CMS Admin</h1>
              </div>
              <nav className="flex space-x-4">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  ← Back to Site
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md text-sm font-medium transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <nav className="w-64 bg-white shadow-sm min-h-screen">
            <div className="p-6">
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/admin"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    activeProps={{ className: 'bg-blue-50 text-blue-700' }}
                  >
                    <FaChartLine className="mr-3" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/publications"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    activeProps={{ className: 'bg-blue-50 text-blue-700' }}
                  >
                    <FaNewspaper className="mr-3" />
                    Publications
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/media"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    activeProps={{ className: 'bg-blue-50 text-blue-700' }}
                  >
                    <FaImages className="mr-3" />
                    Media
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/users"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    activeProps={{ className: 'bg-blue-50 text-blue-700' }}
                  >
                    <FaUsers className="mr-3" />
                    Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/settings"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    activeProps={{ className: 'bg-blue-50 text-blue-700' }}
                  >
                    <FaCog className="mr-3" />
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
    </ProtectedAdminRoute>
  );
};

export default AdminLayout;
