import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useRouter } from '@tanstack/react-router';
import { FaEye, FaEyeSlash, FaSave, FaTimes } from 'react-icons/fa';
import { useMutation, useQuery } from 'convex/react';
import { useAuth } from '../../components/Auth/useAuth';
import { api } from '../../../convex/_generated/api';
import EnhancedRichTextEditor from '../../components/CMS/Shared/EnhancedRichTextEditor';
import type { Id } from '../../../convex/_generated/dataModel';

type ArticleCategory = 'Marchés' | 'Obligations' | 'Finance' | 'Économie' | 'BRVM' | 'Analyses';
type ArticleStatus = 'draft' | 'published' | 'archived';

interface ArticleFormData {
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: ArticleCategory;
  status: ArticleStatus;
  featured: boolean;
  tags: string[];
}

const CATEGORIES: ArticleCategory[] = ['Marchés', 'Obligations', 'Finance', 'Économie', 'BRVM', 'Analyses'];

export const ArticleForm = () => {
  const navigate  = useNavigate();
  const router    = useRouter();
  const isEditing = router.state.location.pathname.includes('/edit');
  const { user, isLoading: authLoading } = useAuth();

  const routeParams = useParams({ strict: false });
  const id: Id<'articles'> | undefined = isEditing && routeParams.id
    ? (routeParams.id as Id<'articles'>)
    : undefined;

  const [formData, setFormData] = useState<ArticleFormData>({
    title:    '',
    excerpt:  '',
    content:  '',
    imageUrl: '',
    category: 'Marchés',
    status:   'draft',
    featured: false,
    tags:     [],
  });
  const [tagInput,     setTagInput]     = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors,       setErrors]       = useState<Record<string, string>>({});

  const existing      = useQuery(api.articles.getArticleById, isEditing && id ? { id } : 'skip');
  const createArticle = useMutation(api.articles.createArticle);
  const updateArticle = useMutation(api.articles.updateArticle);

  useEffect(() => {
    if (existing && isEditing) {
      setFormData({
        title:    existing.title,
        excerpt:  existing.excerpt,
        content:  existing.content,
        imageUrl: existing.imageUrl ?? '',
        category: existing.category,
        status:   existing.status,
        featured: existing.featured,
        tags:     existing.tags,
      });
    }
  }, [existing, isEditing]);

  if (authLoading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--jaune-or)]" />
      </div>
    );
  }

  if (!user?._id) {
    return (
      <div className="text-center py-16">
        <p className="text-secondary mb-4">Vous devez être connecté pour accéder à cette page.</p>
        <button onClick={() => navigate({ to: '/auth' })} className="btn-primary">Se connecter</button>
      </div>
    );
  }

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!formData.title.trim())   e.title   = 'Le titre est requis';
    if (!formData.excerpt.trim()) e.excerpt  = "L'extrait est requis";
    if (!formData.content.trim()) e.content  = 'Le contenu est requis';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      if (isEditing && id) {
        await updateArticle({
          id,
          ...formData,
          imageUrl: formData.imageUrl || undefined,
        });
      } else {
        await createArticle({
          ...formData,
          imageUrl: formData.imageUrl || undefined,
          authorId: user._id as Id<'users'>,
        });
      }
      navigate({ to: '/admin/articles' });
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !formData.tags.includes(t)) {
      setFormData(p => ({ ...p, tags: [...p.tags, t] }));
      setTagInput('');
    }
  };

  const field = (key: keyof ArticleFormData, value: unknown) =>
    setFormData(p => ({ ...p, [key]: value }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 border-b border-[var(--jaune-or)]/20 pb-6">
        <div>
          <h1 className="text-3xl font-display-aptos font-semibold text-[var(--night)]">
            {isEditing ? 'Modifier l\'article' : 'Nouvel article'}
          </h1>
          <p className="text-secondary mt-1">
            {isEditing ? 'Mettez à jour le contenu de l\'article' : 'Rédigez un article pour /actualites'}
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate({ to: '/admin/articles' })} className="btn-secondary">
            <FaTimes className="mr-2" /> Annuler
          </button>
          <button
            type="button"
            onClick={() => { field('status', 'draft'); }}
            className="btn-secondary"
          >
            <FaEyeSlash className="mr-2" /> Brouillon
          </button>
          <button
            type="button"
            onClick={() => { field('status', 'published'); setTimeout(() => { const form = document.getElementById('article-form') as HTMLFormElement; form?.requestSubmit(); }, 50); }}
            className="btn-primary"
          >
            <FaEye className="mr-2" /> Publier
          </button>
        </div>
      </div>

      <form id="article-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-[var(--night)] mb-2">Titre *</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => field('title', e.target.value)}
                placeholder="Titre de l'article"
                className={`w-full px-4 py-3 border rounded-xl bg-white/50 focus:ring-2 focus:ring-[var(--jaune-or)]/20 ${errors.title ? 'border-red-400' : 'border-[var(--jaune-or)]/20'}`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-[var(--night)] mb-2">Extrait (chapeau) *</label>
              <textarea
                value={formData.excerpt}
                onChange={e => field('excerpt', e.target.value)}
                rows={3}
                placeholder="Résumé court affiché sur la liste des articles"
                className={`w-full px-4 py-3 border rounded-xl bg-white/50 focus:ring-2 focus:ring-[var(--jaune-or)]/20 resize-none ${errors.excerpt ? 'border-red-400' : 'border-[var(--jaune-or)]/20'}`}
              />
              {errors.excerpt && <p className="mt-1 text-sm text-red-500">{errors.excerpt}</p>}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-[var(--night)] mb-2">Contenu *</label>
              <EnhancedRichTextEditor
                value={formData.content}
                onChange={(c: string) => field('content', c)}
                onImageUpload={async (file: File) => {
                  console.warn('Image upload not yet configured — Cloudflare account pending', file.name);
                  return '';
                }}
              />
              {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
            </div>
          </div>

          {/* Sidebar settings */}
          <div className="space-y-6">
            {/* Status */}
            <div className="stat-card p-5 space-y-4">
              <h3 className="font-display-aptos font-semibold text-[var(--night)]">Publication</h3>
              <div>
                <label className="block text-sm font-medium text-[var(--night)] mb-2">Statut</label>
                <select
                  value={formData.status}
                  onChange={e => field('status', e.target.value as ArticleStatus)}
                  className="w-full px-4 py-3 border border-[var(--jaune-or)]/20 rounded-xl bg-white/50"
                >
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                  <option value="archived">Archivé</option>
                </select>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={e => field('featured', e.target.checked)}
                  className="h-4 w-4 rounded border-[var(--jaune-or)]/30 text-[var(--jaune-or)]"
                />
                <span className="text-sm text-[var(--night)]">Article à la une (featured)</span>
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50"
              >
                <FaSave className="mr-2" />
                {isSubmitting ? 'Sauvegarde…' : isEditing ? 'Mettre à jour' : 'Créer l\'article'}
              </button>
            </div>

            {/* Category */}
            <div className="stat-card p-5">
              <label className="block text-sm font-medium text-[var(--night)] mb-2">Catégorie *</label>
              <select
                value={formData.category}
                onChange={e => field('category', e.target.value as ArticleCategory)}
                className="w-full px-4 py-3 border border-[var(--jaune-or)]/20 rounded-xl bg-white/50"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Image URL */}
            <div className="stat-card p-5">
              <label className="block text-sm font-medium text-[var(--night)] mb-2">Image de couverture (URL)</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={e => field('imageUrl', e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 border border-[var(--jaune-or)]/20 rounded-xl bg-white/50 text-sm"
              />
              {formData.imageUrl && (
                <img src={formData.imageUrl} alt="preview" className="mt-3 w-full h-32 object-cover rounded-xl" />
              )}
              <p className="mt-2 text-xs text-secondary">
                Upload Cloudflare disponible prochainement.
              </p>
            </div>

            {/* Tags */}
            <div className="stat-card p-5">
              <label className="block text-sm font-medium text-[var(--night)] mb-2">Tags</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                  placeholder="Ajouter un tag"
                  className="flex-1 px-3 py-2 border border-[var(--jaune-or)]/20 rounded-xl bg-white/50 text-sm"
                />
                <button type="button" onClick={addTag} className="px-3 py-2 bg-[var(--night)] text-white rounded-xl text-sm hover:opacity-80">
                  +
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--mauve)]/10 text-[var(--mauve)] text-xs rounded-full">
                    {tag}
                    <button type="button" onClick={() => setFormData(p => ({ ...p, tags: p.tags.filter(t => t !== tag) }))} className="hover:text-red-500">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
