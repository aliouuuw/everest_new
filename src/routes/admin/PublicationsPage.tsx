import React, { useState } from 'react';
import { FaEdit, FaEye, FaFilter, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { useDeletePublication, usePublications } from '@/hooks/useCMS';
import { formatDate } from '@/utils/cms/helpers';
import { PUBLICATION_CATEGORIES, PUBLICATION_STATUS } from '@/utils/cms/constants';
import LoadingSpinner from '@/components/CMS/Shared/LoadingSpinner';

const PublicationsPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Fetch publications with filters
  const publications = usePublications({
    status: statusFilter !== 'all' ? statusFilter as any : undefined,
    category: categoryFilter !== 'all' ? categoryFilter : undefined,
    limit: 50,
  });

  const deletePublication = useDeletePublication();

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deletePublication({ id: id as any });
        // Success handled by ConvexDB optimistic updates
      } catch (error) {
        console.error('Failed to delete publication:', error);
        alert('Failed to delete publication. Please try again.');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    const cat = PUBLICATION_CATEGORIES.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  const filteredPublications = publications?.page?.filter((pub: any) =>
    pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? [];

  if (!publications?.page) {
    return (
      <div className="p-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Publications</h1>
          <p className="text-gray-600 mt-2">Manage your content publications</p>
        </div>
        <button
          onClick={() => window.location.href = '/admin/publications/new'}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlus className="text-sm" />
          New Publication
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search publications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <FaFilter className="text-sm" />
                Filters
              </button>
            </div>

            <div className="text-sm text-gray-500">
              {filteredPublications.length} publication{filteredPublications.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="p-4 border-b bg-gray-50">
            <div className="flex gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  {PUBLICATION_STATUS.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {PUBLICATION_CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Publications List */}
      <div className="bg-white rounded-lg shadow-sm border">
        {filteredPublications.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <FaSearch className="text-6xl mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No publications found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your filters or search terms.'
                : 'Get started by creating your first publication.'}
            </p>
            <button
              onClick={() => window.location.href = '/admin/publications/new'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <FaPlus className="text-sm" />
              Create Publication
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Publication
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Published
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPublications.map((publication: any) => (
                  <tr key={publication._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">
                          {publication.title}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {publication.excerpt}
                        </div>
                        {publication.featured && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {getCategoryLabel(publication.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(publication.status)}`}>
                        {publication.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {publication.publishedAt ? formatDate(publication.publishedAt) : 'Not published'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => window.location.href = `/publications/${publication.slug}`}
                          className="text-gray-600 hover:text-gray-900 p-1"
                          title="View"
                        >
                          <FaEye className="text-sm" />
                        </button>
                        <button
                          onClick={() => window.location.href = `/admin/publications/${publication._id}`}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Edit"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleDelete(publication._id, publication.title)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicationsPage;
