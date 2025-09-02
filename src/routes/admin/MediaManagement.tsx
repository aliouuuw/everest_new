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
      image: { color: 'bg-green-100 text-green-800', label: 'Image' },
      video: { color: 'bg-blue-100 text-blue-800', label: 'Video' },
      document: { color: 'bg-purple-100 text-purple-800', label: 'Document' },
    };
    
    const config = typeConfig[fileType] ?? { color: 'bg-gray-100 text-gray-800', label: fileType };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Management</h1>
          <p className="text-gray-600 mt-2">Upload and manage media files</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FaUpload className="mr-2" />
          Upload Media
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search media files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="document">Documents</option>
          </select>

          {/* Bulk Actions */}
          {selectedFiles.size > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {selectedFiles.size} selected
              </span>
              <button
                onClick={handleBulkDelete}
                className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaTrash className="mr-1" />
                Delete Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Media Grid */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Media Files ({filteredMedia.length})
          </h2>
        </div>
        
        {filteredMedia.length > 0 ? (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item._id}
                  className={`relative border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer ${
                    selectedFiles.has(item._id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => toggleFileSelection(item._id)}
                >
                  {/* Selection Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedFiles.has(item._id)}
                    onChange={() => toggleFileSelection(item._id)}
                    className="absolute top-2 left-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    onClick={(e) => e.stopPropagation()}
                  />

                  {/* File Preview */}
                  <div className="text-center mb-3">
                    <div className="text-4xl mb-2">
                      {getFileTypeIcon(item.fileType)}
                    </div>
                    {item.fileType === 'image' && (
                      <img
                        src={item.uploadthingUrl}
                        alt={item.alt || item.fileName}
                        className="w-full h-24 object-cover rounded border"
                      />
                    )}
                  </div>

                  {/* File Info */}
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-gray-900 truncate" title={item.fileName}>
                      {item.fileName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatFileSize(item.fileSize)}
                    </p>
                    <div className="mt-2">
                      {getFileTypeBadge(item.fileType)}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={item.uploadthingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 bg-white border border-gray-300 rounded text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaEye className="w-3 h-3" />
                    </a>
                    <a
                      href={item.uploadthingUrl}
                      download={item.fileName}
                      className="p-1 bg-white border border-gray-300 rounded text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaDownload className="w-3 h-3" />
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item._id);
                      }}
                      className="p-1 bg-white border border-gray-300 rounded text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <FaTrash className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No media files found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery || typeFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Get started by uploading your first media file.'}
            </p>
            {!searchQuery && typeFilter === 'all' && (
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <FaUpload className="mr-2" />
                  Upload Media
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Upload Area (Placeholder) */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Upload Media Files</h3>
          <p className="mt-1 text-sm text-gray-500">
            Drag and drop files here, or click to browse
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FaUpload className="mr-2" />
              Choose Files
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Supports: Images (JPG, PNG, GIF), Videos (MP4, MOV), Documents (PDF, DOC)
          </p>
        </div>
      </div>
    </div>
  );
};
