// Cloudflare R2 upload configuration and validation utilities for Everest Finance CMS.
// Actual uploads go through the useR2Upload hook → convex/r2Upload.ts (presigned URL).

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
