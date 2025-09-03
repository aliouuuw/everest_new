// Uploadthing configuration for ConvexDB integration
// This file defines the file upload endpoints and handling

import type { FileRouter as UploadthingFileRouter } from "uploadthing/next";

// Define the file router with the correct Uploadthing type structure
export type FileRouter = {
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
  profileImage: {
    image: { maxFileSize: "2MB" };
  };
};

// Use the Uploadthing library's type for compatibility
export type OurFileRouter = UploadthingFileRouter;

// File upload configuration constants
export const UPLOAD_CONFIG = {
  publicationImage: {
    maxFileSize: "4MB",
    acceptedFileTypes: ["image/*"],
    maxFileCount: 10,
  },
  mediaFile: {
    maxFileSize: "16MB",
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
    maxFileSize: "2MB",
    acceptedFileTypes: ["image/*"],
    maxFileCount: 1,
  },
} as const;

// Utility function to get file type from MIME type
export const getFileTypeFromMime = (mimeType: string): string => {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.includes('pdf')) return 'document';
  if (mimeType.includes('word') || mimeType.includes('document')) return 'document';
  return 'file';
};
