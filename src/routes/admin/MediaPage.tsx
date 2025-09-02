import React, { useState } from 'react';
import { FaFile, FaFilter, FaImage, FaPlus, FaSearch, FaTrash, FaVideo } from 'react-icons/fa';
import { useDeleteMedia, useMediaByType } from '@/hooks/useCMS';
import { formatDate, formatFileSize } from '@/utils/cms/helpers';
import { MEDIA_TYPES } from '@/utils/cms/constants';
import { LoadingSpinner } from '@/components/CMS/Shared';

const MediaPage: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Fetch media with type filter
  const media = useMediaByType(typeFilter !== 'all' ? typeFilter : 'image', 100);
  const deleteMedia = useDeleteMedia();

  const handleDelete = async (id: string, fileName: string) => {
    if (window.confirm(`Are you sure you want to delete "${fileName}"?`)) {
      try {
        await deleteMedia({ id: id as any });
        // Success handled by ConvexDB optimistic updates
      } catch (error) {
        console.error('Failed to delete media:', error);
        alert('Failed to delete media. Please try again.');
      }
    }
  };

  const getFileTypeIcon = (fileType: string) => {
    switch (fileType) {
      case 'image': return <FaImage className="text-green-600" />;
      case 'video': return <FaVideo className="text-blue-600" />;
      case 'document': return <FaFile className="text-red-600" />;
      default: return <FaFile className="text-gray-600" />;
    }
  };

  const getFileTypeLabel = (fileType: string) => {
    const type = MEDIA_TYPES.find(t => t.value === fileType);
    return type ? type.label : fileType;
  };

  const filteredMedia = media?.filter((item: any) =>
    item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.alt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.caption?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const renderMediaPreview = (item: any) => {
    if (item.fileType === 'image') {
      return (
        <img
          src={item.uploadthingUrl}
          alt={item.alt || item.fileName}
          className="w-full h-32 object-cover rounded"
        />
      );
    }

    return (
      <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center">
        {getFileTypeIcon(item.fileType)}
      </div>
    );
  };

  if (!media) {
    return (
      <div className="p-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600 mt-2">Manage your uploaded files and images</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <FaPlus className="text-sm" />
          Upload Media
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search media..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <FaFilter className="text-sm" />
                Filters
              </button>
            </div>

            <div className="text-sm text-gray-500">
              {filteredMedia.length} file{filteredMedia.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="p-4 border-b bg-gray-50">
            <div className="flex gap-4">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  {MEDIA_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Media Grid */}
      <div className="bg-white rounded-lg shadow-sm border">
        {filteredMedia.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <FaImage className="text-6xl mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No media files found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || typeFilter !== 'all'
                ? 'Try adjusting your filters or search terms.'
                : 'Get started by uploading your first media file.'}
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors">
              <FaPlus className="text-sm" />
              Upload Media
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredMedia.map((item: any) => (
                <div key={item._id} className="group relative bg-gray-50 rounded-lg overflow-hidden border hover:shadow-md transition-shadow">
                  {/* Preview */}
                  <div className="aspect-square">
                    {renderMediaPreview(item)}
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.open(item.uploadthingUrl, '_blank')}
                        className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title="View full size"
                      >
                        <FaImage className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id, item.fileName)}
                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                        title="Delete"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h4 className="text-sm font-medium text-gray-900 truncate" title={item.fileName}>
                      {item.fileName}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        {getFileTypeIcon(item.fileType)}
                        {getFileTypeLabel(item.fileType)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatFileSize(item.fileSize)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatDate(item.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPage;
