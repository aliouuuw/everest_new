import React from 'react';
import { Link } from '@tanstack/react-router';
import { FaEdit, FaEye, FaImages, FaNewspaper, FaPlus, FaUsers } from 'react-icons/fa';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export const AdminDashboard = () => {
  // Fetch basic statistics
  const publications = useQuery(api.publications.getPublications, { limit: 1000 });
  const users = useQuery(api.users.getUsers);

  const stats = {
    totalPublications: publications?.page.length || 0,
    publishedPublications: publications?.page.filter(p => p.status === 'published').length || 0,
    draftPublications: publications?.page.filter(p => p.status === 'draft').length || 0,
    totalUsers: users?.length || 0,
  };

  const quickActions = [
    {
      title: 'Create Publication',
      description: 'Add a new publication or blog post',
      icon: FaPlus,
      href: '/admin/publications/new',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'Manage Media',
      description: 'Upload and organize media files',
      icon: FaImages,
      href: '/admin/media',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      title: 'User Management',
      description: 'Manage user roles and permissions',
      icon: FaUsers,
      href: '/admin/users',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the CMS administration panel</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <FaNewspaper className="text-blue-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Publications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPublications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <FaEye className="text-green-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">{stats.publishedPublications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <FaEdit className="text-yellow-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.draftPublications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <FaUsers className="text-purple-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.href}
                className="block p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${action.color} text-white`}>
                    <action.icon className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{action.title}</h3>
                    <p className="text-gray-600">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Publications</h2>
        </div>
        <div className="p-6">
          {publications?.page && publications.page.length > 0 ? (
            <div className="space-y-4">
              {publications.page.slice(0, 5).map((publication) => (
                <div key={publication._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{publication.title}</h3>
                    <p className="text-sm text-gray-600">
                      {publication.category} • {publication.status}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to="/admin/publications/$id/edit"
                      params={{ id: publication._id }}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                    >
                      Edit
                    </Link>
                    <a
                      href={`/publications/${publication.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No publications yet. Create your first one!</p>
          )}
        </div>
      </div>
    </div>
  );
};
