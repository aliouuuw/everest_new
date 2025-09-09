import { Link } from '@tanstack/react-router';
import { FaEdit, FaEye, FaImages, FaNewspaper, FaPlus, FaUsers } from 'react-icons/fa';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import React from 'react';

// Sparkline component for mini charts
const Sparkline: React.FC<{ points: Array<number>; stroke?: string; fill?: string; className?: string }> = ({
  points,
  stroke = "#B68D40",
  fill = "rgba(182,141,64,0.15)",
  className = ""
}) => {
  const width = 120;
  const height = 36;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = Math.max(1, max - min);
  const stepX = width / (points.length - 1);
  const normalized = points.map((p, i) => {
    const x = i * stepX;
    const y = height - ((p - min) / range) * height;
    return `${x},${y}`;
  });
  const polygon = `0,${height} ${normalized.join(" ")} ${width},${height}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={`block ${className}`}>
      <polyline points={normalized.join(" ")} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <polygon points={polygon} fill={fill} />
    </svg>
  );
};

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

  // Mock trend data for sparklines
  const trendData = {
    totalPublications: [15, 18, 20, 22, 25, 28, 30],
    publishedPublications: [12, 14, 16, 18, 20, 22, 24],
    draftPublications: [3, 4, 4, 4, 5, 6, 6],
    totalUsers: [5, 6, 7, 8, 9, 10, 11]
  };

  // Delta values
  const deltas = {
    totalPublications: "+12%",
    publishedPublications: "+8%",
    draftPublications: "+4%",
    totalUsers: "+15%"
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
      <div className="border-b border-[var(--gold-metallic)]/10 pb-4 sm:pb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-[var(--night)]">Admin Dashboard</h1>
        <p className="text-[var(--night-80)] mt-2 sm:mt-3 text-base sm:text-lg">Welcome to the CMS administration panel</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          {
            label: "Total Publications",
            value: stats.totalPublications,
            delta: deltas.totalPublications,
            trend: trendData.totalPublications,
            icon: <FaNewspaper />
          },
          {
            label: "Published",
            value: stats.publishedPublications,
            delta: deltas.publishedPublications,
            trend: trendData.publishedPublications,
            icon: <FaEye />
          },
          {
            label: "Drafts",
            value: stats.draftPublications,
            delta: deltas.draftPublications,
            trend: trendData.draftPublications,
            icon: <FaEdit />
          },
          {
            label: "Total Users",
            value: stats.totalUsers,
            delta: deltas.totalUsers,
            trend: trendData.totalUsers,
            icon: <FaUsers />
          },
        ].map((k, i) => (
          <div key={i} className="rounded-lg p-4 bg-[var(--white-smoke)] border border-[var(--night)]/10 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-secondary text-xs">{k.label}</div>
              <div className="text-[var(--gold-metallic)]">{k.icon}</div>
            </div>
            <div className="flex items-end justify-between mt-1">
              <div className="font-display text-lg">{k.value}</div>
              <div className="text-[10px] px-1.5 py-0.5 rounded bg-white/80 border border-[var(--night)]/10 text-secondary">{k.delta}</div>
            </div>
            <div className="mt-2 opacity-80">
              <Sparkline points={k.trend} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Quick Actions - Takes 2 columns on xl screens */}
        <div className="xl:col-span-2 rounded-xl p-4 sm:p-6 border border-[var(--night)]/10 bg-white/70">
          <h2 className="text-lg sm:text-xl font-display font-semibold text-[var(--night)] mb-4 sm:mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.href}
                className="block p-3 sm:p-4 border border-[var(--gold-metallic)]/20 rounded-xl hover:shadow-lg hover:shadow-[var(--gold-metallic)]/10 transition-all duration-300 hover:border-[var(--gold-metallic)]/30 bg-[var(--pure-white)]/50 hover:bg-white"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`p-2 sm:p-3 rounded-xl text-white ${action.color} transition-all duration-300 hover:shadow-lg`}>
                    <action.icon className="text-base sm:text-lg" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-display font-medium text-[var(--night)]">{action.title}</h3>
                    <p className="text-[var(--night-80)] text-xs sm:text-sm">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Publications - Takes 1 column on xl screens */}
        <div className="rounded-xl p-4 sm:p-6 border border-[var(--night)]/10 bg-white/70">
          <h2 className="text-lg sm:text-xl font-display font-semibold text-[var(--night)] mb-4 sm:mb-6">Recent Publications</h2>
          {publications?.page && publications.page.length > 0 ? (
            <div className="space-y-4">
              {publications.page.slice(0, 5).map((publication) => (
                <div key={publication._id} className="flex items-center justify-between p-4 border border-[var(--gold-metallic)]/20 rounded-xl bg-[var(--pure-white)]/50 hover:border-[var(--gold-metallic)]/30 hover:shadow-md transition-all duration-300">
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
                      className="px-3 py-1 text-sm bg-[var(--gold-metallic-10)] text-[var(--gold-dark)] rounded-lg hover:bg-[var(--gold-metallic-20)] border border-[var(--gold-metallic)]/20 transition-all duration-300 hover:shadow-sm"
                    >
                      Edit
                    </Link>
                    <a
                      href={`/publications/${publication.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-sm bg-[var(--night)]/10 text-[var(--night)] rounded-lg hover:bg-[var(--night)]/20 border border-[var(--night)]/20 transition-all duration-300 hover:shadow-sm"
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
                  className="btn-primary hover:shadow-lg transition-all duration-300"
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
