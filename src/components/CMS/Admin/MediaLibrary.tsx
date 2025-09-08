import React, { useState } from 'react';
import { FaCloudUploadAlt, FaDownload, FaEye, FaTrash } from 'react-icons/fa';
import { useDeleteMedia, useMediaByType } from '@/hooks/useCMS';
import { uploadMediaFile, validateMediaFile } from '@/utils/uploadthing';
import { LoadingSpinner } from '@/components/CMS/Shared';

const MediaLibrary: React.FC = () => {
  const media = useMediaByType('all', 100);
  const deleteMedia = useDeleteMedia();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = async (files: FileList) => {
    setIsUploading(true);
    setUploadError(null);
    
    try {
      for (const file of Array.from(files)) {
        // Validate file before upload
        const validationError = validateMediaFile(file);
        if (validationError) {
          setUploadError(validationError);
          continue;
        }

        // Upload file
        const result = await uploadMediaFile(file);
        
        // Note: For standalone media uploads, you might need a different approach
        // since linkMediaToPublication requires a publicationId
        console.log('File uploaded:', result);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadError('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };


  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'image':
        return '🖼️';
      case 'video':
        return '🎥';
      case 'document':
        return '📄';
      default:
        return '📁';
    }
  };

  const handleDelete = async (mediaId: string) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await deleteMedia({ id: mediaId as any });
      } catch (error) {
        console.error('Failed to delete media:', error);
      }
    }
  };

  // Handle undefined media
  if (!media) {
    return <LoadingSpinner size="lg" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Media Library</h2>
        <div className="text-sm text-gray-500">
          {media.length} files
        </div>
      </div>

      {/* Upload Zone */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
        <input
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          className="hidden"
          id="media-upload"
          disabled={isUploading}
        />
        <label 
          htmlFor="media-upload" 
          className={`cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            {isUploading ? 'Uploading...' : 'Drop files here or click to upload'}
          </p>
          <p className="text-sm text-gray-600">
            Supports images, videos, PDFs, and Word documents up to 16MB
          </p>
          {isUploading && (
            <div className="mt-4">
              <LoadingSpinner size="sm" />
            </div>
          )}
        </label>
      </div>

      {/* Upload Error */}
      {uploadError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{uploadError}</p>
        </div>
      )}

      {/* Media Grid */}
      {media.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {media.map((item: any) => (
            <div key={item._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* File Preview */}
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                {item.fileType === 'image' ? (
                  <img
                    src={item.uploadthingUrl}
                    alt={item.fileName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-4xl">{getFileIcon(item.fileType)}</div>
                )}
              </div>

              {/* File Info */}
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm truncate" title={item.fileName}>
                  {item.fileName}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {formatFileSize(item.fileSize)}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {item.fileType}
                </p>

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => window.open(item.uploadthingUrl, '_blank')}
                    className="flex-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center justify-center gap-1"
                    title="View file"
                  >
                    <FaEye className="w-3 h-3" />
                    View
                  </button>
                  <button
                    onClick={() => window.open(item.uploadthingUrl, '_blank')}
                    className="flex-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 flex items-center justify-center gap-1"
                    title="Download file"
                  >
                    <FaDownload className="w-3 h-3" />
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                    title="Delete file"
                  >
                    <FaTrash className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>No media files uploaded yet.</p>
          <p className="text-sm">Upload your first file to get started.</p>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
