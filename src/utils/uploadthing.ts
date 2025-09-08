// Uploadthing React utilities for Everest Finance CMS
// This provides a simplified interface for file uploads

import { generateReactHelpers, generateUploadButton, generateUploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "../../convex/uploadthing";

// Generate Uploadthing components with proper typing
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();

// Generate specific upload components
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

// Specialized upload functions for different file types
export const uploadPublicationImage = async (file: File): Promise<{ url: string; fileId: string }> => {
  try {
    const [res] = await uploadFiles("publicationImage", { files: [file] });
    return { url: res.url, fileId: res.key };
  } catch (error) {
    console.error("Publication image upload failed:", error);
    throw error;
  }
};

export const uploadPublicationAttachment = async (file: File): Promise<{ url: string; fileId: string }> => {
  try {
    const [res] = await uploadFiles("mediaFile", { files: [file] });
    return { url: res.url, fileId: res.key };
  } catch (error) {
    console.error("Publication attachment upload failed:", error);
    throw error;
  }
};

export const uploadMediaFile = async (file: File): Promise<{ url: string; fileId: string }> => {
  try {
    const [res] = await uploadFiles("mediaFile", { files: [file] });
    return { url: res.url, fileId: res.key };
  } catch (error) {
    console.error("Media file upload failed:", error);
    throw error;
  }
};

export const uploadProfileImage = async (file: File): Promise<{ url: string; fileId: string }> => {
  try {
    const [res] = await uploadFiles("profileImage", { files: [file] });
    return { url: res.url, fileId: res.key };
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
  const maxSize = 4 * 1024 * 1024; // 4MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  
  if (file.size > maxSize) {
    return `File size must be less than 4MB. Current size: ${formatFileSize(file.size)}`;
  }
  
  if (!allowedTypes.includes(file.type)) {
    return `File type not supported. Allowed types: ${allowedTypes.join(', ')}`;
  }
  
  return null;
};

export const validateMediaFile = (file: File): string | null => {
  const maxSize = 16 * 1024 * 1024; // 16MB
  const allowedTypes = [
    'image/jpeg', 'image/png', 'image/webp', 'image/gif',
    'video/mp4', 'video/webm', 'video/ogg',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (file.size > maxSize) {
    return `File size must be less than 16MB. Current size: ${formatFileSize(file.size)}`;
  }
  
  if (!allowedTypes.includes(file.type)) {
    return `File type not supported. Allowed types: ${allowedTypes.join(', ')}`;
  }
  
  return null;
};

export const validateProfileImage = (file: File): string | null => {
  const maxSize = 2 * 1024 * 1024; // 2MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  
  if (file.size > maxSize) {
    return `File size must be less than 2MB. Current size: ${formatFileSize(file.size)}`;
  }
  
  if (!allowedTypes.includes(file.type)) {
    return `File type not supported. Allowed types: ${allowedTypes.join(', ')}`;
  }
  
  return null;
};

// Hook for handling upload progress and state
export const useFileUpload = (endpoint: keyof OurFileRouter) => {
  const { startUpload, isUploading } = useUploadThing(endpoint, {
    onClientUploadComplete: (res) => {
      console.log("Upload completed:", res);
    },
    onUploadError: (error) => {
      console.error("Upload failed:", error);
    },
  });

  return {
    startUpload,
    isUploading,
  };
};
