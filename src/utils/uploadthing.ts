// Uploadthing React utilities for Everest Finance CMS
// This provides a simplified interface for file uploads

import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";

// Define our file router types for Uploadthing
type OurFileRouter = {
  publicationImage: {
    image: { maxFileSize: "4MB" };
  };
  mediaFile: {
    image: { maxFileSize: "4MB" };
    video: { maxFileSize: "16MB" };
    "application/pdf": { maxFileSize: "8MB" };
    "application/msword": { maxFileSize: "8MB" };
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "8MB" };
  };
};

// Generate Uploadthing components (these will work once we have the full server setup)
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();

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

export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.some(type => {
    if (type.endsWith('/*')) {
      return file.type.startsWith(type.slice(0, -1));
    }
    return file.type === type;
  });
};
