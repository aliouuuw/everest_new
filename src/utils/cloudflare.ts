// Cloudflare R2 and Images API utilities for Everest Finance CMS
// This provides a simplified interface for file uploads using Cloudflare services

import { useState } from 'react';

// File upload configuration constants
export const UPLOAD_CONFIG = {
  publicationImage: {
    maxFileSize: 4 * 1024 * 1024, // 4MB
    acceptedFileTypes: ["image/*"],
    maxFileCount: 10,
  },
  mediaFile: {
    maxFileSize: 16 * 1024 * 1024, // 16MB
    acceptedFileTypes: [
      "image/*",
      "video/*",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ],
    maxFileCount: 50,
  },
  profileImage: {
    maxFileSize: 2 * 1024 * 1024, // 2MB
    acceptedFileTypes: ["image/*"],
    maxFileCount: 1,
  },
} as const;

// Generate a unique file key
export const generateFileKey = (fileName: string, fileType: string): string => {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 15);
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `${fileType}/${timestamp}-${randomId}-${sanitizedFileName}`;
};

// Upload to R2 using ConvexDB server-side upload
export const uploadToR2 = async (
  file: File,
  fileType: string
): Promise<{ fileKey: string; publicUrl: string }> => {
  try {
    // Step 1: Upload file to Convex server-side action
    const convexUrl = import.meta.env.VITE_CONVEX_SITE_URL;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    formData.append('fileType', fileType);

    const response = await fetch(`${convexUrl}/api/cloudflare/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to upload to Cloudflare: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Upload failed');
    }

    const { uploadResult } = data;

    console.log('R2 upload successful:', {
      fileKey: uploadResult.id,
      publicUrl: uploadResult.url,
      fileName: file.name,
      size: file.size
    });

    return {
      fileKey: uploadResult.id,
      publicUrl: uploadResult.url,
    };
  } catch (error) {
    console.error('R2 upload failed:', error);
    throw error;
  }
};

// Upload image via R2 (avoiding CORS issues with Images API)
export const uploadToCloudflareImages = async (
  file: File
): Promise<{ 
  id: string; 
  url: string; 
  variants: { 
    thumbnail: string; 
    medium: string; 
    large: string; 
    webp: string; 
  } 
}> => {
  // For now, use R2 upload to avoid CORS issues
  // In production, this should go through ConvexDB server action
  const result = await uploadToR2(file, 'images');
  
  // Generate mock variants for consistency (all point to same image for now)
  const variants = {
    thumbnail: result.publicUrl,
    medium: result.publicUrl,
    large: result.publicUrl,
    webp: result.publicUrl,
  };

  return {
    id: result.fileKey,
    url: result.publicUrl,
    variants,
  };
};

// Specialized upload functions for different file types
export const uploadPublicationImage = async (file: File): Promise<{
  id: string;
  url: string;
  variants?: {
    thumbnail: string;
    medium: string;
    large: string;
    webp: string;
  };
}> => {
  try {
    if (file.type.startsWith('image/')) {
      const result = await uploadToCloudflareImages(file);
      return {
        id: result.id,
        url: result.url,
        variants: result.variants,
      };
    } else {
      const result = await uploadToR2(file, 'publication-images');
      return {
        id: result.fileKey,
        url: result.publicUrl,
      };
    }
  } catch (error) {
    console.error("Publication image upload failed:", error);
    throw error;
  }
};

export const uploadMediaFile = async (file: File): Promise<{
  id: string;
  url: string;
  variants?: {
    thumbnail: string;
    medium: string;
    large: string;
    webp: string;
  };
}> => {
  try {
    if (file.type.startsWith('image/')) {
      const result = await uploadToCloudflareImages(file);
      return {
        id: result.id,
        url: result.url,
        variants: result.variants,
      };
    } else {
      const result = await uploadToR2(file, 'media-files');
      return {
        id: result.fileKey,
        url: result.publicUrl,
      };
    }
  } catch (error) {
    console.error("Media file upload failed:", error);
    throw error;
  }
};

export const uploadProfileImage = async (file: File): Promise<{
  id: string;
  url: string;
  variants: {
    thumbnail: string;
    medium: string;
    large: string;
    webp: string;
  };
}> => {
  try {
    const result = await uploadToCloudflareImages(file);
    return result;
  } catch (error) {
    console.error("Profile image upload failed:", error);
    throw error;
  }
};

// Utility functions for file handling
export const getFileTypeFromMime = (mimeType: string): string => {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.includes('pdf')) return 'document';
  if (mimeType.includes('word') || mimeType.includes('document')) return 'document';
  return 'file';
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isValidFileType = (file: File, allowedTypes: Array<string>): boolean => {
  return allowedTypes.some(type => {
    if (type.endsWith('/*')) {
      return file.type.startsWith(type.slice(0, -1));
    }
    return file.type === type;
  });
};

// File validation helpers
export const validatePublicationImage = (file: File): string | null => {
  const maxSize = UPLOAD_CONFIG.publicationImage.maxFileSize;
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  
  if (file.size > maxSize) {
    return `File size must be less than ${formatFileSize(maxSize)}. Current size: ${formatFileSize(file.size)}`;
  }
  
  if (!allowedTypes.includes(file.type)) {
    return `File type not supported. Allowed types: ${allowedTypes.join(', ')}`;
  }
  
  return null;
};

export const validateMediaFile = (file: File): string | null => {
  const maxSize = UPLOAD_CONFIG.mediaFile.maxFileSize;
  const allowedTypes = [
    'image/jpeg', 'image/png', 'image/webp', 'image/gif',
    'video/mp4', 'video/webm', 'video/ogg',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (file.size > maxSize) {
    return `File size must be less than ${formatFileSize(maxSize)}. Current size: ${formatFileSize(file.size)}`;
  }
  
  if (!allowedTypes.includes(file.type)) {
    return `File type not supported. Allowed types: ${allowedTypes.join(', ')}`;
  }
  
  return null;
};

export const validateProfileImage = (file: File): string | null => {
  const maxSize = UPLOAD_CONFIG.profileImage.maxFileSize;
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  
  if (file.size > maxSize) {
    return `File size must be less than ${formatFileSize(maxSize)}. Current size: ${formatFileSize(file.size)}`;
  }
  
  if (!allowedTypes.includes(file.type)) {
    return `File type not supported. Allowed types: ${allowedTypes.join(', ')}`;
  }
  
  return null;
};

// Custom hook for handling upload progress and state
export const useCloudflareUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (
    file: File,
    type: 'publicationImage' | 'mediaFile' | 'profileImage'
  ) => {
    setIsUploading(true);
    setProgress(0);
    setError(null);

    try {
      let result;
      
      switch (type) {
        case 'publicationImage':
          result = await uploadPublicationImage(file);
          break;
        case 'mediaFile':
          result = await uploadMediaFile(file);
          break;
        case 'profileImage':
          result = await uploadProfileImage(file);
          break;
        default:
          throw new Error('Invalid upload type');
      }

      setProgress(100);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadFile,
    isUploading,
    progress,
    error,
  };
};
