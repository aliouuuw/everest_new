import { useState } from 'react';
import { FaDownload, FaEye, FaSearch, FaTrash, FaUpload } from 'react-icons/fa';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { uploadMediaFile, validateMediaFile } from '../../utils/cloudflare';
import { useAuth } from '../../components/Auth/useAuth';
import type { Id } from '../../../convex/_generated/dataModel';

export const MediaManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedFiles, setSelectedFiles] = useState<Set<Id<"media">>>(new Set());
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { user } = useAuth();
  const media = useQuery(api.media.getMedia);
  const deleteMedia = useMutation(api.media.deleteMedia);
  const linkMedia = useMutation(api.media.linkMediaToPublication);

  const filteredMedia = media?.filter(item => {
    const matchesSearch = item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.alt && item.alt.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === 'all' || item.fileType === typeFilter;
    
    return matchesSearch && matchesType;
  }) || [];

  const handleDelete = async (id: Id<"media">) => {
    if (window.confirm('Are you sure you want to delete this media file?')) {
      try {
        await deleteMedia({ id });
      } catch (error) {
        console.error('Failed to delete media:', error);
        alert('Failed to delete media file');
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedFiles.size === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedFiles.size} selected files?`)) {
      try {
        for (const id of selectedFiles) {
          await deleteMedia({ id });
        }
        setSelectedFiles(new Set());
      } catch (error) {
        console.error('Failed to delete media files:', error);
        alert('Failed to delete some media files');
      }
    }
  };

  const toggleFileSelection = (id: Id<"media">) => {
    const newSelection = new Set(selectedFiles);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedFiles(newSelection);
  };

  const getFileTypeIcon = (fileType: string) => {
    switch (fileType) {
      case 'image':
        return '🖼️';
      case 'video':
        return '🎥';
      case 'document':
        return '📄';
      default:
        return '📎';
    }
  };

  const getFileTypeBadge = (fileType: string) => {
    const typeConfig: Record<string, { color: string; label: string }> = {
      image: { color: 'bg-[var(--success-green)]/10 text-[var(--success-green)] border-[var(--success-green)]/20', label: 'Image' },
      video: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Video' },
      document: { color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'Document' },
    };
    
    const config = typeConfig[fileType] ?? { color: 'bg-[var(--night)]/10 text-[var(--night)] border-[var(--night)]/20', label: fileType };
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = async (files: FileList) => {
    if (!user) {
      setUploadError('You must be logged in to upload files');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      for (const file of Array.from(files)) {
        // Validate file
        const validationError = validateMediaFile(file);
        if (validationError) {
          setUploadError(validationError);
          continue;
        }

        // Upload to Cloudflare (server-side)
        const uploadResult = await uploadMediaFile(file);

        // Link to media database (standalone media, no publication)
        await linkMedia({
          publicationId: undefined, // No publication for standalone media
          cloudflareId: uploadResult.id,
          cloudflareUrl: uploadResult.url,
          fileName: file.name,
          fileType: file.type.startsWith('image/') ? 'image' :
                   file.type.startsWith('video/') ? 'video' : 'document',
          fileSize: file.size,
          mimeType: file.type,
          variants: uploadResult.variants,
          uploadedBy: user._id, // Use actual user ID
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*,video/*,application/pdf,.doc,.docx';
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        handleFileUpload(files);
      }
    };
    input.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center border-b border-[var(--jaune-or)]/20 pb-6">
        <div>
          <h1 className="text-4xl font-display font-semibold text-[var(--night)]">Media Management</h1>
          <p className="text-[rgba(10, 10, 10, 0.8)] mt-3 text-lg">Upload and manage media files</p>
        </div>
        <button 
          onClick={handleUploadClick}
          disabled={isUploading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaUpload className="mr-2" />
          {isUploading ? 'Uploading...' : 'Upload Media'}
        </button>
      </div>

      {/* Upload Error */}
      {uploadError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          <p className="font-medium">Upload Error</p>
          <p className="text-sm mt-1">{uploadError}</p>
        </div>
      )}

      {/* Filters and Search */}
      <div className="stat-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[rgba(10, 10, 10, 0.8)]" />
            <input
              type="text"
              placeholder="Search media files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-[var(--jaune-or)]/20 rounded-xl focus:ring-2 focus:ring-[var(--jaune-or)]/20 focus:border-[var(--jaune-or)]/40 bg-[var(--pure-white)]/50 transition-colors"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 border border-[var(--jaune-or)]/20 rounded-xl focus:ring-2 focus:ring-[var(--jaune-or)]/20 focus:border-[var(--jaune-or)]/40 bg-[var(--pure-white)]/50 transition-colors"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="document">Documents</option>
          </select>

          {/* Bulk Actions */}
          {selectedFiles.size > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-[rgba(10, 10, 10, 0.8)]">
                {selectedFiles.size} selected
              </span>
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-[var(--error-red)] text-white rounded-lg hover:bg-red-700 transition-colors border border-[var(--error-red)]/20"
              >
                <FaTrash className="mr-2" />
                Delete Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Media Grid */}
      <div className="stat-card">
        <div className="px-6 py-4 border-b border-[var(--jaune-or)]/20">
          <h2 className="text-xl font-display font-semibold text-[var(--night)]">
            Media Files ({filteredMedia.length})
          </h2>
        </div>
        
        {filteredMedia.length > 0 ? (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {filteredMedia.map((item) => (
                <div
                  key={item._id}
                  className={`relative border border-[var(--jaune-or)]/20 rounded-xl p-4 hover:shadow-lg hover:shadow-[var(--jaune-or)]/10 transition-all duration-300 cursor-pointer bg-[var(--pure-white)]/50 hover:bg-[var(--pure-white)]/80 ${
                    selectedFiles.has(item._id) ? 'ring-2 ring-[var(--jaune-or)] bg-[var(--jaune-or-10)]' : ''
                  }`}
                  onClick={() => toggleFileSelection(item._id)}
                >
                  {/* Selection Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedFiles.has(item._id)}
                    onChange={() => toggleFileSelection(item._id)}
                    className="absolute top-3 left-3 h-4 w-4 text-[var(--jaune-or)] focus:ring-[var(--jaune-or)]/20 border-[var(--jaune-or)]/30 rounded"
                    onClick={(e) => e.stopPropagation()}
                  />

                  {/* File Preview */}
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">
                      {getFileTypeIcon(item.fileType)}
                    </div>
                    {item.fileType === 'image' && (
                      <img
                        src={item.cloudflareUrl}
                        alt={item.alt || item.fileName}
                        className="w-full h-24 object-cover rounded-lg border border-[var(--jaune-or)]/20"
                      />
                    )}
                  </div>

                  {/* File Info */}
                  <div className="text-center">
                    <h3 className="text-sm font-display font-medium text-[var(--night)] truncate" title={item.fileName}>
                      {item.fileName}
                    </h3>
                    <p className="text-xs text-[rgba(10, 10, 10, 0.8)] mt-2">
                      {formatFileSize(item.fileSize)}
                    </p>
                    <div className="mt-3">
                      {getFileTypeBadge(item.fileType)}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={item.cloudflareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[var(--pure-white)] border border-[var(--jaune-or)]/20 rounded-lg text-[var(--jaune-or)] hover:text-[var(--jaune-or)] hover:bg-[var(--jaune-or-10)] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                      title="View"
                    >
                      <FaEye className="w-3 h-3" />
                    </a>
                    <a
                      href={item.cloudflareUrl}
                      download={item.fileName}
                      className="p-2 bg-[var(--pure-white)] border border-[var(--jaune-or)]/20 rounded-lg text-[var(--night)] hover:text-[rgba(10, 10, 10, 0.8)] hover:bg-[var(--night)]/10 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                      title="Download"
                    >
                      <FaDownload className="w-3 h-3" />
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item._id);
                      }}
                      className="p-2 bg-[var(--pure-white)] border border-[var(--jaune-or)]/20 rounded-lg text-[var(--error-red)] hover:text-red-700 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <FaTrash className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <FaUpload className="mx-auto h-16 w-16 text-[var(--jaune-or)]/30" />
            <h3 className="mt-4 text-xl font-display font-medium text-[var(--night)]">No media files found</h3>
            <p className="mt-2 text-[rgba(10, 10, 10, 0.8)]">
              {searchQuery || typeFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Get started by uploading your first media file.'}
            </p>
            {!searchQuery && typeFilter === 'all' && (
              <div className="mt-8">
                <button 
                  onClick={handleUploadClick}
                  disabled={isUploading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaUpload className="mr-2" />
                  {isUploading ? 'Uploading...' : 'Upload Media'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Upload Area */}
      <div className="stat-card">
        <div 
          className={`border-2 border-dashed border-[var(--jaune-or)]/30 rounded-xl p-12 text-center bg-[var(--jaune-or-10)]/20 transition-colors ${
            isUploading ? 'opacity-50 pointer-events-none' : 'hover:border-[var(--jaune-or)]/50 hover:bg-[var(--jaune-or-10)]/30 cursor-pointer'
          }`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <FaUpload className={`mx-auto h-16 w-16 text-[var(--jaune-or)]/40 ${isUploading ? 'animate-pulse' : ''}`} />
          <h3 className="mt-4 text-xl font-display font-medium text-[var(--night)]">
            {isUploading ? 'Uploading Files...' : 'Upload Media Files'}
          </h3>
          <p className="mt-2 text-[rgba(10, 10, 10, 0.8)]">
            {isUploading ? 'Please wait while files are being uploaded' : 'Drag and drop files here, or click to browse'}
          </p>
          {!isUploading && (
            <div className="mt-8">
              <button className="btn-primary">
                <FaUpload className="mr-2" />
                Choose Files
              </button>
            </div>
          )}
          <p className="mt-4 text-sm text-[rgba(10, 10, 10, 0.8)]">
            Supports: Images (JPG, PNG, GIF, WebP), Videos (MP4, WebM), Documents (PDF, DOC, DOCX)
          </p>
          <p className="text-xs text-[rgba(10, 10, 10, 0.8)] mt-2">
            Max file size: 16MB for media files, 4MB for images
          </p>
        </div>
      </div>
    </div>
  );
};
