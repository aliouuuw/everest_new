import React, { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import { ErrorMessage, LoadingSpinner } from '@/components/CMS/Shared';
import EnhancedRichTextEditor from '@/components/CMS/Shared/EnhancedRichTextEditor';
import { useCreatePublication, usePublication, useUpdatePublication } from '@/hooks/useCMS';
import { useCurrentUser } from '@/hooks/useAuth';
import { PUBLICATION_CATEGORIES, PUBLICATION_STATUS } from '@/utils/cms/constants';
import { uploadMediaFile, uploadPublicationImage } from '@/utils/cloudflare';

type PublicationCategory = 'revues-hebdo' | 'revues-mensuelles' | 'teaser-dividende' | 'marches' | 'analyses';
type PublicationStatus = 'draft' | 'published' | 'archived';

interface PublicationFormProps {
  publicationId?: string;
  onClose?: () => void;
}

const PublicationForm: React.FC<PublicationFormProps> = ({ publicationId, onClose }) => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    excerpt: '',
    category: 'analyses' as PublicationCategory,
    status: 'draft' as PublicationStatus,
    featured: false,
    tags: [] as Array<string>,
    authorId: currentUser ? currentUser._id : '',
    attachmentIds: [] as Array<string>,
  });

  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attachments, setAttachments] = useState<Array<{ id: any; fileName: string; fileSize: number; fileType: string; url: string }>>([]);

  // Fetch existing publication if editing
  const existingPublication = usePublication(publicationId || '');

  // Mutations
  const createPublication = useCreatePublication();
  const updatePublication = useUpdatePublication();

  if (currentUser === undefined) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-display-aptos)', color: 'var(--night)' }}>Authentification requise</h3>
        <p style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)', fontSize: '0.875rem' }}>Vous devez être connecté pour créer des publications.</p>
      </div>
    );
  }

  if (currentUser.role !== 'admin' && currentUser.role !== 'editor') {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-display-aptos)', color: 'var(--night)' }}>Accès refusé</h3>
        <p style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)', fontSize: '0.875rem' }}>Vous devez être éditeur ou administrateur pour gérer les publications.</p>
      </div>
    );
  }

  useEffect(() => {
    if (existingPublication && publicationId) {
      setFormData({
        title: existingPublication.title,
        description: existingPublication.description,
        content: existingPublication.content,
        excerpt: existingPublication.excerpt,
        category: existingPublication.category,
        status: existingPublication.status,
        featured: existingPublication.featured,
        tags: existingPublication.tags,
        authorId: existingPublication.authorId || currentUser._id,
        attachmentIds: existingPublication.attachmentIds,
      });
      
      // Set attachments
      const validAttachments = existingPublication.attachments
        .filter(att => att !== null)
        .map(att => ({
          id: att._id,
          fileName: att.fileName,
          fileSize: att.fileSize,
          fileType: att.fileType,
          url: att.cloudflareUrl,
        }));
      setAttachments(validAttachments);
    }
  }, [existingPublication, publicationId, currentUser]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content,
      excerpt: prev.excerpt || content.replace(/<[^>]*>/g, '').substring(0, 200) + '...'
    }));
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const result = await uploadPublicationImage(file);
      return result.url;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw new Error('Failed to upload image. Please try again.');
    }
  };

  const handleAttachmentUpload = async (file: File) => {
    try {
      const result = await uploadMediaFile(file);
      const newAttachment = {
        id: result.id,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        url: result.url,
      };
      setAttachments(prev => [...prev, newAttachment]);
      setFormData(prev => ({
        ...prev,
        attachmentIds: [...prev.attachmentIds, result.id as any],
      }));
    } catch (error) {
      console.error('Attachment upload failed:', error);
      setErrors({ attachments: 'Failed to upload attachment. Please try again.' });
    }
  };

  const removeAttachment = (attachmentId: string) => {
    setAttachments(prev => prev.filter(att => att.id !== attachmentId));
    setFormData(prev => ({
      ...prev,
      attachmentIds: prev.attachmentIds.filter(id => id !== attachmentId),
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (publicationId) {
        // Update existing publication
        await updatePublication({
          id: publicationId as any,
          ...formData,
          attachmentIds: formData.attachmentIds as any,
        });
      } else {
        // Create new publication
        const result = await createPublication({
          ...formData,
          authorId: currentUser._id,
          attachmentIds: formData.attachmentIds as any,
        });
        publicationId = result;
      }

      // Navigate to publications list or close modal
      if (onClose) {
        onClose();
      } else {
        navigate({ to: '/admin/publications' });
      }
    } catch (error) {
      console.error('Failed to save publication:', error);
      setErrors({ submit: 'Failed to save publication. Please try again.' });
    }
  };

  if (publicationId && !existingPublication) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div style={{ background: 'var(--pure-white)', border: '1px solid rgba(70,29,76,0.12)' }}>
        <div className="p-6" style={{ borderBottom: '1px solid rgba(70,29,76,0.1)' }}>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display-aptos)', color: 'var(--night)' }}>
              {publicationId ? 'Modifier la publication' : 'Créer une publication'}
            </h1>
            {onClose && (
              <button
                onClick={onClose}
                style={{ color: 'var(--night-60)', transition: 'color 200ms' }}
              >
                <FaTimes className="text-xl" />
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.submit && (
            <ErrorMessage message={errors.submit} />
          )}

          {/* Title */}
          <div>
            <label className="block text-[11px] tracking-[0.08em] uppercase mb-2" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
              Titre *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 text-sm outline-none transition-all duration-300"
              style={{ 
                border: errors.title ? '1px solid #ef4444' : '1px solid rgba(70,29,76,0.2)', 
                fontFamily: 'var(--font-primary)', 
                color: 'var(--night)',
                borderRadius: '0.5rem'
              }}
              placeholder="Titre de la publication"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] tracking-[0.08em] uppercase mb-2" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
              Description *
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 text-sm outline-none transition-all duration-300"
              style={{ 
                border: errors.description ? '1px solid #ef4444' : '1px solid rgba(70,29,76,0.2)', 
                fontFamily: 'var(--font-primary)', 
                color: 'var(--night)',
                borderRadius: '0.5rem'
              }}
              placeholder="Description brève pour le SEO"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Category and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] tracking-[0.08em] uppercase mb-2" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
                Catégorie *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 text-sm outline-none transition-all duration-300"
                style={{ border: '1px solid rgba(70,29,76,0.2)', fontFamily: 'var(--font-primary)', color: 'var(--night)', borderRadius: '0.5rem' }}
              >
                {PUBLICATION_CATEGORIES.map((cat: { value: string; label: string }) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.08em] uppercase mb-2" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
                Statut *
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 text-sm outline-none transition-all duration-300"
                style={{ border: '1px solid rgba(70,29,76,0.2)', fontFamily: 'var(--font-primary)', color: 'var(--night)', borderRadius: '0.5rem' }}
              >
                {PUBLICATION_STATUS.map((status: { value: string; label: string }) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => handleInputChange('featured', e.target.checked)}
              className="h-4 w-4 rounded"
              style={{ accentColor: 'var(--mauve)' }}
            />
            <label htmlFor="featured" className="ml-2 text-sm" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)' }}>
              Publication en vedette
            </label>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-[11px] tracking-[0.08em] uppercase mb-2" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-2 text-sm outline-none transition-all duration-300"
                style={{ border: '1px solid rgba(70,29,76,0.2)', fontFamily: 'var(--font-primary)', color: 'var(--night)', borderRadius: '0.5rem' }}
                placeholder="Ajouter un tag"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 text-white rounded-lg transition-all duration-300"
                style={{ background: 'var(--mauve)' }}
              >
                <FaPlus className="text-sm" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs"
                  style={{ background: 'rgba(70,29,76,0.1)', color: 'var(--mauve)', fontFamily: 'var(--font-primary)' }}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1"
                    style={{ color: 'var(--mauve)', transition: 'color 200ms' }}
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-[11px] tracking-[0.08em] uppercase mb-2" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
              Extrait *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-sm outline-none transition-all duration-300"
              style={{ 
                border: errors.excerpt ? '1px solid #ef4444' : '1px solid rgba(70,29,76,0.2)', 
                fontFamily: 'var(--font-primary)', 
                color: 'var(--night)',
                borderRadius: '0.5rem'
              }}
              placeholder="Résumé bref de la publication"
            />
            {errors.excerpt && (
              <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-[11px] tracking-[0.08em] uppercase mb-2" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
              Contenu *
            </label>
            <EnhancedRichTextEditor
              value={formData.content}
              onChange={handleContentChange}
              onImageUpload={handleImageUpload}
              placeholder="Write your publication content here..."
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-[11px] tracking-[0.08em] uppercase mb-2" style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}>
              Pièces jointes
            </label>
            <div className="space-y-4">
              {/* File Upload */}
              <div className="border-2 border-dashed rounded-lg p-6 text-center" style={{ borderColor: 'rgba(70,29,76,0.2)' }}>
                <input
                  type="file"
                  id="attachment-upload"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleAttachmentUpload(file);
                    }
                  }}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                />
                <label
                  htmlFor="attachment-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white transition-all duration-300"
                  style={{ background: 'var(--mauve)' }}
                >
                  <FaPlus className="mr-2" />
                  Télécharger un fichier
                </label>
                <p className="mt-2 text-sm" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)' }}>
                  Formats supportés : PDF, Word, Excel, PowerPoint, Texte
                </p>
              </div>

              {/* Attachments List */}
              {attachments.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night)' }}>Pièces jointes actuelles :</h4>
                  {attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ background: 'rgba(70,29,76,0.03)', border: '1px solid rgba(70,29,76,0.1)' }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(70,29,76,0.1)' }}>
                            <span className="text-xs font-medium" style={{ color: 'var(--mauve)' }}>
                              {attachment.fileType.split('/')[1]?.toUpperCase().slice(0, 3) || 'FILE'}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night)' }}>{attachment.fileName}</p>
                          <p className="text-xs" style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-60)' }}>
                            {(attachment.fileSize / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <a
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm"
                          style={{ color: 'var(--mauve)', transition: 'color 200ms' }}
                        >
                          Voir
                        </a>
                        <button
                          type="button"
                          onClick={() => removeAttachment(attachment.id)}
                          className="text-sm"
                          style={{ color: '#dc2626', transition: 'color 200ms' }}
                        >
                          <FaTimes className="text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {errors.attachments && (
                <p className="mt-1 text-sm text-red-600">{errors.attachments}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6" style={{ borderTop: '1px solid rgba(70,29,76,0.1)' }}>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-[11px] tracking-[0.15em] uppercase transition-all duration-300"
                style={{ color: 'var(--night-60)', fontFamily: 'var(--font-primary)', fontWeight: 500, border: '1px solid rgba(70,29,76,0.2)' }}
              >
                Annuler
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 text-[11px] tracking-[0.15em] uppercase transition-all duration-300 flex items-center gap-2"
              style={{ background: 'var(--mauve)', color: 'var(--pure-white)', fontFamily: 'var(--font-primary)', fontWeight: 500 }}
            >
              <FaSave className="text-sm" />
              {publicationId ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublicationForm;
