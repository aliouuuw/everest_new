// Uploadthing configuration for ConvexDB integration
// This file defines the file upload endpoints and handling

// For now, we'll define the types for our file router
// In a full implementation, this would integrate with Uploadthing's server package

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
};

export type OurFileRouter = FileRouter;

// File upload configuration constants
export const UPLOAD_CONFIG = {
  publicationImage: {
    maxFileSize: "4MB",
    acceptedFileTypes: ["image/*"],
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
  },
} as const;
