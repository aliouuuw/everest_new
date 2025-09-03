import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useRouter } from '@tanstack/react-router';
import { FaEye, FaEyeSlash, FaSave, FaTimes } from 'react-icons/fa';
import { useMutation, useQuery } from 'convex/react';
import { useAuth } from '../../components/Auth/useAuth';
import { api } from '../../../convex/_generated/api';
import EnhancedRichTextEditor from '../../components/CMS/Shared/EnhancedRichTextEditor';
import { uploadPublicationImage } from '../../utils/uploadthing';
import type { Id } from '../../../convex/_generated/dataModel';

interface PublicationFormData {
  title: string;
  description: string;
  content: string;
  excerpt: string;
  category: 'revues-hebdo' | 'revues-mensuelles' | 'teaser-dividende' | 'marches' | 'analyses';
  tags: Array<string>;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  seoTitle: string;
  seoDescription: string;
}

export const PublicationForm = () => {
  const navigate = useNavigate();
  const router = useRouter();
  const currentRoute = router.state.location.pathname;
  const isEditing = currentRoute.includes('/edit');
  const { user, isLoading: authLoading } = useAuth();
  
  // Only try to get params if we're editing
  let id: Id<"publications"> | undefined;
  if (isEditing) {
    try {
      const params = useParams({ from: '/admin/publications/$id/edit' });
      id = params.id as Id<"publications">;
    } catch (error) {
      console.warn('Could not get publication ID from params:', error);
      id = undefined;
    }
  } else {
    // We're creating a new publication, no ID needed
    id = undefined;
  }

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--gold-metallic)] mx-auto"></div>
          <p className="mt-2 text-sm text-[var(--night-80)]/80">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show error if user is not authenticated
  if (!user || !user._id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-4">You must be logged in to create or edit publications.</p>
          <button
            onClick={() => navigate({ to: '/auth' })}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState<PublicationFormData>({
    title: '',
    description: '',
    content: '',
    excerpt: '',
    category: 'revues-hebdo',
    tags: [],
    featured: false,
    status: 'draft',
    seoTitle: '',
    seoDescription: '',
  });

  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Function to get text content without HTML tags
  const getTextContent = (html: string): string => {
    // Create a temporary div element to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  // Get character count without HTML tags
  const getCharacterCount = (content: string): number => {
    return getTextContent(content).length;
  };

  // Image upload handler for the rich text editor
  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const result = await uploadPublicationImage(file);
      return result.url;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw new Error('Failed to upload image. Please try again.');
    }
  };

  // Fetch publication data if editing
  const publication = useQuery(
    api.publications.getPublicationById,
    isEditing ? { id: id as Id<"publications"> } : 'skip'
  );

  const createPublication = useMutation(api.publications.createPublication);
  const updatePublication = useMutation(api.publications.updatePublication);

  useEffect(() => {
    if (publication && isEditing) {
      setFormData({
        title: publication.title,
        description: publication.description,
        content: publication.content,
        excerpt: publication.excerpt,
        category: publication.category,
        tags: publication.tags,
        featured: publication.featured || false,
        status: publication.status,
        seoTitle: publication.seoTitle || '',
        seoDescription: publication.seoDescription || '',
      });
    }
  }, [publication, isEditing]);

  const validateForm = (): boolean => {
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
    // Category is always set to a default value, so no validation needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Check if user is authenticated
    if (!user._id) {
      alert('You must be logged in to create or edit publications');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing && id) {
        await updatePublication({
          id: id,
          ...formData,
        });
      } else {
        if (!user._id) {
          throw new Error('User not authenticated');
        }
        await createPublication({
          ...formData,
          authorId: user._id as Id<"users">,
        });
      }

      navigate({ to: '/admin/publications' });
    } catch (error) {
      console.error('Failed to save publication:', error);
      alert('Failed to save publication');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center border-b border-[var(--gold-metallic)]/20 pb-6">
        <div>
          <h1 className="text-4xl font-display font-semibold text-[var(--night)]">
            {isEditing ? 'Edit Publication' : 'New Publication'}
          </h1>
          <p className="text-[var(--night-80)] mt-3 text-lg">
            {isEditing ? 'Update your publication details' : 'Create a new publication or blog post'}
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate({ to: '/admin/publications' })}
            className="btn-secondary "
          >
            <FaTimes className="mr-2" />
            Cancel
          </button>
          <button
            onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
            className="btn-primary"
          >
            <FaEyeSlash className="mr-2" />
            Save as Draft
          </button>
          <button
            onClick={() => setFormData(prev => ({ ...prev, status: 'published' }))}
            className="btn-primary"
          >
            <FaEye className="mr-2" />
            Publish
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-[var(--night)] mb-3">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors ${
                  errors.title ? 'border-[var(--error-red)]' : 'border-[var(--gold-metallic)]/20'
                }`}
                placeholder="Enter publication title"
              />
              {errors.title && <p className="mt-2 text-sm text-[var(--error-red)]">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-[var(--night)] mb-3">
                Description *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors ${
                  errors.description ? 'border-[var(--error-red)]' : 'border-[var(--gold-metallic)]/20'
                }`}
                placeholder="Brief description of the publication"
              />
              {errors.description && <p className="mt-2 text-sm text-[var(--error-red)]">{errors.description}</p>}
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-[var(--night)] mb-3">
                Content *
              </label>
              <EnhancedRichTextEditor
                value={formData.content}
                onChange={(content: string) => setFormData(prev => ({ ...prev, content }))}
                onImageUpload={handleImageUpload}
              />
              {errors.content && <p className="mt-2 text-sm text-[var(--error-red)]">{errors.content}</p>}
              <p className="mt-2 text-sm text-[var(--night-80)]">
                {getCharacterCount(formData.content)} characters
              </p>
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-[var(--night)] mb-3">
                Excerpt *
              </label>
              <textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                rows={3}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors ${
                  errors.excerpt ? 'border-[var(--error-red)]' : 'border-[var(--gold-metallic)]/20'
                }`}
                placeholder="Short excerpt for previews"
              />
              {errors.excerpt && <p className="mt-2 text-sm text-[var(--error-red)]">{errors.excerpt}</p>}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-[var(--night)] mb-3">
                Category *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as 'revues-hebdo' | 'revues-mensuelles' | 'teaser-dividende' | 'marches' | 'analyses' }))}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors ${
                  errors.category ? 'border-[var(--error-red)]' : 'border-[var(--gold-metallic)]/20'
                }`}
              >
                <option value="revues-hebdo">Weekly Reviews</option>
                <option value="revues-mensuelles">Monthly Reviews</option>
                <option value="teaser-dividende">Dividend Teaser</option>
                <option value="marches">Markets</option>
                <option value="analyses">Analyses</option>
              </select>
              {errors.category && <p className="mt-2 text-sm text-[var(--error-red)]">{errors.category}</p>}
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-[var(--night)] mb-3">
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-4 py-3 border border-[var(--gold-metallic)]/20 rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Featured */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="h-4 w-4 text-[var(--gold-metallic)] focus:ring-[var(--gold-metallic)]/20 border-[var(--gold-metallic)]/30 rounded"
              />
              <label htmlFor="featured" className="ml-3 block text-sm text-[var(--night)]">
                Featured Publication
              </label>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-[var(--night)] mb-3">
                Tags
              </label>
              <div className="flex space-x-3 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a tag"
                  className="flex-1 px-4 py-3 border border-[var(--gold-metallic)]/20 rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-3 bg-[var(--night)] text-white rounded-xl hover:bg-[var(--night-80)] transition-colors border border-[var(--night)]/20"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-[var(--gold-metallic-10)] text-[var(--gold-dark)] text-sm rounded-full border border-[var(--gold-metallic)]/20"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-[var(--gold-dark)] hover:text-[var(--gold-metallic)] transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* SEO */}
            <div className="border-t border-[var(--gold-metallic)]/20 pt-6">
              <h3 className="text-lg font-display font-medium text-[var(--night)] mb-6">SEO Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="seoTitle" className="block text-sm font-medium text-[var(--night)] mb-3">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    id="seoTitle"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                    className="w-full px-4 py-3 border border-[var(--gold-metallic)]/20 rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors"
                    placeholder="SEO optimized title"
                  />
                </div>

                <div>
                  <label htmlFor="seoDescription" className="block text-sm font-medium text-[var(--night)] mb-3">
                    SEO Description
                  </label>
                  <textarea
                    id="seoDescription"
                    value={formData.seoDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-[var(--gold-metallic)]/20 rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors"
                    placeholder="SEO meta description"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-8 border-t border-[var(--gold-metallic)]/20">
          <button
            type="button"
            onClick={() => navigate({ to: '/admin/publications' })}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary disabled:opacity-50"
          >
            <FaSave className="mr-2" />
            {isSubmitting ? 'Saving...' : (isEditing ? 'Update Publication' : 'Create Publication')}
          </button>
        </div>
      </form>
    </div>
  );
};
