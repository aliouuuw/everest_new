// Uploadthing React utilities for Everest Finance CMS
// This provides a simplified interface for file uploads

import { generateReactHelpers, generateUploadButton, generateUploadDropzone } from "@uploadthing/react";

// File router types will be generated from server-side configuration
// For now, using 'any' type to bypass type checking

// Generate Uploadthing components (these will work once we have the full server setup)
export const UploadButton = generateUploadButton<any>();
export const UploadDropzone = generateUploadDropzone<any>();

export const { useUploadThing, uploadFiles } = generateReactHelpers<any>();

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
