import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useRouter } from '@tanstack/react-router';
import { FaCloudUploadAlt, FaEye, FaEyeSlash, FaSave, FaSpinner, FaTimes, FaTrash } from 'react-icons/fa';
import { useMutation, useQuery } from 'convex/react';
import { useAuth } from '../../components/Auth/useAuth';
import { api } from '../../../convex/_generated/api';
import EnhancedRichTextEditor from '../../components/CMS/Shared/EnhancedRichTextEditor';
import type { Id } from '../../../convex/_generated/dataModel';
import { useR2Upload } from '../../hooks/useR2Upload';

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
  const [coverDragOver, setCoverDragOver] = useState(false);

  const { upload: uploadToR2, isUploading, progress, error: uploadError } = useR2Upload();
  const coverInputRef = useRef<HTMLInputElement>(null);

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

  // ── Upload handlers ─────────────────────────────────────────
  const handleCoverUpload = useCallback(async (file: File) => {
    try {
      const { publicUrl } = await uploadToR2(file, 'covers');
      field('imageUrl', publicUrl);
    } catch {
      // error already in uploadError state
    }
  }, [uploadToR2]);

  const handleInArticleUpload = useCallback(async (file: File): Promise<string> => {
    const { publicUrl } = await uploadToR2(file, 'articles');
    return publicUrl;
  }, [uploadToR2]);

  const handleCoverFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleCoverUpload(file);
    if (coverInputRef.current) coverInputRef.current.value = '';
  }, [handleCoverUpload]);

  const handleCoverDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setCoverDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) handleCoverUpload(file);
  }, [handleCoverUpload]);

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
                onImageUpload={handleInArticleUpload}
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

            {/* Cover Image */}
            <div className="stat-card p-5 space-y-3">
              <label className="block text-sm font-medium text-[var(--night)]">Image de couverture</label>

              {formData.imageUrl ? (
                <div className="relative group">
                  <img src={formData.imageUrl} alt="couverture" className="w-full h-40 object-cover rounded-xl" />
                  <button
                    type="button"
                    onClick={() => field('imageUrl', '')}
                    className="absolute top-2 right-2 p-1.5 bg-red-500/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Supprimer l'image"
                  >
                    <FaTrash className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={e => { e.preventDefault(); setCoverDragOver(true); }}
                  onDragLeave={e => { e.preventDefault(); setCoverDragOver(false); }}
                  onDrop={handleCoverDrop}
                  onClick={() => coverInputRef.current?.click()}
                  className={`flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                    coverDragOver
                      ? 'border-[var(--mauve)] bg-[var(--mauve)]/5'
                      : 'border-[var(--jaune-or)]/30 hover:border-[var(--mauve)]/50 hover:bg-[var(--mauve)]/5'
                  }`}
                >
                  {isUploading ? (
                    <>
                      <FaSpinner className="w-6 h-6 text-[var(--mauve)] animate-spin" />
                      <span className="text-xs text-secondary">Upload… {progress}%</span>
                    </>
                  ) : (
                    <>
                      <FaCloudUploadAlt className="w-6 h-6 text-[var(--mauve)]/60" />
                      <span className="text-xs text-secondary text-center">Glissez une image ici ou cliquez pour parcourir</span>
                    </>
                  )}
                </div>
              )}

              <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverFileChange} />

              {uploadError && <p className="text-xs text-red-500">{uploadError}</p>}

              {/* Fallback: manual URL */}
              <details className="text-xs">
                <summary className="text-secondary cursor-pointer hover:text-[var(--night)]">Ou coller une URL</summary>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={e => field('imageUrl', e.target.value)}
                  placeholder="https://..."
                  className="mt-2 w-full px-3 py-2 border border-[var(--jaune-or)]/20 rounded-lg bg-white/50 text-sm"
                />
              </details>
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
