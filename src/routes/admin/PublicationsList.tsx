import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { FaEdit, FaEye, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';

export const PublicationsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const publications = useQuery(api.publications.getPublications, { limit: 1000 });
  const deletePublication = useMutation(api.publications.deletePublication);

  const handleDelete = async (id: Id<"publications">) => {
    if (window.confirm('Are you sure you want to delete this publication?')) {
      try {
        await deletePublication({ id });
      } catch (error) {
        console.error('Failed to delete publication:', error);
        alert('Failed to delete publication');
      }
    }
  };

  const filteredPublications = publications?.page.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pub.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pub.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || pub.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  }) || [];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; label: string }> = {
      draft: { color: 'bg-[var(--gold-metallic-10)] text-[var(--gold-dark)] border-[var(--gold-metallic)]/20', label: 'Draft' },
      published: { color: 'bg-[var(--success-green)]/10 text-[var(--success-green)] border-[var(--success-green)]/20', label: 'Published' },
      archived: { color: 'bg-[var(--night)]/10 text-[var(--night)] border-[var(--night)]/20', label: 'Archived' },
    };
    
    const config = statusConfig[status] ?? statusConfig.draft;
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getCategoryBadge = (category: string) => {
    const categoryConfig: Record<string, { color: string; label: string }> = {
      'revues-hebdo': { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Weekly Reviews' },
      'revues-mensuelles': { color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'Monthly Reviews' },
      'teaser-dividende': { color: 'bg-[var(--success-green)]/10 text-[var(--success-green)] border-[var(--success-green)]/20', label: 'Dividend Teaser' },
      'marches': { color: 'bg-orange-100 text-orange-800 border-orange-200', label: 'Markets' },
      'analyses': { color: 'bg-red-100 text-red-800 border-red-200', label: 'Analyses' },
    };
    
    const config = categoryConfig[category] ?? { color: 'bg-[var(--night)]/10 text-[var(--night)] border-[var(--night)]/20', label: category };
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center border-b border-[var(--gold-metallic)]/20 pb-6">
        <div>
          <h1 className="text-4xl font-display font-semibold text-[var(--night)]">Publications</h1>
          <p className="text-[var(--night-80)] mt-3 text-lg">Manage your publications and blog posts</p>
        </div>
        <Link
          to="/admin/publications/new"
          className="btn-primary"
        >
          <FaPlus className="mr-2" />
          New Publication
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="stat-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--night-80)]" />
            <input
              type="text"
              placeholder="Search publications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-[var(--gold-metallic)]/20 rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-[var(--gold-metallic)]/20 rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors"
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border border-[var(--gold-metallic)]/20 rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors"
          >
            <option value="all">All Categories</option>
            <option value="revues-hebdo">Weekly Reviews</option>
            <option value="revues-mensuelles">Monthly Reviews</option>
            <option value="teaser-dividende">Dividend Teaser</option>
            <option value="marches">Markets</option>
            <option value="analyses">Analyses</option>
          </select>
        </div>
      </div>

      {/* Publications Table */}
      <div className="stat-card">
        <div className="px-6 py-4 border-b border-[var(--gold-metallic)]/20">
          <h2 className="text-xl font-display font-semibold text-[var(--night)]">
            Publications ({filteredPublications.length})
          </h2>
        </div>
        
        {filteredPublications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--gold-metallic)]/20">
              <thead className="bg-[var(--gold-metallic)]/5">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[var(--night-80)] uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[var(--night-80)] uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[var(--night-80)] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[var(--night-80)] uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[var(--night-80)] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[var(--pure-white)]/30 divide-y divide-[var(--gold-metallic)]/20">
                {filteredPublications.map((publication) => (
                  <tr key={publication._id} className="hover:bg-[var(--gold-metallic)]/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-display font-medium text-[var(--night)]">
                          {publication.title}
                        </div>
                        <div className="text-sm text-[var(--night-80)]">
                          {publication.description.substring(0, 100)}...
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getCategoryBadge(publication.category)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(publication.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--night-80)]">
                      {publication.createdAt ? new Date(publication.createdAt).toLocaleDateString() : 'Date non disponible'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <a
                          href={`/publications/${publication.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--gold-metallic)] hover:text-[var(--gold-dark)] transition-colors p-2 hover:bg-[var(--gold-metallic-10)] rounded-lg"
                          title="View"
                        >
                          <FaEye className="inline" />
                        </a>
                        <Link
                          to="/admin/publications/$id/edit"
                          params={{ id: publication._id }}
                          className="text-[var(--night)] hover:text-[var(--night-80)] transition-colors p-2 hover:bg-[var(--night)]/10 rounded-lg"
                          title="Edit"
                        >
                          <FaEdit className="inline" />
                        </Link>
                        <button
                          onClick={() => handleDelete(publication._id)}
                          className="text-[var(--error-red)] hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <FaTrash className="inline" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <FaSearch className="mx-auto h-16 w-16 text-[var(--gold-metallic)]/30" />
            <h3 className="mt-4 text-xl font-display font-medium text-[var(--night)]">No publications found</h3>
            <p className="mt-2 text-[var(--night-80)]">
              {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Get started by creating a new publication.'}
            </p>
            {!searchQuery && statusFilter === 'all' && categoryFilter === 'all' && (
              <div className="mt-8">
                <Link
                  to="/admin/publications/new"
                  className="btn-primary"
                >
                  <FaPlus className="mr-2" />
                  New Publication
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
