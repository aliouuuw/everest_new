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
      color: 'bg-[var(--gold-metallic)] hover:bg-[var(--gold-dark)]',
    },
    {
      title: 'Manage Media',
      description: 'Upload and organize media files',
      icon: FaImages,
      href: '/admin/media',
      color: 'bg-[var(--success-green)] hover:bg-green-600',
    },
    {
      title: 'User Management',
      description: 'Manage user roles and permissions',
      icon: FaUsers,
      href: '/admin/users',
      color: 'bg-[var(--night)] hover:bg-[var(--night-80)]',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b border-[var(--gold-metallic)]/20 pb-6">
        <h1 className="text-4xl font-display font-semibold text-[var(--night)]">Admin Dashboard</h1>
        <p className="text-[var(--night-80)] mt-3 text-lg">Welcome to the CMS administration panel</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card card-hover">
          <div className="flex items-center">
            <div className="p-3 bg-[var(--gold-metallic-10)] rounded-xl border border-[var(--gold-metallic)]/20">
              <FaNewspaper className="text-[var(--gold-dark)] text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-[var(--night-80)]">Total Publications</p>
              <p className="text-2xl font-display font-semibold text-[var(--night)]">{stats.totalPublications}</p>
            </div>
          </div>
        </div>

        <div className="stat-card card-hover">
          <div className="flex items-center">
            <div className="p-3 bg-[var(--success-green)]/10 rounded-xl border border-[var(--success-green)]/20">
              <FaEye className="text-[var(--success-green)] text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-[var(--night-80)]">Published</p>
              <p className="text-2xl font-display font-semibold text-[var(--night)]">{stats.publishedPublications}</p>
            </div>
          </div>
        </div>

        <div className="stat-card card-hover">
          <div className="flex items-center">
            <div className="p-3 bg-[var(--gold-metallic-10)] rounded-xl border border-[var(--gold-metallic)]/20">
              <FaEdit className="text-[var(--gold-dark)] text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-[var(--night-80)]">Drafts</p>
              <p className="text-2xl font-display font-semibold text-[var(--night)]">{stats.draftPublications}</p>
            </div>
          </div>
        </div>

        <div className="stat-card card-hover">
          <div className="flex items-center">
            <div className="p-3 bg-[var(--night)]/10 rounded-xl border border-[var(--night)]/20">
              <FaUsers className="text-[var(--night)] text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-[var(--night-80)]">Total Users</p>
              <p className="text-2xl font-display font-semibold text-[var(--night)]">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="stat-card">
        <div className="px-6 py-4 border-b border-[var(--gold-metallic)]/20">
          <h2 className="text-xl font-display font-semibold text-[var(--night)]">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.href}
                className="block p-6 border border-[var(--gold-metallic)]/20 rounded-xl hover:shadow-lg hover:shadow-[var(--gold-metallic)]/10 transition-all duration-300 hover:border-[var(--gold-metallic)]/30 bg-[var(--pure-white)]/50"
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-xl text-white ${action.color} transition-colors`}>
                    <action.icon className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-display font-medium text-[var(--night)]">{action.title}</h3>
                    <p className="text-[var(--night-80)]">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="stat-card">
        <div className="px-6 py-4 border-b border-[var(--gold-metallic)]/20">
          <h2 className="text-xl font-display font-semibold text-[var(--night)]">Recent Publications</h2>
        </div>
        <div className="p-6">
          {publications?.page && publications.page.length > 0 ? (
            <div className="space-y-4">
              {publications.page.slice(0, 5).map((publication) => (
                <div key={publication._id} className="flex items-center justify-between p-4 border border-[var(--gold-metallic)]/20 rounded-xl bg-[var(--pure-white)]/50 hover:border-[var(--gold-metallic)]/30 transition-colors">
                  <div>
                    <h3 className="font-display font-medium text-[var(--night)]">{publication.title}</h3>
                    <p className="text-sm text-[var(--night-80)]">
                      {publication.category} • {publication.status}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to="/admin/publications/$id/edit"
                      params={{ id: publication._id }}
                      className="px-3 py-1 text-sm bg-[var(--gold-metallic-10)] text-[var(--gold-dark)] rounded-lg hover:bg-[var(--gold-metallic-20)] border border-[var(--gold-metallic)]/20 transition-colors"
                    >
                      Edit
                    </Link>
                    <a
                      href={`/publications/${publication.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-sm bg-[var(--night)]/10 text-[var(--night)] rounded-lg hover:bg-[var(--night)]/20 border border-[var(--night)]/20 transition-colors"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaNewspaper className="mx-auto h-12 w-12 text-[var(--gold-metallic)]/40" />
              <h3 className="mt-4 text-lg font-display font-medium text-[var(--night)]">No publications yet</h3>
              <p className="mt-2 text-[var(--night-80)]">Create your first publication to get started!</p>
              <div className="mt-6">
                <Link
                  to="/admin/publications/new"
                  className="btn-primary"
                >
                  <FaPlus className="mr-2" />
                  Create Publication
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
