import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FaEdit, FaEye, FaFilter, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { useDeletePublication, usePublications } from '@/hooks/useCMS';
import { PUBLICATION_CATEGORIES, PUBLICATION_STATUS } from '@/utils/cms/constants';
import { formatDate } from '@/utils/cms/helpers';
import { LoadingSpinner } from '@/components/CMS/Shared';

const PublicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const publications = usePublications({
    status: statusFilter !== 'all' ? statusFilter as "draft" | "published" | "archived" : undefined,
    category: categoryFilter !== 'all' ? categoryFilter : undefined,
    limit: 50,
  });
  const deletePublication = useDeletePublication();

  // Filter publications based on search and filters
  const filteredPublications = publications?.page.filter((pub: any) => {
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pub.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pub.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || pub.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  }) || [];

  const handleNewPublication = () => {
    navigate({ to: '/admin/publications/new' });
  };

  const handleEditPublication = (publicationId: string) => {
    navigate({ to: `/admin/publications/${publicationId}` });
  };

  const handleDeletePublication = async (publicationId: string) => {
    if (window.confirm('Are you sure you want to delete this publication? This action cannot be undone.')) {
      try {
        await deletePublication({ id: publicationId as any });
      } catch (error) {
        console.error('Failed to delete publication:', error);
      }
    }
  };

  const getStatusStyle = (status: string): React.CSSProperties => {
    switch (status) {
      case 'published': return { background: 'rgba(70,29,76,0.08)', color: 'var(--mauve)', fontFamily: 'var(--font-primary)', fontWeight: 500 };
      case 'draft': return { background: 'rgba(202,148,47,0.1)', color: 'var(--jaune-or)', fontFamily: 'var(--font-primary)', fontWeight: 500 };
      case 'archived': return { background: 'rgba(10,10,10,0.06)', color: 'var(--night-60)', fontFamily: 'var(--font-primary)', fontWeight: 500 };
      default: return { background: 'rgba(10,10,10,0.06)', color: 'var(--night-60)', fontFamily: 'var(--font-primary)', fontWeight: 500 };
    }
  };

  const getCategoryLabel = (category: string) => {
    const cat = PUBLICATION_CATEGORIES.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  if (!publications) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display-aptos)', color: 'var(--night)' }}>Publications</h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--night-60)', fontFamily: 'var(--font-primary)' }}>Gérez vos publications de contenu</p>
        </div>
        <button
          onClick={handleNewPublication}
          className="flex items-center gap-2 px-4 py-2 text-[11px] tracking-[0.15em] uppercase transition-all duration-300"
          style={{ background: 'var(--mauve)', color: 'var(--pure-white)', fontFamily: 'var(--font-primary)', fontWeight: 500 }}
        >
          <FaPlus className="text-sm" />
          Nouvelle publication
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6" style={{ background: 'var(--pure-white)', border: '1px solid rgba(70,29,76,0.12)' }}>
        <div className="p-4" style={{ borderBottom: '1px solid rgba(70,29,76,0.08)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm" style={{ color: 'var(--mauve-40)' }} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 text-sm outline-none transition-all duration-300"
                  style={{ border: '1px solid rgba(70,29,76,0.2)', fontFamily: 'var(--font-primary)', color: 'var(--night)' }}
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-2 text-sm transition-all duration-300"
                style={{ border: '1px solid rgba(70,29,76,0.2)', fontFamily: 'var(--font-primary)', color: 'var(--night-60)' }}
              >
                <FaFilter className="text-sm" />
                Filtres
              </button>
            </div>

            <div className="text-sm" style={{ color: 'var(--night-60)', fontFamily: 'var(--font-primary)' }}>
              {filteredPublications.length} publication{filteredPublications.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="p-4" style={{ borderBottom: '1px solid rgba(70,29,76,0.08)', background: 'rgba(70,29,76,0.02)' }}>
            <div className="flex gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-[11px] tracking-[0.08em] uppercase mb-1" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>Statut</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-sm outline-none"
                  style={{ border: '1px solid rgba(70,29,76,0.2)', fontFamily: 'var(--font-primary)', color: 'var(--night)' }}
                >
                  <option value="all">Tous</option>
                  {PUBLICATION_STATUS.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-[11px] tracking-[0.08em] uppercase mb-1" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>Catégorie</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-sm outline-none"
                  style={{ border: '1px solid rgba(70,29,76,0.2)', fontFamily: 'var(--font-primary)', color: 'var(--night)' }}
                >
                  <option value="all">Toutes catégories</option>
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
      <div style={{ background: 'var(--pure-white)', border: '1px solid rgba(70,29,76,0.12)' }}>
        {filteredPublications.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mb-4" style={{ color: 'var(--mauve-20)' }}>
              <FaSearch className="text-6xl mx-auto" style={{ color: 'var(--mauve-30)' }} />
            </div>
            <h3 className="text-lg font-medium mb-2" style={{ fontFamily: 'var(--font-display-aptos)', color: 'var(--night)' }}>Aucune publication trouvée</h3>
            <p className="mb-4" style={{ color: 'var(--night-60)', fontFamily: 'var(--font-primary)', fontSize: '0.875rem' }}>
              {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your filters or search terms.'
                : 'Get started by creating your first publication.'}
            </p>
            <button
              onClick={handleNewPublication}
              className="inline-flex items-center gap-2 px-4 py-2 text-[11px] tracking-[0.15em] uppercase transition-all duration-300"
              style={{ background: 'var(--mauve)', color: 'var(--pure-white)', fontFamily: 'var(--font-primary)', fontWeight: 500 }}
            >
              <FaPlus className="text-sm" />
              Créer une publication
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ background: 'rgba(70,29,76,0.04)', borderBottom: '1px solid rgba(70,29,76,0.12)' }}>
                <tr>
                  <th className="px-6 py-3 text-left text-[10px] tracking-[0.12em] uppercase" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
                    Publication
                  </th>
                  <th className="px-6 py-3 text-left text-[10px] tracking-[0.12em] uppercase" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-[10px] tracking-[0.12em] uppercase" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-[10px] tracking-[0.12em] uppercase" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
                    Publié
                  </th>
                  <th className="px-6 py-3 text-right text-[10px] tracking-[0.12em] uppercase" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPublications.map((publication: any) => (
                  <tr key={publication._id} className="transition-colors duration-200" style={{ borderBottom: '1px solid rgba(70,29,76,0.06)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(70,29,76,0.02)')}
                    onMouseLeave={e => (e.currentTarget.style.background = '')}>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium line-clamp-1" style={{ fontFamily: 'var(--font-display-aptos)', color: 'var(--night)' }}>
                          {publication.title}
                        </div>
                        <div className="text-sm line-clamp-2 mt-0.5" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)', fontSize: '0.8rem' }}>
                          {publication.excerpt}
                        </div>
                        {publication.featured && (
                          <span className="inline-flex items-center px-2 py-0.5 text-xs mt-1" style={{ background: 'rgba(202,148,47,0.1)', color: 'var(--jaune-or)', fontFamily: 'var(--font-primary)', fontWeight: 500 }}>
                            En vedette
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-80)' }}>
                        {getCategoryLabel(publication.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs" style={getStatusStyle(publication.status)}>
                        {publication.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)' }}>
                      {publication.publishedAt ? formatDate(publication.publishedAt) : '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => navigate({ to: `/publications/${publication.slug}` })}
                          className="p-1.5 transition-colors duration-200"
                          style={{ color: 'var(--night-60)' }}
                          title="Voir"
                        >
                          <FaEye className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleEditPublication(publication._id)}
                          className="p-1.5 transition-colors duration-200"
                          style={{ color: 'var(--mauve)' }}
                          title="Modifier"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleDeletePublication(publication._id)}
                          className="p-1.5 transition-colors duration-200"
                          style={{ color: '#dc2626' }}
                          title="Supprimer"
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
