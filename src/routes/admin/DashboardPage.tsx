import React from 'react';
import { Link } from '@tanstack/react-router';
import { FaCog, FaImages, FaNewspaper, FaUsers } from 'react-icons/fa';

const AdminDashboardPage: React.FC = () => {
  const adminModules = [
    {
      title: 'Publications',
      description: 'Manage blog posts, articles, and news',
      icon: FaNewspaper,
      href: '/admin/publications',
      color: 'bg-blue-500',
    },
    {
      title: 'Media',
      description: 'Upload and organize images and files',
      icon: FaImages,
      href: '/admin/media',
      color: 'bg-green-500',
    },
    {
      title: 'Users',
      description: 'Manage user accounts and permissions',
      icon: FaUsers,
      href: '/admin/users',
      color: 'bg-purple-500',
    },
    {
      title: 'Settings',
      description: 'Configure system preferences',
      icon: FaCog,
      href: '/admin/settings',
      color: 'bg-gray-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome to the Everest Finance CMS. Manage your content and system settings from here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminModules.map((module) => (
          <Link
            key={module.title}
            to={module.href}
            className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${module.color} text-white`}>
                <module.icon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{module.title}</h3>
                <p className="text-sm text-gray-600">{module.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-sm text-gray-600">Publications</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-sm text-gray-600">Media Files</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-sm text-gray-600">Users</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
