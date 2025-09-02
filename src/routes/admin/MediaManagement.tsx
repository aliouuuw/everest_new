import { useState } from 'react';
import { FaDownload, FaEye, FaSearch, FaTrash, FaUpload } from 'react-icons/fa';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';

export const MediaManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedFiles, setSelectedFiles] = useState<Set<Id<"media">>>(new Set());

  const media = useQuery(api.media.getMedia);
  const deleteMedia = useMutation(api.media.deleteMedia);

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

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center border-b border-[var(--gold-metallic)]/20 pb-6">
        <div>
          <h1 className="text-4xl font-display font-semibold text-[var(--night)]">Media Management</h1>
          <p className="text-[var(--night-80)] mt-3 text-lg">Upload and manage media files</p>
        </div>
        <button className="btn-primary">
          <FaUpload className="mr-2" />
          Upload Media
        </button>
      </div>

      {/* Filters and Search */}
      <div className="stat-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--night-80)]" />
            <input
              type="text"
              placeholder="Search media files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-[var(--gold-metallic)]/20 rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 border border-[var(--gold-metallic)]/20 rounded-xl focus:ring-2 focus:ring-[var(--gold-metallic)]/20 focus:border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/50 transition-colors"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="document">Documents</option>
          </select>

          {/* Bulk Actions */}
          {selectedFiles.size > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-[var(--night-80)]">
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
        <div className="px-6 py-4 border-b border-[var(--gold-metallic)]/20">
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
                  className={`relative border border-[var(--gold-metallic)]/20 rounded-xl p-4 hover:shadow-lg hover:shadow-[var(--gold-metallic)]/10 transition-all duration-300 cursor-pointer bg-[var(--pure-white)]/50 hover:bg-[var(--pure-white)]/80 ${
                    selectedFiles.has(item._id) ? 'ring-2 ring-[var(--gold-metallic)] bg-[var(--gold-metallic-10)]' : ''
                  }`}
                  onClick={() => toggleFileSelection(item._id)}
                >
                  {/* Selection Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedFiles.has(item._id)}
                    onChange={() => toggleFileSelection(item._id)}
                    className="absolute top-3 left-3 h-4 w-4 text-[var(--gold-metallic)] focus:ring-[var(--gold-metallic)]/20 border-[var(--gold-metallic)]/30 rounded"
                    onClick={(e) => e.stopPropagation()}
                  />

                  {/* File Preview */}
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">
                      {getFileTypeIcon(item.fileType)}
                    </div>
                    {item.fileType === 'image' && (
                      <img
                        src={item.uploadthingUrl}
                        alt={item.alt || item.fileName}
                        className="w-full h-24 object-cover rounded-lg border border-[var(--gold-metallic)]/20"
                      />
                    )}
                  </div>

                  {/* File Info */}
                  <div className="text-center">
                    <h3 className="text-sm font-display font-medium text-[var(--night)] truncate" title={item.fileName}>
                      {item.fileName}
                    </h3>
                    <p className="text-xs text-[var(--night-80)] mt-2">
                      {formatFileSize(item.fileSize)}
                    </p>
                    <div className="mt-3">
                      {getFileTypeBadge(item.fileType)}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={item.uploadthingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[var(--pure-white)] border border-[var(--gold-metallic)]/20 rounded-lg text-[var(--gold-metallic)] hover:text-[var(--gold-dark)] hover:bg-[var(--gold-metallic-10)] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                      title="View"
                    >
                      <FaEye className="w-3 h-3" />
                    </a>
                    <a
                      href={item.uploadthingUrl}
                      download={item.fileName}
                      className="p-2 bg-[var(--pure-white)] border border-[var(--gold-metallic)]/20 rounded-lg text-[var(--night)] hover:text-[var(--night-80)] hover:bg-[var(--night)]/10 transition-colors"
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
                      className="p-2 bg-[var(--pure-white)] border border-[var(--gold-metallic)]/20 rounded-lg text-[var(--error-red)] hover:text-red-700 hover:bg-red-50 transition-colors"
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
            <FaUpload className="mx-auto h-16 w-16 text-[var(--gold-metallic)]/30" />
            <h3 className="mt-4 text-xl font-display font-medium text-[var(--night)]">No media files found</h3>
            <p className="mt-2 text-[var(--night-80)]">
              {searchQuery || typeFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Get started by uploading your first media file.'}
            </p>
            {!searchQuery && typeFilter === 'all' && (
              <div className="mt-8">
                <button className="btn-primary">
                  <FaUpload className="mr-2" />
                  Upload Media
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Upload Area (Placeholder) */}
      <div className="stat-card">
        <div className="border-2 border-dashed border-[var(--gold-metallic)]/30 rounded-xl p-12 text-center bg-[var(--gold-metallic-10)]/20">
          <FaUpload className="mx-auto h-16 w-16 text-[var(--gold-metallic)]/40" />
          <h3 className="mt-4 text-xl font-display font-medium text-[var(--night)]">Upload Media Files</h3>
          <p className="mt-2 text-[var(--night-80)]">
            Drag and drop files here, or click to browse
          </p>
          <div className="mt-8">
            <button className="btn-primary">
              <FaUpload className="mr-2" />
              Choose Files
            </button>
          </div>
          <p className="mt-4 text-sm text-[var(--night-80)]">
            Supports: Images (JPG, PNG, GIF), Videos (MP4, MOV), Documents (PDF, DOC)
          </p>
        </div>
      </div>
    </div>
  );
};
