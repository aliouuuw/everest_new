import React, { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import { ErrorMessage, LoadingSpinner } from '@/components/CMS/Shared';
import EnhancedRichTextEditor from '@/components/CMS/Shared/EnhancedRichTextEditor';
import { useCreatePublication, usePublication, useUpdatePublication } from '@/hooks/useCMS';
import { useCurrentUser } from '@/hooks/useAuth';
import { PUBLICATION_CATEGORIES, PUBLICATION_STATUS } from '@/utils/cms/constants';
import { uploadPublicationAttachment, uploadPublicationImage } from '@/utils/uploadthing';

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
        <h3 className="text-lg font-medium text-gray-900 mb-2">Authentication Required</h3>
        <p className="text-gray-600">You need to be signed in to create publications.</p>
      </div>
    );
  }

  if (currentUser.role !== 'admin' && currentUser.role !== 'editor') {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
        <p className="text-gray-600">You need editor or admin privileges to manage publications.</p>
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
          url: att.uploadthingUrl,
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
      const result = await uploadPublicationAttachment(file);
      const newAttachment = {
        id: result.fileId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        url: result.url,
      };
      setAttachments(prev => [...prev, newAttachment]);
      setFormData(prev => ({
        ...prev,
        attachmentIds: [...prev.attachmentIds, result.fileId as any],
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
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {publicationId ? 'Edit Publication' : 'Create Publication'}
            </h1>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter publication title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Brief description for SEO"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Category and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {PUBLICATION_CATEGORIES.map((cat: { value: string; label: string }) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
              Featured publication
            </label>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                <FaPlus className="text-sm" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.excerpt ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Brief summary of the publication"
            />
            {errors.excerpt && (
              <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments
            </label>
            <div className="space-y-4">
              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FaPlus className="mr-2" />
                  Upload Attachment
                </label>
                <p className="mt-2 text-sm text-gray-500">
                  Supported formats: PDF, Word, Excel, PowerPoint, Text files
                </p>
              </div>

              {/* Attachments List */}
              {attachments.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Current Attachments:</h4>
                  {attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 text-xs font-medium">
                              {attachment.fileType.split('/')[1]?.toUpperCase().slice(0, 3) || 'FILE'}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{attachment.fileName}</p>
                          <p className="text-xs text-gray-500">
                            {(attachment.fileSize / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <a
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View
                        </a>
                        <button
                          type="button"
                          onClick={() => removeAttachment(attachment.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
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
          <div className="flex justify-end gap-4 pt-6 border-t">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <FaSave className="text-sm" />
              {publicationId ? 'Update' : 'Create'} Publication
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublicationForm;
