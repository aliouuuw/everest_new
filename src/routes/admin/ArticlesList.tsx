import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { FaEdit, FaEye, FaPlus, FaSearch, FaStar, FaTrash } from 'react-icons/fa';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';

const STATUS_BADGE: Record<string, { color: string; label: string }> = {
  draft:     { color: 'bg-amber-50 text-amber-700 border-amber-200',   label: 'Brouillon' },
  published: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Publié' },
  archived:  { color: 'bg-gray-100 text-gray-500 border-gray-200',     label: 'Archivé' },
};

const CATEGORY_COLORS: Record<string, string> = {
  'Marchés':    'bg-blue-50 text-blue-700 border-blue-200',
  'Obligations':'bg-purple-50 text-purple-700 border-purple-200',
  'Finance':    'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Économie':   'bg-orange-50 text-orange-700 border-orange-200',
  'BRVM':       'bg-teal-50 text-teal-700 border-teal-200',
  'Analyses':   'bg-rose-50 text-rose-700 border-rose-200',
};

export const ArticlesList = () => {
  const [searchQuery, setSearchQuery]   = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const articles      = useQuery(api.articles.getArticles, {});
  const deleteArticle = useMutation(api.articles.deleteArticle);

  const handleDelete = async (id: Id<'articles'>) => {
    if (window.confirm('Supprimer cet article définitivement ?')) {
      await deleteArticle({ id }).catch(console.error);
    }
  };

  const filtered = (articles ?? []).filter(a => {
    const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[var(--jaune-or)]/20 pb-6">
        <div>
          <h1 className="text-3xl font-display-aptos font-semibold text-[var(--night)]">Articles d'actualités</h1>
          <p className="text-secondary mt-2">Gérez les articles publiés sur /actualites</p>
        </div>
        <Link to="/admin/articles/new" className="btn-primary">
          <FaPlus className="mr-2" /> Nouvel article
        </Link>
      </div>

      {/* Filters */}
      <div className="stat-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              type="text"
              placeholder="Rechercher un article…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-[var(--jaune-or)]/20 rounded-xl focus:ring-2 focus:ring-[var(--jaune-or)]/20 bg-white/50"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-[var(--jaune-or)]/20 rounded-xl focus:ring-2 focus:ring-[var(--jaune-or)]/20 bg-white/50"
          >
            <option value="all">Tous les statuts</option>
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
            <option value="archived">Archivé</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="stat-card">
        <div className="px-6 py-4 border-b border-[var(--jaune-or)]/20">
          <h2 className="text-lg font-display-aptos font-semibold text-[var(--night)]">
            Articles ({filtered.length})
          </h2>
        </div>

        {filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--jaune-or)]/10">
              <thead className="bg-[var(--jaune-or)]/5">
                <tr>
                  {['Titre', 'Catégorie', 'Statut', 'Publié le', 'Actions'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--jaune-or)]/10">
                {filtered.map(article => {
                  const status  = STATUS_BADGE[article.status]  ?? STATUS_BADGE.draft;
                  const catColor = CATEGORY_COLORS[article.category] ?? 'bg-gray-100 text-gray-600 border-gray-200';
                  return (
                    <tr key={article._id} className="hover:bg-[var(--jaune-or)]/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {article.featured && <FaStar className="text-[var(--jaune-or)] flex-shrink-0" title="À la une" />}
                          <div>
                            <div className="text-sm font-medium text-[var(--night)]">{article.title}</div>
                            <div className="text-xs text-secondary truncate max-w-xs">{article.excerpt.slice(0, 80)}…</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${catColor}`}>{article.category}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${status.color}`}>{status.label}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                        {article.publishedAt
                          ? new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
                          : '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <a
                            href={`/actualites/${article.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-[var(--jaune-or)] hover:bg-[var(--jaune-or)]/10 rounded-lg transition-colors"
                            title="Voir sur le site"
                          >
                            <FaEye />
                          </a>
                          <Link
                            to="/admin/articles/$id/edit"
                            params={{ id: article._id }}
                            className="p-2 text-[var(--night)] hover:bg-[var(--night)]/10 rounded-lg transition-colors"
                            title="Modifier"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(article._id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <FaSearch className="mx-auto h-12 w-12 text-[var(--jaune-or)]/30" />
            <h3 className="mt-4 text-lg font-display-aptos font-medium text-[var(--night)]">
              {searchQuery || statusFilter !== 'all' ? 'Aucun article correspondant' : 'Aucun article pour l\'instant'}
            </h3>
            {!searchQuery && statusFilter === 'all' && (
              <div className="mt-6">
                <Link to="/admin/articles/new" className="btn-primary">
                  <FaPlus className="mr-2" /> Créer un premier article
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
